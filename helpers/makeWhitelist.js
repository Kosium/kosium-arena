const fs = require('fs');
const path = require('path');



module.exports = async function(members, client){

    let whitelistPath = path.join(__dirname, '../whitelist.json');
    var whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

    let alreadyWhitelistedPath = path.join(__dirname, '../alreadyWhitelisted.json');
    var alreadyWhitelisted = JSON.parse(fs.readFileSync(alreadyWhitelistedPath, 'utf8'));

    let allMembers = {};
    let whitelistedRoles = ["Kosium Volunteer", "Kosium OG", "MOD"];

    let memberIds = [];
	members.each(function (user, key, map){
        let roleName = user.roles.highest.name;
        if (whitelistedRoles.includes(roleName)){
            memberIds.push(user.id);
        }
        else {
            // console.log('user had role ', user.roles.highest.name, ' so i couldnt whitelist');
        }
	});

    let addressesToWL = [];
    let validatedWhitelistIds = {};
    for (let i = 0; i < memberIds.length; ++i){
        let id_i = memberIds[i];
        let userUser = await client.users.fetch(id_i)
        let userName = userUser.username + '#' + userUser.discriminator;
        
        if (whitelist.hasOwnProperty(userName)){
            let address = whitelist[userName];
            if (!alreadyWhitelisted.hasOwnProperty(id_i)){
                allMembers[userName] = address;
                validatedWhitelistIds[id_i] = address;
                addressesToWL.push(address);
            }
        }
        else {
            // console.log('user ', userName, ' hasnt whitelisted yet');
        }
    }
    console.log('all done');

    let allMembersPath = path.join(__dirname, '../validatedWhitelist.json');
    fs.writeFileSync(allMembersPath, JSON.stringify(allMembers, null, 4));
    
    let validatedWlIdPath = path.join(__dirname, '../validatedWhitelistIds.json');
    fs.writeFileSync(validatedWlIdPath, JSON.stringify(validatedWhitelistIds, null, 4));
    
    let addrToWLFilePath = path.join(__dirname, '../addressesToWhitelistArray.json');
    fs.writeFileSync(addrToWLFilePath, JSON.stringify(addressesToWL, null, 4));
    console.log('num addresses: ', addressesToWL.length);












    // let notWhitelistedOutputPath = path.join(__dirname, '../notWhitelistedOutput.json');
    // fs.writeFileSync(notWhitelistedOutputPath, JSON.stringify(peopleWhoHaventWld, null, 4));

    // var whitelistToOutput = {};
    // var peopleWhoHaventWld = {};

    //get list of og's and volunteers
    //for each member
    //  if id exists in whitelist
    //      add to whitelistToOutput
    //  else
    //      add to list of people who haven't WL'd
}