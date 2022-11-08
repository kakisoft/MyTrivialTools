var KakiStdUtil = {};

//===================================
//  Get Selected Radio Button Value
//===================================
KakiStdUtil.getSelectedRadioButtonValue = function(name){
  var radios = document.getElementsByName(name);

  var result;
  for(var i=0; i<radios.length; i++){
    if (radios[i].checked) {
      result = radios[i].value;
      break;
    }
  }

  return result;
}


//===================================
//         Get ObjectName
//===================================
KakiStdUtil.getObjectName = function(targetObject){
  var objectName = Object.prototype.toString.call(targetObject).slice(8, -1);

  return objectName;
}


//===================================
//          surround Text
//===================================
KakiStdUtil.surroundText = function(value, targetChar){
  var result;

  result = targetChar + value + targetChar;

  return result;
}

//===================================
//        surround HTML Tag
//===================================
KakiStdUtil.surroundHTMLTag = function(value, targetTag){
  var startTag = "<"  + targetTag + ">";
  var endTag   = "</" + targetTag + ">";
  var result;

  result = startTag + value + endTag;

  return result;
}


//===================================
//
//
//  [AS] => [  AS  ]
//===================================
KakiStdUtil.getAppendCharToSpecifiedContent = function(targetArray, targetChar, firstAppendContent="", lastAppendContent=""){
  var resultArray = [];

  targetArray.forEach((el)=>{
    if(el == targetChar){
      resultArray.push(firstAppendContent + el + lastAppendContent);
    }else{
      resultArray.push(el);
    }
  });

  return resultArray;
}


//===================================
//    Get ChunkStartPositionArray
//
// ex. Gather "(" positions
// ex. Gather ")" positions
//===================================
KakiStdUtil.getChunkStartPositionArray = function(CHUNK_START_CHAR, targetSyntaxContent=[]){
  var chunkStartPositionArray = [];

  var searchPosition = 0;
  while (searchPosition < targetSyntaxContent.length) {
    chunkStartPosition = targetSyntaxContent.indexOf(CHUNK_START_CHAR, searchPosition);

    if(chunkStartPosition > 0){
      chunkStartPositionArray.push(chunkStartPosition);
      searchPosition = chunkStartPosition + 1;
    }else{
      searchPosition = targetSyntaxContent.length
    }
  }

  return chunkStartPositionArray;
}


//===================================
//    Capitalize Reserved Words
//===================================
KakiStdUtil.capitalizeReservedWords = function(unitArray, RESERVED_WORD){
  var tmpArray = [];
  var tmpUnitArray = unitArray;

  tmpUnitArray.forEach((el)=>{
    upperEl = el.toUpperCase();

    if(RESERVED_WORD.indexOf(upperEl) >= 0){
      tmpArray.push(upperEl);
    }else{
      tmpArray.push(el);
    }
  });

  unitArray.length = 0;
  Array.prototype.push.apply(unitArray, tmpArray);

  return;
}


//===================================
//    Get Bundled TwoPairArray
//
// var pair1 = ["GROUP","BY"]  // => Change to ["GROUP BY"]
// var pair2 = ["ORDER","BY"]  // => Change to ["ORDER BY"]
//===================================
KakiStdUtil.getBundledTwoPairArray = function(unitArray, pairList){
  var retArray = [];

  for(var i=0; i < unitArray.length; i++){
    // if(i + 1 <= unitArray.length && unitArray[i + 1] == pairList[1]){
    if(i + 1 <= unitArray.length && String(unitArray[i + 1]).toUpperCase() == String(pairList[1]).toUpperCase()){
      retArray.push(unitArray[i] + " " + unitArray[i+1]);
      i++;
    }else{
      retArray.push(unitArray[i]);
    }
  }

  return retArray;
}


//===================================
//
//
// get SelectPhrase, FromPhrase, WherePhrase...
//===================================
KakiStdUtil.getTargetWordRange = function(unitArray, startWord, endWord){
  upperUnitArray = unitArray.map((el) => el.toUpperCase());

  var slicedArray = [];
  var startPosition = upperUnitArray.indexOf(startWord);
  var endPosition = upperUnitArray.length;
  var endWordObject = KakiStdUtil.getObjectName(endWord);

  if(endWordObject == "String"){
    endPosition = upperUnitArray.indexOf(endWord);

  }else if(endWordObject == "Array"){
    endWord = endWord.filter((el)=> el.toUpperCase() !== startWord.toUpperCase());
    endWord.forEach((el)=>{
      var dp = upperUnitArray.indexOf(el);
      if(dp < endPosition && dp > -1){
        endPosition = dp;
      }
    });

  }else{
    return slicedArray;
  }

  if(startPosition <= -1 || startPosition >= endPosition){
    return slicedArray;
  }

  slicedArray = unitArray.slice(startPosition +1, endPosition);


  return slicedArray;
}


//===================================
//  Get RemovedAfterTarget LineUnit
//
//    『「--」 以降の文字を削除』みたいなファンクション。
//===================================
KakiStdUtil.getRemovedAfterTargetLineUnit = function(targetContent, targetChar){
  var targetContentArray =  targetContent.split(/\r?\n/g);
  var resultArray = []

  targetContentArray.forEach((el)=>{
    var detectedPosition = el.indexOf(targetChar);
    if(detectedPosition > -1){
      resultArray.push(el.slice(0 , detectedPosition));
    }else{
      resultArray.push(el);
    }
  });

  var resultContent = resultArray.join(NEW_LINE_CHARACTER);

  return resultContent;
}


