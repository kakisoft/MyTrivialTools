//===================================
//  Get Selected Radio Button Value
//===================================
function getSelectedRadioButtonValue(name){
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
function surroundText(value, targetChar){
    var result;

    result = targetChar + value + targetChar;

    return result;
}

//===================================
//        surround HTML Tag
//===================================  
function surroundHTMLTag(value, targetTag){
  var startTag = "<"  + targetTag + ">";
  var endTag   = "</" + targetTag + ">";
  var result;

  result = startTag + value + endTag;

  return result;
}

//===================================
//    Get ChunkStartPositionArray
//===================================  
function getChunkStartPositionArray(CHUNK_START_CHAR, targetSyntaxContent=[]){
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
function capitalizeReservedWords(unitArray, RESERVED_WORD){
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
function getBundledTwoPairArray(unitArray, pairList){
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
function getTargetWordRange(unitArray, startWord, endWord){
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
