const { SlashCommandBuilder } = require('@discordjs/builders');
const characterModule = require('../models/character');
const buildSetup = require('../buildSetup');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abilityone')
		.setDescription('Uses ability one.'),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;
        if (buildSetup.buildStatus == buildSetup.buildOptions.PROD && !characterModule.AllCharacters[userId].myTurn){
            return "Not my turn!";
        }
        let abilityResult = characterModule.AllCharacters[userId].class.abilityOne();
		await interaction.reply(interaction.user.toString() + ' used ' + abilityResult);
	},
};