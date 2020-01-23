module.exports = {
  name: "raidroles",
  description: "raid all roles in guild!",
  aliases: ["raidrole"],
  NsfwStatus: false,
  execute(message, args, client) {
    var roles = message.guild.roles.array();
    // console.log(roles);
    roles.map((e)=>{
      console.log(e.name)
    })
    
    
    // return;
    
    
    // var mm = "~~test~~ Tis! \n :rofl: ";
    message.channel.send("ok");
  }
};