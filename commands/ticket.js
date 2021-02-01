// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js");
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send("Je Hebt Niet De Juiste Permissions, Vriend !").then(msg => msg.delete(10000));
        
        //Discord rich embed
        let BotEmbed = new Discord.RichEmbed()
            BotEmbed.setColor(botconfig["bot_setup"].main_embed_color)
            BotEmbed.setAuthor("Ticket Module:", "https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
	    BotEmbed.setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
            BotEmbed.addField("**Ticket Aanmaken:**", "**-new**", true)
	    BotEmbed.addField("**Voeg Een Persoon Toe:**", "**-add**", true)
            BotEmbed.addField("**Verwijder Een Persoon:**", "**-remove**", true)
	    BotEmbed.addField("**Hernoem Ticket:**", "**-rename**", true)
 	    BotEmbed.addField("**Sluit Ticket:**", "**-sluit**", true)

            BotEmbed.addBlankField(true)

            if(message.author.avatarURL) {
                BotEmbed.setFooter("Meto", "https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
            }
        message.channel.send(BotEmbed)
}

module.exports.help = {
    name: "ticket"
}

//message.guild.iconURL