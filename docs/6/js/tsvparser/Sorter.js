export default class Sorter {
    static defaultSort(a, b, key, direction = 1, nullsFirst = 1) {
        if (a[key] == undefined && b[key] == undefined) return 0;
        if (a[key] == undefined) return nullsFirst * 1;
        if (b[key] == undefined) return nullsFirst * -1;
        if (a[key] > b[key]) return direction * 1;
        if (a[key] < b[key]) return direction * -1;
        return 0;
    }
    static sort(data, keys) {
        const _data = data.slice();
        _data.sort((a, b) => {
            let order = 0;
            keys.some(key => {
                order = this.defaultSort(a, b, key);
                return !!order;
            });
            return order;
        });
        return _data;
    }
}
