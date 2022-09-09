const nodemailer = require("nodemailer");

module.exports= async ({ from, to, subject, text, html })=>{
    let transporter = nodemailer.createTransport({
        host:SMTP_HOST,
        port:SMTP_PORT,
        secure:true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    let info=await transporter.sendMail({
        from:from, 
        to:to,
        subject:subject,
        text:text,
        html:html
    });
};





