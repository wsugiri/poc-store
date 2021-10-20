exports.groupBy = (list, key) => {
    const rows = []
    list.forEach(item => {
        const findOne = rows.find(m => m.key == item[key]);
        if (findOne) {
            findOne.list.push(item);
        } else {
            rows.push({
                key: item[key],
                length: 0,
                list: [item]
            })
        }
    });
    return rows.map(m => ({ ...m, count: m.list.length }));
}