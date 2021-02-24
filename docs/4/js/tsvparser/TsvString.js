import Column from './Column.js';
import Row from './Row.js';
export default class TsvString {
    static toArray(source) {
        const lines = source.split('\n');
        const areas = this.#splitAreas(lines);
        console.log(areas);
        const column = Column.fromTsv(areas);
        console.log(column);
        const row = Row.fromTsv(areas)
        console.log(row);
        return row;
    }
    static toObject(source) {
        const result = [];
        const lines = source.split('\n');
        const areas = this.#splitAreas(lines);
        const column = Column.fromTsv(areas);
        for (const row of Row.fromTsv(areas)) {
            const object = {};
            for (const [c, field] of row.entries()) {
                const key = (column) ? column[c].key : `column${c}`
                object[key] = field;
            }
            result.push(object);
        }
        return result;
    }
    static toMap(source) {
        const result = [];
        const lines = source.split('\n');
        const areas = this.#splitAreas(lines);
        const column = Column.fromTsv(areas);
        for (const row of Row.fromTsv(areas)) {
            const object = new Map();
            for (const [c, field] of row.entries()) {
                const key = (column) ? column[c].key : `column${c}`
                object.set(key, field);
            }
            result.push(object);
        }
        return result;
    }
    static #splitAreas(lines) {
        const areas = [];
        let area = [];
        for (const line of lines) {
            if (0 === line.length) { areas.push(area); area = []; }
            else { area.push(line); }
        }
        return areas.filter(area=>0<area.length);
    }
    static fromArray(source) {

    }
    static #toArrayFromString(source) {
    }
    static #toArrayFromMap(source) {

    }
    static #toArrayFromObject(source) {
    }
}
