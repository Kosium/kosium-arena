const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');
const buildSetup = require('../buildSetup');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moveup')
		.setDescription('Moves character up.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;
        if (buildSetup.buildStatus == buildSetup.buildOptions.PROD && !characterModule.AllCharacters[userId].myTurn){
            return "Not my turn!";
        }
        let xPos = characterModule.AllCharacters[userId].moveUp(1);
		await interaction.reply(interaction.user.toString() + ' is at xPos: ' + xPos);
	},
};