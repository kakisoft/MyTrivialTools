function ShapingVerticalPosition(baseCharacter, targetSyntaxContentArray, resultSyntaxContentArray, ignoreHeadNumber=0, ignoreTailNumber=0){
  SPACE_CHARACTER = " ";
  NEW_LINE_CHARACTER = "\n";
  BASE_CHARACTER = baseCharacter;

  //////////（特殊制御）//////////
  headElements = [];
  tailElements = [];

  for(var i=0; i < ignoreHeadNumber; i++){
    headElements.push(targetSyntaxContentArray.shift());
  }

  for(var i=0; i < ignoreTailNumber; i++){
    tailElements.push(targetSyntaxContentArray.pop());
  }
  /////////////////////////////////


  //-----＜ シンタックスの右側のスペースを整形 ＞-----
  formatFirstSyntaxOfRight(targetSyntaxContentArray, resultSyntaxContentArray);

  //-----＜ イコール前後のスペースを整形 ＞-----
  targetSyntaxContentArray = resultSyntaxContentArray; //前回の処理結果を、今回の処理ターゲットとして設定
  resultSyntaxContentArray = []; //前回の処理結果をクリア
  formatEqualCharacterBeforeAndAfter(targetSyntaxContentArray, resultSyntaxContentArray);


  //////////（特殊制御）//////////
  headElements.reverse();
  tailElements.reverse();

  for(var i=0; i < ignoreHeadNumber; i++){
    targetSyntaxContentArray.unshift(headElements.shift());
  }

  for(var i=0; i < ignoreHeadNumber; i++){
    targetSyntaxContentArray.push(tailElements.shift());
  }
  /////////////////////////////////

}

//======================================
//  シンタックスの右側のスペースを整形
//======================================
function formatFirstSyntaxOfRight(targetSyntaxContentArray, resultSyntaxContentArray){
  var edittingContextArray = [];
  var maxSizeFirstSyntax = 0;
  var maxSpaceCountLeftSideOfSyntax = 0;

  //--------------------
  //  入力内容を取得
  //--------------------
  for(var i=0; i < targetSyntaxContentArray.length; i++){

    //最初のシンタックスの開始位置を検出。
    var firstSyntaxStartPosition = targetSyntaxContentArray[i].search("[^"+ SPACE_CHARACTER +"]");

    //最初のシンタックスの終了位置を検出。
    var firstSyntaxEndPosition = targetSyntaxContentArray[i].indexOf(SPACE_CHARACTER, firstSyntaxStartPosition);
    if( firstSyntaxEndPosition <= -1 ){
      firstSyntaxEndPosition = targetSyntaxContentArray[i].length;
    }

    //行ごとのデータを保持する
    edittingContextArray[i] = [
                                      targetSyntaxContentArray[i].slice(firstSyntaxStartPosition, firstSyntaxEndPosition)
                                     ,targetSyntaxContentArray[i].slice(firstSyntaxEndPosition + 1)
                                  ];

    //最初のシンタックスの左側のスペース数を保持。
    if( maxSpaceCountLeftSideOfSyntax < firstSyntaxStartPosition ){
      maxSpaceCountLeftSideOfSyntax = firstSyntaxStartPosition;
    }

    //最初のシンタックスの最大サイズを記録する。
    if( maxSizeFirstSyntax <  edittingContextArray[i][0].length){
      maxSizeFirstSyntax = edittingContextArray[i][0].length;
    }
  }

  //--------------------
  //       編集
  //--------------------
  for(var i=0; i < edittingContextArray.length; i++){
    resultSyntaxContentArray[i] = "";

    //最初のシンタックスの左側をスペースで埋める
    for(var j=0; j < maxSpaceCountLeftSideOfSyntax; j++){
      resultSyntaxContentArray[i] += SPACE_CHARACTER;
    }

    //最初のシンタックスをセット
    resultSyntaxContentArray[i] += edittingContextArray[i][0];

    //最初のシンタックスの右側をスペースで整形する
    resultSyntaxContentArray[i] += SPACE_CHARACTER;
    if( edittingContextArray[i][0].length <= maxSizeFirstSyntax ){
      for(var k=edittingContextArray[i][0].length; k < maxSizeFirstSyntax; k++){
        resultSyntaxContentArray[i] += SPACE_CHARACTER;
      }
    }

    //残りの構文をセット
    resultSyntaxContentArray[i] += edittingContextArray[i][1].trim();
  }

}

//======================================
//     イコール前後のスペースを整形
//======================================
function formatEqualCharacterBeforeAndAfter(targetSyntaxContentArray, resultSyntaxContentArray){
  var edittingContextArray = [];
  var maxSizeLeftSideOfEqualCaracter = 0;

  //--------------------
  //  入力内容を取得
  //--------------------
  for(var i=0; i < targetSyntaxContentArray.length; i++){

    //イコールの位置を検索。
    var equalCharacterPosition = targetSyntaxContentArray[i].search("["+ BASE_CHARACTER +"]");
    if(equalCharacterPosition <= -1){
      equalCharacterPosition = targetSyntaxContentArray[i].length; //検出できなかった場合、末尾までデータを切り出す。
    }

    //行ごとのデータを保持する
    edittingContextArray[i] = [
                                  targetSyntaxContentArray[i].slice(0, equalCharacterPosition)
                                 ,targetSyntaxContentArray[i].slice(equalCharacterPosition).trim()
                              ];

    //イコールの左側のシンタックスの、最大サイズを記録する。
    if( maxSizeLeftSideOfEqualCaracter <  edittingContextArray[i][0].length){
      maxSizeLeftSideOfEqualCaracter = edittingContextArray[i][0].length;
    }

  }


  //--------------------
  //       編集
  //--------------------
  for(var i=0; i < edittingContextArray.length; i++){
    resultSyntaxContentArray[i] = "";

    //イコールの左側のシンタックスをセット。
    resultSyntaxContentArray[i] += edittingContextArray[i][0];

    //イコールの左側のシンタックスの右側を、スペースで整形する。
    if( edittingContextArray[i][0].length <= maxSizeLeftSideOfEqualCaracter ){
      for(var k=edittingContextArray[i][0].length; k < maxSizeLeftSideOfEqualCaracter; k++){
        resultSyntaxContentArray[i] += SPACE_CHARACTER;
      }
    }

    //残りの構文をセット
    resultSyntaxContentArray[i] += edittingContextArray[i][1];
  }
}
