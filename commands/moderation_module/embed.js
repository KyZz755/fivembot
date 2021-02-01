const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Je hebt geen toegang tot dit commando.");
        message.delete(1);
  var splitser = " // ";

  if(args[0] == null){

    var useMessage = new Discord.RichEmbed()
        .setTitle("Gebruik")
        .setColor("#00ee00")
        .setDescription(`Maak een Vergadering door gebruik te maken van : \n *Vergadering Bericht ${splitser} Tijd ${splitser} Is het spoed ${splitser}`);

        return message.channel.send(useMessage);

  }

  args = args.join(" ").split(splitser);

  if (args[2] == "Spoed") args[2] = "#ff0800";

  var options = {
      bericht: args[0] || "Geen inhoud opgegeven",
      tijd: args[1] || "Geen tijd opgegeven",
	  kleur: args[2] || "#3700ff"

  }

  var announcer = message.author;

  var announcementEmbed = new Discord.RichEmbed()
      .setTitle(`**Vergadering**`)
      .setColor(options.kleur)
      .setAuthor(message.author.username , message.author.avatarURL)
      .setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
      .setDescription(`${options.bericht} \n\n ${options.tijd}`)
      .setFooter(`Bericht van ${announcer.username}`)
      .setTimestamp()
      .setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif");

      var announcementChannel = message.guild.channels.find(`name`, `vergaderingen`);
      if(!announcementChannel) return message.channel.send("Kan het kanaal naam niet vinden");

      announcementChannel.send(announcementEmbed);
      
}

module.exports.help = {
  name:"vergadering"
}