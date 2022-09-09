const nodemailer = require("nodemailer");

module.exports= async ({ from, to, subject, text, html })=>{
    let transporter = nodemailer.createTransport({
<<<<<<< HEAD:server/services/emailService.js
        host:SMTP_HOST,
        port:SMTP_PORT,
=======
        host:"smtp.gmail.com",
        port:465,
>>>>>>> e042cb36d1730c702148753def443759a146ab04:services/emailService.js
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





