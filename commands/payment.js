const discord = require("discord.js");
const botconfig = ("../botconfig.json");

module.exports.run = async (bot, message, args) =>{
	message.delete();
	
	const permsembed = new discord.RichEmbed()
	
	permsembed.setTitle("OEPS!")
	permsembed.setColor("#0004ff")
	permsembed.setTimestamp();

	const embed = new discord.RichEmbed()
	embed.setTitle(":credit_card: Payments Methdos - Betaling Methodes")
	embed.setColor("#F0FF00")
	embed.setDescription(":green_circle: Paypal \n :green_circle: Paysafecard \n :green_circle: Skrill \n :green_circle: Overschrijving (NL/BE) \n :red_circle: iDeal")
	embed.setThumbnail("https://media.discordapp.net/attachments/745305366157328514/774592961450606622/fivem-png-2.png")
	embed.setTimestamp();

message.channel.send(embed)
}
	

module.exports.help = {
	name: "pm"
}