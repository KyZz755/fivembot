const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const client = new Discord.Client();

bot.commands = new Discord.Collection();

// status 
			 let statuses = [
        "🛒NL/EN FiveM Shop",

    ]
    setInterval(function(){
            let status = statuses[Math.floor(Math.random() * statuses.length)];
            bot.user.setActivity(status, {type:"WATCHING"})

        }, 5000) //Seconds

  
        ;


// Bot startup
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Could not folder commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        if(botconfig["bot_setup"].debug_mode) {
            console.log(`${f} loaded!`);
        }
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
    });
});

if(botconfig["module_toggles"].ticket_system) {
    fs.readdir("./commands/ticket_system/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Could not folder ticket_system.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/ticket_system/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} loaded!`);
            }
            bot.commands.set(props.help.name, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Ticket Module Loaded!")
    });
}

if(botconfig["module_toggles"].utility_commands) {
    fs.readdir("./commands/utility_module/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Could not folder utility_module.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/utility_module/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} loaded!`);
            }
            bot.commands.set(props.help.name, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Utility Module Loaded!")
    });
}

if(botconfig["module_toggles"].moderation_commands) {
    fs.readdir("./commands/moderation_module/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Could not folder moderation_module.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/moderation_module/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} loaded!`);
            }
            bot.commands.set(props.help.name, props);
            bot.commands.set(props.help.name2, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Moderation Module Loaded!")
    });
}

if(botconfig["module_toggles"].fun_commands) {
    fs.readdir("./commands/fun_module/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Could not folder fun_module.");
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/fun_module/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} loaded!`);
            }
            bot.commands.set(props.help.name, props);
            bot.commands.set(props.help.name2, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Fun Module Loaded!")
    });
}

bot.on('error', console.error);
bot.on("ready", async () => {
    console.log('\x1b[32m%s\x1b[0m', `Meto is online and set up! I'm on ${bot.guilds.size} servers.`);
    bot.user.setActivity(botconfig["bot_setup"].bot_game, {type: botconfig["bot_setup"].bot_game_type});
    bot.user.setStatus(botconfig["bot_setup"].bot_status)

    console.log(`Performance & Statistics Check Made. Status: Complete`)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig["bot_setup"].prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

    // Bot Command Logs
    if(botconfig["module_toggles"].mod_logs) {
        const cmdChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].command_logs_channel);
        if(!cmdChannel) return console.log("Channel not found (Config: 'commands_logs_channel')");
        const logEmbed = new Discord.RichEmbed()
        .setAuthor("Command Logs")
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setDescription(`**${message.author} (${message.author.tag})** used command: \n\`\`\`css\n${cmd} ${args}\`\`\``.split(',').join(' '))
        .setTimestamp()
        Channel.send(logEmbed)
    }
	if (message.content === '*join') {
		client.emit('guildMemberAdd', message.member);
	}
});


// Welcome message
bot.on('guildMemberAdd', member => {
    if(botconfig["module_toggles"].join_role) {
        var role = member.guild.roles.find(role => role.id === botconfig["join_roles"].role);
        if (!role) return console.log("role not found (Config: 'role')");
        member.addRole(role);
    }
    if(botconfig["module_toggles"].welcome_leave_channel) {
        const channel = member.guild.channels.find(channel => channel.id === botconfig["channel_setup"].welcome_channel);
        if (!channel) return console.log("join channel not found (Config: 'welcome_channel')");
        channel.send(`${member} (${member.user.tag}) **is in Meto's Discord Gejoined**`);
    }
    // Member count channel update
    if(botconfig["module_toggles"].member_count_channel) {
        member.guild.channels.find(channel => channel.id === botconfig["member_count_module"].member_count_channel).setName(`Member Count: ${member.guild.memberCount}`);
    }
});

// Leave Message
// bot.on('guildMemberRemove', member => {
    //if(botconfig["module_toggles"].welcome_leave_channel) {
     //   const channel = member.guild.channels.find(channel => channel.id === botconfig["channel_setup"].welcome_channel);
     //   if (!channel) return console.log("leave channel not found (Config: 'welcome_channel')");
     //   channel.send(`${member} (${member.user.tag}) **Left**`);
 //   }
    // Member count channel update
  //  if(botconfig["module_toggles"].member_count_channel) {
  //      member.guild.channels.find(channel => channel.id === botconfig["member_count_module"].member_count_channel).setName(`Member Count: ${member.guild.memberCount}`);
  //  }
//});

// Message Delete Logger
bot.on("messageDelete", message => {
    if(botconfig["module_toggles"].logs) {
        if (message.channel.type === 'dm') return;
        if (message.content.startsWith("!")) return undefined;
        if (message.content.startsWith(".")) return undefined;
        if (message.content.startsWith("?")) return undefined;
        if (message.content.startsWith("-")) return undefined;
        if (message.author.bot) return undefined;
        if (message.content.length > 1020) return undefined;

        let logEmbed = new Discord.RichEmbed()
        .setAuthor("Action Logs", bot.user.avatar_url)
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setTimestamp()
        .setFooter(`${botconfig["bot_setup"].copyright} | Gemaakt door Meto`)

        .setDescription("**Action:** Message Delete")
        .addField("Message Author:", `${message.author.toString()} - Hash: ${message.author.tag} - ID: ${message.author.id}`)
        .addField("Channel:", message.channel)
        .addField("Message Content:", `${message.content}.`)

        let logChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].logger_delete_edit);
        if (!logChannel) return console.log("leave channel not found (Config: 'logger_delete_edit')");
        logChannel.send(logEmbed);
    }
});

