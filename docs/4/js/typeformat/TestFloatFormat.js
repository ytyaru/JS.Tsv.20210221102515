import FloatFormat from './FloatFormat.js';
export default class TestFloatFormat {
    static test() {
        this.#testIsMatch();
        this.#testToType();
    }
    static #testIsMatch() {
        console.assert(true === FloatFormat.isMatch('.0'));
        console.assert(true === FloatFormat.isMatch('0.0'));
        console.assert(true === FloatFormat.isMatch('12.34'));
        console.assert(true === FloatFormat.isMatch('-.5'));
        console.assert(true === FloatFormat.isMatch('-0.5'));
        console.assert(true === FloatFormat.isMatch('-12.34'));
    }
    static #testToType() {
        console.assert(0.0 === FloatFormat.toType('.0'));
        console.assert(0.0 === FloatFormat.toType('0.0'));
        console.assert(12.34 === FloatFormat.toType('12.34'));
        console.assert(-0.5 === FloatFormat.toType('-.5'));
        console.assert(-0.5 === FloatFormat.toType('-0.5'));
        console.assert(-12.34 === FloatFormat.toType('-12.34'));
    }
}
