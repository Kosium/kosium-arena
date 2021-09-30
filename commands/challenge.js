const { SlashCommandBuilder } = require('@discordjs/builders');
const challengeModule = require('../models/challenges');
const charModule = require('../models/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('challenge')
		.setDescription('Replies with challenge status.')
        .addUserOption((option) => option.setName('userchallenged').setDescription('The user to challenge').setRequired(true)),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;
        let otherUserData = interaction.options.get('userchallenged').user;
        let otherUserId = otherUserData.username + '#' + otherUserData.discriminator;
        // console.log('usercalled: ', userId, ' USERCHALLENGED: ', otherUserId);

        if (!charModule.characterExists(userId)){
            await interaction.reply('You need a character to challenge another user! Use command /randomCharacter to generate your character.');
            return;
        }

        let response = challengeModule.challengeOpponent(userId, otherUserId);
		await interaction.reply(response);
	},
};