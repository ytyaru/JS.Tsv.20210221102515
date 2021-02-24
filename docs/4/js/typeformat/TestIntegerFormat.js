import IntegerFormat from './IntegerFormat.js';
export default class TestIntegerFormat {
    static test() {
        this.#testIsMatch();
        this.#testIsMatchFalse();
        this.#testToType();
        this.#testGetBase();
    }
    static #testIsMatch() {
        console.assert(true === IntegerFormat.isMatch('0'));
        console.assert(true === IntegerFormat.isMatch('1'));
        console.assert(true === IntegerFormat.isMatch('-1'));
        console.assert(true === IntegerFormat.isMatch('123'));
        console.assert(true === IntegerFormat.isMatch('0xFF'));
        console.assert(true === IntegerFormat.isMatch('0o777'));
        console.assert(true === IntegerFormat.isMatch('0b101'));
        console.assert(true === IntegerFormat.isMatch(Number.MAX_SAFE_INTEGER.toString()));
        console.assert(true === IntegerFormat.isMatch(Number.MIN_SAFE_INTEGER.toString()));
        console.assert(true === IntegerFormat.isMatch((2**53-1).toString()));
    }
    static #testIsMatchFalse() {
        console.assert(false === IntegerFormat.isMatch('2e1')); // 2 * 10^1 = 20
        console.assert(false === IntegerFormat.isMatch('NaN'));
        console.assert(false === IntegerFormat.isMatch('Infinity'));
    }
    static #testToType() {
        console.assert(0 === IntegerFormat.toType('0'));
        console.assert(1 === IntegerFormat.toType('1'));
        console.assert(-1 === IntegerFormat.toType('-1'));
        console.assert(123 === IntegerFormat.toType('123'));
        console.assert(0xFF === IntegerFormat.toType('0xFF'));
        console.assert(0o777 === IntegerFormat.toType('0o777'));
        console.assert(0b101 === IntegerFormat.toType('0b101'));
        console.assert(Number.MAX_SAFE_INTEGER === IntegerFormat.toType(Number.MAX_SAFE_INTEGER.toString()));
        console.assert(Number.MIN_SAFE_INTEGER === IntegerFormat.toType(Number.MIN_SAFE_INTEGER.toString()));
        console.assert((2**53-1) === IntegerFormat.toType((2**53-1).toString()));
    }
    static #testGetBase() {
        console.assert(10 === IntegerFormat.getBase('0'));
        console.assert(10 === IntegerFormat.getBase('1'));
        console.assert(10 === IntegerFormat.getBase('-1'));
        console.assert(10 === IntegerFormat.getBase('123'));
        console.assert(16 === IntegerFormat.getBase('0xFF'));
        console.assert(8 === IntegerFormat.getBase('0o777'));
        console.assert(2 === IntegerFormat.getBase('0b101'));
        console.assert(10 === IntegerFormat.getBase(Number.MAX_SAFE_INTEGER.toString()));
        console.assert(10 === IntegerFormat.getBase(Number.MIN_SAFE_INTEGER.toString()));
        console.assert(10 === IntegerFormat.getBase((2**53-1).toString()));
    }
}
