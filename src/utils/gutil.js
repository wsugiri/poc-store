const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

let auth = null;

const app = {
    readJson: (filename) => {
        const buff = fs.readFileSync(filename, 'utf8');
        return JSON.parse(buff);
    },
    instance: async (cred) => {
        try {
            if (cred) {
                const { client_secret, client_id, redirect_uri, access_token, refresh_token } = cred;
                const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
                oAuth2Client.setCredentials({ access_token, refresh_token });
                auth = oAuth2Client;
                return { drive: google.drive({ version: 'v3', auth }) }
            }

            if (!auth) {
                console.log('-- initialize credentials --\n');
                const credentials = app.readJson(path.join(__dirname, '../../credentials.json'));
                const { client_secret, client_id, redirect_uris } = credentials.installed;
                const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
                const token = app.readJson(path.join(__dirname, '../../token.json'));
                oAuth2Client.setCredentials(token);
                auth = oAuth2Client;
            }
            return { drive: google.drive({ version: 'v3', auth }) }
        } catch (error) {
            throw error;
        }
    }
};

module.exports = app;
