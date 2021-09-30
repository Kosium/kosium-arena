const { SlashCommandBuilder } = require('@discordjs/builders');
const challengeModule = require('../models/challenges');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('challenge')
		.setDescription('Replies with challenge status.')
        .addUserOption((option) => option.setName('userchallenged').setDescription('The user to challenge').setRequired(true)),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;
        let otherUserData = interaction.options.get('userchallenged').user;
        let otherUserId = otherUserData.username + '#' + otherUserData.discriminator;
        console.log('usercalled: ', userId, ' USERCHALLENGED: ', otherUserId);
        let response = challengeModule.challengeOpponent(userId, otherUserId);
		await interaction.reply(response);
	},
};