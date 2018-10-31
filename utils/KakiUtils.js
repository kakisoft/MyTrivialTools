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

  unitArray.forEach((el)=>{
    upperEl = el.toUpperCase();

    if(RESERVED_WORD.indexOf(upperEl) >= 0){
      tmpArray.push(upperEl);
    }else{
      tmpArray.push(el);
    }
  });

  return tmpArray;
}