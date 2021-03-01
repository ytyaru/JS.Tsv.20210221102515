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
    console.log(data.sort((a, b) => Sorter.defaultSortObject(a, b, 'name')))
    console.log(data)
    console.log(Sorter.sort(data, ['group','id']))
    const data2 = []
    const row1 = new Map()
    row1.set('id', 1)
    row1.set('group', 1)
    row1.set('name', 'tom')
    data2.push(row1)
    const row2 = new Map()
    row2.set('id', 2)
    row2.set('group', 1)
    row2.set('name', 'tim')
    data2.push(row2)
    const row3 = new Map()
    row3.set('id', 3)
    row3.set('group', 3)
    row3.set('name', 'tomas')
    data2.push(row3)
    const row4 = new Map()
    row4.set('id', 4)
    row4.set('group', 3)
    row4.set('name', 'tanaka')
    data2.push(row4)
    const row5 = new Map()
    row5.set('id', 5)
    row5.set('group', 2)
    row5.set('name', 'takahashi')
    data2.push(row5)
    const row6 = new Map()
    row6.set('id', 6)
    row6.set('group', 2)
    row6.set('name', 'takada')
    data2.push(row6)
    console.log(Sorter.sort(data2, ['group','id']))

    // ソート引数
    // 1. 文字列                    ひとつのキーを昇順で
    // 2. 文字列の配列              指定した複数のキーを順に昇順で
    // 3. 文字列の配列, 方向の配列  指定した複数のキーを順に、指定した昇順・降順・デフォ順で
    // 4. キー名＋方向のMap         指定した複数のキーを順に、指定した昇順・降順・デフォ順で
//    console.log(Sorter.sort(data2, 'group'))
    console.log(Sorter.sort(data2, ['group','id'], [-1, 1]))
    const sortOrder = new Map();
    sortOrder.set('group', -1)
    sortOrder.set('id', 1)
//    console.log(Sorter.sort(data2, sortOrder))

    const data3 = [
        [1,1,"tom"],
        [2,1,"tim"],
        [3,3,"tomas"],
        [4,3,"tanaka"],
        [5,2,"takahashi"],
        [6,2,"takada"]
    ]
//    console.log(Sorter.sort(data3, [2,0]))

});
