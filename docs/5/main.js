import TsvString from './js/tsvparser/TsvString.js';
import FileLoader from './js/fileloader/FileLoader.js';
window.addEventListener('load', async(event) => {
    for (const name of ['test-row.tsv', 'test-column1-row.tsv', 'test-column-row.tsv', 'test-column-table-row.tsv']) {
        const tsv = await FileLoader.load(`../tsv/${name}`)
        console.log(name);
        console.log(TsvString.toArray(tsv));
        console.log(TsvString.toObject(tsv));
        console.log(TsvString.toMap(tsv));
        console.log(TsvString.parse(tsv));
        console.log(TsvString.parse(tsv, 'object'));
        console.log(TsvString.parse(tsv, 'map'));
    }
});
