const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');
const challengeModule = require('../models/challenges');
const buildSetup = require('../buildSetup');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('surrender')
		.setDescription('Surrenders.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator + interaction.channelId;
        challengeModule.endFight(userId);
		await interaction.reply(userId + ' has surrendered!');
	},
};