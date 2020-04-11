 
// export module
module.exports = {
  name: "tes",
  description: "Ping!",
  aliases: ["p"],
  usage: null,
  admin: false,
  hidden: false,
  NsfwStatus: false,

  execute(client, message, args) {
    var mm = "~~test~~ Tis! \n :rofl: ";
    message.channel.send(mm);
  }
};

