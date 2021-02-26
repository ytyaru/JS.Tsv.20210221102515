import FileLoader from './js/fileloader/FileLoader.js';
import TsvString from './js/tsvparser/TsvString.js';
import DataTable from './js/tsvparser/DataTable.js';
import Sorter from './js/tsvparser/Sorter.js';
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
        console.log(DataTable.get(TsvString.parse(tsv)));
    }

    const data = [
        {"id":1,"group":1,"name":"tom"},
        {"id":2,"group":1,"name":"tim"},
        {"id":3,"group":3,"name":"tomas"},
        {"id":4,"group":3,"name":"tanaka"},
        {"id":5,"group":2,"name":"takahashi"},
        {"id":6,"group":2,"name":"takada"}
    ]
    console.log(data)
    console.log(data.sort((a, b) => Sorter.defaultSort(a, b, 'name')))
    console.log(data)
    console.log(Sorter.sort(data, ['group','id']))
});
