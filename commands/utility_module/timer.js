const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let Timer = args[0];
    if(!args[0]){
        return message.channel.send("Voer een tijd in, met een van beide `s, m or h` at the end!");
    }
    if(args[0] <= 0){
        return message.channel.send("Voer een tijd in, met een van beide `s, m or h` at the end!");
    }
    message.channel.send(":white_check_mark: Timer is ingesteld voor: " + `${ms(ms(Timer), {long: true})}`)
    setTimeout(function(){
        message.channel.send(`Timer is afgelopen, het duurde: ${ms(ms(Timer), {long: true})} ` + message.author.toString())
    }, ms(Timer));
}

module.exports.help = {
    name: "timer"
}