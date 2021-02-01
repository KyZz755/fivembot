// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!args[0]) return message.channel.send("Geef een kanaal naam op. Doe \`-\` rename (naam).");
    let channelRename = args.join('-')

    if (message.channel.name.startsWith(`ticket-`)) {
        if(channelRename.startsWith(`-`)) {
            message.channel.setName(`${message.channel.name}${channelRename}`)
            message.channel.send(`<@${message.author.id}> De naam van het kanaal is gewijzigd naar: *${message.channel.name}${channelRename}*`)
        } else {
            message.channel.setName(`ticket-${channelRename}`)
            message.channel.send(`<@${message.author.id}> De naam van het kanaal is gewijzigd in: *ticket-${channelRename}*`)
        }
    } else {
        return message.channel.send(`Je zit niet in een ticketkanaal.`).then(msg => msg.delete(5000));
    }
}

module.exports.help = {
    name: "rename"
}