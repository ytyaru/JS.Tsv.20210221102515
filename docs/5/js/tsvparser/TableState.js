import DateFormat from '../typeformat/DateFormat.js';
import TypeFormat from '../typeformat/TypeFormat.js';
export default class TableState {
//    #formatRegExp = new RegExp(`^/.+/[gimsuy]*$`)
    #formatRegExp = new RegExp(`^/(.+)/([gimsuy]*)$`)
//    #formatRegExp = new RegExp(`^/(.+)/([gimsuy]+)?$`)
    #blank
    #tz
    #show
    #sort
    #filter
    #pagination
    #autoPager
    #aggregate
    get Blank() { return this.#blank; }
    set Blank(value) { this.#blank = value; }
    get Sort() { return this.#sort; }
    set Sort(value) { this.#sort = this.#parseSort(value); }
//    get Filter() { return this.#filter; }
//    set Filter(value) { this.#filter = this.#parseFilter(value); }
    get TimeZone() { return DateFormat.getTimeZone(); }
    set TimeZone(value) { DateFormat.setTimeZone(value); }
    get Show() { return this.#show; }
    set Show(value) { this.#show = this.#parseShow(value); }
    get Pagination() { return this.#pagination; }
    set Pagination(value) { this.#pagination = value; }
    get AutoPager() { return this.#autoPager; }
    set AutoPager(value) { this.#autoPager = value; }
    get Aggregate() { return this.#aggregate; }
    set Aggregate(value) { this.#aggregate = value; }
    fromTsv(source, columns) {
        if (source.length < 3) { return undefined; }
        for (const [i, line] of source[1].entries()) {
            const fields = line.split('\t');
            if (fields.length < 2) {
                if ('filter' === fields[0]) { this.#parseFilterMultiLine(source[1], i, columns); }
                continue;
            }
            const key = fields[0];
            const value = fields[1];
            if ('blank' === key) { this.Blank = value; }
            else if ('sort' === key) { this.Sort = value; }
            else if ('tz' === key || 'timezone' === key.toLowerCase()) { this.TimeZone = value; }
            else if ('show' === key) { console.log('shoooooooow', value); this.Show = value; }
            else if ('pagination' === key) { this.Pagination = parseInt(value); }
            else if ('autopager' === key.toLowerCase()) { this.AutoPager = parseInt(value); }
            else if ('aggregate' === key) { this.Aggregate = value; }
//            else { throw new Error(`未定義の状態名です。: ${key}`); }
        }
    }
    #parseShow(value) { return this.#parseArrayStrings(value); }
    #parseSort(value) {
        return this.#parseArrayStrings(value).map(item=>this.#parseSortStringItem(item));
    }
    #parseSortStringItem(item) {
        const sortState = {}
        if (item.endsWith('-')) { return {key: item.slice(0, -1), orderBy: -1 } }
        else if (item.endsWith('+')) { return {key: item.slice(0, -1), orderBy: 1 } }
        else { return {key: item, orderBy: 0} }
    }
    #parseArrayStrings(value) { // value:string カンマかスペースで区切られている。
        let items = value.split(' ');
        if (-1 === value.indexOf(',') && 0 < items.length) { return items; }
        items = value.split(',');
        if (0 < items.length) { return items.map(item=>item.trim()); }
        return value;
    }
    #parseFilterMultiLine(source, i, columns) {
        console.log('parseFilterMultiLine');
        const result = {};
        const lines = source.slice(i+1)
        console.log(lines);
        for (const line of lines) {
            if (!line.startsWith('\t')) { break; }
            const fields = line.trim().split('\t');
            console.log(fields );
            if (fields.length < 2) { continue; }
            const key = fields[0];
            const value = fields[1];
            result[key] = this.#parseFilterValue(key, value, columns);
        }
        this.#filter = result;
        return result;
    }
    #parseFilterValue(key, value, columns) {
        const column = columns.filter(col=>col.key === key)[0];
        console.log(column)
        const result = {}
        const DELIMITER = '..'
        const delimiterIndex = value.indexOf(DELIMITER)
        if (0 <= delimiterIndex) {
            if ('int' === column.type || 'integer' === column.type || 'float' === column.type || 'bigint' === column.type || 'num' === column.type  || 'number' === column.type || 'date' === column.type) {
                const first = value.slice(0, delimiterIndex);
                const second = value.slice(delimiterIndex+DELIMITER.length);
                console.log('first:', first, 'second:', second)
                console.log((0 < delimiterIndex), !value.endsWith('..'))
                if (0 < delimiterIndex) {
                    result.min = TypeFormat.toType(first);
                    console.log(result)
                }
                if (!value.endsWith('..')) {
                    result.max = TypeFormat.toType(second);
                    console.log(result)
                }
            } else {
                if (value.startsWith('[') && value.endsWith(']')) {
                    result.in = JSON.parse(value);
                } else if (('str' === column.type || 'string' === column.type) && value.match(this.#formatRegExp)) {
                    value.replace(this.#formatRegExp, (match, p1, p2)=>{
                        result.regexp = new RegExp(p1, p2);
                    })
                }
                else { result.in = [value]; }
            }
        } else {
            if (value.startsWith('[') && value.endsWith(']')) {
                result.in = JSON.parse(value);
            } else if (('str' === column.type || 'string' === column.type) && value.match(this.#formatRegExp)) {
                value.replace(this.#formatRegExp, (match, p1, p2)=>{
                    result.regexp = new RegExp(p1, p2);
                })
            }
            else { result.in = [value]; }
        }
        return result
    }
}
