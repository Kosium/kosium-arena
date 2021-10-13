const { SlashCommandBuilder } = require('@discordjs/builders');
const attackModule = require('../helpers/attackUser');
const challenges = require('../models/challenges');
const characterModule = require('../models/character');
const buildSetup = require('../buildSetup');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('attack')
		.setDescription('Replies with attack status.')
        .addUserOption((option) => option.setName('user').setDescription('The user to attack').setRequired(true)),
	async execute(interaction) {
        let userId = interaction.user.username + '#' + interaction.user.discriminator + interaction.channelId;
        let otherUserData = interaction.options.get('user').user;
        let otherUserId = otherUserData.username + '#' + otherUserData.discriminator + interaction.channelId;
        // console.log('usercalled: ', userId, ' userattacked: ', otherUserId);

        if (!challenges.usersAreFighting(userId, otherUserId)){
            await interaction.reply('Both users must challenge each other first to fight!');
            return;
        }

        if (buildSetup.buildStatus != buildSetup.buildOptions.DEV && !characterModule.AllCharacters[userId].myTurn){
            await interaction.reply("Not my turn!");
            return;
        }

        let attackResponse = attackModule.attackUser(userId, interaction.user.toString(), otherUserId, otherUserData.toString());
		await interaction.reply(attackResponse);
        if (challenges.usersAreFighting(userId, otherUserId)){
            challenges.doneWithTurn(userId);
        }
	},
};