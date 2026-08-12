const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
    try {
        console.log("📧 EMAIL: Starting...");

        console.time("EMAIL_TIME");

        const { data, error } = await resend.emails.send({
            from: `ShopNest <${process.env.EMAIL}>`,
            to: [to],
            subject: subject,
            text: text
        });

        if (error) {
            console.error("❌ EMAIL ERROR:", error);
            throw new Error(error.message);
        }

        console.timeEnd("EMAIL_TIME");

        console.log("📧 EMAIL: Sent successfully");
        console.log("Message ID:", data.id);

        return data;

    } catch (error) {
        console.timeEnd("EMAIL_TIME");
        console.error("❌ EMAIL ERROR:", error);

        throw error;
    }
};

module.exports = sendEmail;








