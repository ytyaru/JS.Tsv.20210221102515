import TypeFormat from './TypeFormat.js';
import TestNumber from './TestNumber.js';
import TestBigInt from './TestBigInt.js';
import TestBase64 from './TestBase64.js';
import TestIntegerFormat from './TestIntegerFormat.js';
import TestFloatFormat from './TestFloatFormat.js';
import TestDateFormat from './TestDateFormat.js';
import TestUrlFormat from './TestUrlFormat.js';
export default class TestTypeFormat {
    static test() {
        TestNumber.test();
        TestBigInt.test();
        TestBase64.test();
        TestIntegerFormat.test();
        TestFloatFormat.test();
        TestDateFormat.test();
        TestUrlFormat.test();
        this.#testTypeOfLiteral();
        this.#testTypeOfBoolean();
        this.#testTypeOfInteger();
        this.#testTypeOfBigInt();
        this.#testTypeOfFloat();
//        this.#testTypeOfNumber();
        this.#testTypeOfDate();
        this.#testTypeOfUrl();
        this.#testTypeOfString();
        this.#testToTypeLiteral();
        this.#testToTypeBoolean();
        this.#testToTypeInteger();
        this.#testToTypeBigInt();
        this.#testToTypeFloat();
//        this.#testToTypeNumber();
        this.#testToTypeDate();
        this.#testToTypeUrl();
        this.#testToTypeString();
        console.log('Finished assert !!');
    }
    static #testTypeOfLiteral() {
        console.assert('undefined' === TypeFormat.typeof(undefined));
        console.assert('null' === TypeFormat.typeof(null));
        console.assert('NaN' === TypeFormat.typeof(NaN));
    }
    static #testTypeOfBoolean() {
        console.assert('boolean' === TypeFormat.typeof('true'));
        console.assert('boolean' === TypeFormat.typeof('false'));
    }
    static #testTypeOfInteger() {
        console.assert('integer' === TypeFormat.typeof('0'));
        console.assert('integer' === TypeFormat.typeof('123'));
        console.assert('integer' === TypeFormat.typeof('-1'));
//        console.assert('integer' === TypeFormat.typeof('0.0'));
//        console.assert('integer' === TypeFormat.typeof('-0.0'));
        console.assert('integer' === TypeFormat.typeof('0xFF'));
        console.assert('integer' === TypeFormat.typeof('0o777'));
        console.assert('integer' === TypeFormat.typeof('0b101'));
