// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Ongeldige permissions.").then(msg => msg.delete(10000));
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Invalid user.").then(msg => msg.delete(5000));
    if(wUser.hasPermission("BAN_MEMBERS")) return message.reply("Can't touch them.").then(msg => msg.delete(5000));
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    if (!reason) {
        reason = "N/A";
    }

    warns[wUser.id].warns++;

    fs.writeFile("warnings.json", JSON.stringify(warns, null, 4), (err) => {
        if (err) console.log(err)
    });

    let warnEmbed = new Discord.RichEmbed()
        .setDescription("User Warning")
        .setAuthor(message.author.username)
        .setColor("#fc6400")
        .addField("Gewaarschuwd door", `${message.author} - Hash: ${message.author.tag} - ID: ${message.author.id}`)
        .addField("Lid:", `${wUser} - Hash: ${wUser.user.tag} - ID: ${wUser.id}`)
        .addField("Gewaarschuwd in kanaal:", `${message.channel} - ID: ${message.channel.id}`)
        .addField("Reden:", reason)
        .addField("Nummer of een reden", warns[wUser.id].warns)
        .setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif");

    let warnChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].warning_logs_channel);
    if(!warnChannel) return console.log("Channel not found (Config: 'warning_logs_channel')");

    warnChannel.send(warnEmbed);

    if(warns[wUser.id].warns == 1){
        message.channel.send(`<@${wUser.id}> is zojuist gewaarschuwd voor het reden: ${reason}`);
    }

    let muteRole = message.guild.roles.find(role => role.name === botconfig["moderation_module"].mute_role);
    if (!muteRole) return console.log("Role not found (Config: 'mute_role')");

    ///////////////////////////////////////
    if(warns[wUser.id].warns == 2){
        await(wUser.addRole(muteRole.id));
        message.channel.send(`<@${wUser.id}> is gewaarschuwd voor: ${reason}. <@${wUser.id}> muted for 2 mins`);

        setTimeout(function(){
            wUser.removeRole(muteRole.id)
            message.channel.send(`<@${wUser.id}> is gemuted.`)
        }, ms('2m'))
    }

    ///////////////////////////////////////
    if(warns[wUser.id].warns == 3){
        await(wUser.addRole(muteRole.id));
        message.channel.send(`<@${wUser.id}> is gewaarschuwd voor: ${reason}. <@${wUser.id}> muted for 2 hours`);

        setTimeout(function(){
            wUser.removeRole(muteRole.id)
            message.channel.send(`<@${wUser.id}> is geunmuted.`)
        }, ms('2h'))
    }

    ///////////////////////////////////////
    if(warns[wUser.id].warns == 4){
        await(wUser.addRole(muteRole.id));
        message.channel.send(`<@${wUser.id}> is gewaarschuwd voor: ${reason}. <@${wUser.id}> muted for 4 hours`);

        setTimeout(function(){
            wUser.removeRole(muteRole.id)
            message.channel.send(`<@${wUser.id}> is gemuted.`)
        }, ms('4h'))
    }

    ///////////////////////////////////////
    if(warns[wUser.id].warns >= 5){
        await(wUser.addRole(muteRole.id));
        message.channel.send(`<@${wUser.id}> is gewaarschuwd voor: ${reason}. <@${wUser.id}> voor 1 dag. Gebruik om uw waarschuwingen te resetten \`.new\``);

        setTimeout(function(){
            wUser.removeRole(muteRole.id)
            message.channel.send(`<@${wUser.id}> is gemuted.`)
        }, ms("1d"))
    }

    if(botconfig["moderation_module"].DM_warned_user) {
        try{
            await user.send(`**Melding** \nDit is een melding om aan te geven dat je bent gewaarschuwd '${message.guild.name}' \Reden(s): ${reason}`);
        }catch(e){
            // console.log(e.stack);
            console.log('\x1b[33m%s\x1b[0m', "Ik heb geprobeerd een nieuwe gebruiker te DM, maar hun DM's zijn vergrendeld.");
        }
    }
}
module.exports.help = {
    name: "warn"
}