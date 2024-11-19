const config = require('../config'); // Import config to determine which DB to use

let dbClient;

(async () => {
    if (config.database === 'mongo') {
        dbClient = require('./mongoClient');
    } else if (config.database === 'sqlite') {
        dbClient = require('./sqliteClient');
        await dbClient.connect();
        console.log('sql dbClient has been created')
    }
})()

module.exports = dbClient;
