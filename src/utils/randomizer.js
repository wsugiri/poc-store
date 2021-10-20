exports.randomstring = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

exports.alfaNumeric = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

exports.stringAtoZ = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

exports.number = (fromNumber, toNumber) => {
    return Math.floor(Math.random() * (+toNumber - +fromNumber) + +fromNumber);
};

module.exports = exports;