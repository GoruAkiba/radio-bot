

//////////////////////////////////////////////////////////////////////////////////////////////////
// *** Bot Setup ***
// Santoso Self bot
// NodeJs DiscordJs
// Author   : GB_Sources
// License  : Endel Gaming Dsc server
//////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const fs = require('fs');
const botClient = require("./structures/botClient");
const client = new botClient();
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



//Event handler
client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {
  //control message prefix
  if (!message.content.startsWith(prefix) || message.author.bot){
    //do something when message without prefix detected
    return;
  };
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  //log activity at cannels
  console.log(message.channel.id);
  
  
  if (!client.commands.has(commandName)) return;
  const comid = client.commands.get(commandName);
  
  //control if message come from DM
  if( message.guild === null || comid.AnyChannel){
    // do somenting when message dome from DM
    // console.log(client.users.me.id);
    return null;
  }else{
    // limit commands from certain channels
    if (JSON.stringify(channel_limit).indexOf(message.channel.id)===-1 ) return;
  }
  if(comid.admin){
    //control if the command is only for administrator
    if(self_id !== message.author.id){
      return message.channel.send("Just admin can access!!!");
    }
  }
  try {
    //execute command
    comid.execute(message, args,client);
    
  } catch (error) {
    //log and push notif when err
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

//Login
client.login(process.env.TOKEN).then(()=>{
  //do somenting when logged
})

//webserver
var webserver = require("./webServer.js");
webserver.exec(client);