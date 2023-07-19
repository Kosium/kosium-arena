const { SlashCommandBuilder } = require('@discordjs/builders');
const buildSetup = require('../buildSetup');

const axios = require('axios')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setogtrait')
		.setDescription('Sets the OG trait.')
        .addStringOption((option) => option.setName('tokenid').setDescription('The token Id to apply the OG trait to.').setRequired(true)),
	async execute(interaction) {
        if (interaction.channelId == '917186150957977630' || interaction.channelId == 917186150957977630){
            let userId = interaction.user.id;
            let tokenId = parseInt(interaction.options.get('tokenid').value)
            try{
                let serverUrl = 'https://server.kosiumserver.com/setOGTrait';
                let res = await axios
                .post(serverUrl, {
                    discordUserId: userId,
                    tokenId: tokenId
                });
                console.log(`statusCode: ${res.status}`)
                if (res.data){
                    await interaction.reply('Your OG trait was successfully set to tokenId: ' + tokenId + ' Please refresh your metadata on OpenSea to see your new trait.');
                }
                else {
                    await interaction.reply('There was an error setting your address.');
                }
            }
            catch(error){
                console.error(error)
            }
        }
        else {
            await interaction.reply('Wrong channel m8');
        }
	},
};