module.exports = {
  name: "mati",
  description: "spam message!",
  aliases: ["dead"],
  NsfwStatus: false,
  hidden:true,
  async execute (message, args) {
    (async ()=>{
      var react_i = ["🇲","🇦","🇹","🇮"];
    for(var x=0; x<react_i.length; x++){
      await message.react(react_i[x]);
    }
      return;
    })()
    
  }
}