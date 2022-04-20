const express = require('express');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const moment = require('moment');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
    secret: 'yessecretrecipe',
    cookies: {},
    resave: false,
    saveUninitialized: true
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/resumehelper/api/site/test", (req, res) => {
    res.send({test: 'test'})
});

const hello = () => {
  console.log('in here')
};

const checkTime = () => {
  setInterval(hello, 5000);
};
checkTime();

app.post('/resumehelper/api/post/:name/:email', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if(err) throw err;
        let apps = JSON.parse(data);
        console.log('here')
        const newApp = {}
        newApp.name = req.params.name;
        newApp.email = req.params.email;
        newApp.date = moment().format("MM DD YYYY");
        apps.push(newApp);
        fs.writeFile(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(apps),
            (err) => {
                if(err) throw err;
                console.log(err);
            }
        );
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: 'yesresumebuilder@gmail.com',
              pass: 'Y3$2022!',
            },
          });
          transporter.sendMail({
            from: '"YES Resume Builder" <yesresumebuilder@gmail.com>', // sender address
            to: "riley_smith8@hotmail.com", // list of receivers
            subject: "test", // Subject line
            text: "There is a new article. It's about sending emails, check it out!", // plain text body
            html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
          }).then(info => {
            console.log({info});
          }).catch(console.error);
        res.status(200).json({message: 'Application added'});
    }) 
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));