// REMOVING OR EDITING THIS FILE IS A BREACH OF THE LICENSE. LEAVE IT AS IS AND DON'T DISABLE IT! [START NO EDIT]
// © 2020 Deze Bot Is Gemaakt Door Jan De Smidt#0001 Deze Mag Niet Worden Doorverkocht Zonder De Toestemming Van Jan De Smidt#0001
const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!message.channel.nsfw) return message.channel.send('Deze Future Komt Miss Later!').then(msg => msg.delete(2500));;
    if(!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send("Je hebt niet de juiste permissions.").then(msg => msg.delete(10000));
    if(!args[0]) return message.channel.send("Voor Een NSFW Foto Doe *nsfw 1 t/m 8.").then(msg => msg.delete(5000));

    if(args[0] == 1){
        message.channel.send({
            files: [
              "commands/nsfw/1.gif"
            ]
          });
    } else if (args[0] == 2){
        message.channel.send({
            files: [
              "commands/nsfw/2.gif"
            ]
          });
    } else if (args[0] == 3){
        message.channel.send({
            files: [
              "commands/nsfw/3.gif"
            ]
          });
    } else if (args[0] == 4){
        message.channel.send({
            files: [
              "commands/nsfw/4.gif"
            ]
          });
    } else if (args[0] == 5){
        message.channel.send({
            files: [
              "commands/nsfw/5.gif"
            ]
          });
    } else if (args[0] == 6){
        message.channel.send({
            files: [
              "commands/nsfw/6.gif"
            ]
          });
    }  else if (args[0] == 7){
        message.channel.send({
            files: [
              "commands/nsfw/7.gif"
            ]
          });
    }  else if (args[0] == 8){
        message.channel.send({
            files: [
              "commands/nsfw/8.gif"
            ]
          });
    } else return

}

module.exports.help = {
    name: "nsfw",
}