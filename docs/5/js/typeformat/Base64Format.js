export default class Base64Format {
    static #formatBase64 = '0=[0-9a-zA-Z+/=]+' // image/png;base64,xxxxxxx のようにMIMEタイプを入れるべき？ とりま0xのように適当なプレフィクスで識別させる
    static #regexpBase64 = new RegExp(`^${this.#formatBase64}$`);
    /*
    static #formatBase64 = '(application|font|image|audio|video)()[0-9a-zA-Z+/=]+'
    static #formatMimeType = '(application|font|image|audio|video|model|text|message|multipart)'
    static #formatMimeTypeApplication = '(javascript|ecmascript)'
    static #formatMimeTypeText = '(tsv|csv|json|xml|yaml|yml|toml|ini|txt|md|ad|javascript|ecmascript)'
    static #formatMimeTypeImage = '(apng|bmp|gif|x-icon|jpeg|png|svg+xml|tiff|webp)'
    static #formatMimeTypeAudio = '(wav|wave|ogg|mpeg|aac|midi|x-flac)'
    static #formatMimeTypeVideo = '(webm|ogg|mp4|mpeg|quicktime|x-msvideo)'
    */
    static isMatch(value) { // value:string
        if (value.match(this.#regexpBase64)) { return true; }
        return false;
    }
    static toType(value) {
//        return btoa(value);
//        return atob(value);
        return value;
    }
}
