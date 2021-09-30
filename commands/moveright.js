const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moveright')
		.setDescription('Moves character right.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;
        let xPos = characterModule.AllCharacters[userId].moveRight(1);
		await interaction.reply(userId + ' is at xPos: ' + xPos);
	},
};