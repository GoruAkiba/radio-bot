  module.exports = {
  name: "tes",
  description: "Ping!",
  aliases: ["p"],
  NsfwStatus: false,
  hidden:false,
  execute(client, message, args) {
    var mm = "~~test~~ Tis! \n :rofl: ";
    message.channel.send(mm);
  }
};