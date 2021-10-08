const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abilitytwoinfo')
		.setDescription('Gets ability two description.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;
        let description = characterModule.AllCharacters[userId].class.abilityTwoInfo();
		await interaction.reply(description);
	},
};