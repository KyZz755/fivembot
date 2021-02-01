const Discord = require("discord.js");
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je Hebt Niet De Juiste Permissions, Vriend!").then(msg => msg.delete(10000));
        
        //Discord rich embed
        let BotEmbed = new Discord.RichEmbed()
            BotEmbed.setColor(botconfig["bot_setup"].main_embed_color)
            BotEmbed.setAuthor("Moderation Module", "https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
	    BotEmbed.setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
            BotEmbed.addField("**Ban:**", "**-ban**", true)
	    BotEmbed.addField("**Clear:**", "**-clear**", true)
            BotEmbed.addField("**Vergadering:**", "**-vergadering**", true)

	    BotEmbed.addField("**Kick:**", "**-kick**", true)
 	    BotEmbed.addField("**Mute:**", "**-mute**",true)
	    BotEmbed.addField("**Say:**", "**-mute**", true)

	    BotEmbed.addField("**Notificatie:**", "**-sayem**", true)
	    BotEmbed.addField("**Bot Status:**", "**-setstatus**", true)
 	    BotEmbed.addField("**User Info:**", "**-userinfo**", true)

            BotEmbed.addBlankField(true)

            if(message.author.avatarURL) {
                BotEmbed.setFooter("Meto", "https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
            }
        message.channel.send(BotEmbed)
}

module.exports.help = {
    name: "moderation"
}

//message.guild.iconURL