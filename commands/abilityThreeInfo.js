const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abilitythreeinfo')
		.setDescription('Gets ability three description.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator + interaction.channelId;
		if (!characterModule.AllCharacters.hasOwnProperty(userId)){
			await interaction.reply("You must create a character in this channel first to run this command.");
		}
        let description = characterModule.AllCharacters[userId].class.abilityThreeInfo();
		await interaction.reply(description);
	},
};