//        console.assert('integer' === TypeFormat.typeof('2e1')); // 2 * 10^1 = 20
//        console.assert('integer' === TypeFormat.typeof('NaN'));
//        console.assert('integer' === TypeFormat.typeof('Infinity'));
        console.assert('integer' === TypeFormat.typeof(Number.MAX_SAFE_INTEGER.toString()));
        console.assert('integer' === TypeFormat.typeof(Number.MIN_SAFE_INTEGER.toString()));
        console.assert('integer' === TypeFormat.typeof((2**53-1).toString()));
    }
    static #testTypeOfBigInt() {
        console.assert('bigint' === TypeFormat.typeof((2**53).toString()));
        console.assert('bigint' === TypeFormat.typeof('9007199254740991n'));
        console.assert('bigint' === TypeFormat.typeof('0xFFn'));
        console.assert('bigint' === TypeFormat.typeof('0o777n'));
        console.assert('bigint' === TypeFormat.typeof('0b101n'));
        console.assert('bigint' === TypeFormat.typeof('0x1ffffffffffffff'));
    }
    static #testTypeOfFloat() {
        console.assert('float' === TypeFormat.typeof('.0'));
        console.assert('float' === TypeFormat.typeof('0.0'));
        console.assert('float' === TypeFormat.typeof('-0.1'));
    }
    /*
    static #testTypeOfNumber() {
        console.assert('number' === TypeFormat.typeof('0'));
        console.assert('number' === TypeFormat.typeof('123'));
        console.assert('number' === TypeFormat.typeof('-1'));
        console.assert('number' === TypeFormat.typeof('0.0'));
        console.assert('number' === TypeFormat.typeof('-0.0'));
        console.assert('number' === TypeFormat.typeof('0xFF'));
        console.assert('number' === TypeFormat.typeof('080'));
        console.assert('number' === TypeFormat.typeof('2e1')); // 2 * 10^1 = 20
        console.assert('number' === TypeFormat.typeof('NaN'));
        console.assert('number' === TypeFormat.typeof('Infinity'));
        console.assert('number' === TypeFormat.typeof(Number.MAX_SAFE_INTEGER.toString()));
        console.assert('number' === TypeFormat.typeof(Number.MIN_SAFE_INTEGER.toString()));
    }
    */
    static #testTypeOfDate() {
        console.assert('date' === TypeFormat.typeof('2020-01-02'));
        console.assert('date' === TypeFormat.typeof('2020-01-02 12:34:56'));
        console.assert('date' === TypeFormat.typeof('2020-01-02T12:34:56Z'));
        console.assert('date' === TypeFormat.typeof('2020-01-02T12:34:56+0900'));
        console.assert('date' === TypeFormat.typeof('2020-01-02T12:34:56+09:00'));
        console.assert('date' === TypeFormat.typeof('2020-01-02T12:34:56-1200'));
        console.assert('date' === TypeFormat.typeof('2020-01-02T12:34:56-12:00'));
        console.assert('date' === TypeFormat.typeof('2020-01-02 12:34:56.789'));
        console.assert('date' === TypeFormat.typeof('2020-01-02T12:34:56.789Z'));
        console.assert('date' === TypeFormat.typeof('2020-01-02T12:34:56.789+0900'));
        console.assert('date' === TypeFormat.typeof('2020-01-02T12:34:56.789+09:00'));
        console.assert('date' === TypeFormat.typeof('2020-01-02T12:34:56.789-12:00'));
        console.assert('date' === TypeFormat.typeof('12:34:56'));
        console.assert('date' === TypeFormat.typeof('12:34:56.789'));
    }
    static #testTypeOfUrl() {
        console.assert('url' === TypeFormat.typeof('http://www.abc.com'));
        console.assert('url' === TypeFormat.typeof('http://www.abc.com/'));
        console.assert('url' === TypeFormat.typeof('http://www.abc.com/index.html'));
        console.assert('url' === TypeFormat.typeof('http://www.abc.com/index.html#anchor'));
        console.assert('url' === TypeFormat.typeof('http://www.abc.com/index.html?q=key%20word&key=value'));
        console.assert('url' === TypeFormat.typeof('https://www.abc.com'));
        console.assert('url' === TypeFormat.typeof('https://www.abc.com/'));
        console.assert('url' === TypeFormat.typeof('https://www.abc.com/index.html'));
        console.assert('url' === TypeFormat.typeof('https://www.abc.com/index.html#anchor'));
        console.assert('url' === TypeFormat.typeof('https://www.abc.com/index.html?q=key%20word&key=value'));
        console.assert('url' === TypeFormat.typeof('file:///tmp/index.html'));
    }
    static #testTypeOfString() {
        console.assert('string' === TypeFormat.typeof('2e1')); // 2 * 10^1 = 20
        console.assert('string' === TypeFormat.typeof('Infinity'));
        console.assert('string' === TypeFormat.typeof('123ABC'));
        console.assert('string' === TypeFormat.typeof('090-0000-0000'));
        console.assert('string' === TypeFormat.typeof('null'));
        console.assert('string' === TypeFormat.typeof('undefined'));
        console.assert('string' === TypeFormat.typeof(''));
        console.assert('string' === TypeFormat.typeof(' '));
        console.assert('string' === TypeFormat.typeof('\t'));
        console.assert('string' === TypeFormat.typeof('\n'));
        console.assert('string' === TypeFormat.typeof('True'));
        console.assert('string' === TypeFormat.typeof('False'));
        console.assert('string' === TypeFormat.typeof('abc'));
        console.assert('string' === TypeFormat.typeof('⚠'));
        console.assert('string' === TypeFormat.typeof('漢字'));
    }

    static #testToTypeLiteral() {
        console.assert(undefined === TypeFormat.toType(undefined));
        console.assert(null === TypeFormat.toType(null));
        console.assert(true === Number.isNaN(TypeFormat.toType(NaN)));
    }
    static #testToTypeBoolean() {
        console.assert(true === TypeFormat.toType('true'));
        console.assert(false === TypeFormat.toType('false'));
    }
    static #testToTypeInteger() {
        console.assert(0 === TypeFormat.toType('0'));
        console.assert(123 === TypeFormat.toType('123'));
        console.assert(-1 === TypeFormat.toType('-1'));
//        console.assert('integer' === TypeFormat.toType('0.0'));
//        console.assert('integer' === TypeFormat.toType('-0.0'));
        console.assert(0xFF === TypeFormat.toType('0xFF'));
        console.assert(0o777 === TypeFormat.toType('0o777'));
        console.assert(0b101 === TypeFormat.toType('0b101'));
