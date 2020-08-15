const express = require('express')
const readline = require('readline');
const fs = require('fs');
var request = require("request");
var showdown  = require('showdown');
const app = express()
const port = 80 || 6969
const sqlite3 = require('sqlite3').verbose();
const db = require('quick.db')
const pathResolver = require('path').resolve

//withthislineipublishhopefully.

let tdb = new sqlite3.Database('testdb'); //a test database
var trys = 0
var adminsfdasfdsfds = false
var loggedOut = true
var filename = ""
var head = ""

filename = 'index.md'
head = '<head><title>SLLORD.info - Main Page.</title></head>'
fs.readFile('index.md', 'utf8', function (err,data) {
    if (err) {
        console.log("!!!ERROR!!!\nSomeone tried to access a MarkDown page,\n but for some odd reason we got an error reading the file!\nDetails:\n")
        return console.log(err);
    } else {
        app.get('/', (req, res) => { 
            console.log(`Converting markdown: \n ${data}\n`)
            var converter = new showdown.Converter(),
            text = `${data}\n`,
            body = converter.makeHtml(text);
            console.log(`Converted: ${data}\n To: ${body}\n Now serving...`)
            res.status(200).send(`<!DOCTYPE html><html>${head}<body>${body}</body></html>`)
            console.log(`Somebody successfully went to ${req.originalUrl}`)
        })
    }
});

app.get('/apiproxy', (req,res) => {
    var url = req.query.url
    request({
        uri: url,
    }, function(error, response, body) {
        res.status(200).send(body)
    });
})

app.get('/picOfMe', (req,res) => {
    res.status(200).sendFile(pathResolver('sllord.png'))
})

db.set('userInfo', {usernames: ['sparksammy'], passwords: ['Ki58FFuU46nOH8W']})
var users = db.get('userInfo.usernames')
var passwds = db.get('userInfo.passwords')
var adminLoginHTML = "<h1>Panel, please login</h1>  <form action='/login'><label for='uname'>Username:</label><br><input type='text' id='uname' name='uname' value=''><br>Key:</label><br><input type='text' id='key' name='key' value=''><br><input type='submit' value='Submit login'></form><a href='/signup'>Not a member? Sign up.</a>"
var adminRegisterHTML = "<h1>Register.</h1>  <form action='/signup'><label for='uname'>Username:</label><br><input type='text' id='uname' name='uname' value=''><br>Key:</label><br><input type='text' id='key' name='key' value=''><br><input type='submit' value='Submit registration'></form><a href='/login'>Already a member? Login.</a>"
app.get('/login', (req, res) => {
    function tryAdmin() {
        if (trys == 0) {
            users = db.get('userInfo.usernames')
            passwds = db.get('userInfo.passwords')
            res.status(200).send(adminLoginHTML)
        } else { 
            users = db.get('userInfo.usernames')
            passwds = db.get('userInfo.passwords')
            res.status(200).send(`<h1>Admin panel, please login</h1> <p><b>Try again. Trys: ${trys}</b></p>` + adminLoginHTML)
        }
        trys++
    }
    console.log(req.originalUrl)
    if (req.query.loggedIn == "true") {
        if (adminsfdasfdsfds != true) {
            res.status(200).send("<h1>GG, skid.</h1>");
            console.log(`Someone tried to hack into the admin panel. IsAdmin=${adminsfdasfdsfds}`)            
        } else {
            res.status(200).send("Maybe coming soon. <hr> <a href='/login?logout=true'>Logout</a>")
        }
    } else if (users.includes(req.query.uname) && passwds.includes(req.query.key) && users.indexOf(req.query.uname) == passwds.indexOf(req.query.key, users.indexOf(req.query.uname))) { //all we need to do now is to make sure key is at same position as uname
        
        adminsfdasfdsfds = true
        trys = 0
        res.status(200).send(`<h1>Logged in as: ${req.query.uname}.</h1> <hr> <a href='/login?loggedIn=true'>Go to panel</a>`);
    } else if (req.query.logout == "true") {
        loggedOut = true
        req.query.loggedIn = "false"
        adminsfdasfdsfds = false
        trys = 0
        res.status(200).send("<h1>Logged out.</h1> <hr> <a href='/login?loggedIn=false'>Log back in</a>");
    } else {
        tryAdmin()
    }
})

app.get('/signup', (req, res) => {
    if (req.query.uname != undefined && req.query.key != undefined) {
        db.push('userInfo.usernames', req.query.uname)
        db.push('userInfo.passwords', req.query.key)
        res.status(200).send(`Registered as ${req.query.uname}, please login.`);
    } else {
        res.status(200).send(adminRegisterHTML);
    }
})

app.listen(port, () => console.log(`SLLORD.info listening at http://localhost:${port}`))
//After we end the server, close the database connection
tdb.close();
