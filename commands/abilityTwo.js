const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');
const buildSetup = require('../buildSetup');
const challenges = require('../models/challenges');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abilitytwo')
		.setDescription('Uses ability two.')
        .addUserOption((option) => option.setName('user').setDescription('The user to attack if this ability attacks a user').setRequired(true)),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator + interaction.channelId;
        let otherUserData = interaction.options.get('user').user;
        let otherUserId = otherUserData.username + '#' + otherUserData.discriminator + interaction.channelId;
        if (buildSetup.buildStatus == buildSetup.buildOptions.PROD && !characterModule.AllCharacters[userId].myTurn){
            return "Not my turn!";
        }

        if (!challenges.usersAreFighting(userId, otherUserId)){
            await interaction.reply('Both users must challenge each other first to fight!');
            return;
        }
        let abilityResult = characterModule.AllCharacters[userId].class.abilityTwo(otherUserId, otherUserData.toString());
		await interaction.reply(interaction.user.toString() + ' used ' + abilityResult.result);
        if (abilityResult.success && challenges.usersAreFighting(userId, otherUserId)){
            challenges.doneWithTurn(userId);
        }
	},
};