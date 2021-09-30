const { SlashCommandBuilder } = require('@discordjs/builders');
const charModule = require('../models/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomcharacter')
		.setDescription('Replies with Random Char!'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;
        let char = new charModule.createNewCharacter(userId);
		await interaction.reply(JSON.stringify(char));
	},
};