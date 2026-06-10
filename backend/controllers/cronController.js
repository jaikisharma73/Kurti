import userModel from '../models/userModel.js';
import sendEmail from '../utils/email.js';

export const checkAbandonedCarts = async (req, res) => {
    try {
        console.log('API Hit: Running abandoned cart check...');


        const thresholdDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const usersToRemind = await userModel.find({
            abandonedReminderSent: false,
            lastCartUpdate: { $lte: thresholdDate }
        });

        let sentCount = 0;

        for (const user of usersToRemind) {

            if (user.cartData && Object.keys(user.cartData).length > 0) {
                
                const frontendUrl = process.env.FRONTEND_URL || 'https://zorry-fash-frontend.vercel.app';
                
                const emailOptions = {
                    email: user.email,
                    subject: 'Your Cart is Waiting! 🛒',
                    message: `Hi ${user.name},\n\nYou left some great items in your cart at ZorryFash. Come back and complete your purchase before they sell out!\n\nVisit our website to view your cart: ${frontendUrl}/cart`,
                    html: `
                        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                            <h2>Hi ${user.name},</h2>
                            <p style="font-size: 16px;">We noticed you left some great items in your cart at ZorryFash.</p>
                            <p style="font-size: 16px;">Come back and complete your purchase before they sell out!</p>
                            <a href="${frontendUrl}/cart" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px; font-weight: bold;">Return to Checkout</a>
                        </div>
                    `
                };

                await sendEmail(emailOptions);

                user.abandonedReminderSent = true;
                await user.save();
                
                console.log(`Abandoned cart email sent to ${user.email}`);
                sentCount++;
            }
        }

        res.status(200).json({ success: true, message: `Checked abandoned carts. Emails sent: ${sentCount}` });
    } catch (error) {
        console.error('Error in abandoned cart API cron:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
