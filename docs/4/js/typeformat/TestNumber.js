export default class TestNumber {
    static test() {
        this.#testNew();
        this.#testNewZero();
        this.#testNewNaN();
        this.#testNewInfinity();
    }
    static #testNewZero() {
        console.assert(0 === Number(''));
        console.assert(0 === Number(null));
    }
    static #testNewNaN() {
        console.assert(Number.isNaN(Number(undefined)));
        console.assert(Number.isNaN(Number(NaN)));
        console.assert(Number.isNaN(Number('abc')));
        console.assert(Number.isNaN(Number('true')));
    }
    static #testNewInfinity() {
        console.assert(Infinity === Number('Infinity'));
        console.assert(-Infinity === Number('-Infinity'));
    }
    static #testNew() {
        console.assert(0 === Number('0'));
        console.assert(1 === Number('1'));
        console.assert(0 !== Number('1'));
        console.assert(-1 === Number('-1'));
        console.assert(0.1 === Number('0.1'));
        console.assert(-0.1 === Number('-0.1'));
        console.assert(12.3 === Number('123e-1')); // 指数
        console.assert(123 === Number('123e0')); // 指数
        console.assert(1230 === Number('123e1')); // 指数
        console.assert(0xff === Number('0xff')); // 16進数
        console.assert(0xFF === Number('0XFF')); // 16進数
        console.assert(0o777 === Number('0o777')); // 8進数
        console.assert(0b101 === Number('0b101')); // 2進数
    }
}
