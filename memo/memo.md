# TSV

　TSV文字列データからarray,object,MapといったJSオブジェクト型に変換する。

## 変換パターン

入力|出力
----|----
TSV文字列|二次元配列、オブジェクト配列、Map
二次元配列|TSV文字列、オブジェクト配列、Map
オブジェクト配列|TSV文字列、二次元配列、Map
Map|TSV文字列、二次元配列、オブジェクト配列

## TSVパターン

* Rowのみ
* 1Column+Row
* 2Column+Row
* 3Column+Row

```tsv
0   Yamada
1   Suzuki
```

```tsv
id  name
0   Yamada
1   Suzuki
```

```tsv
id  name
int str
0   Yamada
1   Suzuki
```

```tsv
id  name
int str
ID  名前
0   Yamada
1   Suzuki
```

```tsv
key type    name    sortOrder   sortDirect  
id  name
int str
ID  名前
1   2
asc desc
0   Yamada
1   Suzuki
```

```tsv
key:id  name
type:int str
name:ID  名前
sortOrder:1   2
sortDirect:asc desc
0   Yamada
1   Suzuki
```

```tsv
key     type    name    sortOrder   sortDirect
id      int     ID      1           asc
name    str     名前    2           desc

id  name
0   Yamada
1   Suzuki
```

```tsv
key     type    name
id      int     ID
name    str     名前

key     order   hidden  sortOrder   sortDirect
id      1       true    1           asc
name    2       true    2           desc

id  name
0   Yamada
1   Suzuki
```

```tsv
key     type    name        nullable
id      int     ID
name    str     名前
age     int     年齢
secret  str     秘密キー

blank: undefined|null|empty
tz: +0900
show: id, name
sort: id+, name-
pagination: 50
autopager: 50
aggregate: age:{sum, average}, ...:{}, ...

id  name    age secret  birth
0   Yamada  20  aaa     2000-01-01
1   Suzuki  30  bbb     2000-01-02
```

　最大で３要素ある。空行で区切る。

* column
* table
* row



## API

* Tsv
    * `new Tsv(source)`
    * `Tsv.toArray(source)`
    * `Tsv.toObject(source)`
    * `Tsv.toMap(source)`
    * `Tsv.toTsv(source)`

