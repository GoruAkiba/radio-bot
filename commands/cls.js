  module.exports = {
  name: "cls",
  description: "delete amount message!",
  aliases: ["clear","delete"],
  NsfwStatus: false,
  async execute(message, args) {
    const msg = message;
    const fetched = await msg.channel.fetchMessages({limit:args[0]});
    message.delete(0);
    
    msg.channel.bulkDelete(args[0])
      .catch(err => msg.channel.send(`Error: ${err}`));
  }
};
