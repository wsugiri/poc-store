
exports.hexToRgb = (hexa) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexa);
    return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null;
}

exports.parseDataObject = object => JSON.parse(JSON.stringify(object));

exports.offset = (page = 1, limit = 10) => ((page - 1) * limit);

exports.isEmptyObject = object => !Object.keys(object).length;

exports.isEmptyArray = array => array.length === 0;

exports.get = (hexa) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexa);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

exports.convertByte = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.slugify = (string) => {
    if (string === '') return '';
    let url = string.toLowerCase().trim();
    url = url.replace(' / ', ' ');
    url = url.replace(' & ', '-');
    url = url.replace(/ /g, '-');
    url = url.replace(/--/g, '-');
    url = url.replace(/[^\w.]/g, '-');
    url = url.replace(/--/g, '-');
    url = url.replace(/-_/g, '_');
    return url;
};

exports.alphaOnly = (string) => {
    return string.replace(/[^a-zA-Z ]/g, '');
};

exports.alphaNumericOnly = (string) => {
    return string.replace(/[^a-zA-Z0-9]/g, '');
};

exports.leadingZeros = (value, length) => {
    let leadingZeros = String(value);
    while (leadingZeros.length < length) leadingZeros = `0${leadingZeros}`;
    return leadingZeros;
};

exports.sortArray = (key, order = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

exports.removeDuplicateArray = (items) => {
    const resultArr = items.reduce((acc, item) => {
        if (!acc.includes(item)) {
            acc.push(item);
        }
        return acc;
    }, []);

    return resultArr;
}

module.exports = exports;