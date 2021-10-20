const multiparty = require('multiparty');
const base64Img = require('base64-img');

const app = {
    parse: async (req) => {
        return new Promise((resolve, reject) => {
            const form = new multiparty.Form();
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                } else {
                    const keys = Object.keys(files);
                    const file = files[keys[0]][0];
                    const resp = {
                        file: {
                            name: file.fieldName,
                            nameOriginal: file.originalFilename,
                            path: file.path,
                            contentType: file.headers['content-type'],
                            fileSize: file.size
                        },
                        field: {}
                    };

                    Object.keys(fields).forEach(key => {
                        resp.field[key] = fields[key][0];
                    });

                    resolve(resp);
                }
            });
        });
    },
    saveBase64: (option) => {
        const { data, foldername, filename } = option;
        return new Promise(async (resolve, reject) => {
            try {
                const filepath = base64Img.imgSync(data, foldername, filename);
                resolve({ filepath });
            } catch (err) {
                reject(err);
            }
        });
    },
};

module.exports = app;
