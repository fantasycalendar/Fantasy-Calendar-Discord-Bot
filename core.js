const Discord = require("discord.js");

const bot = new Discord.Client();

bot.on("ready", () => {
	console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
	bot.user.setActivity(`Serving ${bot.guilds.size} server${bot.guilds.size > 1 ? "s" : ""}`);
});

bot.on("guildCreate", guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	bot.user.setActivity(`Serving ${bot.guilds.size} server${bot.guilds.size > 1 ? "s" : ""}`);
});

bot.on("guildDelete", guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	bot.user.setActivity(`Serving ${bot.guilds.size} server${bot.guilds.size > 1 ? "s" : ""}`);
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

	if(args[0] === undefined || args[0] === "help") {
		var new_message = [];
		new_message.push(`Hi there ${message.author.username}! Here are the available commands:`);
		new_message.push("`!fc ping` - Checks your discord server's ping to the bot.")
		new_message.push("`!fc connect [token]` - **Requires Timekeeper subscription** - Connect the bot to your calendars.\n")
		new_message.push("Once the bot is connected to your Fantasy Calendar account, you can use these commands:")
		new_message.push("`!fc calendars` - List all of your calendars and their IDs.")
		new_message.push("`!fc default [calendar id]` - Set the current default calendar.")
		new_message.push("`!fc calendar` - Show the name and link to the current default calendar.")
		new_message.push("`!fc date [optional: calendar id]` - Shows the date on the current default calendar, or if you provide the calendar's ID, show that one's date.")
		new_message.push("`!fc [add/set] [year/month/day/hour/minute] [number] [optional: calendar id]` - Adds or sets the date on the default calendar, or on another calendar if you provide that calendar's ID.")
		message.channel.send(new_message.join('\n'));
	}
	
	if(args[0] === "connect"){
		if(args[1] === undefined){
			message.channel.send("You need to enter the token that you generated through your Fantasy Calendar account.")
			return;
		}
		var response = await authorize(message.guild.id, args[1]);
		message.channel.send(response);
	}

	if(args[0] === "calendars"){
		var response = await get_all_calendars(message.guild.id);
		message.channel.send(response);
	}

	if(args[0] === "default"){
		if(args[1] === undefined){
			message.channel.send("You need to enter the ID of your calendar! Try `!fc calendars` to see the your calendars' IDs.")
			return;
		}
		var response = await set_calendar(message.guild.id, args[1]);
		message.channel.send(response);
	}

	if(args[0] === "calendar"){
		var response = await get_calendar(message.guild.id);
		message.channel.send(response);
	}

	if(args[0] === "date"){
		var response = await get_calendar_date(message.guild.id, args[1]);
		message.channel.send(response);
	}

	if(args[0] === "add" || args[0] === "set"){

		if(!['year', 'month', 'day', 'hour', 'minute'].includes(args[1])){
			message.channel.send("Unrecognized type! Try one of the following: `!fc [add/set] [year/month/day/hour/minute] [number] [optional: calendar id]`")
			return;
		}

		if(isNaN(Number(args[2]))){
			message.channel.send("That's not a number! Try the following: `!fc [add/set] [year/month/day/hour/minute] [number] [optional: calendar id]`")
			return;
		}

		if(args[0] === "add"){
			var response = await add_date(message.guild.id, args[1], args[2], args[3]);
		}else if(args[0] === "set"){
			var response = await add_date(message.guild.id, args[1], args[2], args[3]);
		}

		message.channel.send(response);

	}
	
});

bot.login(process.env.BOT_TOKEN);




function authorize(guild_id, token){
	return new Promise(resolve => {
		
		resolve("If token is valid, add the guild_id to table for user, and return username to show in discord chat");

	});
}

function get_all_calendars(guild_id){
	return new Promise(resolve => {
		
		resolve("If guild_id is found in table, return that users calendars as an array of objects, with names and hashes");

	});
}

function set_calendar(guild_id, hash){
	return new Promise(resolve => {
		
		resolve("If guild_id is found in table and hash is a calendar owned by the guild_id table's row, set the hash to be used when get_calendar is called");

	});
}

function get_calendar(guild_id){
	return new Promise(resolve => {
		
		resolve("If guild_id is found in table and it has a default calendar, return that calendar's name, and hash");

	});
}

function get_calendar_date(guild_id, hash){
	return new Promise(resolve => {
		
		resolve("If guild_id is found in table and it has a default calendar or if the hash is provided, return that calendar's name, and formatted date");

	});
}

function set_date(guild_id, type, number){
	return new Promise(resolve => {
		
		resolve("If guild_id is found in table and it has a default calendar, set that calendar's date");

	});
}

function add_date(guild_id, type, number){
	return new Promise(resolve => {
		
		resolve("If guild_id is found in table and it has a default calendar, set that calendar's date");

	});
}

