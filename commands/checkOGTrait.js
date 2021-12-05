const { SlashCommandBuilder } = require('@discordjs/builders');
const buildSetup = require('../buildSetup');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkogtrait')
		.setDescription('Checks which token id you want an OG trait on.'),
	async execute(interaction) {
        if (interaction.channelId == '917186150957977630' || interaction.channelId == 917186150957977630){
            let filePath = path.join(__dirname, '../OGtrait.json');
            var whitelist = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (whitelist.hasOwnProperty(interaction.user.id)){
                userData = whitelist[interaction.user.id];
                if (userData.hasOwnProperty('tokenId')){
                    await interaction.reply('Your genesis trait will be applied to tokenId = ' + userData.tokenId);
                }
                else{
                    await interaction.reply('Couldnt find your tokenId. Try running the command again or contacting Blingus.');
                }
            }
            else {
                await interaction.reply('You need to set your tokenId first with the /setogtrait.');
            }
            return;
        }
        else {
            await interaction.reply('Wrong channel m8');
            return;
        }
	},
};