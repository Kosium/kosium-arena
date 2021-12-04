const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, guildId } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const makeWhitelist = require('./helpers/makeWhitelist');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	console.log('Ready!');
	const guild = await client.guilds.fetch(guildId);
	var allMembers = await guild.members.list({limit: 1000});
	let lowestId = 0;
	for (let i = 0; i < 5; ++i){
		let collection_i = await guild.members.list({limit: 920, after: lowestId});
		lowestId = collection_i.last().id;
		allMembers = allMembers.concat(collection_i);
	}
	await makeWhitelist(allMembers, client);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);