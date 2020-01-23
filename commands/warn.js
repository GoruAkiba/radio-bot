module.exports = {
  name: "warn",
  description: "spam message!",
  aliases: ["aing gafaham"],
  NsfwStatus: false,
  async execute (message, args) {
    try{
      args.splice(0,1)
    }catch(err){}
    var reason = args.join(" ");
    if (message.mentions.users.size) {
      const tagList = message.mentions.users.map(async user => {
        // console.log(user);
        message.channel.send({embed : await compose(user,reason)});
        
      })
    }

  async function compose(user,reason){
      // console.log(cnt);
        var title = `${user.username}#${user.discriminator} has been warned`;
        reason = reason? reason : "Bad word usage"
        var exampleEmbed = await {
                color: 0x000000,
                title: "",
                url: "",
                author: {
                  name: title,
                  icon_url:
                    ` https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
                  url: ""
                },
                description: `**Reason:** ${reason} \n ||Tapi Boong||`,
              };
      return exampleEmbed;
// user.displayAvatarURL
    }
    
  }
}