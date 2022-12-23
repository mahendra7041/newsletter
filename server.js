import express from "express";
import * as dotenv from "dotenv";
import { createTransport } from "nodemailer";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    console.log(req.body);
    res.send("server is sending...");
});

app.post("/send", async (req, res) => {
    if (!req.body.email) {
        res.send("email is required");
    }
    const data = {
        to: req.body.email,
        subject: "Subject",
        text: "News letter",
    };
    const messageId = await sendEmail(data);
    res.send("email is sended");
});

app.listen(port);

async function sendEmail(data) {
    // Create a transport object
    let transporter = createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_SENDER_EMAIL, // generated ethereal user
            pass: process.env.MAIL_SENDER_PASSWORD, // generated ethereal password
        },
    });

    // Define the email options
    let mailOptions = {
        from: `"${process.env.MAIL_SENDER_NAME}" ${process.env.MAIL_HOST}`,
        ...data,
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);

    return info.messageId;
}
