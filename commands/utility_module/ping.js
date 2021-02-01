const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    return message.channel.send(`:hourglass_flowing_sand: Jouw ping is: **${new Date().getTime() - message.createdTimestamp}ms**`).then(msg => msg.delete(5000));
}

module.exports.help = {
    name: "ping"
}