//        console.assert('integer' === TypeFormat.toType('2e1')); // 2 * 10^1 = 20
//        console.assert('integer' === TypeFormat.toType('NaN'));
//        console.assert('integer' === TypeFormat.toType('Infinity'));
        console.assert(Number.MAX_SAFE_INTEGER === TypeFormat.toType(Number.MAX_SAFE_INTEGER.toString()));
        console.assert(Number.MIN_SAFE_INTEGER === TypeFormat.toType(Number.MIN_SAFE_INTEGER.toString()));
        console.assert((2**53-1) === TypeFormat.toType((2**53-1).toString()));
    }
    static #testToTypeBigInt() {
        console.assert(BigInt(2**53) === TypeFormat.toType((2**53).toString()));
        console.assert(9007199254740991n === TypeFormat.toType('9007199254740991n'));
        console.assert(0xFFn === TypeFormat.toType('0xFFn'));
        console.assert(0o777n === TypeFormat.toType('0o777n'));
        console.assert(0b101n === TypeFormat.toType('0b101n'));
        console.assert(0x1ffffffffffffffn === TypeFormat.toType('0x1ffffffffffffff')); // 2^53-1を超えたらBigInt型にして返す
    }
    static #testToTypeFloat() {
        console.assert(0.0 === TypeFormat.toType('.0'));
        console.assert(0.0 === TypeFormat.toType('0.0'));
        console.assert(-0.1 === TypeFormat.toType('-0.1'));
    }
    static #testToTypeDate() {
        console.assert(Date.parse(`2020-01-02T00:00:00Z`) === TypeFormat.toType('2020-01-02').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56Z`) === TypeFormat.toType('2020-01-02 12:34:56').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56Z`) === TypeFormat.toType('2020-01-02T12:34:56Z').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56+0900`) === TypeFormat.toType('2020-01-02T12:34:56+0900').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56+0900`) === TypeFormat.toType('2020-01-02T12:34:56+09:00').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56-1200`) === TypeFormat.toType('2020-01-02T12:34:56-1200').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56-1200`) === TypeFormat.toType('2020-01-02T12:34:56-12:00').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56.789Z`) === TypeFormat.toType('2020-01-02 12:34:56.789').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56.789Z`) === TypeFormat.toType('2020-01-02T12:34:56.789Z').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56.789+0900`) === TypeFormat.toType('2020-01-02T12:34:56.789+0900').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56.789+0900`) === TypeFormat.toType('2020-01-02T12:34:56.789+09:00').getTime());
        console.assert(Date.parse(`2020-01-02T12:34:56.789-1200`) === TypeFormat.toType('2020-01-02T12:34:56.789-12:00').getTime());

        const now = new Date(); // 現在日時
        const yearUTC = `${now.getUTCFullYear()}`;
        const monthUTC = `0${now.getUTCMonth()+1}`.slice(-2);
        const dayUTC = `0${now.getUTCDate()}`.slice(-2);
        const year = `${now.getFullYear()}`;
        const month = `0${now.getMonth()+1}`.slice(-2);
        const day = `0${now.getDate()}`.slice(-2);
        console.assert(Date.parse(`${yearUTC}-${monthUTC}-${dayUTC}T12:34:56Z`) === TypeFormat.toType('12:34:56').getTime());
        console.assert(Date.parse(`${yearUTC}-${monthUTC}-${dayUTC}T12:34:56.789Z`) === TypeFormat.toType('12:34:56.789').getTime());
    }
    static #testToTypeUrl() {
        for (const protocol of ['http', 'https']) {
            for (const url of [
                `${protocol}://abc.com`,
                `${protocol}://abc.com/`,
                `${protocol}://abc.com/index.html`,
                `${protocol}://abc.com/index.html#anchor`,
                `${protocol}://abc.com/index.html?q=key%20word&key=value`
            ]) {
                console.assert(new URL(url).toString() === TypeFormat.toType(url).toString());
            }
        }
    }
    static #testToTypeString() {
        console.assert('2e1' === TypeFormat.toType('2e1')); // 2 * 10^1 = 20
        console.assert('Infinity' === TypeFormat.toType('Infinity'));
        console.assert('123ABC' === TypeFormat.toType('123ABC'));
        console.assert('090-0000-0000' === TypeFormat.toType('090-0000-0000'));
//        console.assert('' === TypeFormat.toType('null'));
//        console.assert('' === TypeFormat.toType('undefined'));
        console.assert('' === TypeFormat.toType(''));
        console.assert(' ' === TypeFormat.toType(' '));
        console.assert('\t' === TypeFormat.toType('\t'));
        console.assert('\n' === TypeFormat.toType('\n'));
        console.assert('True' === TypeFormat.toType('True'));
        console.assert('False' === TypeFormat.toType('False'));
        console.assert('abc' === TypeFormat.toType('abc'));
        console.assert('⚠' === TypeFormat.toType('⚠'));
        console.assert('漢字' === TypeFormat.toType('漢字'));
    }
}

