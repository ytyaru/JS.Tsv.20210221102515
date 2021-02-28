# interface

* TSVからJSオブジェクトに変換する
* TSVからJSクラスに変換する
* JSクラスから処理する
    * ソート
    * フィルタ
    * DOM作成
        * イベント処理

```javascript
table = DataTable.get(TsvString.parse(await FileLoader.load(`../tsv/${name}`)));
table.columns
table.rows
table.state

table.sort(keys, orders);
table.sort(orderBy);
table.sort(['id', 'name'], [1, -1]);
const orderBy = new Map()
orderBy.set('id', 1)
orderBy.set('name', -1)
table.sort(orderBy);
```
```javascript
table.Data
    table.Data.columns
    table.Data.rows
    table.Data.state

table.RowType = Array/Object/Map

table.OrderBy.clear()
table.OrderBy.set('id', 1)
table.OrderBy.set('name', -1)
table.OrderBy.clear()
table.sort()

table.Where.clear()
table.Where.set('id', v=>v > 10)
table.Where.set('group', v=>v > 2)
table.filter()
```

