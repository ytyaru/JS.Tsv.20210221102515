export default class TestBigInt {
    static test() {
        this.#testNew();
        this.#testNewZero();
        this.#testNewError();
        this.#testNewInfinity();
    }
    static #testNewZero() {
        console.assert(0n === BigInt(''));
//        console.assert(0n === BigInt(null));// TypeError: Cannot convert null to a BigInt at BigInt
    }
    static #testNewError() {
//    static #testNewNaN() {
//        console.assert(BigInt.isNaN(BigInt(undefined))); // TypeError: Cannot convert undefined to a BigInt
//        console.assert(BigInt.isNaN(BigInt(NaN))); // RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
//        console.assert(BigInt.isNaN(BigInt('abc'))); // SyntaxError: Cannot convert abc to a BigInt
//        console.assert(BigInt.isNaN(BigInt('true'))); // SyntaxError: Cannot convert true to a BigInt

//        console.assert(0.1 === BigInt('0.1')); // SyntaxError: Cannot convert 0.1 to a BigInt
//        console.assert(12.3 === BigInt('123e-1')); // 指数 SyntaxError: Cannot convert 123e-1 to a BigInt
//        console.assert(1230n === BigInt('123e+1')); // 指数 SyntaxError: Cannot convert 123e+1 to a BigInt
//        console.assert(123n === BigInt('123e0')); // 指数 SyntaxError: Cannot convert 123e0 to a BigInt
//        console.assert(1230n === BigInt('123e1')); // 指数 SyntaxError: Cannot convert 123e1 to a BigInt
    }
    static #testNewInfinity() {
//        console.assert(Infinity === BigInt('Infinity')); // SyntaxError: Cannot convert Infinity to a BigInt
//        console.assert(-Infinity === BigInt('-Infinity')); // SyntaxError: Cannot convert -Infinity to a BigInt
    }
    static #testNew() {
        console.assert(0n === BigInt('0'));
        console.assert(1n === BigInt('1'));
        console.assert(0n !== BigInt('1'));
        console.assert(-1n === BigInt('-1'));
//        console.assert(1n === BigInt('1n')); // SyntaxError: Cannot convert 1n to a BigInt
        console.assert(9007199254740991n === BigInt('9007199254740991'));
//        console.assert(0.1 === BigInt('0.1'));
//        console.assert(-0.1 === BigInt('-0.1'));
//        console.assert(12.3 === BigInt('123e-1')); // 指数 SyntaxError: Cannot convert 123e-1 to a BigInt
//        console.assert(1230n === BigInt('123e+1')); // 指数 SyntaxError: Cannot convert 123e+1 to a BigInt
//        console.assert(123n === BigInt('123e0')); // 指数 SyntaxError: Cannot convert 123e0 to a BigInt
//        console.assert(1230n === BigInt('123e1')); // 指数 SyntaxError: Cannot convert 123e1 to a BigInt
        console.assert(0xffn === BigInt('0xff')); // 16進数
        console.assert(0xFFn === BigInt('0XFF')); // 16進数
        console.assert(0o777n === BigInt('0o777')); // 8進数
        console.assert(0b101n === BigInt('0b101')); // 2進数
    }
}
