const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("../models/fileSchema");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => { return cb(null, path.join(__dirname, "../uploads/")) },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 10000)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage: storage,
    limit: { fileSize: 1000000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
    console.log("Post operation successful");
    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ error: "All fields are required." });
        }

        if (err) {
            return res.status(500).send({ error: err.message });
        }

        const file = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            uuid: uuidv4()
        });

        const response = await file.save()
        const appurl = "http://localhost:3000";
        return res.json({ "file": `${process.env.APP_BASE_URL}/files/${response.uuid}` });

    });
});

router.post("/send", async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body;

    if (!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: "All fields are required" });
    }

    const file=await File.findOne({uuid:uuid});
    if(file.sender)
    {
        return res.status(422).send({ error: "Email already sent." });
    }

    file.sender=emailFrom;
    file.receiver=emailTo;
    const response=await file.save();

    const sendMail=require("../services/emailService");
    sendMail({
        from:emailFrom,
        to:emailTo,
        subject:"File shared with you",
        text:`${emailFrom} shared a file with you.`,
        html:require("../services/emailTemplate")(
        {
            emailFrom:emailFrom,
            downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size:parseInt(file.size/1000)+" KB",
            expires:"24 hours"
        }
        )
    })
});

module.exports = router;