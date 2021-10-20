const fs = require('fs');
const path = require('path');

module.exports = {
    config: ({ basePath }) => {
        const routes = [];

        function routingApi(option) {
            const { folderPath } = option;
            if (fs.existsSync(folderPath)) {
                const files = fs.readdirSync(folderPath).reverse();
                files.forEach((fileName) => {
                    const filePath = path.join(folderPath, fileName);
                    const stat = fs.statSync(filePath);

                    if (stat.isFile()) {
                        if (fileName.split('.')[1] === 'js') {
                            const name = fileName.toLowerCase().substr(0, fileName.length - 3);
                            const key = `${folderPath.split('routes')[1]}`.split('\\').join('/');
                            if (key) {
                                const route = `${key}/${name}`.split('/index').join('');
                                routes.push(route);
                            }
                        }
                    } else {
                        if (stat.isDirectory()) {
                            routingApi({ folderPath: filePath, folder: fileName });
                        }
                    }
                });
            }
        }

        routingApi({ folderPath: basePath });

        return routes;
    }
}