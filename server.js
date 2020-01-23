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
const {target} = require(__dirname + "/target.json");
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

//Member Join
// client.on('guildMemberAdd', async member => {
//   console.log(member.guild.id);
//   if (JSON.stringify(welcome_ch).indexOf(member.guild.id)===-1) return;
  
//   const commandName = 'card';
//   if (!client.commands.has(commandName)) return;
//   const comid = client.commands.get(commandName);
//   try {
//       comid.execute(member, null);
//      // const channel = member.guild.channels.find(
//      //    ch => ch.name === "welcome"
//      //  );
//      //  channel.send(`hello!`);  
//   } catch (error) {
//     console.error(error);
//   }
// });

client.on('message', message => {
   // if (JSON.stringify(channel_limit).indexOf(message.channel.id)===-1 ) return;
	// console.log(message.content);
  // console.log(message.member.voiceChannel);
  if (!message.content.startsWith(prefix) || message.author.bot){
    // try{console.log(message)}catch(err){console.log(err.message)}
//     if(Number.isInteger(parseInt(message.content)) && message.content.length > 3 && parseInt(message.content).toString().length >= message.content.length){
//       const comid = client.commands.get("nuklir");
//       comid.execute(message,message.content.split(/ +/));
      
//     };
    if(message.content.toLowerCase().includes(" gei ") || message.content.toLowerCase().includes(" gai ") || message.content.toLowerCase().includes(" gay ") || message.content.toLowerCase().includes("gayy") || message.content.toLowerCase().includes("gaii")){
      console.log("detected")
      const comid = client.commands.get("ur-gay");
      comid.execute(message);
    }
    // if(message.author.id == "240557240438751233"){
    //   console.log("mati")
    //   const comid = client.commands.get("hmpess");
    //   comid.execute(message);
    // }
    if (JSON.stringify(target).indexOf(message.author.id)!==-1 ){
      console.log("warn_react")
      const comid = client.commands.get("warn_react");
      comid.execute(message);
    };
    // if(message.author.id == "626004814249197579"){
    //   console.log("bkp")
    //   const comid = client.commands.get("bkp");
    //   comid.execute(message);
    // }
  };
  // console.log("no prefix")
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  console.log(message.channel.id);
  if (!client.commands.has(commandName)) return;
  const comid = client.commands.get(commandName);
  if( message.guild === null || comid.AnyChannel){
    // lakukan sesuatu ketika DM
    // return null;
    console.log(client.users.get(self_id))
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
  // client.channels.get("605061939412074520").send("hore")
});
