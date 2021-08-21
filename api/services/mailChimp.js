const client = require('@mailchimp/mailchimp_marketing');

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || '92f72c84333808236eb2324d216d4091-us5';
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER || 'us5';

client.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER,
});

const getAllLists = async () => {
    try {
        return await client.lists.getAllLists();
    } catch (error) {
        console.error(`Error on mailchimp service - getLists: ${error.message}`)
        throw error
    }
}

const getListMembers = async (listId) => {
    try {
        return await client.lists.getListMembersInfo(listId);
    } catch (error) {
        console.error(`Error on mailchimp service - getListMembers: ${error.message}`)
        throw error
    }
}

const getContacts = async () => {
    try {
        const { lists } = await getAllLists();
        const getMembers = lists.map(list => getListMembers(list.id))

        const allListsMembers = await Promise.all(getMembers)

        let memberList = [];
        allListsMembers.forEach(list => {
            memberList = memberList.concat(list.members)
        })

        const uniqueMembers = memberList.filter((member, index, self) => {
            const idFirstIndex = self.map(m => m.id).indexOf(member.id);
            return (idFirstIndex === index)
        })

        return uniqueMembers;
    } catch (error) {
        console.error(`Error on mailchimp service - getContacts: ${error.message}`)
        throw error
    }
}

module.exports = {
    getContacts
}
