const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete(); 

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je hebt niet de juiste permissions");

    var splitser = "//";

    if(args[0] == null){

        var userMesagge = new discord.RichEmbed()
        .setTitle("Hoe?")
        .setColor("00ee00")
        .setDescription(`Om een update te maken moet je dit typen: \n -update Bericht`);

        return message.channel.send(userMesagge);

    }

    args = args.join(" ").split(splitser);


    var options = {

        bericht: args[0] || "Geen inhoud opgegeven",

    }

    var announcer = message.author;

    var announcementEmbed = new discord.RichEmbed()
    .setTitle("Mededeling!")
    .setColor("#F0FF00")
	.setAuthor(message.author.username , message.author.avatarURL)
	.setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
    .setFooter("Meto ", "https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
    .setTimestamp();

    var anncementChannel = message.guild.channels.find(`name`, `updates`);
    if(!anncementChannel) return message.channel.send("Kan het kanaal niet vinden");
    

    anncementChannel.send(announcementEmbed);

}

module.exports.help = {
    name: "update"
}