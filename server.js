// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});




//////////////////////////////////////////////////////////////////////////////////////////////////
// *** Bot Setup ***
// Santoso Self bot
// NodeJs DiscordJs
// Author   : GB_Sources
// License  : Endel Gaming Dsc server
//////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const {prefix, self_id , token, owner} = require(__dirname +'/server_setting.json');
const {channel_limit} = require(__dirname + "/channel_limit.json");
//settup commands folder
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
  client.commands.set(command.aliases[0], command);
}

client.once('ready', () => {
	console.log('Ready!');
});



client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot){
    //lakukan sesuatu jika message tampa prefix
  };
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  console.log(message.channel.id);
  if (!client.commands.has(commandName)) return;
  const comid = client.commands.get(commandName);
  if( message.guild === null || comid.AnyChannel){
    // lakukan sesuatu ketika DM
    console.log(client.users.me.id);
    return null;
  }else{
    // limit untuk channel tertentu
    if (JSON.stringify(channel_limit).indexOf(message.channel.id)===-1 ) return;
  }
  if(comid.admin){
    if(self_id !== message.author.id){
      return message.channel.send("Just admin can access!!!");
    }
  }
  try {
    comid.execute(message, args,client);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
client.login(token).then(()=>{
});
