const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../../botconfig.json");


module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ongeldige permissions.").then(msg => msg.delete(10000));

    let warns = JSON.parse(fs.readFileSync("warnings.json", "utf8"));
        let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        if(!warns[user.id]) warns[user.id] = {
            warns: 0
        };
        
        const member = message.guild.member(user);
        let warnlevel = warns[user.id].warns;
        
        //Discord rich embed
        let UserInfoEmbed = new Discord.RichEmbed()
        .setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
            UserInfoEmbed.setColor(botconfig["bot_setup"].main_embed_color)
            UserInfoEmbed.setAuthor(`${user.username}\'s Speler Informatie`, user.avatarURL)
            UserInfoEmbed.addField("Naam:", `${user.toString()}`, true)
            UserInfoEmbed.addField(`Discord Naam:`, `${user.username}#${user.discriminator}`, true)
            UserInfoEmbed.addField("Gebruikersnaam:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)

            UserInfoEmbed.addField("Account gemaakt op", `${user.createdAt.toLocaleString()}`, true)
            UserInfoEmbed.addField("Server gejoined op:", `${member.joinedAt.toLocaleString()}`, true)
            UserInfoEmbed.addField("ID:", `${user.id}`, true)

            UserInfoEmbed.addField("Status:", `${user.presence.status}`, true)
            UserInfoEmbed.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
            UserInfoEmbed.addField("Discord Role:", member.highestRole, true)

            UserInfoEmbed.addBlankField(false)

            UserInfoEmbed.addField("Waarschuwing Count:", `${warnlevel}`, true)

            if(message.author.avatarURL) {
                UserInfoEmbed.setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL}`)
            } else {
                UserInfoEmbed.setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
            }
}

module.exports.help = {
    name: "userinfo"
}