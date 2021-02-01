const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("SEND_MESSAGES")) return message.reply("Sorry maat, dat kun je niet doen.");
   
 let person = message.mentions.members.first();
  if(!rMember) return message.reply("Kan die gebruiker niet vinden.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specificeer een rol!");
  let gRole = message.guild.roles.find(`name`, `role`);
  if(!gRole) return message.reply("Kon die rol niet vinden.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(person.roles.add(muteRole.id));

  try{
    await rMember.send(`Gefeliciteerd, je hebt de rol gekregen ${gRole.name}`)
  }catch(e){
    console.log(e.stack);
    message.channel.send(`Gefeliciteerd <@${rMember.id}>, je hebt de rol gekregen ${gRole.name}. We hebben geprobeerd ze te DMmen, maar hun DM's zijn vergrendeld.`)
  }
}

module.exports.help = {
  name: "addrole"
}