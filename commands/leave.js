  module.exports = {
  name: "leave",
  description: "disconnect",
  aliases: ["dc"],
  NsfwStatus: false,
  hidden: true,
  async execute(message, args,client) {
    if(!message.member)return;
    const { voiceChannel } = message.member;
    const {prefix,self_id}= require("../server_setting.json");
    if(message.member.voiceChannelID !== message.guild.me.voiceChannelID)return message.channel.channel.send("jangan ganggu aku!!");
    message.guild.me.voiceChannel.leave();
    client.user.setActivity(`help '${prefix}radio'`)
  }
  }