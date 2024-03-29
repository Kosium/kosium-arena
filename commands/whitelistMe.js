const { SlashCommandBuilder } = require('@discordjs/builders');
const buildSetup = require('../buildSetup');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whitelistme')
		.setDescription('Whitelists you if you are worthy.')
        .addStringOption((option) => option.setName('address').setDescription('The address to whitelist').setRequired(true)),
	async execute(interaction) {
        if (interaction.channelId == '915284230454521937' || interaction.channelId == 915284230454521937){
            let userId = interaction.user.username + '#' + interaction.user.discriminator;
            let whitelistPath = path.join(__dirname, '../whitelist.json');
            let address = interaction.options.get('address').value;
            var whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
            whitelist[userId] = address;
            fs.writeFileSync(whitelistPath, JSON.stringify(whitelist, null, 4));
            await interaction.reply('UserId: ' + userId + ' has been added to the queue with address: ' + address + 
            '. Please wait for Blingus to Whitelist you before minting, and please check with the "Am I Whitelisted" website button first before minting. Thank you for your patience!' );
            return;
        }
        else {
            await interaction.reply('Wrong channel m8');
            return;
        }
	},
};