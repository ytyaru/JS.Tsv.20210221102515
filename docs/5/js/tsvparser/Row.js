import TypeFormat from '../typeformat/TypeFormat.js';
export default class Row {
    static fromTsv(source) {
        const tsv = source[source.length - 1];
        const rows = [];
        for (const line of tsv) {
            const fields = [];
            for (const [c, field] of line.split('\t').entries()) {
                fields.push(TypeFormat.toType(field));
            }
            rows.push(fields);
        }
        return rows;
    }
    static #getTypeId(typeName) {
        if ('undefined' === typeName) { return 'undefined'; }
        else if ('null' === typeName) { return 'null'; }
        else if ('NaN' === typeName) { return 'NaN'; }
        else if ('b' === typeName || 'bool' === typeName || 'boolean' === typeName) { return 'boolean'; }
        else if ('i' === typeName || 'int' === typeName || 'integer' === typeName) { return 'integer'; }
        else if ('f' === typeName || 'float' === typeName) { return 'float'; }
        else if ('l' === typeName || 'bigint' === typeName) { return 'bigint'; }
        else if ('d' === typeName || 'date' === typeName || 'time' === typeName || 'datetime' === typeName) { return 'date'; }
        else if ('u' === typeName || 'url' === typeName) { return 'url'; }
        else if ('base64' === typeName) { return 'base64'; }
        else { throw new Error('未定義の型です。'); }
    }
}
