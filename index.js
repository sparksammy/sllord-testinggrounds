const express = require('express')
const readline = require('readline');
const fs = require('fs');
var request = require("request");
var showdown  = require('showdown');
const app = express()
const port = 80 || 6969
const sqlite3 = require('sqlite3').verbose();
const pathResolver = require('path').resolve



let tdb = new sqlite3.Database('testdb'); //a test database
var trys = 0
var adminsfdasfdsfds = false
var loggedOut = true
var filename = ""
var head = ""


res.status(400).send("client error :-(")
res.status(401).send("client error :-(")
res.status(402).send("client error :-(")
res.status(403).send("client error :-(")
res.status(404).send("user error :-(")
res.status(500).send("most likely my error :-(")
res.status(501).send("most likely my error :-(")
res.status(502).send("most likely my error :-(")
res.status(503).send("most likely my error :-(")
res.status(504).send("most likely my error :-(")
res.status(200).send("")
filename = 'index.md'
head = '<head><title>SLLORD.info - Main Page.</title></head>'
fs.readFile('index.md', 'utf8', function (err,data) {
    if (err) {
        console.log("!!!ERROR!!!\nSomeone tried to access a MarkDown page,\n but for some odd reason we got an error reading the file!\nDetails:\n")
        return console.log(err);
    } else {
        app.get('/', (req, res) => { 
            console.log(`Converting markdown: \n ${data}\n`)
            converter = new showdown.Converter(),
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


app.get('/admin', (req, res) => {
    function tryAdmin() {
        if (trys == 0) {
            res.status(200).send("<h1>Admin panel, please login</h1>  <form action='/admin'><label for='key'>Key:</label><br><input type='text' id='key' name='key' value='Insert key here.'><br><input type='submit' value='Submit key'></form>")
        } else{ 
            res.status(200).send(`<h1>Admin panel, please login</h1> <p><b>Try again. Trys: ${trys}</b></p>  <form action='/admin'><label for='key'>Key:</label><br><input type='text' id='key' name='key' value='Insert key here.'><br><input type='submit' value='Submit key'></form>`)
        }
        trys++
    }
    console.log(req.originalUrl)
    if (req.query.loggedIn == "true") {
        if (adminsfdasfdsfds != true) {
            res.status(200).send("<h1>GG, skid.</h1>");
            console.log(`Someone tried to hack into the admin panel. IsAdmin=${adminsfdasfdsfds}`)            
        } else {
            res.status(200).send("Maybe coming soon. <hr> <a href='/admin?logout=true'>Logout</a>")
        }
    } else if (req.query.key == "Ki58FFuU46nOH8W" ) {
        adminsfdasfdsfds = true
        trys = 0
        res.status(200).send(`<h1>Logged in as: ${req.query.key}.</h1> <hr> <a href='/admin?loggedIn=true'>Go to panel</a>`);
    } else if (req.query.logout == "true") {
        loggedOut = true
        req.query.loggedIn = "false"
        adminsfdasfdsfds = false
        trys = 0
        res.status(200).send("<h1>Logged out.</h1> <hr> <a href='/admin?loggedIn=false'>Log back in</a>");
    } else {
        tryAdmin()
    }
})

app.listen(port, () => console.log(`SLLORD.info listening at http://localhost:${port}`))
//After we end the server, close the database connection
tdb.close();