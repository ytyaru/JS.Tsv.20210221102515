export default class TableState {
    #blank
    #sort
    #tz
    #show
    #sort
    #pagination
    #autoPager
    #aggregate
    get Blank() { return this.#blank; }
    set Blank(value) { this.#blank = value; }
    get Sort() { return this.#sort; }
    set Sort(value) { this.#sort = value; }
    get TimeZone() { return this.#tz; }
    set TimeZone(value) { this.#tz = value; }
    get Show() { return this.#show; }
    set Show(value) { this.#show = value; }
    get Pagination() { return this.#pagination; }
    set Pagination(value) { this.#pagination = value; }
    get AutoPager() { return this.#autoPager; }
    set AutoPager(value) { this.#autoPager = value; }
    get Aggregate() { return this.#aggregate; }
    set Aggregate(value) { this.#aggregate = value; }
    static fromTsv(source) {
        
    }
    constructor() {

    }
}
