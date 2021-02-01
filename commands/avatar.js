const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let msg = await message.channel.send("Avatar aan het laden...");

    let mentionedUser = message.mentions.users.first() || message.author;

        let embed = new Discord.RichEmbed()

        .setImage(mentionedUser.displayAvatarURL)
        .setColor("00ff00")
        .setTitle("Avatar")
        .setFooter("Opgezocht door " + message.author.tag)
        .setDescription("[Avatar URL link]("+mentionedUser.displayAvatarURL+")")
        .setTimestamp();

        message.channel.send(embed)


    msg.delete();
}

module.exports.help = {
    name: "avatar"
}