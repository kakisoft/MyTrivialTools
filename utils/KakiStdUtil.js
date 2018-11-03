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
//    Get ChunkStartPositionArray
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
//===================================
KakiStdUtil.getBundledTwoPairArray = function(unitArray, pairList){
  var retArray = [];

  for(var i=0; i < unitArray.length; i++){
    if(i + 1 <= unitArray.length && unitArray[i + 1] == pairList[1]){
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
//===================================
KakiStdUtil.getTargetWordRange = function(unitArray, startWord, endWord){
  var slicedArray = [];
  var startPosition = unitArray.indexOf(startWord);
  var endPosition = unitArray.length;

  var endWordObject = Object.prototype.toString.call(endWord).slice(8, -1);

  if(endWordObject == "String"){
    endPosition = unitArray.indexOf(endWord);

  }else if(endWordObject == "Array"){

    endWord = endWord.filter((el)=> el !== startWord);
    endWord.forEach((el)=>{
      var dp = unitArray.indexOf(el);
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

