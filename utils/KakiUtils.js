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