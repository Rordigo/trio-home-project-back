module.exports = (app) => {
    const controller = require("../controllers/controller");

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        next();
    })

    app.route('/sync')
        .put(controller.syncContacts);

}
