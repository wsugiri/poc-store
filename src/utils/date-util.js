const moment = require('moment');

exports.addDays = (time, days) => {
    return new Date(time + days * 24 * 60 * 60 * 1000);
};

exports.addHours = (time, hours) => {
    return new Date(time + hours * 60 * 60 * 1000);
};

exports.addMinutes = (time, minutes) => {
    return new Date(time + minutes * 60 * 1000);
};

exports.secondsToTime = (secs) => {
    secs = Math.round(secs);
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const obj = {
        h: hours,
        m: minutes,
        s: seconds,
    };
    return obj;
};

exports.converttoYMD = (dateString) => {
    const splitDate = dateString.split('-');
    if (splitDate[0].length === 2) {
        const strDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
        return moment(strDate).toISOString();
    } else {
        const strDate = `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}`;
        return moment(strDate).toISOString();
    }
}

exports.longDateToYMD = (dateString) => {
    let longDate = new Date(dateString)
    let date = JSON.stringify(longDate)
    date = date.slice(1,11)

    return moment(date).toISOString();
}

module.exports = exports;