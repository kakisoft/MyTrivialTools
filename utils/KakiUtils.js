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

function surroundText(value, targetChar){
    var result;

    result = targetChar + value + targetChar;

    return result;
}
