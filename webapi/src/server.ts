import * as dbService from '@shared/services/db/db.service';

function startServer() {
    const server = require('./api/');
}

// Validate DBs connection and then start server
dbService.connectToDbs().then(() => startServer())