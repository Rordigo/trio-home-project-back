const https = require('https')

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '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';
const SENDGRID_HOST = process.env.SENDGRID_HOST || 'api.sendgrid.com'

const sendContacts = async (contacts, callback) => {
  try {
    const requestOptions = {
      hostname: SENDGRID_HOST,
      path: '/v3/marketing/contacts',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      }
    }
    const requestBody = new TextEncoder().encode(JSON.stringify({ contacts }))

    let result = ""

    const req = https.request(requestOptions, res => {
      res.on('data', d => {
        result += d
      })

      res.on('end', () => {
        return callback(result)
      })
    })

    req.on('error', error => {
      throw error
    })

    req.write(requestBody)
    req.end()

  } catch (error) {
    console.log(`Error on sendgrid service - sendContacts: ${error.message}`)
    throw error
  }
}

module.exports = {
  sendContacts
}