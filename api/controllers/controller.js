const service = require('../services')

exports.syncContacts = async (req, res) => {
    try {
        res.status(200).json(await service.syncContacts())
    } catch (error) {
        res.status(500).json(error.message)
    }
}
