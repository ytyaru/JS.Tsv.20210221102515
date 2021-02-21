class Column {
//    static #formatDate = '[0-9]{4,}[\-/][0-9]{2}[\-/][0-9]{2}';
//    static #formatTime = '[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?';
//    static #formatDateTime = `${this.#formatDate}[ T]${this.#formatTime}(Z|[+-][0-9]{4}|[+-][0-9]{2}:[0-9]{2})?`;
    static #formatDate = '\\d{4,}[\-/]\\d{2}[\-/]\\d{2}';
    static #formatTime = '\\d{2}:\\d{2}:\\d{2}(\.\\d+)?';
    static #formatDateTime = `${this.#formatDate}[ T]${this.#formatTime}(Z|[+-]\\d{4}|[+-]\\d{2}:\\d{2})?`;
    static #regexpDate = new RegExp(`^${this.#formatDate}$`);
    static #regexpTime = new RegExp(`^${this.#formatTime}$`);
    static #regexpDateTime = new RegExp(`^${this.#formatDateTime}$`);
//    static #formatTime = new RegExp('[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?');
//    static #formatDateTime = new RegExp('[0-9]{4,}[\-/][0-9]{2}[\-/][0-9]{2}[ T](Z|[+-][0-9]{4}|[+-][0-9]{2}:[0-9]{2})');
    static fromTsv(source) {
//        console.log(source.length)
//        console.log(source[0].length)
        // キーがない
        if (1 === source.length) { return undefined; }
        // キーがある
        else if (1 === source[0].length) { return this.#createColumnObjectsKeyOnly(source); }
        else if (1 < source[0].length) { return this.#createColumnObjects(source); }
        else { throw new Error('引数エラー。Column.fromTsv()の引数は1つ以上の配列であるべきです。'); }
    }
    static #createColumnObjects(source) {
//        console.log(source[0]);
        const lines = source[0].map(line=>line);
//        console.log(lines);
        const objects = [];
        const keys = lines.shift().split('\t');
//        console.log(keys);
        for (const [r, line] of lines.entries()) {
            const object = {};
            for (const [c, field] of line.split('\t').entries()) {
                object[keys[c]] = field;
            }
            objects.push(object);
        }
        return objects;
    }
    static #createColumnObjectsKeyOnly(source) {
//        console.log(source[0][0]);
//        const line = source[0].map()[0];
        const line = source[0][0];
        const objects = [];
//        const keys = ['key', 'type'];
        const keys = line.split('\t');
        const rows = source.slice(-1)[0];
        for (const [c, field] of line.split('\t').entries()) {
            const object = {};
//            object.key = line;
            object.key = keys[c];
            object.type = this.#inferType(this.#getValue(rows, c));
            objects.push(object);
        }
        return objects;
    }
    static #getValue(rows, c) {
        for (let r = 0; r < rows.length; r++) {
            const value = rows[r].split('\t')[c];
//            console.log(rows[r], rows[r].split('\t'), c, value);
            if (0 < value.length) { return value; }
        }
        // undefined
    }
    static #inferType(value) {
        console.log(value, parseInt(value), Number.isFinite(value), value.match(this.#regexpDate), this.#regexpDate);
        if (undefined === value) { return undefined; }
        else if ('true' === value || 'false' === value) { return 'boolean'; }
        else if (value.match(this.#regexpDate) || value.match(this.#regexpTime) || value.match(this.#regexpDateTime) ) { return 'date'; }
//        else if (Number.isFinite(parseInt(value))) { return 'number'; }
//        else if (parseInt(value) || parseFloat(value)) { return 'number'; }
        else if (!isNaN(value)) { return 'number'; }
        else { return 'string'; }
    }
}
