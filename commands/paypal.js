const discord = require("discord.js");
const botconfig = ("../botconfig.json");

module.exports.run = async (bot, message, args) =>{
	message.delete();
	
	const permsembed = new discord.RichEmbed()
	
	permsembed.setTitle("OEPS!")
	permsembed.setColor("#ff0000")
	permsembed.setTimestamp();

	const embed = new discord.RichEmbed()
	embed.setTitle(":credit_card: Payment.")
	embed.setColor("#F0FF00")
	embed.setDescription("Om een betaling uit te voeren via Paypal kan je via hier betalen.. \n To make a payment via Paypal you can pay via here.:\n\nLink: https://paypal.me/oguzhandogru415?locale.x=nl_NL")
	embed.setThumbnail("https://media.discordapp.net/attachments/745305366157328514/774592961450606622/fivem-png-2.png")
	embed.setTimestamp();

message.channel.send(embed)
}
	

module.exports.help = {
	name: "payment"
}