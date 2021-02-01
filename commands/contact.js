const Discord = require("discord.js")
    const botconfig = require("../botconfig.json");

	module.exports.run = async (bot, message, args) =>{
		message.delete();
		
		let msg = await message.channel.send("Getting Information...");
		
		const permsembed = new Discord.RichEmbed()
	
	permsembed.setTitle("OEPS!")
	permsembed.setColor("#ff0000")
	permsembed.setDescription("Je Hebt Niet De Juiste Permissions Haal Iemand Anders Erbij Met De Permissies | You Don't Have The Right Permissions Get Someone Else With The Permissions")
	permsembed.setFooter("©www.Wild-Hosting.nl")
	permsembed.setTimestamp();

		//Embed
		let contact = new Discord.RichEmbed()
		
		contact.setAuthor("Contact us. / Neem contact op.", "https://media.discordapp.net/attachments/745305366157328514/774592961450606622/fivem-png-2.png")
		contact.setColor("RANDOM")
		contact.setThumbnail("https://media.discordapp.net/attachments/745305366157328514/774592961450606622/fivem-png-2.png")
		contact.addField("Telefoon Nummer Klantenservice Quinten.B:", "+31 6 22254912", true)
		contact.addField("E-Mail Support:", "support@wild-hosting.nl", true)

		contact.setFooter(botconfig["bot_setup"].copyright)
		contact.setTimestamp();
		
		contact.addBlankField(true)

		message.channel.send(contact).then(m => m.delete(30000));
		msg.delete();
	}

	module.exports.help = {
		name: "contact" 
	}