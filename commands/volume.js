module.exports = {
  name: "volume",
  description: "set BOT volume",
  aliases: ["v"],
  NsfwStatus: false,
  execute(message, args, client) {
    const msg = message.channel;
    if (!message.member)
      return msg.send("kirim mention join dums di server, baru request!!!");
    var fetched = message.guild.voiceConnection;
    if (!fetched)
      return msg.send(
        "no voice connection on " + message.guild.name + " guild!"
      );
    if (message.member.voiceChannel !== message.guild.me.voiceChannel)
      return msg.send("jangan ganggu aku!");
    if (Number.isInteger(args[0]) || 0 < args[0] < 200) {
      fetched.player.dispatcher.setVolume(args[0] / 100);
      msg.send("volume has been changed!!!");
    } else {
      msg.send("please set value between 0 - 200");
    }
  }
};
