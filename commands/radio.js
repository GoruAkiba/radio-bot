// init require
const { prefix, self_id } = require("../server_setting.json");
const request = require("request"),
      fs = require("fs"),
      ytdl = require("ytdl-core");


// export module
module.exports = {
  name: "radio",
  description: "play radio",
  aliases: ["ra"],
  usage: "[numberOfRadio | urlStream] <volume>",
  admin: false,
  hidden: false,
  NsfwStatus: false,
 
  async execute(client, message, args) {


    if (!message.member)
      return message.channel.send(
        "kirim mention join dums di server, baru request!!!"
      );


    const { voiceChannel } = message.member;
    const msg = message,
          util = client.util;

    // get list of radio station dynamically
    var server =
      "https://script.google.com/macros/s/AKfycbwRNLDKUWnaJWZcv0-7sY1YwBMY54rGFwy_lsCzrrI0tF6v5h4/exec";
    await request(server, async (err, res, e) => {
      var { channel } = JSON.parse(e);

      // if there is no selection radioNumber from args, send list of reference
      if (!args[0]) {
        var emb = await compose(
          client,
          message,
          channel
        );
        return message.channel.send({ embed: emb });
      }

      // check member channel_connectivity
      if (!voiceChannel) {
        return message.reply("please join a voice channel first!");
      }

      try {

        // rejoin BOT if available
        if (message.guild.me.voiceChannel) voiceChannel.leave();

        // rejoin
        voiceChannel.join().then(async connection => {
          
          // check if args contain streamUrl
          var stream = args[0].includes("http")
            ? args[0]
            : channel[args[0] - 1].uri;
          var nn = args[0].includes("http")
            ? "something"
            : channel[args[0] - 1].name;

          // set presence
          client.user.setActivity("and Stream on : \n" + nn, {
            url: stream,
            type: "WATCHING"
          });


          // start to stream
          const dispatcher = connection.playStream(stream);
          
          try{
            // set volume if avail args[1]
            dispatcher.setVolume(args[1] / 100 || 50 / 100);
          }catch(err){}
          
          // make anounce
          message.channel.send("Now Stream on : \n**" + nn + "**");

          // save the queue station
          await client.queue.set(message.guild.id,channel[args[0] - 1]);

          // init event begin
          dispatcher.on("end", async () => {
            if (!message.guild.me.voiceChannel) return;

            client.queue.delete(message.guild.id);
          });
          // init event end

        });

      } catch (err) {
        console.log(err.message);
        msg.channel.send(err.message);
      }
    });

  }
};



// additional func
async function compose(client,message, channel) {
  const util = client.util;
  var ane = message.guild.me.user,
      name = `${message.guild.me.nickname || ane.username} | ${ane.tag}`,
      id = ane.id,
      avatar = ane.avatar,
      na = "",
      cm = "";

  await channel.map((ei, i) => {
    var ni = i + 1;

    na += `${util.tn("[" + ni + "]")} ${util.tn(ei.name, 5)} \n`;
    cm += `${prefix}radio ${ni} \n`;
  });

  var cnt = [
    {
      name: util.tn("name : ", 6),
      value: "```css\n" + na + "```",
      inline: true
    },
    { name: util.tn("command : ", 5), value: "```" + cm + "```", inline: true }
  ];


  var exampleEmbed = await {
    color: 0x33aaff,
    title: "",
    url: "",
    author: {
      name: name,
      icon_url: ` https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
      url: ""
    },
    description: `**Channel Radio Tersedia:**\n *note: gunakan command di bawah untuk merekues!!!*`,
    fields: cnt,
    timestamp: new Date()
  };
  return exampleEmbed;
}