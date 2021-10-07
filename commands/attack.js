const { SlashCommandBuilder } = require('@discordjs/builders');
const attackModule = require('../helpers/attackUser');
const challenges = require('../models/challenges');
const buildSetup = require('../buildSetup');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('attack')
		.setDescription('Replies with attack status.')
        .addUserOption((option) => option.setName('user').setDescription('The user to attack').setRequired(true)),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator;
        let otherUserData = interaction.options.get('user').user;
        let otherUserId = otherUserData.username + '#' + otherUserData.discriminator;
        // console.log('usercalled: ', userId, ' userattacked: ', otherUserId);
        if (buildSetup.buildStatus == buildSetup.buildOptions.PROD && !characterModule.AllCharacters[userId].myTurn){
            return "Not my turn!";
        }

        if (!challenges.usersAreFighting(userId, otherUserId)){
            await interaction.reply('Both users must challenge each other first to fight!');
            return;
        }

        let attackResponse = attackModule.attackUser(userId, interaction.user.toString(), otherUserId, otherUserData.toString());
		await interaction.reply(attackResponse);
	},
};