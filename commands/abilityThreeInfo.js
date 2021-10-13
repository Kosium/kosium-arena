const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abilitythreeinfo')
		.setDescription('Gets ability three description.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator + interaction.channelId;
        let description = characterModule.AllCharacters[userId].class.abilityThreeInfo();
		await interaction.reply(description);
	},
};