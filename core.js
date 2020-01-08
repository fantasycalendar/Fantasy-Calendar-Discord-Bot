
const Discord = require("discord.js");

const bot = new Discord.Client();


bot.on("ready", () => {
	console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
	bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

bot.on("guildCreate", guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

bot.on("guildDelete", guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});


bot.on("message", async message => {

	if(message.author.bot) return;
	
	if(message.content.indexOf("!") !== 0) return;
	
	const args = message.content.slice("!".length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command !== "fc") return;

	if(args[0] === "ping") {
		const m = await message.channel.send("Ping?");
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
	}
	
});

bot.login(process.env.BOT_TOKEN);