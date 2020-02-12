module.exports = {
  name: "help",
  description: "help command!",
  aliases: ["?"],
  NsfwStatus: false,
  async execute(message, args, client) {
    const { prefix, self_id, owner } = require("../server_setting.json"),
      { channel_limit } = require("../channel_limit.json");
    const fs = require("fs");
    const commandFiles = fs
      .readdirSync("./commands")
      .filter(file => file.endsWith(".js"));
    var cmn = "",
      limit = "",
      n_limit = 0;

    for (const file of commandFiles) {
      var cm = client.commands.get(file.replace(".js", ""));
      if (cm.hidden !== true)
        cmn += `${tn(cm.name, 3)}[ ${tn(cm.description, 5)} ] \n`;
    }

    await channel_limit.map((ei, i) => {
      var ch = message.guild.channels.get(ei);
      if (ch) {
        var ni = n_limit + 1;
        limit += `${tn("[" + ni + "]", 3)}#${tn(ch.name, 5)} \n`;
        n_limit++;
      }
    });
    return message.channel.send({ embed: await compose(message) });

    function tn(a, n = 1) {
      var i = "     ".repeat(n);
      return a + i.slice(0, i.length - a.length);
    }

    async function compose(message, channel) {
      var ane = message.guild.me.user,
        name = `${message.guild.me.nickname || ane.username} | ${ane.tag}`,
        id = ane.id,
        avatar = ane.avatar,
        cnt = [
          { name: "prefix : ", value: `\`\`\`${prefix}\`\`\``, inline: true },
          {
            name: "Ping : ",
            value: `\`\`\`${new Date() - message.createdTimestamp}ms\`\`\``,
            inline: true
          },
          {
            name:
              "__command                                                                                                 .__",
            value: "```css\n" + cmn + "```"
          },
          {
            name:
              "__.                                                                                                                   .__",
            value: "we do limit the command channels usage!!",
            inline: false
          },
          {
            name: "limit channels :",
            value: "```css\n" + limit + "```",
            inline: false
          }
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
        thumbnail: {
          url: ` https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`
        },
        description: `I'm just a **radio-stream Selfbot**,\n programmed and owned by \`${
          client.users.get(owner.id).tag
        }\``,
        fields: cnt,
        timestamp: new Date()
      };
      return exampleEmbed;
    }
  }
};
