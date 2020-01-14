const admin = require('firebase-admin');
var serviceAccount = require("../config/perfecta-83c3c-firebase-adminsdk-ll0wl-957a3d1645.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://perfecta-83c3c.firebaseio.com"
});

module.exports = admin.database();