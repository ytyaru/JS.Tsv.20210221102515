import DateFormat from '../typeformat/DateFormat.js';
import TableState from './TableState.js';
export default class DataTable { // TableStateに沿ってTsvTableを変更して新たなテーブルデータを返す。
    static get(source) { // source:{columns:, rows:, state:}
        console.log(source)
        const result = {}
        result.columns = this.#createColumns(source);
        console.log(result.columns)
        result.rows = this.#createRows(source, result.columns)
        return result;
    }
    static #createColumns(source) {
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
    static #createRows(source, columns) {
        if (undefined === columns) { return source.rows; }
        console.log(columns)
        const rows = []
        for (const row of source.rows) {
            const newRow = []
            for (const [key, value] of columns.entries()) {
                console.log(key, value, row)
//                console.log(key, value, row, source.columns.filter((i,col)=>col.key===key)[0])
                if (row.key !== key) { continue; }
//                newRow.push(value)
                newRow.push(row[key])
            }
            rows.push(newRow);
        }
        console.log(rows);
        return rows;
    }
}
