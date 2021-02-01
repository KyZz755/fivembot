const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
message.delete();
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je Hebt Niet De Juiste Permissions.").then(msg => msg.delete(10000));
    let botmessage = args.join(" ");
        let sayEmbed = new Discord.RichEmbed()
        .setAuthor(`Melding van ${message.author.username}`, message.author.avatarURL)
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setDescription(`${botmessage}.`)
        .setTimestamp()
        .setFooter(`${botconfig["bot_setup"].copyright} | Made by Meto`)

        try{
            message.channel.send(sayEmbed);
            return
        }catch(e){
            // console.log(e.stack);
            console.log('\x1b[33m%s\x1b[0m', "Zeg dat er een fout is ingesloten. Crash voorkomen.");
            return
        }
}

module.exports.help = {
    name: "sayem"
}