export default class DateFormat {
    static #timeZone = 'Z'
    static #formatDate = '\\d{4,}[\-/]\\d{2}[\-/]\\d{2}';
    static #formatTime = '\\d{2}:\\d{2}(:\\d{2}(\.\\d+)?)?';
    static #formatTimeZone = '(Z|[+\-]\\d{4}|[+\-]\\d{2}:\\d{2})';
    static #formatDateTime = `${this.#formatDate}[ T]${this.#formatTime}${this.#formatTimeZone}?`;
    static #regexpDate = new RegExp(`^${this.#formatDate}$`);
    static #regexpTime = new RegExp(`^${this.#formatTime}$`);
    static #regexpDateTime = new RegExp(`^${this.#formatDateTime}$`);
    static #regexpTimeZone = new RegExp(`${this.#formatTimeZone}$`);
    static isMatch(value) { // value:string
        return (value.match(this.#regexpDate) 
             || value.match(this.#regexpTime) 
             || value.match(this.#regexpDateTime)) ? true : false;
    }
    static getTimeZone(value) { return this.#timeZone; }
    static setTimeZone(value) {
        if (value.match(this.#formatTimeZone)) {
            this.#timeZone = value;
        }
    }
    static toType(value) { // value:string
        if (value.match(this.#formatDateTime)) {
            if (this.#hasTimeZone(value)) { return new Date(Date.parse(value)); }
            else { return new Date(Date.parse(value + this.#timeZone)); }
        }
        else if (value.match(this.#formatDate)) {
            return new Date(Date.parse(value + 'T00:00:00' + this.#timeZone));
        }
        else if (value.match(this.#formatTime)) {
            return new Date(Date.parse(`${this.#todayString(('Z' === this.#timeZone) ? true : false)}T${value}${this.#timeZone}`));
        }
        throw new Error(`非対応の書式です。: ${value}`);
    }
    static #todayString(isUTC=true) {
        const now = new Date(); // 現在日時
        return (isUTC) ? this.#todayUTCString(now) : this.#todayLocaleString(now);
    }
    static #todayUTCString(now) {
        const year = `${now.getUTCFullYear()}`;
        const month = `0${now.getUTCMonth()+1}`.slice(-2);
        const day = `0${now.getUTCDate()}`.slice(-2);
        return `${year}-${month}-${day}`;
    }
    static #todayLocaleString(now) {
        const year = `${now.getFullYear()}`;
        const month = `0${now.getMonth()+1}`.slice(-2);
        const day = `0${now.getDate()}`.slice(-2);
        return `${year}-${month}-${day}`;
    }
    static #hasTimeZone(value) {
        if (value.match(this.#regexpTimeZone)) { return true; }
        return false;
    }
}
