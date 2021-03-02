export default class TestBase64 { // https://developer.mozilla.org/ja/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    static test() {
        const binary = 0xFF;
        /*
        console.log(btoa(binary));
        console.log(atob('MjU1'));
        console.log(typeof atob('MjU1'));
        */
        console.assert('MjU1' === btoa(binary))
        console.assert(0xFF == atob('MjU1'))
    }
}
