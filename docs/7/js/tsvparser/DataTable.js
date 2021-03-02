import DateFormat from '../typeformat/DateFormat.js';
import TableState from './TableState.js';
export default class DataTable { // TableStateに沿ってTsvTableを変更して新たなテーブルデータを返す。
    #source
    get Source() { return this.#source; }
    constructor(source) { // source:{columns:, rows:, state:}
        console.log(source)
        this.#source = {}
        this.#source.columns = this.#createColumns(source);
        this.#source.rows = this.#createRows(source, this.#source.columns)
//        this.#source.state = Object.create(source.state)
    }
    #createColumns(source) {
        const columns = new Map();
        console.log(source)
        console.log('state' in source)
        console.log(source.state.Show)
        console.log(source.state.Sort)
        if ('state' in source) {
            if (source.state.Show) {
//            if ('show' in source.state) {
                for (const column of source.state.Show) {
//                    columns.set(column, column);
                    columns.set(column, (source.state.Sort) ? source.state.Sort.filter(col=>col.key===column)[0].orderBy : column);
                }
                return columns;
//            }
            }
        }
        return source.columns;
    }
    #createRows(source, columns) {
        if (undefined === columns) { return source.rows; }
        console.log(columns)
        const rows = []
        for (const row of source.rows) {
            const newRow = []
            for (const [key, value] of columns.entries()) {
                const c = this.#getColumnIndex(source, key)
                newRow.push(row[c])
            }
            rows.push(newRow);
        }
        console.log(rows);
        return rows;
    }
    #getColumnIndex(source, key) {
        for (const [i, col] of source.columns.entries()) {
            if (col.key === key) { return i; }
        }
    }
}
