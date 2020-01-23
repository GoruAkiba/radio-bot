module.exports = {
  name: "nuklir",
  description: "ente mau tanya tentang kode Nuklir, bisa sini! ",
  aliases: ["3xpla.net", "nHentai.net", "kode nuklir", "cek kode"],
  NsfwStatus: true,
  usage: "[nuklir Code]",
  execute(message, args) {
    const request = require("request");
    const cheerio = require("cheerio");
    const Discord = require("discord.js");
    console.log(args[0]);
    var pesan = "This message generated automatically, you indicated throw a active Nuclear code to the **GSP** *#public-chat*.\n The Active Nuclear Code is "+ args.join("")+"\n Relate search result: ";
    const dm = message.author;
    if (message.mentions.users.size) {
      const tagList = message.mentions.users.map(user => {
        var sr = user.tag,
            arg = parseInt(sr.split("#")[1]);
        args = [];
        args.push(arg);
        console.log(args);
         dm.send(`Kode nuklir untuk tag discord ${user.username} ${arg}`);
      })
    }

    function rand() {
      return Math.round(Math.random() * 10);
    }
    if (!args.length) return;

    ////////////////////////////////////////////////////////////////////
    // nHentai.net if args = integer || hitomi.la if digit.legnth == 7 or pururin
    ////////////////////////////////////////////////////////////////////
    var nuclear = parseInt(args.join(" "));
    if (Number.isInteger(nuclear)) {
      var digit = nuclear;
      
      if (digit.toString().length > 6) {
        ////////////////////////////////////////////////////////////////////
        // Begin Hitomi
        ////////////////////////////////////////////////////////////////////
        console.log(digit);
        var base_h = "https://hitomi.la/galleries/" + digit + ".html";
        request(base_h, async (error, response, body) => {
          const $ = cheerio.load(body);
          var cover = $(".cover")
            .find("img")
            .attr("src");
          if (!cover) {
            return;
          }
          cover = cover.replace("//", "http://");
          var title = $(".manga-gallery")
              .find("h1")
              .text()
              .replace(/\s\s+/g, ""),
            subtitle = $(".manga-gallery")
              .find("h2")
              .text()
              .replace(/\s\s+/g, "");
          var info = $(".gallery-info").find("tr"),
            msg = "";
          msg += "**" + title + "**\n ``" + subtitle + "``\n";
          console.log(info.length);
          info.each((i, el) => {
            var info_i = $(el).find("td"),
              value =
                $(info_i.next())
                  .text()
                  .replace(/\s\s+/g, "") || "N/A";
            msg += " " + $(info_i.first()).text() + " : ";
            msg += "``" + value + "`` \n";
          });
          // await dm.send(pesan+" \n"+);
          await dm.send(pesan+" \n "+msg, { files: [cover, cover] });
        });
      } else {
        if(digit.toString().length==5){
          ////////////////////////////////////////////////////////////////////
          // Begin pururin
          ////////////////////////////////////////////////////////////////////
          var q_pur = digit;
          var base = "https://pururin.io/gallery/"+q_pur+"/*";

          var ms = "";
          request(base,async (error,response,body)=>{
            // console.log(body);
            const $ = cheerio.load(body);
            var info = $(".table-gallery-info").find("tr");
            var title = $("title").text();
            var cover = $(".cover").attr("src");
            if(!cover){return}
            ms+=`**${title}**\n`;
            // console.log(info);
            console.log(cover)
            info.each((i,el)=>{
              if(i<10){
                const itm = $(el);
                const prp = itm.find("td"),
                      nm = prp.first().text().replace(/\s\s+/g,""),
                      val_r = itm.find("li"),
                      val = [];
                val_r.each((i,el)=>{
                  const itn = $(el);
                  val.push(itn.text().replace(/\s\s+/g,"").replace(/\n+/g,""));
                })
                var val_g = val.length? "``"+val.join(", ")+"``": "``"+itm.text().replace(/\s\s+/g,"").replace(/\n+/g,"")+"``";
                ms+=`${nm} : ${val_g} \n`;
              }

            })
            // await dm.send(pesan);
            return dm.send(pesan+" \n "+ms,{ files: [cover.replace("//","http://")] });
          })
        }
        else{
            ////////////////////////////////////////////////////////////////////
            // Begin nHentai
            ////////////////////////////////////////////////////////////////////
          var baseQ = "https://nhentai.net/g/" + nuclear;
          request(baseQ, async function(error, response, body) {
            const $ = cheerio.load(body);
            var inf = "";
            var title = $("h1")
                .first()
                .text(),
              subltitle = $("h2")
                .first()
                .text(),
              cover = $("#cover")
                .find("img")
                .attr("data-src"),
              info = $("#tags").children();
            // console.log(title);
            // console.log(cover);
            info.each((i, el) => {
              const item = $(el);
              var ins = item
                .text()
                .replace(/\s\s+/g, "")
                .split(":");
              var vall = ins[1].split(")"),
                vtag = [];
              for (var y = 0; y < vall.length - 1; y++) {
                vtag.push(vall[y].split("(")[0]);
              }
              inf += "**" + ins[0] + "** : " + vtag.join(",") + "\n";
              // console.log(item.text().replace(/\s\s+/g,""));
            });
            var ms = "***" + title + "*** \n";
            ms += "``" + subltitle + "`` \n";
            ms += "" + inf + "";
            const attachment = new Discord.Attachment(cover, "cover.png");
            // await dm.send(pesan);
            return dm.send(pesan+" \n "+ms, attachment);
          });
        }
      }
    } else {
      ////////////////////////////////////////////////////////////////////////
      // 3XPla.net if args = string
      ////////////////////////////////////////////////////////////////////////
      var baseQ = "https://3xplanet.com/" + args.join(" ");
      request(baseQ, async function(error, response, body) {
        const $ = cheerio.load(body);

        // var title = $('h1').first().text(),
        //     post = $('.td-post-content').children(),
        //     cv = post.first().find('img'),
        //     cover = cv.attr('src').replace('s500','s1600'),
        //     starring = post.next().next().text(),
        //     studio = post.next().text(),
        //     desc_raw = post.next().text(),
        //     desc = "```"+desc_raw+"```";
        // console.log(cover);
        // var ms =title+"\n"+starring+"\n"+studio+"\n"+desc;
        // message.channel.send(ms);
        try {
          if (!$("h1").length)
            return;
          var title = $("h1")
              .first()
              .text(),
            post = $(".td-post-content").children(),
            ms = "",
            review = "";
          ms += `**${title}** \n`;
          post.each((i, el) => {
            const item = $(el);
            if (i > 1 && i < 4) {
              ms += item.text();
              ms += "\n";
            } else if (i == 1) {
              var ur = item.find("img").attr("src");
              review = ur.replace("s200", "s1600");
            }
          });
          ms += "review screenshoot: ```" + review + "```";
          var cv = post.first().find("img"),
            cover = cv.attr("src").replace("s500", "s1600");
          const attachment = new Discord.Attachment(cover, "cover.png");
          // await dm.send(pesan);
          return dm.send(pesan+" \n "+ms, attachment);
        } catch (err) {}
      });
    }
  }
};
