//set path
const path = require("path");
const fs = require("fs");

//déclartion du controller splitAdmission
const SplitAdmissionFunction = require("../function/splitAdmission");

//déclaration nodemailer
const nodemailer = require("nodemailer");

//node mailer handlebars pour le templatage de mail
const hbs = require("nodemailer-express-handlebars");

const smsFunctions = require("../function/sendSMS");
const dateFunctions = require("../function/dateTransform");

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: "campus@irdsm-aviation.com",
        pass: "irdsmaviation20$"
    }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve("views/"),
        defaultLayout: false
    },
    viewPath: path.resolve("views/")
};

transporter.use("compile", hbs(handlebarOptions));

/* fonction qui prend paramètre un fichier, un expéditeur et l'envoie par
mail et envoie un message à l'administrateur*/

exports.sendSubmissionByMail = (pdfFile, filename, expediteur, minMax) => {
    const mailOptions = {
        from: "campus@irdsm-aviation.com",
        to: expediteur,
        subject: "IRDSM AVIATION - Réponses aux formulaires!",
        template: "submissionPDF",
        context: {
            reponse: filename
        },
        attachments: [
            {
                filename: filename,
                content: pdfFile,
                encoding: "base64"
            }
        ]
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("E-mail envoyé : " + info.response);
            SplitAdmissionFunction.updateNewSplit(minMax);
            const dateFormatee = dateFunctions.convertDate(new Date());
            countSubscription = 120;
            message = `Liste de souscriptions (${countSubscription}) envoye le ${dateFormatee}`;
            smsFunctions.sendSMSNotification(message, "690072102");
        }
    });
};
