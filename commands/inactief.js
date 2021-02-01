const discord = require("discord.js");
const botconfig = ("../botconfig.json");

module.exports.run = async (bot, message, args) =>{
	message.delete();
	
	const permsembed = new discord.RichEmbed()
	
	permsembed.setTitle("OEPS!")
	permsembed.setColor("#ff0000")
	permsembed.setTimestamp();

	const embed = new discord.RichEmbed()
	embed.setTitle("📡 Ticket Status.")
	embed.setColor("#F0FF00")
	embed.setDescription("Deze Ticket is 🟠 Inactief Wacht tot je geholpen wordt.")
	embed.setThumbnail("https://media.discordapp.net/attachments/745305366157328514/774592961450606622/fivem-png-2.png")
	embed.setTimestamp();

message.channel.send(embed)
}
	

module.exports.help = {
	name: "inactief"
}