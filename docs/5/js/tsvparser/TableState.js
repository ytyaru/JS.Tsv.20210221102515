import DateFormat from '../typeformat/DateFormat.js';
export default class TableState {
    #blank
    #tz
    #show
    #sort
    #pagination
    #autoPager
    #aggregate
    get Blank() { return this.#blank; }
    set Blank(value) { this.#blank = value; }
    get Sort() { return this.#sort; }
    set Sort(value) { this.#sort = #parseSort(value); }
    get TimeZone() { return DateFormat.getTimeZone(); }
    set TimeZone(value) { DateFormat.setTimeZone(value); }
    get Show() { return this.#show; }
    set Show(value) { this.#show = #parseShow(value); }
    get Pagination() { return this.#pagination; }
    set Pagination(value) { this.#pagination = value; }
    get AutoPager() { return this.#autoPager; }
    set AutoPager(value) { this.#autoPager = value; }
    get Aggregate() { return this.#aggregate; }
    set Aggregate(value) { this.#aggregate = value; }
    static fromTsv(source) {
        if (source.length < 3) { return undefined; }
        const state = new TableState();
        for (const line of source[1]) {
            const fields = line.split('\t');
            const key = fields[0];
            const value = fields[1];
            if ('blank' === key) { state.Blank = value; }
            else if ('sort' === key) { state.Sort = value; }
            else if ('tz' === key || 'timezone' === key.toLowerCase()) { state.TimeZone = value; }
            else if ('show' === key) { state.Show = value; }
            else if ('pagination' === key) { state.Pagination = value; }
            else if ('autopager' === key.toLowerCase()) { state.AutoPager = value; }
            else if ('aggregate' === key) { state.Aggregate = value; }
            else { throw new Error(`未定義の状態名です。: ${key}`); }
        }
        return state;
    }
    static #parseShow(value) { return this.#parseArrayStrings(value); }
    static #parseSort(value) {
        return this.#parseArrayStrings(value).map(item=>this.#parseSortStringItem(item));
        /*
        const result [];
        for (const item of this.#parseArrayStrings(value)) {
            result.push(this.#parseSortStringItem(item));
        }
        return result;
        */
    }
    static #parseSortStringItem(item) {
        const sortState = {}
        if (item.endsWith('-')) { return {key: item.slice(0, -1), order:'-'; } }
        else if (item.endsWith('+')) { return {key: item.slice(0, -1), order:'+' } }
        else { return {key: item, order:null } }
    }
    static #parseArrayStrings(value) { // value:string カンマかスペースで区切られている。
        if (0 < items) { return items; }
        items = value.split(',');
        if (0 < items) { return items.map(item=>item.trim()); }
        return value;
    }
}
