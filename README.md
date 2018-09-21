## MyTrivialTools
仕事で使うちょっとしたツール      
      
ブチ適当でも、とりあえず作って、後からブラッシュアップしていくスタイル。    
      
もしくは、雑な状態のまま使い続けていくスタイル。  
         
　        
# ソースコードの縦位置を合わせる
https://kakisoft.github.io/MyTrivialTools/CodeSyntaxFormatter.html
　  
## 概要
　  
こういうのを
```sql
        @value1 char = '1'
        @value22 char(1) = '22'
        @value333 varchar = '333'
        @value4444 varchar(10) = '4444'
        @value55555 varchar(max) = '55555'
        （300個ぐらい）
```
こう変えて。
```sql
        @value1     char         = '1'
        @value22    char(5)      = '22'
        @value333   varchar      = '333'
        @value4444  varchar(10)  = '4444'
        @value55555 varchar(max) = '55555'
        （300個ぐらい）
```
って言われたので、  
　  
無理！そんな事してたら発狂しちゃう！  
と思って作ったスクリプト。  

Readmeもソース内のコメントも日本語なのは、こんな事が要求されるのは、ジャパニーズ・トラディショナル企業オンリーではないかという思い込みから。  
　  
そして、エンプラ企業らしく、IE8 での動作確認を完了！      
　        
加えて、「会社のPCではネットが使えない！」という、スレイブ・ソルジャーにも活用してもらえるようにと、htmlファイル１個で動くように配慮済み！
　        
　        
今見ると、「何だこのイケてないアルゴリズムは！！」と悶絶中！

# CodeStyleConverter
変数名を、スネーク or キャメル or パスカルに変換。      
https://kakisoft.github.io/MyTrivialTools/VariableNameStyleConverter.html
　    
　    
　    
　    
# DBのカラム名を入力して、PHPのプロパティを作る的な何か
https://kakisoft.github.io/MyTrivialTools/PropertyMakerForPHP.html
　    
　    
　    
　    
# （仮）TemporaryScript01
https://kakisoft.github.io/MyTrivialTools/TemporaryScript01.html
