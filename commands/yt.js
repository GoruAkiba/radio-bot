module.exports = {
  name: "yt",
  description: "play yyoutube url",
  aliases: ["music"],
  NsfwStatus: false,
  hidden: true,
  async execute(client, message, args) {
    const { self_id } = require("../server_setting.json");
    if (!message.member)
      return message.channel.send(
        "kirim mention join dums di server, baru request!!!"
      );
    const { voiceChannel } = message.member;
    const ytdl = require("ytdl-core");
    const msg = message;

    if (!args[0]) return msg.channel.send("please gimne url!!!");
    if (!voiceChannel) {
      return message.reply("please join a voice channel first!");
    }

    try {
      voiceChannel.join().then(connection => {
        const stream = ytdl(args.join(), { filter: "audioonly" });
        console.log(stream);
        const dispatcher = connection.playStream(stream);
        process.on("unhandledRejection", error =>
          console.error("Uncaught Promise Rejection", error)
        );
        dispatcher.on("end", () => {
          if (!message.guild.me.voiceChannel) return;

          msg.channel.send("stream end");
        });
      });
    } catch (err) {
      console.log(err.message);
      msg.channel.send(err.message);
    }
  }
};
