// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    if(!kUser) return message.channel.send("Doe -kick (@user) (reden) om deze lid te kicken van het server.").then(msg => msg.delete(90000));
    let kReason = args.join(" ").slice(22);
    if(!kReason) return message.channel.send("Geef een reden op om deze lid te kicken.").then(msg => msg.delete(90000));
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Je Hebt Niet De Juiste Permissions.").then(msg => msg.delete(90000));
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Invalid Permissions.").then(msg => msg.delete(90000));

    if(botconfig["module_toggles"].mod_logs) {
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("User Kicked")
        .setColor("#fc4b4b")
        .addField("Gekicked lid", `${kUser} - Hash: ${kUser.user.tag} - ID: ${kUser.id}`)
        .addField("Gekicked bij", `<@${message.author.id}> - Hash: ${message.author.tag} - ID: ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Tijdstip", message.createdAt)
        .addField("Reden", `${kReason}.`)
        .setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif");

        let kickChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].kick_logs_channel);
        if(!kickChannel) return console.log("Channel not found (Config: 'kick_logs_channel')");
        kickChannel.send(kickEmbed);
    }
    if(botconfig["moderation_module"].DM_kicked_user) {
        try{
            await kUser.send(`**Notification** \nThis is a notification to say that you have been kicked from ${message.guild.name} for the following reason(s): \n${kReason}`);
        }catch(e){
            console.log('\x1b[33m%s\x1b[0m', "I tried to DM a new user, but their DM's are locked.");
        }
    }
    message.guild.member(kUser).kick(kReason);
    message.channel.send(`:white_check_mark: ${kUser} (${kUser.user.tag}) **has been kicked from the Discord for: ${kReason}**`)
}

module.exports.help = {
    name: "kick"
}