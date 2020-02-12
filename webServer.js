module.exports={
  name : "webserver",
  exec(client){
    // server.js
    // where your node app starts

    // init project
    const express = require("express");
    const app = express();
    const request = require("request");
    const os = require("os"),
          osu = require("os-utils");;
    const project_info = require("./package.json");
    const self_info = require("./server_setting.json");

    // we've started you off with Express,
    // but feel free to use whatever libs or frameworks you'd like through `package.json`.

    // http://expressjs.com/en/starter/static-files.html
    app.use(express.static("public"));

    // http://expressjs.com/en/starter/basic-routing.html
    app.get("/", function(request, response) {
      response.sendFile(__dirname + "/views/card.html");
    });


    //status
    app.get("/status", function(request, response) {
      var ussage = process.memoryUsage();
      osu.cpuUsage(function(v){
          // console.log( 'CPU Usage (%): ' + v );
         var cpuUsage = v;
        
        var nd = {
        "totMem":os.totalmem(),
        "freeMem": os.freemem(),
        "uptime": os.uptime(),
        "platform": os.platform(),
        "cpu": os.cpus(),
        "cpuUsage": cpuUsage,
        "container": ussage
      }
      response.send(nd);
      });
      
    });

    //profile
    app.get("/profile", function(request, response) {
      var ane = client.users.get(self_info.self_id),
          name = ane.username,
          id = ane.id,
          avatar = `https://cdn.discordapp.com/avatars/${id}/${ane.avatar}.png`;
      
      var owner = client.users.get(self_info.owner.id),
          o_name = owner.tag,
          o_id = owner.id,
          o_avatar = `https://cdn.discordapp.com/avatars/${o_id}/${owner.avatar}.png`;
      response.send({name:name,id:id,avatar:avatar,prefix:self_info.prefix,project:project_info.name,version:project_info.version,description:project_info.description,owner:{name:o_name,id:o_id,avatar:o_avatar}});
    })

    // listen for requests :)
    const listener = app.listen(process.env.PORT, function() {
      console.log("Your app is listening on port " + listener.address().port);
    });


    setInterval(() => {
      request(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);



  }
}
  

