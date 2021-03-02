# JSはDeepCopyする手段がない

　なんとJSにはDeepCopyする手段が存在しない。できてもシャローコピーだけとか、getter/setterができないとか何かしら問題がある。

# 既存サードパーティ製ライブラリ

* https://qiita.com/suin/items/80e687dd1789b9d9d2fd

# ClassとObjectは違う

　さらに厄介なことにオブジェクトのDeepCopyとクラスインスタンスのDeepCopyは別物。

* https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance

# どうする？

　面倒なので２つ同じコードを書いてインスタンスを２つ作る。

