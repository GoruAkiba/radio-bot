// init require 
const { prefix, self_id } = require("../server_setting.json");

// export module
module.exports = {
  name: "leave",
  description: "disconnect voice channel",
  aliases: ["dc"],
  usage: null,
  admin: false,
  hidden: false,
  NsfwStatus: false,

  async execute(client, message, args) {

    if (!message.member) return;

    const { voiceChannel } = message.member,
      fs = require("fs");

    
    if (message.member.voiceChannelID !== message.guild.me.voiceChannelID)
      return message.channel.send("jangan ganggu aku!!");
    
    message.guild.me.voiceChannel.leave();

    client.user.setActivity(`help '${prefix}radio'`);
  }
};
