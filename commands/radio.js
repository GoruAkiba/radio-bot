  module.exports = {
  name: "radio",
  description: "play radio",
  aliases: ["ra"],
  NsfwStatus: false,
  hidden: false,
  async execute(message, args,client) {
    const {prefix,self_id}= require("../server_setting.json");
    const request = require("request"),
          fs = require("fs");
    
    if(!message.member) return message.channel.send("kirim mention join dums di server, baru request!!!");
    const { voiceChannel } = message.member;
    const ytdl = require('ytdl-core');
    const msg = message;
    // console.log("masuk")
    var server = "https://script.google.com/macros/s/AKfycbwRNLDKUWnaJWZcv0-7sY1YwBMY54rGFwy_lsCzrrI0tF6v5h4/exec";
    await request(server, async (err,res,e)=> {
      var {channel} = JSON.parse(e);
      // console.log(channel)
      if(!args[0]){
          var emb = await compose(message,channel)
          return message.channel.send({embed : emb});
        };
        if (!voiceChannel) {
          return message.reply('please join a voice channel first!');
        }

        try{
          if(message.guild.me.voiceChannel) voiceChannel.leave();
          voiceChannel.join().then( async connection => {
          // const stream = ytdl(args.join(), { filter: 'audioonly' });
          // console.log(stream);
          var stream = args[0].includes("http")? args[0]:channel[args[0]-1].uri;
          var nn = args[0].includes("http")? "something":channel[args[0]-1].name;
          client.user.setActivity("and Stream on : \n"+nn,{ url: stream,type: "WATCHING" });
          const dispatcher = connection.playStream(stream);
            dispatcher.setVolume(args[1]/100||50/100);
            message.channel.send("Now Stream on : \n**"+nn+"**");
            if(fs.existsSync("./queue.json")) {console.log("file_ada"); await fs.unlinkSync("./queue.json")};
            await fs.writeFile("./queue.json", JSON.stringify({queue:channel[args[0]-1]}), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("queue was saved!");
            })
            await fs.close;
            // process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
            dispatcher.on('end', async() => {
              if(!message.guild.me.voiceChannel)return;
              // voiceChannel.leave();
              await fs.unlinkSync("./queue.json");
              await msg.channel.send("stream end")
              
            });
              
              
          });
        }catch(err){
          console.log(err.message);
          msg.channel.send(err.message)}
    })
    
    function tn(a,n=1){
      var i = ("     ").repeat(n);
      return a + i.slice(0,i.length-a.length);
    }
    
    
    async function compose(message,channel){
      // console.log(cnt);
        
        var ane = message.guild.me.user,
            name = `${message.guild.me.nickname || ane.username} | ${ane.tag}`,
            id = ane.id,
            avatar = ane.avatar,
            na = "",
            cm = "";
      // console.log(name);
      
      await channel.map((ei,i)=>{
        var ni = i+1;
        // cnt.push({name:`[${i+1}] **${ei.name}**`,value:`command: \`${prefix}radio ${i+1}\``,inline:false})
        na += `${tn("["+ni+"]")} ${tn(ei.name,5)} \n`;
        cm += `${prefix}radio ${ni} \n`;
      })
      
        var cnt = [
          {name:tn("name : ",6), value:"```css\n"+na+"```",inline:true},
          {name: tn("command : ",5),value:"```"+cm+"```",inline:true}
        ]
        var exampleEmbed = await {
          color: 0x33aaff,
          title: "",
          url: "",
          author: {
            name: name,
            icon_url:
              ` https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
            url: ""
          },
          description: `**Channel Radio Tersedia:**\n *note: gunakan command di bawah untuk merekues!!!*`,
          fields:cnt,
          timestamp: new Date()
        };
      return exampleEmbed;
    }
  }
};
