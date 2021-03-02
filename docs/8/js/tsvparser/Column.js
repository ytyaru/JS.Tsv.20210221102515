import TypeFormat from '../typeformat/TypeFormat.js';
export default class Column {
    static fromTsv(source) {
        // キーがない
        if (1 === source.length) { return undefined; }
        // キーがある
        else if (1 === source[0].length) { return this.#createColumnObjectsKeyOnly(source); }
        else if (1 < source[0].length) { return this.#createColumnObjects(source); }
        else { throw new Error('引数エラー。Column.fromTsv()の引数は1つ以上の配列であるべきです。'); }
    }
    static #createColumnObjects(source) {
        const lines = source[0].map(line=>line);
        const objects = [];
        const keys = lines.shift().split('\t');
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
        const line = source[0][0];
        const objects = [];
        const keys = line.split('\t');
        const rows = source.slice(-1)[0];
        for (const [c, field] of line.split('\t').entries()) {
            const object = {};
            object.key = keys[c];
            object.type = TypeFormat.typeof(this.#getValue(rows, c)) 
            objects.push(object);
        }
        return objects;
    }
    static #getValue(rows, c) {
        for (let r = 0; r < rows.length; r++) {
            const value = rows[r].split('\t')[c];
            if (0 < value.length) { return value; }
        }
        return undefined;
    }
}
