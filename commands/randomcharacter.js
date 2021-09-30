const { SlashCommandBuilder } = require('@discordjs/builders');
const charModule = require('../models/character');
const challengesModule = require('../models/challenges');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomcharacter')
		.setDescription('Replies with Random Char!'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;

		if (challengesModule.userIsInFight(userId)){
			await interaction.reply('You cannot create a new character in the middle of a fight!');
			return;
		}

        let char = new charModule.createNewCharacter(userId);
		await interaction.reply(JSON.stringify(char, null, 2));
	},
};