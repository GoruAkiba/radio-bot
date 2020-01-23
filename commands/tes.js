  module.exports = {
  name: "tes",
  description: "Ping!",
  aliases: ["p"],
  NsfwStatus: false,
  execute(message, args) {
    var mm = "~~test~~ Tis! \n :rofl: ";
    message.channel.send(mm);
  }
};