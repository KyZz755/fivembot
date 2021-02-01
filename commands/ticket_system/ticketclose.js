// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Je zit niet in een ticketkanaal.`).then(msg => msg.delete(5000));
        // Confirm delete - with timeout (Not command)
        message.channel.send(`Are you sure you want to close this ticket? Type **yes** if you do..`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === 'yes', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        channel.send('***Ticket is gesloten, het ticket is niet gesloten.***')
                    });
            });
}

module.exports.help = {
    name: "close"
}