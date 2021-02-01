const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let question = args.slice(0).join(" ");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
    if (args.length === 0)
    return message.reply('**Ongeldige Poll:** `-Poll <bericht>`')

    const embed = new Discord.RichEmbed()
    .setTitle("Er Is Een Poll Gestart!")
    .setThumbnail("")
    .setColor("#F0FF00")
    .setDescription(`${question}`)
    .setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
    .setFooter(`Poll Gestart Door: ${message.author.username}`, `${message.author.avatarURL}`)
  
    message.channel.send({embed}).then( (message) => {
        message.react('1️⃣')
        .then(() => message.react('2️⃣'))
		.then(() => message.react('3️⃣'))
    });

}

module.exports.help = {
    name: "poll"
}