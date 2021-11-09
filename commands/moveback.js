const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');
const buildSetup = require('../buildSetup');
const challenges = require('../models/challenges');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moveback')
		.setDescription('Moves character back.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator + interaction.channelId;
        if (buildSetup.buildStatus == buildSetup.buildOptions.PROD && !characterModule.AllCharacters[userId].myTurn){
            await interaction.reply("Not my turn!");
        }
        let xPos = characterModule.AllCharacters[userId].moveBack(1);
		await interaction.reply(interaction.user.toString() + ' is at xPos: ' + xPos);
        if (challenges.userIsFighting(userId)){
            challenges.doneWithTurn(userId);
        }
	},
};