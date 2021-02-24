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
    set Sort(value) { this.#sort = this.#parseSort(value); }
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
        for (const line of source[1]) {
            const fields = line.split('\t');
            const key = fields[0];
            const value = fields[1];
            if ('blank' === key) { this.Blank = value; }
            else if ('sort' === key) { this.Sort = value; }
            else if ('tz' === key || 'timezone' === key.toLowerCase()) { this.TimeZone = value; }
            else if ('show' === key) { this.Show = value; }
            else if ('pagination' === key) { this.Pagination = value; }
            else if ('autopager' === key.toLowerCase()) { this.AutoPager = value; }
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
}
