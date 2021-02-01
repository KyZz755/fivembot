const discord = require("discord.js");
const botconfig = ("../botconfig.json");

module.exports.run = async (bot, message, args) =>{
	message.delete();
	
	const permsembed = new discord.RichEmbed()
	
	permsembed.setTitle("OEPS!")
	permsembed.setColor("#ff0000")
	permsembed.setTimestamp();

	const embed = new discord.RichEmbed()
	embed.setTitle("🌀Anticheat Uitleg")
	embed.setColor("#F0FF00")
	embed.setDescription("1. Eerst doen we de Betalingen. \n 2. Je stuurt je server IP adress, dan gaat RykZ het registreren via de console. het kan paar uur duren voordat het IP adress op je Server staat. \n 3. Je krijgt van ons files en je gaat dan stappen volgen die geschreven staat we kunnen ook je helpen als je het niet snapt. \n 4. Als je python hebt hoef je die niet te downloaden zo nee dan ga je die downloaden \n 5. En dan ga je een backup maken en dan zet je ze op je bureaublad \n  6. Je zet de windows.bat en replace.py in die packup en dan start je de windows.bat en dan geef je een korte naam minstens 4 letters. en dan schrijf je Y in die console en dan gaat hij alles triggeren. \n 7. Dan ga je vervolgens alles is je server zetten ook de files die je meegekregen hebt. (Als we aangeven mag je de anticheat gaan starten. (IP) )") 
	embed.setThumbnail("https://media.discordapp.net/attachments/745305366157328514/774592961450606622/fivem-png-2.png")
	embed.setTimestamp();

message.channel.send(embed)
}
	

module.exports.help = {
	name: "anti"
}