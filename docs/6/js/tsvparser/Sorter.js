export default class Sorter {
    static defaultSortObject(a, b, key, direction = 1, nullsFirst = 1) {
        if (a[key] == undefined && b[key] == undefined) return 0;
        if (a[key] == undefined) return nullsFirst * 1;
        if (b[key] == undefined) return nullsFirst * -1;
        if (a[key] > b[key]) return direction * 1;
        if (a[key] < b[key]) return direction * -1;
        return 0;
    }
    static defaultSortMap(a, b, key, direction = 1, nullsFirst = 1) {
        if (a.get(key) == undefined && b.get(key) == undefined) return 0;
        if (a.get(key) == undefined) return nullsFirst * 1;
        if (b.get(key) == undefined) return nullsFirst * -1;
        if (a.get(key) > b.get(key)) return direction * 1;
        if (a.get(key) < b.get(key)) return direction * -1;
        return 0;
    }
    static sortObject(data, keys) {
        const _data = data.slice();
        _data.sort((a, b) => {
            let order = 0;
            keys.some(key => {
                order = this.defaultSortObject(a, b, key);
                return !!order;
            });
            return order;
        });
        return _data;
    }
    static sortMap(data, keys) {
        const _data = data.slice();
        _data.sort((a, b) => {
            let order = 0;
            keys.some(key => {
                order = this.defaultSortMap(a, b, key);
                return !!order;
            });
            return order;
        });
        return _data;
    }
    static sort(data, keys) {
        if ('[object Array]' !== Object.prototype.toString.call(data)) {
            throw new Error('dataは配列型であるべきです。');
        }
        if (0 < data.length) {
            const t = Object.prototype.toString.call(data[0]);
            if ('[object Array]' === t || '[object Object]' === t) { return this.sortObject(data, keys); }
            if ('[object Map]' === t) { return this.sortMap(data, keys); }
        }
    }
}