// Message Edit Logger
 bot.on("messageUpdate", (oldMessage, newMessage) => {
    if(botconfig["module_toggles"].logs) {
        if (oldMessage.author.bot) return undefined;
        if (oldMessage.content.length > 1020) return undefined;
        if (newMessage.content.length > 1020) return undefined;
        if (!oldMessage.guild) return undefined;

        let logEmbed = new Discord.RichEmbed()
        .setAuthor("Action Logs", bot.user.avatar_url)
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setTimestamp()
        .setFooter(`${botconfig["bot_setup"].copyright} | Gemaakt door Meto`)

        .setDescription("**Action:** Message Edited")
        .addField("Old Content", `${oldMessage.content}.`)
        .addField("New Content", `${newMessage.content}.`)
        .addField("Message Author:", `${newMessage.author.toString()} - Hash: ${newMessage.author.tag} - ID: ${newMessage.author.id}`)
        .addField("Channel", oldMessage.channel)

        let logChannel = newMessage.guild.channels.find(channel => channel.id === botconfig["channel_setup"].logger_delete_edit);
        if (!logChannel) return console.log("leave channel not found (Config: 'logger_delete_edit')");
        logChannel.send(logEmbed);
    }
});

// Member Update Logger
bot.on("guildMemberUpdate", async (oldMember, newMember) => {
    setTimeout(async () => {
        var Change = {
            rolesGiven: {
                update: false,
                updateArray: ""
            },
            rolesRemoved: {
                update: false,
                updateArray: ""
            },
            nickname: {
                update: false,
                updateArray: []
            }
        };

        const entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_UPDATE' }).then(audit => audit.entries.first())

        oldMember.roles.forEach(function(rInfo) {
            if (newMember.roles.find(roles => roles.id == rInfo.id) == null)
            {
                Change.rolesRemoved.updateArray = rInfo.id;
                Change.rolesRemoved.update = true;
            }
        });

        newMember.roles.forEach(function(rInfo) {
            if (oldMember.roles.find(roles => roles.id == rInfo.id) == null)
            {
                Change.rolesGiven.updateArray = rInfo.id;
                Change.rolesGiven.update = true;
            }
        });

        // Check If Member Has Been Given A New Nickname
        if (oldMember.nickname !== newMember.nickname) {
            Change.nickname.updateArray.push({newNickname: newMember.nickname != null ? newMember.nickname : newMember.guild.members.get(newMember.id).user.username, oldNickname: oldMember.nickname != null ? oldMember.nickname : oldMember.guild.members.get(oldMember.id).user.username});
            Change.nickname.update = true;
        }

        if (Change.nickname.update) {
            let cName = Change.nickname.updateArray[0];
            let oldName = cName.oldNickname;
            let newName = cName.newNickname;
            let member = newMember.guild.members.get(entry.target.id);

            let logEmbed = new Discord.RichEmbed()
            .setAuthor("Action Logs", bot.user.avatarURL)
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Gemaakt door Meto`)

            logEmbed.setDescription("**Action:** Nickname Changed")
            if (entry.executor.id == newMember.id) {
                logEmbed.addField(`Changed By`, `${entry.executor} ( By Himself/Herself )`, true);
            } else {
                logEmbed.addField(`Changed By`, `${entry.executor}`, true);
            }
            logEmbed.addField("Target User", `${member} - ${member.user.tag}`, true)
            logEmbed.addField("Old Nickname", oldName)
            logEmbed.addField("New Nickname", newName)

            let logChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
            if(!logChannel) return console.log("Channel not found (Config: 'general_logs_channel')");
            logChannel.send(logEmbed);
        }

        if (Change.rolesGiven.update) {
            let addedRole = Change.rolesGiven.updateArray;

            let logEmbed = new Discord.RichEmbed()
            .setAuthor("Action Logs", bot.user.avatarURL)
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Gemaakt door Meto`)

            logEmbed.setDescription("**Action:** Roles Added")
            logEmbed.addField("Target User", `${newMember} - ${newMember.user.tag}`, true)
            logEmbed.addField("Role Added", `<@&${addedRole}>`)

            let logChannel = oldMember.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
            if(!logChannel) return console.log("Channel not found (Config: 'general_logs_channel')");
            logChannel.send(logEmbed);
        }

        if (Change.rolesRemoved.update) {
            let removedRole = Change.rolesRemoved.updateArray

            let logEmbed = new Discord.RichEmbed()
            .setAuthor("Action Logs", bot.user.avatarURL)
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Gemaakt door Meto`)

            logEmbed.setDescription("**Action:** Roles Removed")
            logEmbed.addField("Target User", `${newMember} - ${newMember.user.tag}`, true)
            logEmbed.addField("Role Removed", `<@&${removedRole}>`)

            let logChannel = oldMember.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
            if(!logChannel) return console.log("Channel not found (Config: 'general_logs_channel')");
            logChannel.send(logEmbed);
        }
    }, 200);
});

bot.login(process.env.token);
