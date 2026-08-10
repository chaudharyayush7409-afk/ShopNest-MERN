const nodemailer = require("nodemailer");






const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    family: 4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        console.log("📧 EMAIL: Starting...");
        console.time("EMAIL_TIME");

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });

        console.timeEnd("EMAIL_TIME");
        console.log("📧 EMAIL: Sent successfully");
        console.log("Message ID:", info.messageId);

        return info;

    } catch (error) {
        console.timeEnd("EMAIL_TIME");
        console.error("❌ EMAIL ERROR:", error);
        throw error;
    }
};

module.exports = sendEmail;

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const sendEmail = async (to, subject, text) => {
//     try {
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             text
//         });

//         console.log("Email sent successfully");
//     } catch (error) {
//         console.error("Email sending failed:", error);
//         throw error;
//     }
// };

// module.exports = sendEmail;








