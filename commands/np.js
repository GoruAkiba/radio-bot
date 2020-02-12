module.exports = {
  name: "nowplaying",
  description: "get nowplaying track",
  aliases: ["np"],
  NsfwStatus: false,
  execute(message, args, client) {
    const request = require("request"),
      fs = require("fs");

    var post_serv = "https://parser.raddio.net/stations/last";
    if (!fs.existsSync("./queue.json"))
      return message.channel.send("queue kosong!!!");

    fs.readFile("./queue.json", "utf8", (err, e) => {
      console.log(e);
      var { queue } = JSON.parse(e);
      if (!queue) return message.channel.send("queue kosong!!!");
      request.post(
        {
          headers: { "content-type": "application/x-www-form-urlencoded" },
          url: post_serv,
          body: `streamUrl=${encodeURIComponent(queue.uri)}&streamId=${
            queue.stream_id
          }`
        },
        async (error, response, body) => {
          console.log(body);
          var { data } = JSON.parse(body);
          var embed = await compose(
            message,
            data,
            queue.name
          );
          message.channel.send({ embed: embed });
        }
      );
    });

    function tn(a, n = 1) {
      var i = "     ".repeat(n);
      return a + i.slice(0, i.length - a.length);
    }

    async function compose(message, data, station) {
      var ane = message.guild.me.user,
        name = `${message.guild.me.nickname || ane.username} | ${ane.tag}`,
        id = ane.id,
        avatar = ane.avatar,
        na = "",
        cm = "";

      var exampleEmbed = await {
        color: 0xffd740,
        title: ``,
        url: "",
        author: {
          name: name,
          icon_url: ` https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
          url: ""
        },
        thumbnail: {
          url:
            "https://cdn.glitch.com/5f7d51b1-406e-43aa-9be8-293ff08f0543%2Fnot%20music.png?v=1579912628468"
        },
        description: `**NowPlaying :** \n${
          data.song !== "" ? data.song : "unknow"
        } *[${
          data.artist !== "" ? data.artist : "unknow"
        }]* \nStation : ${station}`,
        image: {
          url:
            "https://cdn.glitch.com/5f7d51b1-406e-43aa-9be8-293ff08f0543%2Fgiff.gif?v=1579915986916"
        }
      };
      return exampleEmbed;
    }
  }
};
