const { SlashCommandBuilder } = require('@discordjs/builders');
const buildSetup = require('../buildSetup');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setogtrait')
		.setDescription('Sets which token id you want an OG trait on.')
        .addStringOption((option) => option.setName('tokenid').setDescription('The token id of your Pioneer.').setRequired(true)),
	async execute(interaction) {
        if (interaction.channelId == '917186150957977630' || interaction.channelId == 917186150957977630){
            let userId = interaction.user.username + '#' + interaction.user.discriminator;
            let filePath = path.join(__dirname, '../OGtrait.json');
            let tokenId = interaction.options.get('tokenid').value;
            var whitelist = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            let userData = {};
            if (whitelist.hasOwnProperty(interaction.user.id)){
                userData = whitelist[interaction.user.id]
            }
            userData.tokenId = tokenId;
            userData.userId = userId;
            whitelist[interaction.user.id] = userData;
            fs.writeFileSync(filePath, JSON.stringify(whitelist, null, 4));
            await interaction.reply('We will set your OG trait for tokenId = ' + tokenId  + ' before reveal if you still hold the token then. Run this command again to overwrite. We will only add this trait for one Pioneer NFT.');
            return;
        }
        else {
            await interaction.reply('Wrong channel m8');
            return;
        }
	},
};