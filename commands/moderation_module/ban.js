// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Tijdens het commando uit te voeren gebruik de user tag erbij.").then(msg => msg.delete(50000));
        let bReason = args.join(" ").slice(22);
        if(!bReason) return message.channel.send("Doe -ban (@user) om deze lid te bannen van het discord server.").then(msg => msg.delete(50000));
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry je hebt geen toestemming om dit command te gebruiken.");
        
        
        if(botconfig["module_toggles"].mod_logs) {
            let banEmbed = new Discord.RichEmbed()
            .setDescription("Lid Gebanned.")
            .setColor("#870000")
            .addField("Banned lid", `${bUser} - Hash: ${bUser.user.tag} - ID: ${bUser.id}`)
            .addField("Gebanned bij", `<@${message.author.id}> - Hash: ${message.author.tag} - ID: ${message.author.id}`)
            .addField("Gebanned in", message.channel)
            .addField("Tijdstip", message.createdAt)
            .addField("Reden", `${bReason}.`)
            .setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif");

            let banChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].ban_logs_channel);
            if(!banChannel) return console.log("Kanaal niet gevonden (Config: 'ban_logs_channel')");
            banChannel.send(banEmbed)
        }

        if(botconfig["moderation_module"].DM_banned_user) {
            try{
                await bUser.send(`**Notification** \n Dit is een melding om te zeggen dat je bent verbannen ${message.guild.name} voor de volgende redenen(s): \n${bReason}\n*Als je denkt dat dit een vals verbod is, DM me dan (FaxBot) met wat details en een beroepsmelding (Houd het onder 1020 chars).*`);
            }catch(e){
                console.log('\x1b[33m%s\x1b[0m', "Ik heb geprobeerd een nieuwe gebruiker te DM, maar hun DM's zijn vergrendeld.");
            }
        }

        message.channel.send(`:white_check_mark: ${bUser} (${bUser.user.tag}) **is verbannen uit de Discord voor: ${bReason}**`)
        message.guild.member(bUser).ban(bReason);
}

module.exports.help = {
    name: "ban"
}