import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import cronRouter from './routes/cronRoute.js'
import chatRouter from './routes/chatRoute.js'
import posterRouter from './routes/posterRoute.js'
import homepageRouter from './routes/homepageRoute.js'
const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
app.use(cors())
app.use(async (req, res, next) => {
    await connectDB()
    next()
})
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/cron',cronRouter)
app.use('/api/chat',chatRouter)
app.use('/api/poster',posterRouter)
app.use('/api/homepage',homepageRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})
const startServer = async () => {
    try {
        await connectDB()          // 🔥 WAIT here
        await connectCloudinary()  // (optional but better)

        app.listen(port, () => {
            console.log('Server started on PORT : ' + port)
        })

    } catch (error) {
        console.error("Startup error:", error)
    }
}

startServer()

export default app;