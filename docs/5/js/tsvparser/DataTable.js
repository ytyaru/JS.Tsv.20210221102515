import DateFormat from '../typeformat/DateFormat.js';
import TableState from './TableState.js';
export default class DataTable { // TableStateに沿ってTsvTableを変更して新たなテーブルデータを返す。
    static get(source) { // source:{columns:, rows:, state:}
        const result = {}
        result.columns = this.#createColumns(source);
        return result;
    }
    static #createColumns(source) {
        const columns = new Map();
        console.log(source)
        console.log('state' in source)
        console.log(source.state.Show)
        if ('state' in source) {
            if (source.state.Show) {
//            if ('show' in source.state) {
                for (const column of source.state.Show) {
                    columns.set(column, column);
//                    columns.set(column, ('sort' in source.state) ? source.state.sort.filter(col=>col.key===column)[0].order : column);
                }
                return columns;
//            }
            }
        }
        return source.columns;
    }
}
