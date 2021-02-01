// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Je Hebt Niet De Juiste Permissions.").then(msg => msg.delete(10000));
    const mod = message.author;

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Couldn't find user.").then(msg => msg.delete(10000));
    if(user.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't touch them.").then(msg => msg.delete(5000));

    let time = message.content.split(" ").slice(2).join(" ");
    if (!time) {
        time = "2m";
    }

    if(botconfig["module_toggles"].mod_logs) {
        const muteEmbed = new Discord.RichEmbed()
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setDescription('Lid gemuted')
            .addField('Lid', `${user} - Hash: ${user.user.tag} - ID: ${user.id}`)
            .addField("Gemuted door", `${mod} - Hash: ${mod.tag} - ID: ${mod.id}`)
            .addField('Tijdstip', `${time}`)
            .setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif");

        let muteChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].mute_logs_channel);
        if (!muteChannel) return console.log("Channel not found (Config: 'mute_logs_channel')");
        muteChannel.send(muteEmbed);
    }
  

    let muteRole = message.guild.roles.find(role => role.name === botconfig["moderation_module"].mute_role);
    if (!muteRole) return console.log("Heb het rol niet gevonden. (Config: 'mute_role')");

    await(user.addRole(muteRole.id));
    message.channel.send(`<@${user.id}> is gemuted voor ${time}`).then(msg => msg.delete(200000));

    setTimeout(function(){
        user.removeRole(muteRole.id)
        message.reply(`<@${user.id}> is unmuted.`).then(msg => msg.delete(200000));
    }, ms(time))

    await (user.addRole(muteRole.id));

    if(botconfig["moderation_module"].DM_muted_user) {
        try{
            await user.send(`**Melding** \n Dit is een melding om te zeggen dat je bent gedempt '${message.guild.name}' \nTime: ${time}`);
        }catch(e){
            // console.log(e.stack);
            console.log('\x1b[33m%s\x1b[0m', "Ik heb geprobeerd een nieuwe gebruiker te DM, maar hun DM's zijn vergrendeld.");
        }
    }
}

module.exports.help = {
    name: "mute"
}