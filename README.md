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
        （夥しい数）
```
こう変えて。
```sql
        @value1     char         = '1'
        @value22    char(5)      = '22'
        @value333   varchar      = '333'
        @value4444  varchar(10)  = '4444'
        @value55555 varchar(max) = '55555'
        （夥しい数）
```
って言われたので、  
　  
無理！そんな事してたら発狂しちゃう！  
と思って作ったスクリプト。  

Readmeもソース内のコメントも日本語なのは、こんな事が要求されるのは、ジャパニーズ・トラディショナル企業オンリーではないかという思い込みから。  
　  
そして、エンプラ企業らしく、IE8 での動作確認を完了！    
（古いブラウザでも動くように構文を配慮。）
　        
加えて、「会社のPCではネットが使えない！」という、スレイブ・ソルジャーにも活用してもらえるようにと、htmlファイル１個で動くように配慮済み！
　        
　        
今見ると、「何だこのイケてないアルゴリズムは！！」と悶絶中！
　        
　        
　        
　        

# insert文を作る的な何か
https://kakisoft.github.io/MyTrivialTools/CreateInsertStatement.html
## 概要
こういった内容から
```
id	name	age	email	company_name
1	kaki	12	a@cbom	ペーパー
2	soft	34	b@cbom	架空
3	fake	56	y@xcom	税金対策
```
↓みたいな INSERT文を生成。      
```sql
INSERT INTO __TABLENAME__ (id,name,age,email,company_name) VALUES (1,"kaki",12,"a@cbom","ペーパー");
INSERT INTO __TABLENAME__ (id,name,age,email,company_name) VALUES (2,"soft",34,"b@cbom","架空");
INSERT INTO __TABLENAME__ (id,name,age,email,company_name) VALUES (3,"fake",56,"y@xcom","税金対策");
```
テーブル名とカラム名をだらしなく何度も出力しているのは、Oracleでも使えるようにしといたせい。  
　    
Excel やスプレッドシートに、登録したい値を書く　→　貼り付けて INSERT文を作成。  
という運用を想定しています。  
　    
テーブル名とカラム名に、文字列「%s」を含んだ内容を是が非でも使いたい~~奇特な~~方は、ご使用をお控えください。

　    
　    
　    
　    
# CodeStyleConverter
変数名を、スネーク or キャメル or パスカルに変換。      
https://kakisoft.github.io/MyTrivialTools/VariableNameStyleConverter.html
## 概要
こんな感じ。
```
member_id
last_login_on
custom_field_id
created_at
```
　　　SnakeToCamel　↓　↑　CamelToSnake
```
memberId
lastLoginOn
customFieldId
createdAt
```
　    
　    
　    
　    
# insert文のカラムを合わせたい的な何か
https://kakisoft.github.io/MyTrivialTools/SoftenInsertStatement.html
## 概要
こういった内容から
```sql
INSERT INTO table01 
(
 id,
 name,
 email
)
VALUES
(
1,
kaki,
a@b
)
```
↓みたいな内容を生成。


| id    | 1    | 
|:------|:-----|
| name  | kaki | 
| email | a@b  | 


超長い INSERT文と格闘し続けるのが辛過ぎて作った。

　    
　    
　    
　    
# MarkDownTableConverter 的な何か
TSV ⇔ MarkDown形式のテーブル  
https://kakisoft.github.io/MyTrivialTools/MarkDownTableConverter  

## 概要
こんな感じ。
```
id	name	age	email	company_name
1	kaki	12	a@cbom	ペーパー
2	soft	34	b@cbom	架空
3	fake	56	y@xcom	税金対策
```
　　　TSV to MarkDownTable　↓　↑　MarkDownTable to TSV  
```
|  id |  name  |  age |  email   |  company_name  |
|:----|:-------|:-----|:---------|:---------------|
|  1  |  kaki  |  12  |  a@cbom  |  ペーパー        |
|  2  |  soft  |  34  |  b@cbom  |  架空           |
|  3  |  fake  |  56  |  y@xcom  |  税金対策       |
```
　    
　    
　    
　    
# dat.GUI を使ったカラーピッカー
https://kakisoft.github.io/MyTrivialTools/ColorPicker.html
　    
　    
　    
　    
# DBのカラム名を入力して、PHPのプロパティを作る的な何か
https://kakisoft.github.io/MyTrivialTools/PropertyMakerForPHP.html
　    
　    
　    
　    
# （仮）TemporaryScript01
https://kakisoft.github.io/MyTrivialTools/TemporaryScript01.html  
https://kakisoft.github.io/MyTrivialTools/TemporaryScript02.html  
