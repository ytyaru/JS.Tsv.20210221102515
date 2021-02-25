import DateFormat from '../typeformat/DateFormat.js';
import TypeFormat from '../typeformat/TypeFormat.js';
export default class TableState {
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
    get Fileter() { return this.#fileter; }
    set Fileter(value) { this.#fileter = this.#parseSort(value); }
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
    fromTsv(source) {
        if (source.length < 3) { return undefined; }
        for (const [i, line] of source[1].entries()) {
            const fields = line.split('\t');
            if (fields.length < 2) {
                if ('filter' === fields[0]) { this.#parseFilterMultiLine(source[1], i); }
                continue;
            }
            const key = fields[0];
            const value = fields[1];
            if ('blank' === key) { this.Blank = value; }
            else if ('sort' === key) { this.Sort = value; }
            else if ('tz' === key || 'timezone' === key.toLowerCase()) { this.TimeZone = value; }
            else if ('show' === key) { this.Show = value; }
            else if ('pagination' === key) { this.Pagination = parseInt(value); }
            else if ('autopager' === key.toLowerCase()) { this.AutoPager = parseInt(value); }
            else if ('aggregate' === key) { this.Aggregate = value; }
            else { throw new Error(`未定義の状態名です。: ${key}`); }
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
    #parseFilterMultiLine(source, i) {
        const result = {};
        const lines = source.slice(i)
        for (const line of lines) {
            if (!line.startWith('\t')) { break; }
            const fields = line.split('\t');
            if (fields.length < 2) { continue; }
            const key = fields[0];
            const value = fields[1];
            result[key] = this.#parseFilterValue(value);
        }
        return result;
    }
    #parseFilterValue(value) {
        const result = {}
        const delimiterIndex = value.indexOf('..')
        if (0 <= delimiterIndex) {
            if ('integer' === columns[key].type || 'float' === columns[key].type || 'bigint' === columns[key].type || 'number' === columns[key].type || 'date' === columns[key].type) {
                const first = value.slice(0, delimiterIndex);
                const second = value.slice(delimiterIndex);
                if (('integer' === TypeFormat.typeof(first) && 'integer' === TypeFromat.typeof(second))
                 || ('float' === TypeFormat.typeof(first) && 'float' === TypeFromat.typeof(second))
                 || ('number' === TypeFormat.typeof(first) && 'number' === TypeFromat.typeof(second))
                 || ('date' === TypeFormat.typeof(first) && 'date' === TypeFromat.typeof(second))
                ) {
    //                result.min = TypeFormat.toType(first);
    //                result.max = TypeFormat.toType(second);
                    if (0 < delimiterIndex) {
                        result.min = TypeFormat.toType(first);
                    }
                    if (!value.endsWith('..')) {
                        result.max = TypeFormat.toType(second);
                    }
                }
            } else {
                result.in = [value]
            }
            /*
            if ('integer' === columns[key].type || 'float' === columns[key].type || 'bigint' === columns[key].type || 'number' === columns[key].type || 'date' === columns[key].type) {
                result.min = TypeFormat.toType(value);
                result.max = TypeFormat.toType(value);
            } else if () {
                result.min = 
                result.max = 
            }
            */
        }
        else if (0 == delimiterIndex) {
        }

        else {

        }
        if (value.startsWith('..')) {

        }
        else if (value.endsWith('..')) {

        }
    }
}
