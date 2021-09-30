const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moveleft')
		.setDescription('Moves character left.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;
        let xPos = characterModule.AllCharacters[userId].moveLeft(1);
		await interaction.reply(userId + ' is at xPos: ' + xPos);
	},
};