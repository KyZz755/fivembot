const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let botembed = new Discord.RichEmbed()
    .setDescription("Meto")
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setThumbnail("")
    .addField("Bot Name", `${bot.user.username}`)
    .addField("Servers", bot.guilds.size)
    .addField("Credits", `Gemaakt door Meto`)
	.setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
    .addField("Information", `Gemaakt door Meto, deze bot heeft veel dingen dat hij kan doen`);

    message.channel.send(botembed).then(msg => msg.delete(60000));
}

module.exports.help = {
    name: "botcredits",
    name2: "credits",
    name3: "Meto"
}