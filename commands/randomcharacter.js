const { SlashCommandBuilder } = require('@discordjs/builders');
const charModule = require('../models/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomcharacter')
		.setDescription('Replies with Random Char!'),
	async execute(interaction) {
        let char = new charModule.character();
		await interaction.reply(JSON.stringify(char));
	},
};