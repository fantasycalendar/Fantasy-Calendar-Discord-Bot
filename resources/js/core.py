// Load up the discord.js library
const Discord = require("discord.js");

// Load up the fantasy_calendar.js
const FantasyCalendarAPI = require("fantasy_calendar.js");

// This is your bot. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `bot.something`, or `bot.something`,
// this is what we're refering to. Your client.
const bot = new Discord.Client();


const calendar = new FantasyCalendarAPI.Service();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

bot.on("ready", () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
	// Example of changing the bot's playing game to something useful. `bot.user` is what the
	// docs refer to as the "botUser".
	bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

bot.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

bot.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});


bot.on("message", async message => {
	// This event will run on every single message received, from any channel or DM.
	
	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that "botception").
	if(message.author.bot) return;
	
	// Also good practice to ignore any message that does not start with our prefix, 
	// which is set in the configuration file.
	if(message.content.indexOf(config.prefix) !== 0) return;
	
	// Here we separate our "command" name, and our "arguments" for the command. 
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command !== "fc") return;


	if(args[0] === "ping") {
		const m = await message.channel.send("Ping?");
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
	}

	
	if(args[0] === "calendar") {
		if(args[1] === undefined){
			message.channel.say(`The current calendar is: ${new_calendar.name}`);
		}else{
			const new_calendar = await calendar.set_calendar_hash(message.guild.id, args[1]);
			if(new_calendar === undefined){
				message.channel.say(`There is no calendar with that id!`);
			}else{
				message.channel.say(`Switched calendar, the new calendar is: ${new_calendar.name}`);
			}
		}
	}

	
	if(args[0] === "date") {
		const date = await calendar.request_date(message.guild.id);
		message.channel.say(`The current date is: ${date}`);
	}

	
	if(args[0] === "set" || args[0] === "add") {

		if(args[1] === undefined || !["year", "month", "day", "hour", "minute"].includes(args[1])){
			message.reply(`Sorry, that's not a number. instead try "!${command} ${args[0]} [year/month/day/hour/minute] [number]"`);
		}

		if(args[2] === undefined || isNaN(Number(args[2]))){
			message.reply(`Sorry, that's not a number - instead try "!${command} ${args[0]} ${args[1]} [number]"`);
		}

		if(args[0] === "add"){
			const date = await calendar.add_date(message.guild.id, args[1], args[2]);
		}else{
			const date = await calendar.set_date(message.guild.id, args[1], args[2]);
		}

		message.channel.say(`The new date is: ${date}`);

	}
	
});

bot.login(config.token);
calendar.login(config.fc_api)
