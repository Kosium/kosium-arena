const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abilityoneinfo')
		.setDescription('Gets ability one description.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator + interaction.channelId;
        let description = characterModule.AllCharacters[userId].class.abilityOneInfo();
		await interaction.reply(description);
	},
};