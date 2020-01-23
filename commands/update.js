  module.exports = {
  name: "update",
  description: "sync latest list of radio channel!",
  aliases: ["up"],
  NsfwStatus: false,
  async execute(message, args,client) {
    const request = require("request"),
          fs = require("fs");
    try{
      var server = "https://script.google.com/macros/s/AKfycbwRNLDKUWnaJWZcv0-7sY1YwBMY54rGFwy_lsCzrrI0tF6v5h4/exec",
          ww = fs.createWriteStream("./radio.json");
      await request(server,(e)=>{
        // fs.writeFile('../radio.json',e)
      }).pipe(ww);
      return message.channel.send("update successfully!")
    }catch(err){
      return message.channel.send('there is some error: '+err.message)
    }
    
  }
};
