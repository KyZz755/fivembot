const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send("Ongeldige permissions.").then(msg => msg.delete(10000));
    if(!args[0]) return message.channel.send("Use a image. Eg; 1-5.").then(msg => msg.delete(5000));

   if(args[0] == 1){
        message.channel.send({
            files: [
              "commands/images/kinghosting.gif"
            ]
          });
    } else if (args[0] == 2){
        message.channel.send({
            files: [
              "commands/images/niets.gif"
            ]
          });
    } else if (args[0] == 3){
        message.channel.send({
            files: [
              "commands/images/niets.gif"
            ]
          });
    } else if (args[0] == 4){
        message.channel.send({
            files: [
              "commands/nsfw/niets.gif"
            ]
          });
    } else if (args[0] == 5){
        message.channel.send({
            files: [
              "commands/nsfw/niets.gif"
            ]
          });
    } else if (args[0] == 6){
        message.channel.send({
            files: [
              "commands/nsfw/niets.gif"
            ]
          });
    }  else if (args[0] == 7){
        message.channel.send({
            files: [
              "commands/nsfw/niets.gif"
            ]
          });
    }  else if (args[0] == 8){
        message.channel.send({
            files: [
              "commands/nsfw/niets.gif"
            ]
          });
    } else return

}

module.exports.help = {
    name: "img",
}