//===================================
//  Get RemovedSurroundBySpecifiedCharacters
//
//    『「/*  */」で囲まれた内容を削除』みたいなファンクション。
//===================================
KakiStdUtil.getRemovedSurroundBySpecifiedCharacters = function(targetContent, startChar, endChar){
  var resultContent = targetContent;

  var detectedStartPosition;
  var detectedEndPosition;

  while (true) {
    var detectedStartPosition = resultContent.indexOf(startChar);
    var detectedEndPosition   = resultContent.indexOf(endChar);
    if(detectedStartPosition <= -1 || detectedEndPosition <= -1 || detectedStartPosition > detectedEndPosition){
      break;
    }

    firstPart  = resultContent.slice(0,detectedStartPosition);
    latterPart = resultContent.slice(detectedEndPosition + endChar.length);
    resultContent = firstPart + latterPart;
  }

  return resultContent;
}


//===================================
//  Get getSpSeparated ByLine
//
// (ex)
// First Line  :    col1
// Second Line :   ,col2
// Third Line  :   ,col3
//===================================
KakiStdUtil.getSpSeparatedByLine = function(targetContentArray, prefixSpaceCount, prefixChar=","){
  prefixChar      = prefixChar.padStart(prefixSpaceCount, " ");
  firstPrefixChar = "".padStart(prefixSpaceCount, " ");

  var resultArray = [];
  resultArray = targetContentArray.map((el)=> el + NEW_LINE_CHARACTER);

  var resultContent = "";
  resultContent = resultArray.join(prefixChar);
  if(resultContent.length > 0){
    resultContent = firstPrefixChar + resultContent
  }


  return resultContent;
}

//===================================
//
//
// (ex)
//  TABLE1.COL1[\t]ALIAS1 => TABLE1.COL1  ALIAS1
//===================================
KakiStdUtil.getTwoPhraseComposedContexToSpCharToConnect = function(targetContent, SeparatedChar="\t", toSeparateChar="  "){
  var resultContent = "";
  var tmpArray = targetContent;

  tmpArray = tmpArray.split("\t");
  tmpArray = tmpArray.filter((el)=> el != "");
  if(tmpArray.length != 2){
    return targetContent;
  }

  resultContent = tmpArray.join(toSeparateChar);

  return resultContent;
}

//===================================
//
//
//  t1.col1, round(t1.com2, 4)  #=> ["t1.col1", "round(t1.com2, 4)"]
//   !!SINGLE CHAR ONLY!!
//===================================
// KakiStdUtil.getSeparatedArrayFromIncludeIgnoreChar_single = function(targetContent, separateChar, ignoreStartChar, ignoreEndChar){
//   var resultArray = [];
//   var ignoreStackCount = 0;
//   var cutStartPosition = 0;

//   var content = "";
//   for(var i=0; i<targetContent.length-1; i++){
//     c = targetContent.substring(i, i+1);
//     //-----( example : ignore if [,] included [()] )-----
//     if(c == ignoreStartChar){
//       ignoreStackCount++;
//     }
//     if(c == ignoreEndChar){
//       ignoreStackCount--;
//       if(ignoreStackCount < 0){
//         ignoreStackCount = 0;
//         i = targetContent.length-1;
//       }
//     }

//     //-----( set content )-----
//     if(c == separateChar && ignoreStackCount == 0){
//       content = targetContent.substring(cutStartPosition, i);
//       resultArray.push(content)
//       i++;
//       cutStartPosition = i;
//     }

//     //-----( for Last Char Condition )-----
//     if(i == targetContent.length-2 && cutStartPosition < targetContent.length-2){
//       content = targetContent.substring(cutStartPosition, targetContent.length);
//       resultArray.push(content)
//     }
//   }

//   return resultArray;
// }

//===================================
//
//
//  t1.col1, round(t1.com2, 4)  #=> ["t1.col1", "round(t1.com2, 4)"]
//===================================
KakiStdUtil.getSeparatedArrayFromIncludeIgnoreChar = function(targetContent, separateChar, ignoreStartChar, ignoreEndChar){
  var resultArray = [];
  var ignoreStackCount = 0;
  var cutStartPosition = 0;

  var content = "";
  var sl = separateChar.length;
  var isl = ignoreStartChar.length;
  var iel = ignoreEndChar.length;

  for(var i=0; i<targetContent.length-sl; i++){
    c = targetContent.substring(i, i+sl);
    isc = targetContent.substring(i, i+isl);
    iec = targetContent.substring(i, i+iel);

    //-----( example : ignore if [,] included [()] )-----
    if(isc == ignoreStartChar){
      ignoreStackCount++;
    }
    if(iec == ignoreEndChar){
      ignoreStackCount--;
      if(ignoreStackCount < 0){
        ignoreStackCount = 0;
        i = targetContent.length-sl;
      }
    }

    //-----( set content )-----
    if(c == separateChar && ignoreStackCount == 0){
      content = targetContent.substring(cutStartPosition, i);
      resultArray.push(content)
      i+= sl;
      cutStartPosition = i;
    }

    //-----( for Last Char Condition )-----
    if(i == targetContent.length-sl-1 && cutStartPosition < targetContent.length-sl-1){
      content = targetContent.substring(cutStartPosition, targetContent.length);
      resultArray.push(content)
    }
  }

  return resultArray;
}
