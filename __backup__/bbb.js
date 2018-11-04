//---------------------
//  
//---------------------
function getPhraseSetArray(targetContent, ignoreStartChar, ignoreEndChar){
    var stringifiedContent = "";
  
    var targetObjectName = KakiStdUtil.getObjectName(targetContent);
    if(targetObjectName == "String"){
      stringifiedContent = targetContent;
    }else if(targetObjectName == "Array"){
      var tmpString = KakiStdUtil.getAppendCharToSpecifiedContent(targetContent, "AS", "  ", "  ");
      stringifiedContent = tmpString.join("\t");  // In fact I want to connect everything ...  But I am doing this to correspond to an alias that omits "AS".
      // stringifiedContent = tmpString.join("");
    }else{
      return "";
    }
  
    var resultArray = [];
    var ignoreStackCount = 0;
    var cutStartPosition = 0;
    var isIncludedIgnoreChar = false;
    for(var i=0; i<stringifiedContent.length-1; i++){
      c = stringifiedContent.substring(i, i+1);
      //-----( ignore if [,] included [()] )-----
      if(c == ignoreStartChar){
        ignoreStackCount++;
        isIncludedIgnoreChar = true;
      }
      if(c == ignoreEndChar){
        ignoreStackCount--;
        if(ignoreStackCount < 0){
          ignoreStackCount = 0;
          i = stringifiedContent.length-1;
        }
      }
  
      //-----( set content )-----
      if(c == "," && ignoreStackCount == 0){
        content = stringifiedContent.substring(cutStartPosition, i);
        if(isIncludedIgnoreChar){
          // console.log("sss")
          // content += " ";
          content += "xxxx";
        }
        resultArray.push(content)
        i++;
        cutStartPosition = i;
        isIncludedIgnoreChar = false;
      }
    }
  