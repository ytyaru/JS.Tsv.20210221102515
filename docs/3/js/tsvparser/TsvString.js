import Column from './Column.js';
import Row from './Row.js';
export default class TsvString {
    static toArray(source) {
        const lines = source.split('\n');
        const areas = this.#splitAreas(lines);
        console.log(areas);
        const column = Column.fromTsv(areas);
        console.log(column);
        const row = Row.fromTsv(column, areas[areas.length - 1])
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
