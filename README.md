a SIMPLE DISCORD RADIO BOT
===========================

This bot builds in scratch and native using `Discord.js`,`ytld-core`,`ffmpeg-binaries`, and `node-opus`. with simple modification this bot will avail to run on `node 8.x` or latest version engine.


init, edit and deploy
---------------------

On the front-end [*ongoing Project*],
- edit `public/client.js`, `public/style.css` and `views/index.html`
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)
- before deploy your app, you must edit and fulfill `server_setting.json` and `channel_limit.json`

  **server_setting.json**
  ```json
  {
    "token":"BOT_Token",       // token | get from discord dev portall 
    "self_id":"Self_ID",       // simple, get from ur bot self_id
    "prefix":"; ",             // ur bot prefix
    "owner":{
      "id":"Owner_ID"          // ur ID
    }
  }
  ```
  
  
  
  **channel_limit.json**
  ```json
  {                           // do limit the command channels usage
    "channel_limit":[
      "Channel_1_ID",
      "Channel_2_ID"
    ]
  }
  ```


Made by love
------------

\ ゜o゜)ノ
