const admin = require('firebase-admin');
var serviceAccount = require("../config/perfecta-83c3c-firebase-adminsdk-ll0wl-957a3d1645.json.exemple");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "<DATABASE_URL_HERE>"
});

module.exports = admin.database();