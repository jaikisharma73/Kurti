import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import sendEmail from "../utils/email.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'
import crypto from 'crypto'
const currency = 'inr'
const deliveryCharge = 10
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})
const placeOrder = async (req,res) => {
    
    try {
        
        const { userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        const user = await userModel.findById(userId);
        if (user && user.email) {
            const itemsList = items.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('\n');
            await sendEmail({
                email: user.email,
                subject: 'Order Confirmation - ZorryFash',
                message: `Dear ${user.name},\n\nYour order has been successfully placed.\n\nProducts Ordered:\n${itemsList}\n\nOrder Amount: ₹${amount}\n\nThank you for shopping with us!\n\nBest Regards,\nZorryFash Team`
            });
        }

        res.json({success:true,message:"Order Placed"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
const placeOrderStripe = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const verifyStripe = async (req,res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})

            const user = await userModel.findById(userId);
            const order = await orderModel.findById(orderId);
            if (user && user.email && order) {
                const itemsList = order.items.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('\n');
                await sendEmail({
                    email: user.email,
                    subject: 'Order Confirmation - ZorryFash',
                    message: `Dear ${user.name},\n\nYour payment was successful and your order has been placed.\n\nProducts Ordered:\n${itemsList}\n\nOrder Amount: ₹${order.amount}\n\nThank you for shopping with us!\n\nBest Regards,\nZorryFash Team`
                });
            }

            res.json({success: true});
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
const placeOrderRazorpay = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        if (amount * 100 < 100) {
            return res.status(400).json({ success: false, message: "Amount must be at least ₹1" });
        }

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error) {
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay = async (req,res) => {
    try {
        
        const { userId, razorpay_order_id, razorpay_payment_id, razorpay_signature  } = req.body

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
             return res.status(400).json({ success: false, message: 'Missing fields' });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})

            const user = await userModel.findById(userId);
            const order = await orderModel.findById(orderInfo.receipt);
            if (user && user.email && order) {
                const itemsList = order.items.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('\n');
                await sendEmail({
                    email: user.email,
                    subject: 'Order Confirmation - ZorryFash',
                    message: `Dear ${user.name},\n\nYour payment was successful and your order has been placed.\n\nProducts Ordered:\n${itemsList}\n\nOrder Amount: ₹${order.amount}\n\nThank you for shopping with us!\n\nBest Regards,\nZorryFash Team`
                });
            }

            res.json({ success: true, message: "Payment Successful" })
        } else {
             res.status(400).json({ success: false, message: 'Invalid signature' });
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const updatePaymentStatus = async (req,res) => {
    try {
        
        const { orderId, payment } = req.body

        await orderModel.findByIdAndUpdate(orderId, { payment })
        res.json({success:true,message:'Payment Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyRazorpay, verifyStripe ,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, updatePaymentStatus}