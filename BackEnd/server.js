const express = require('express');
const bodyParser = require('body-parser');
const userAuth = require('./userAuth').userData;
const emailData = require('./userAuth').emailData;
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Handle Register Requests

app.post('/register', async (req, res) => {
    let presentUser = userAuth.find((user) => user.email === req.body.username);
    try {
        if (!presentUser) {
            let hashPassword = await bcrypt.hash(req.body.password, 10);
            userAuth.push({
                name: req.body.name,
                email: req.body.username,
                password: hashPassword,
                created: Date.now()
            });
            emailData.push({
                email: req.body.username,
                sent: [],
                recieved: [],
                starred: [],
                trash: [],
            })
            console.log('Users: ', userAuth);
            res.status(201).send();
        }
        else {
            res.status(409).send();
        }
    } catch {
        res.status(500).send("Server Error!");
    }
})

// Handle Login Requests

app.post('/login', async (req, res) => {
    let presentUser = userAuth.find((user) => user.email === req.body.username);
    try {
        if (presentUser) {
            console.log(req.body.password, presentUser.password)
            let pwdCompare = await bcrypt.compare(req.body.password, presentUser.password);
            console.log(pwdCompare)
            if (pwdCompare) {
                res.status(202).send();
            }
            else {
                res.status(401).send("Invalid Password!");
            }
        }
        else {
            res.status(404).send("User Not Found!");
        }
    } catch {
        res.status(500).send("Server Error!");
    }
    
})

// Handle incoming email

app.post('/send', async (req, res) => {

    const sender = req.body.from;
    const reciever = req.body.to;
    try {
        emailData.map((object) => {
            if (object.email === sender) {
                object.sent = [
                    ...object.sent,
                    {
                        from: reciever,
                        starred: false,
                        read: true,
                        subject: req.body.subject,
                        message: req.body.message,
                        recieved: req.body.timestamp,
                    }
                ]
            }
            if (object.email === reciever) {
                object.recieved = [
                    ...object.recieved,
                    {
                        from: sender,
                        starred: true,
                        read: false,
                        subject: req.body.subject,
                        message: req.body.message,
                        recieved: req.body.timestamp,
                    }
                ]
            }
        })
        console.log(emailData);
        res.status(200).send();
    } catch {
        res.status(500).send();
    }
})

// Send the recieved emails of the user
app.get('/recieved', async (req, res) => {
    let user = req.query.user;
    try {
        emailData.map((object) => {
            if (object.email === user) {
                console.log(object.recieved);
                res.status(200).send({ emails: object.recieved });
            }
        })
    } catch {
        res.status(500).send();
    }
})

// Send the sent emails of the user
app.get('/sent', async (req, res) => {
    let user = req.query.user;
    try {
        emailData.map((object) => {
            if (object.email === user) {
                res.status(200).send({ emails: object.sent });
            }
        })
    } catch {
        res.status(500).send();
    }
})

// Handle Mark email read
app.post('/markRead', async (req, res) => {
    let user = req.body.user;
    let readIndex = req.body.index;
    try {
        emailData.map((object) => {
            if (object.email === user) {
                console.log(object.recieved[readIndex].read)
                object.recieved[readIndex].read = true;
                res.status(200).send();
            }
        })
    } catch {
        res.status(500).send();
    }
})

// handle delete emails
app.post('/delete', async (req, res) => {
    let user = req.body.user;
    let deleteIndexes = req.body.indexes;
    let sent = req.body.inbox;
    try {
        emailData.map((object) => {
            if (object.email === user) {
                if (!sent) {
                    object.sent = object.sent.filter((email, index) => !deleteIndexes.includes(index))
                }
                else {
                    object.recieved = object.recieved.filter((email, index) => !deleteIndexes.includes(index))
                }
            }
        })
        res.status(200).send();
    } catch {
        res.status(500).send();
    }
})

app.listen(5000);