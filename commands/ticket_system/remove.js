// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Je zit niet in een ticketkanaal.`).then(msg => msg.delete(5000));
    let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(aUser.roles.find(r => r.id === botconfig["ticket_system"].support_role)) return message.channel.send(`Je hebt niet de juiste permissions.`).then(msg => msg.delete(5000));
    message.channel.overwritePermissions(aUser, {
        SEND_MESSAGES: false,
        READ_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
    });

    const embed = new Discord.RichEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setDescription(`**${aUser} (${aUser.user.tag})** Verwijdert van deze ticket.`)

    message.channel.send(embed)
}

module.exports.help = {
    name: "remove"
}