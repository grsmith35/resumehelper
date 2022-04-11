const express = require('express');
const path = require('path');
const session = require('express-session');

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

app.get("/api/site/newresume/:name/:email", (req, res) => {
    console.log('server hit');
    console.log(req.params.email, req.params.name);
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));