const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');
const challengesModule = require('../models/challenges');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('characterstatus')
		.setDescription('Replies with staus of character!'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator + interaction.channelId;

        let char = characterModule.AllCharacters.hasOwnProperty(userId) ? characterModule.AllCharacters[userId] : 'You need to create a character first!';
		await interaction.reply(JSON.stringify(char, null, 2));
	},
};