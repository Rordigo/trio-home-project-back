const mailChimpService = require('./mailChimp');
const sendGridService = require('./sendGrid');

const parseContacts = (contacts) => {
  try {
    return contacts.map(member => {
      try {
        const { full_name, email_address } = member
        const names = full_name.split(" ");
        const first_name = names.shift()
        const last_name = names.join(" ")

        return { first_name, last_name, email: email_address }
      } catch (error) {
        const memberId = member ? member.id : null
        console.log(`Failed to read map member ${memberId} informations: ${error.message}`)
      }
    })
  } catch (error) {
    console.error(`Error on service parseContacts: ${error.message}`)
    throw error
  }
};

module.exports.syncContacts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const contacts = await mailChimpService.getContacts();
      const parsedContacts = parseContacts(contacts)
      sendGridService.sendContacts(parsedContacts, (data) => {
        const sendResult = JSON.parse(data)
        resolve({
          sent: parsedContacts.length,
          sendResult
        })
      })
    } catch (error) {
      console.error(`Error on Service - syncContacts: ${error.message}`)
      throw new Error('Failed to sync contacts')
    }
  })
};
