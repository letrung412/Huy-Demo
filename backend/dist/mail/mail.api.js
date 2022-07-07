"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewMailAPI = void 0;
const express = require("express");
const nodemailer = require("nodemailer");
function NewMailAPI() {
    const router = express.Router();
    router.post('/mail/send', (req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'acccountShopHaTrung@gmail.com',
                pass: 'shophatrung123'
            }
        });
        const option = {
            from: `${req.body.name}<acccountShopHaTrung@gmail.com>`,
            to: req.body.to,
            subject: req.body.title,
            text: req.body.content
        };
        transporter.sendMail(option, (err, info) => {
            if (err) {
                throw err;
            }
            else {
                console.log('done');
            }
        });
        res.json('Your mail has been sent successfully');
    });
    return router;
}
exports.NewMailAPI = NewMailAPI;
//# sourceMappingURL=mail.api.js.map