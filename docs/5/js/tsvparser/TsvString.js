import Column from './Column.js';
import Row from './Row.js';
import TableState from './TableState.js';
export default class TsvString {
    static parse(source, type='array') {
        const result = {}
        const lines = source.split('\n');
        const areas = this.#splitAreas(lines);
        result.columns = Column.fromTsv(areas);
        result.rows = this.#getRows(type, areas, result.columns);
//        result.state = TableState.fromTsv(areas);
        result.state = new TableState();
        result.state.fromTsv(areas);
        return result;
    }
    static #getRows(type, areas, columns) {
        if ('array' === type.toLowerCase()) { return this.#getArrayRows(areas, columns); }
        else if ('object' === type.toLowerCase()) { return this.#getArrayRows(areas, columns); }
        else if ('map' === type.toLowerCase()) { return this.#getArrayRows(areas, columns); }
        else { throw new Error('行データの型はarray,object,mapのいずれかのみ有効です。'); }
    }
    static #getArrayRows(areas, columns) { return Row.fromTsv(areas); }
    static #getObjectRows(areas, columns) {
        const result = [];
        for (const row of Row.fromTsv(areas)) {
            const object = {};
            for (const [c, field] of row.entries()) {
                const key = (columns) ? columns[c].key : `column${c}`
                object[key] = field;
            }
            result.push(object);
        }
        return result;
    }
    static #getMapRows(areas, columns) {
        const result = [];
        for (const row of Row.fromTsv(areas)) {
            const object = new Map();
            for (const [c, field] of row.entries()) {
                const key = (columns) ? columns[c].key : `column${c}`
                object.set(key, field);
            }
            result.push(object);
        }
        return result;
    }
    static toArray(source) {
        const lines = source.split('\n');
        const areas = this.#splitAreas(lines);
        const column = Column.fromTsv(areas);
        return Row.fromTsv(areas)
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
