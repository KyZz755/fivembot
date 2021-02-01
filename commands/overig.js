const Discord = require("discord.js");
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send("Je hebt hiervoor geen juiste permissions.").then(msg => msg.delete(10000));
        
        //Discord rich embed
        let BotEmbed = new Discord.RichEmbed()
            BotEmbed.setColor(botconfig["bot_setup"].main_embed_color)
            BotEmbed.setAuthor("Overig", "https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
	    BotEmbed.setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
            BotEmbed.addField("**Mededeling:**", "**-mededeling**", true)
	    BotEmbed.addField("**Credits:**", "**-botcredits**", true)
            BotEmbed.addField("**Help:**", "**-help**", true)
        BotEmbed.addField("**Report:**", "**-Member reporten**", true)
	    BotEmbed.addField("**Images:**", "**-img**", true)
 	    BotEmbed.addField("**NSFW:**", "**-nsfw**", true)
	    BotEmbed.addField("**Avatar**", "**-avatar**", true)
	.setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")

            BotEmbed.addBlankField(true)

            if(message.author.avatarURL) {
                BotEmbed.setFooter("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
            }
        message.channel.send(BotEmbed)
}

module.exports.help = {
    name: "overig"
}