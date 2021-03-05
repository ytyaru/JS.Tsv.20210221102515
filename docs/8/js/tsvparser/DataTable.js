import DateFormat from '../typeformat/DateFormat.js';
import TableState from './TableState.js';
import TsvString from './TsvString.js';
export default class DataTable { // TableStateに沿ってTsvTableを変更して新たなテーブルデータを返す。
    #source
    #state
    #columns
    #rows
    #show
    #orderBy
    #where
    get Source() { return this.#source; }
    get State() { return this.#state; }
    get Columns() { return this.#columns; }
    get Rows() { return this.#rows; }
    get Show() { return this.#show; }
    set Show(value) {
        if ('[object Array]' === Object.prototype.toString.call(value)) { this.#show = value; }
        else if ('[object String]' === Object.prototype.toString.call(value)) { this.#show = [value]; }
    }
    get OrderBy() { return this.#orderBy; }
    get Where() { return this.#where; }
    constructor(tsv) { // source:{columns:, rows:, state:}
        this.#source = TsvString.parse(tsv);
        const source = TsvString.parse(tsv);
        this.#state = source.state;
        this.#columns = this.#createColumns(source);
        this.#rows = this.#createRows(source, this.#columns)
        console.log(this.#columns, this.#rows);
//        this.#source.state = Object.create(source.state)
        this.#orderBy = new Map();
        this.#where = new Map();
    }
    #createColumns(source) {
        const columns = new Map();
        console.log(source)
        if ('state' in source) {
            if (source.state.Show) {
                for (const column of source.state.Show) {
                    columns.set(column, (source.state.Sort) ? source.state.Sort.filter(col=>col.key===column)[0].orderBy : column);
                }
                return columns;
            }
        }
        return source.columns;
    }
    #createRows(source, columns) {
        if (undefined === columns) { return source.rows; }
        const rows = []
        for (const row of source.rows) {
            const newRow = []
            for (const [key, value] of columns.entries()) {
                const c = this.#getColumnIndex(source, key)
                newRow.push(row[c])
            }
            rows.push(newRow);
        }
        return rows;
    }
    #getColumnIndex(source, key) {
        for (const [i, col] of source.columns.entries()) {
            if (col.key === key) { return i; }
        }
        //Sorter.sort(source.rows, keys, keyIndexies);
    }
    sort() {
        for (const [key, value] of this.#orderBy.entries()) {
            console.log(key, value)
        }
    }
    filter() {
        for (const [key, value] of this.#where.entries()) {
            console.log(key, value)
        }
        // filter(where=>where())
    }
}
