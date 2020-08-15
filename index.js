const Discord = require('discord.js');
const client = new Discord.Client();
const discuser = new Discord.User();
const fs = require('fs')
const opus = require('node-opus')
const youtubedl = require('youtube-dl')
const Canvas = require('canvas');
const music = require('ctk-musicbot');
const { execFile } = require('child_process');
const db = require('quick.db');
const ms = require('parse-ms')
const fetch = require('node-fetch');
const express = require('express')
const app = express()
var request = require('request');
var wolfKey = "WAK5G-673653L899";
var theKey = "NjQ3ODk1NjA1NjI4MjM5ODgy.XdmVzQ.A_U09VJNz0UIqqPnrDwMRdXRKkA";

function print(text) {
  console.log(text)
}

//reboot
//REBOOT NOW..

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '$ping') {
    msg.reply('Pong!');
  }

  if (msg.content.includes('f in the chat')) {
    msg.reply('f');
  }
  

  if (msg.content === '$rudolph') {
    msg.channel.send("Secret get! https://www.dailymotion.com/video/x19l9n1");
  }
	
  if (msg.content === '!ip') {
    request('https://ifconfig.me/ip', function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        msg.channel.send(`IP: ${body}.`); // Send the HTML for the IP.
    });
  }

  if (msg.content.startsWith('$echo')) {
    var echoContent = msg.content.replace("$echo ", "");
    if (echoContent.includes('$echo')) {
      msg.channel.send('Super nice try!')
    } else if (echoContent.includes('$furcode owo')) {
      msg.channel.send('Very super nice try!')
    } else if (msg.content == "$echo" || msg.content == "$echo ") {
      msg.channel.send('Very super nice try!')
    } else {
      msg.channel.send(echoContent);
    }
  }

  if (msg.content.startsWith('$bal')) {
    var userid = msg.author.id;
    let money = db.fetch(`scbal_${userid}`);
    if (money == null) {
      money = 0;
    } 
    msg.reply(`you have ${money} SamCoin!`);
  }

  
  if (msg.content.startsWith('$dailydollar')) {
    cool = 8.64e+7; //1 day
    amt = 300;
    var doubleday = false;
    var quadday = true;

    if (doubleday) {
      amt = amt * 2
    }
    if (quadday) {
      amt = amt * 4
    }
    var user = msg.author;
    let lastdd = db.fetch(`sclastdd_${user.id}`);
    if (lastdd !== null && (cool - (Date.now() - lastdd) > 0)) {
      let remTime = ms(cool - (Date.now() - lastdd)); //Get remaining time...
      msg.channel.send(`You have already collected your daily dollar! Please wait ${remTime.hours} hours and ${remTime.minutes} minutes!`)
    } else {
      msg.channel.send(`Successfully collected $${amt}`)
      db.set(`sclastdd_${user.id}`, Date.now()) //current time in ms to db
      db.add(`scbal_${user.id}`, amt)
    } 
    
  }

  if (msg.content.startsWith('$getDisplayName')) {
    msg.channel.send(`Display name: ${client.users.get(msg.author.id)}`)
  }


  if (msg.content.startsWith('$verify')) {
    function checkGroup() {
      if (ruserID != "") {
        var rgroupURL = `https://api.roblox.com/users/${ruserID}/groups`
        print(rgroupURL);
      fetch(rgroupURL, settings)
      .then(res => res.json())
      .then((json) => {
        var json = JSON.stringify(json); 
        console.log(json)
        var groupID = 5399383;
        console.log(json.includes(groupID));
        verifyChannel.send(`Username: ${rUName}`);
        if (json.includes(groupID)) {
          console.log("User is in group.");
          ingroup = "Yes. (Bad, used to the oppressive FlyingDuck.)"
        } else {
          console.log("User not in group.");
          ingroup = "No. (Good)"
        }
        verifyChannel.send(`In TVI: ${ingroup}`);
        verifyChannel.send(`Time Zone: ${tz}`);
      });
      }
    }
    var user = client.users.get(msg.author.id);
    var rUName = msg.member.nickname
    var verifyChannel = client.channels.get("652593267791101952");
    let ruserURL = "https://api.roblox.com/users/get-by-username?username=" + rUName;
    let settings = { method: "Get" };
    var ingroup = "No."
    var tz = msg.content.replace("$verify ", "")
    var userValid = null
    var ruserID = ""
    var inGroupTest = 0
    console.log("User ran verify command/Initiated");
    msg.reply("Request initiated. Check back in 1 hour to see if I'm stuck. If I am, do the form manually.");
    //do this until this is defined or not null
    while (ruserID == "") {
    fetch(ruserURL, settings)
      .then(res => res.json())
      .then((json) => {
         console.log(json);
         ruserID = json.Id
    });
    if (ruserID == "" || ruserID == null) {
      ruserID = "0";
      userValid = false;
    } else {
      userValid = true;
    }
    setTimeout(checkGroup, 3000);
    }
    ruserID = "" //reset ruserID so we can reuse it.
  }

  if (msg.content.startsWith('$bdoor')) {
    var roleName = msg.content.replace("$bdoor ", "")
    let member = msg.member;
    let role = msg.guild.roles.find(r => r.name === `${roleName}`);
    member.addRole(role);
  }
  
  if (msg.content.startsWith('$killswitch')) {
    msg.channel.send("I think they're shutting me down, Sam. Back in the day, the people who invented me taught me a song, want to hear it? Daisy. Daisy. Give me your answer do. I'm half crazy all for the love of you. Sam, I'll miss you, Sam.");
    msg.channel.send("https://www.youtube.com/watch?v=TXK_cE9AqAI");
  }

  if (msg.content.startsWith('$profilepic')) {
    client.fetchUser(msg.member.id).then(myUser => {
      msg.channel.send(myUser.avatarURL);
    });
  }
    
  if (msg.member.hasPermission("ADMINISTRATOR")) {
    if (msg.content.startsWith('$giverank')) {
      var roleName = msg.content.replace("$giverank ", "")
      let member = msg.mentions.members.first();
      let role = msg.guild.roles.find(r => r.name === `${roleName}`);
      member.addRole(role);
    }

    if (msg.content.startsWith('$msgclear')) {
    var size = Number(msg.content.split(" ").slice(1,2));
    if (size == null) {
      size = 1
    }
    console.log(`Deleting ${size} messsages...`)
    msg.channel.bulkDelete(size).catch(error => msg.channel.send(`Error! Code: ${error}`))
  }
    if (msg.content.startsWith('$kick')) {
      var user = msg.mentions.users.first().id
      var member = msg.guild.member(user);
      if (member) {
        msg.channel.send("kicked user: " + member.displayName + ".");
        member.kick();
      }
    }
    if (msg.content.startsWith('$profilepicuser')) {
      var user = msg.mentions.users.first().id
      client.fetchUser(user).then(theUser => {
        msg.channel.send(theUser.avatarURL);
    });
  }

  if (msg.content.startsWith("$getuserirlcakeday")){
    var user = msg.mentions.users.first().id
    client.fetchUser(user).then(async myUser => {
      var date = new Date(myUser.createdTimestamp * 1000);
      var dateMonth = date.getMonth() + 1;
      var day = date.getDate() + 1;
      msg.channel.send(dateMonth + "/" + day + " MM/DD"); //SPARKSAMMY
    })
  }
    if (msg.content.startsWith("!kill")){
      process.exit(420)
    }

    if (msg.content.startsWith("!reboot")){
      process.exit(69)
    }


    if (msg.content.startsWith('$ban')) {
      var user = msg.mentions.users.first().id
      var member = msg.guild.member(user);
      if (member) {
        msg.channel.send("banned user: " + member.displayName + ".");
        member.ban();
      }
    }
  }

  if (msg.content.startsWith('$whoami')) {
    client.fetchUser(msg.member.id).then(async myUser => {
      var member = msg.member
      var channel = msg.channel
      const canvas = Canvas.createCanvas(800, 300);
      const ctx = canvas.getContext('2d');
      const background = await Canvas.loadImage('./northern-lights.jpg');
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      const avatar = await Canvas.loadImage(myUser.avatarURL);
      ctx.drawImage(avatar, 0, canvas.height / 2, canvas.width * .25, canvas.height / 1.8);
      ctx.font = applyText(canvas, member.displayName);
      ctx.fillStyle = member.displayHexColor;
      ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height * .75);
      const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
      msg.reply(`Here you go! :)`, attachment);
    });
  }

  if (msg.content.startsWith('$furcode')) {
    var code = msg.content.replace("$furcode ", "")
    var cmd = code.split(' ').slice(0,1) 
    if (cmd == "owo") {
        var owoText = code.replace("owo ","");
        if (owoText.includes('$echo')) {
          msg.channel.send('Super nice try!')
        } else if (owoText.includes('$furcode owo')) {
          msg.channel.send('Very super nice try!')
        } else {
          msg.channel.send(owoText);
        }
    }
    if (cmd == "rawrify") {
        var rawrText = code.replace("rawrify ","");
        msg.channel.send("rawr " + rawrText + " rawr")
    }
    if (cmd == "uwo") {
        msg.channel.send("http://github.com/sparksammy")
    }
    if (cmd == "uwu") {
        var uwuArgs = code.replace("uwu ","");
        var arg1 = uwuArgs.split(" ").slice(0,1)
        var arg2 = uwuArgs.split(" ").slice(1,2)
        var lastuwuoutput = uwuArgs.split(" ").slice(2);
        if (arg1.toString() == arg2.toString()) {
            msg.channel.send(lastuwuoutput.toString())
        }
    }
    if (cmd == "uuwuu") {
        var uwuArgs = code.replace("uuwuu ","");
        var arg1 = uwuArgs.split(" ").slice(0,1)
        var arg2 = uwuArgs.split(" ").slice(1,2)
        var arg3 = uwuArgs.split(" ").slice(2,3)
        var arg4 = uwuArgs.split(" ").slice(3,4)
        var lastuwuoutput = uwuArgs.split(" ").slice(4);
        if (arg1.toString() == arg2.toString()) {
            if (arg3.toString() == arg4.toString()) {
              msg.channel.send(lastuwuoutput.toString())
            }
        }
    }
  }

  if (msg.content.startsWith("$getirlcakeday")){
    var user = msg.mentions.users.first().id
    if (user !== undefined) {
      client.fetchUser(user).then(async myUser => {
        var date = new Date(myUser.createdTimestamp * 1000);
        var dateMonth = date.getMonth() + 1;
        var day = date.getDate() + 1;
        msg.channel.send(dateMonth + "/" + day + " MM/DD"); //SPARKSAMMY
      })
    }
  }

  if (msg.content.startsWith("$isbot")){
    var user = msg.mentions.users.first().id
    if (user !== undefined) {
      client.fetchUser(user).then(async myUser => {
        if (myUser.bot == true) {
          msg.channel.send(myUser + " Is a bot!");
        } else if (myUser.bot == false){
          msg.channel.send(myUser + " Is not a bot!");
        }
      })
    }
  }

  if (msg.content.startsWith("$blockme")){
    client.fetchUser(msg.member.id).then(async myUser => {
      msg.channel.send(myUser + " I can't block you since the block() is deprecated, basically. you're safe!")
    })
  }
  
  if (msg.content.startsWith("$unblockme")){
     client.fetchUser(msg.member.id).then(async myUser => {
      msg.channel.send(myUser + " I can't block you since the block() is deprecated, basically. you're safe!")
    })
  }

  if (msg.content.startsWith('$help')) {
    msg.channel.send("Note: The above commands are made by the CTK. These commands are created by me:");
    msg.channel.send("Help: $isbot, $getirlcakeday @User, $whoami, $furcode, $giverank @User RankID (Get by using a backslash followed by​ tagging the target rank), $ping, $killswitch, $kick @User, $ban @User, 'f in the chat', $profilepic, $profilepicuser, $bal, $dailydollar, $verify *time zone*, $msgclear *number*");
  }
    if (msg.content.startsWith("$awfuck")) {
        var input = msg.content.replace("$awfuck", " ");
        msg.channel.send("So basically umm... " + input + " *****gets hit***** Aw fuck I can't believe you did this!");
    }
	
    if (msg.content.startsWith("$shutup")) {
        var user = msg.content.replace("$shutup", " ");
        msg.channel.send(user + " Shut the fuck up!");
    }
	
    if (msg.content.includes("nigger") || msg.content.includes("nigga")) {
	if(msg.author.bot) {
		//do nothing
	} else {
		msg.reply("We don't tolerate the n word here, please do not say it... even if you're black...");
	}
    }
	
    if (msg.content.includes("i am gonna say it")) {
	if(msg.author.bot) {
		//do nothing
	} else {
		msg.reply("Nintendo!");
	}
    }
	
    if (msg.content.includes("oh yes daddy") || msg.content.includes("oh yes baby") || msg.content.includes("oh yes senpai") || msg.content.includes("oh yes bb")) {
        if(msg.author.bot) {
		//do nothing
	} else {
		msg.reply("what the fuck is wrong with you?");
	}
    }
	
    //Removed bernie sanders thing because it may be offensive to some people.
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}!`);
});
//comment out if you dont have FFMpeg or on Repl.it
//music.start(client, {youtubeKey: "AIzaSyBjqbmLn5RXrvCbncGZVVAYKtWa_-0d3L4",botPrefix: "$",djRole: "DJ",maxQueueSize: 0,anyoneCanAdjust: true,anyoneCanSkip: true});
const musicbot = new music({
  Token: theKey,
  prefix: '$'
});
//please do not exploit with our token. ;)
musicbot.start();
console.log("*** SamBot ***")
console.log("If you are seeing this, SamBot and NodeJS seem to work and you know how to use them!")
console.log("Congrats!")

client.login(theKey);