class TsvString {
    static toArray(source) {
        const lines = source.split('\n');
        const areas = this.#splitAreas(lines);
        console.log(areas);
    }
    static #splitAreas(lines) {
        const areas = [];
        let area = [];
        for (const line of lines) {
            if (0 === line.length) { areas.push(area); area = []; }
            else { area.push(line); }
        }
        return areas.filter(area=>0<area.length);
    }
    static fromArray(source) {

    }
    static #toArrayFromString(source) {

    }
    static #toArrayFromMap(source) {

    }
    static #toArrayFromObject(source) {

    }
}
