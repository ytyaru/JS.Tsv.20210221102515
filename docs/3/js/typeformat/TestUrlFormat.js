import UrlFormat from './UrlFormat.js';
export default class TestUrlFormat {
    static test() {
        this.#testIsMatch();
        this.#testToType();
    }
    static #testIsMatch() {
        console.assert(true === UrlFormat.isMatch('http://www.abc.com'));
        console.assert(true === UrlFormat.isMatch('http://www.abc.com/'));
        console.assert(true === UrlFormat.isMatch('http://www.abc.com/index.html'));
        console.assert(true === UrlFormat.isMatch('http://www.abc.com/index.html#anchor'));
        console.assert(true === UrlFormat.isMatch('http://www.abc.com/index.html?q=key%20word&key=value'));
        console.assert(true === UrlFormat.isMatch('https://www.abc.com'));
        console.assert(true === UrlFormat.isMatch('https://www.abc.com/'));
        console.assert(true === UrlFormat.isMatch('https://www.abc.com/index.html'));
        console.assert(true === UrlFormat.isMatch('https://www.abc.com/index.html#anchor'));
        console.assert(true === UrlFormat.isMatch('https://www.abc.com/index.html?q=key%20word&key=value'));
        console.assert(true === UrlFormat.isMatch('file:///tmp/index.html'));
    }
    static #testToType() {
        for (const protocol of ['http', 'https']) {
            for (const url of [
                `${protocol}://abc.com`,
                `${protocol}://abc.com/`,
                `${protocol}://abc.com/index.html`,
                `${protocol}://abc.com/index.html#anchor`,
                `${protocol}://abc.com/index.html?q=key%20word&key=value`
            ]) {
                this.#assertToType(url);
            }
        }
    }
    static #assertToType(url) {
        console.assert(new URL(url).toString() === UrlFormat.toType(url).toString());
    }
}
