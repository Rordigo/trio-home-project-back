module.exports = (app) => {
    const controller = require("../controllers/controller");

    app.route('/sync')
    .post(controller.syncContacts);

}
