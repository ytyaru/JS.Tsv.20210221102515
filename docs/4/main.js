import TsvString from './js/tsvparser/TsvString.js';
import FileLoader from './js/fileloader/FileLoader.js';
window.addEventListener('load', async(event) => {
    for (const name of ['test-row.tsv', 'test-column1-row.tsv', 'test-column-row.tsv', 'test-column-table-row.tsv']) {
        console.log(name);
        console.log(TsvString.toArray(await FileLoader.load(`../tsv/${name}`)));
        console.log(TsvString.toObject(await FileLoader.load(`../tsv/${name}`)));
        console.log(TsvString.toMap(await FileLoader.load(`../tsv/${name}`)));
    }
});
