const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();

    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
        moveTicket(c)
        let roleSupportRole = message.guild.roles.find(role => role.id === botconfig["ticket_system"].support_role);
        let roleEveryone = message.guild.roles.find(role => role.name === "@everyone");
        c.overwritePermissions(roleSupportRole, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(roleEveryone, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.setTopic(`Ticket ID: ${message.author.id} | Gemaakt door: ${message.author.username} | Ticket Status is momenteel: 🟢 In Behandeling.`)
        message.channel.send(`:white_check_mark: ***<@${message.author.id}> ticket has been created, <#${c.id}>.***`).then(msg => msg.delete(2500));
        const embed = new Discord.RichEmbed()
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setDescription(`**Dear <@${message.author.id}>!**\n\nThank you for reaching out to our support team!, \n\n We will get back to you as soon as possible. \nTo close this ticket use \`-close\`.`)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | `)
            .setThumbnail("https://logodix.com/logo/1609865.png")

        c.send(embed)

        if(botconfig["ticket_system"].auto_reply) {
            if(!message.client.channels.find(channel => channel.name === c.id)) return
            const filter = m => m.author.id === message.author.id;
            c.awaitMessages(filter, { max: 1, time: ms('1d') }).then(idfk => {
                c.send(botconfig["ticket_system"].auto_reply_message)
            })
        }
    }).catch(console.error);
    async function moveTicket(c) {
        await c.setParent(botconfig["channel_setup"].ticket_category);
    };
}

module.exports.help = {
    name: "new"
}