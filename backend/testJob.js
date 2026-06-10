import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userModel from './models/userModel.js';
import sendEmail from './utils/email.js';

const testJob = async () => {
    try {
        console.log("Connecting to DB...");
        await connectDB();
        console.log("DB Connected.");

        const users = await userModel.find({});
        console.log(`Total users in DB: ${users.length}`);

        let targetUser = users.find(u => u.cartData && Object.keys(u.cartData).length > 0);
        
        if (!targetUser) {
            console.log("No user found with items in their cart. Cannot test email.");
            process.exit(0);
        }

        console.log(`Found user with cart: ${targetUser.email}`);
        console.log(`lastCartUpdate: ${targetUser.lastCartUpdate}`);
        console.log(`abandonedReminderSent: ${targetUser.abandonedReminderSent}`);

        console.log("Attempting to send test email to this user...");
        
        const emailOptions = {
            email: targetUser.email,
            subject: 'Test Email From ZorryFash 🛒',
            message: `Hi ${targetUser.name}, this is a manual test email.`,
            html: `<h3>Hi ${targetUser.name},</h3><p>This is a manual test email to verify your SMTP settings.</p>`
        };

        await sendEmail(emailOptions);
        
        console.log("sendEmail function completed without throwing an error.");
        process.exit(0);

    } catch (error) {
        console.error("Test execution failed:", error);
        process.exit(1);
    }
};

testJob();
