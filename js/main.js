window.addEventListener("load", function () {
    //=============== Validation ===============
    function validate(elem, pattern) {
        var res = elem.value.search(pattern);
        var valId = elem.dataset.valId;
        if (res == -1 || 0) {elem.style.color = "tomato"; elem.style.borderColor = "tomato";
            document.getElementById(valId).style.display = "block";
        }
        else {elem.style.color = "#a7a9ac"; elem.style.borderColor = "#d1d3d4";
            document.getElementById(valId).style.display = "none";
        }
    }
    
    for (var i = 0; i < calcProfit.elements.length; ++i) {
        var e = calcProfit.elements[i]; 

        if (e.type == "text"){
            e.addEventListener("change", function(){
                var pattern = /^\d$|^\d\d$|^\d\d\d$|^\d\d\d\d$|^\d\d\d\d\d$|^\d\d\d\d\d\d$/;
                validate(this, pattern);
            }, true);
        }
        e.addEventListener("change", function (){
            var result = 0;
            var invalid = false;
            if (e.value.length == 0) {
                invalid = true;
            }
            if (e.type == "text" && e.onchange) {
                e.onchange();
                if (e.style.color == "tomato") {invalid = true;}
            }
        
            if (invalid) {
                result = 0;
                document.getElementById("result").innerHTML = result; 
                return false;
            } else {
                var select = document.getElementsByName("culture")[0];
                var yield = parseInt(calcProfit.yield.value);
                var cost = parseInt(calcProfit.cost.value);
                var area = parseInt(calcProfit.area.value);
                var culture = 0;

                for (var i = 0; i < select.options.length; i++) {
                    var option = select.options[i];
                    if(option.selected) {
                        switch (option.value) {
                            case "wheat" : culture = 3100;  break;
                            case "rye" : culture = 3200;  break;
                            case "oats" : culture = 3300;  break;
                            case "rice" : culture = 3400;  break;
                        }
                    }
                }
                
                result = cost / area / yield * culture;
                result = parseInt(result);
                document.getElementById("result").innerHTML = result;
            }
        },true);
    }//=============== End Validation ===============
});

