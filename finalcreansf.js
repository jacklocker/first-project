$(document).ready(function () {
    $(third);

    /* make main array*/
    if (localStorage.getItem('testObject') == null) {
        var main = [];
    }
    else {
        main = JSON.parse(localStorage.getItem('testObject'));
    }
    /* enter element in array and store in testobject main array*/
    function updateMainarray() {
        localStorage.setItem('testObject', JSON.stringify(main));
    };
    function insertinMainarray(myObj) {
        main.push(myObj);
    };
    function agecalculator(dob) {
        dob = new Date(dob);
        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
        return age;
    };
    function createDetailbox(key, value) {
        $("#demo").append('<div myDivIdentifier="' + key + '" class= " hoverEvent"  style = " width: 250px; height: 160px; position: relative; margin-bottom: 20px;'
        + 'margin-top: 20px; float :left; margin-left : 12px; background-color : white; border-radius: 8px; z-index: 10;">'
        + '<div myDivIdentifier="' + key + '" class="insideDivbtn">'
        + ' <i  class="fa fa-trash removebtn"></i>'
        + ' <i class="fa fa-edit editbtnform"></i>'
        + ' <i class="fa fa-arrows-alt"></i>'
        + '</div>'
        + ' <div class="side">FName</div>'
        + ' <div class="fnameBox">' + (value.value) + '</div>'
        + ' <div class="side">LName</div>'
        + ' <div class="lnameBox">' + (value.value2) + '</div>'
        + '  <div class="side">DOB</div>'
        + ' <div class="dobBox">' + (value.value3) + '</div>'
        + ' <div class="side">Age</div>'
        + ' <div class="ageBox">' + (value.value5) + '</div>'
        + '</div>');

        
    };
    function textfieldinFname(findindex) {
        removeButonandopacity(findindex);
        $("[ myDivIdentifier =" + findindex + "]").find(".fnameBox").html('<input id = "newValuefname" type="text" placeholder="FName">');
        $("[ myDivIdentifier =" + findindex + "]").find(".fnameBox").find("#newValuefname").focus();
        $("[ myDivIdentifier =" + findindex + "]").find(".fnameBox").on('keydown', '#newValuefname', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                main[findindex].value = $("[ myDivIdentifier =" + findindex + "]").find(".fnameBox").find("#newValuefname").val();
                $("[ myDivIdentifier =" + findindex + "]").find(".fnameBox").html('<p>' + main[findindex].value + '</p>');
                updateMainarray();
                textfieldinLname(findindex);
            }
        });
    };
    function textfieldinLname(findindex) {
        $("[ myDivIdentifier =" + findindex + "]").find(".lnameBox").html('<input id = "newValuelname"  type="text" placeholder="LName">');
        $("[ myDivIdentifier =" + findindex + "]").find(".lnameBox").on('keydown', '#newValuelname', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                main[findindex].value2 = $("[ myDivIdentifier =" + findindex + "]").find(".lnameBox").find("#newValuelname").val();
                $("[ myDivIdentifier =" + findindex + "]").find(".lnameBox").html('<p>' + main[findindex].value2 + '</p>');
                updateMainarray();
                textfieldinDob(findindex);
            }
        });
    };
    function textfieldinDob(findindex) {
        $("[ myDivIdentifier =" + findindex + "]").find(".dobBox").html('<input id = "newValuedob" type="text" placeholder="DOB">');
        $("[ myDivIdentifier =" + findindex + "]").find(".dobBox").on('keydown', '#newValuedob', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                main[findindex].value3 = $("[ myDivIdentifier =" + findindex + "]").find(".dobBox").find("#newValuedob").val();
                $("[ myDivIdentifier =" + findindex + "]").find(".dobBox").html('<p>' + main[findindex].value3 + '</p>');
                updateMainarray();
                newage(main[findindex].value3, findindex);
                localStorage.setItem('Indexs', findindex);
            }
        });
    };
    function newage(dob, findindex) {
        main[findindex].value4 = agecalculator(dob);
        updateMainarray();
        $("[ myDivIdentifier =" + findindex + "]").find(".ageBox").html('<p>' + main[findindex].value4 + '</p>');
        $("#third").trigger('click');
    };
    function divIncrement(l) {
        $("[ myDivIdentifier =" + l + "]").css({ "border": "5px solid red" });
        $("[ myDivIdentifier =" + (l - 1) + "]").css({ "border": "0px" });
    };
    function findingDiv(l) {
        if (l == 0) {
            initialPosition(l);
        }
        else if (l > 0) {
            divIncrement(l);
        }
    };
    function initialPosition(l) {
        $("[ myDivIdentifier =" + l + "]").css({ "border": "5px solid red" });
        $("[ myDivIdentifier =" + (main.length - 1) + "]").css({ "border": "0px" });
    };
    function removeButonandopacity(findindex){
        $("[ myDivIdentifier =" + findindex + "]").find(".insideDivbtn").stop().slideUp("slow");
    };
    function addButonandopacity(findindex){
        $("[ myDivIdentifier =" + findindex + "]").find(".insideDivbtn").slideDown("slow");
    };
    function newElementadd(findindex){
    
        
        var fname = $("[ myDivIdentifier =" + findindex + "]").find('#fnames').val();
        var lname = $("[ myDivIdentifier =" + findindex + "]").find("#lname").val();
        var dob = $("[ myDivIdentifier =" + findindex + "]").find("#date").val();
        var age = agecalculator(dob);
        var myObj = {};
        myObj.key = 'fname';
        myObj.value = fname;
        myObj.key2 = 'lname';
        myObj.value2 = lname;
        myObj.key3 = 'dob';
        myObj.value3 = dob;
        myObj.key4 = 'age';
        myObj.value4 = age;
        insertinMainarray(myObj);
        updateMainarray();
        $("#third").trigger('click');
    };
    
    $(document).on("click", ".removebtn", function () {
        findindex = $(this).closest("div").attr("myDivIdentifier");
        main.splice(findindex, 1);
        updateMainarray();
        $('#' + findindex).remove();
        $("#third").trigger('click');
    });
   
    $(document).on("mouseenter", ".hoverEvent", function (){
        findindex = $(this).closest("div").attr("myDivIdentifier");
        addButonandopacity(findindex);
        
    });
     
    $(document).on("mouseleave", ".hoverEvent", function (){
        findindex = $(this).closest("div").attr("myDivIdentifier");
        removeButonandopacity(findindex);
    });
    
function third(){
    $("#demo").empty();
    var normalMainarray = JSON.parse(localStorage.getItem('testObject'));
    $.each(normalMainarray, function (key, value) {
        createDetailbox(key, value);
        if(key==main.length-1)
        {
            index= (main.length);
            $("#demo").append('<div myDivIdentifier="' + index + '" style = " width: 250px; height: 180px; position: relative; margin-bottom: 20px;'
            + 'margin-top: 20px; float :left; margin-left : 12px; background-color : white; border-radius: 8px; z-index: 10;">'
            + ' <i id="formPopup" class="fa fa-plus-circle"></i></div>')
        }
    });
}
    $("#third").click(function () {
        third();
    });
    $(document).on("click", ".editbtnform", function () {
        findindex = $(this).closest("div").attr("myDivIdentifier");
        textfieldinFname(findindex);
    });
    $(document).on("click", "#formPopup", function () {
        findindex = $(this).closest("div").attr("myDivIdentifier");
        $("[ myDivIdentifier =" + findindex + "]").html('<p></p><input  id="fnames" type="text" placeholder="First Name"><p><br></p><input  id="lname" type="text" placeholder="Last Name"><p><br></p><input id="date" type="date" placeholder="DOB"><p><br></p><button id="first" type="button" class="btn btn-success">Success</button>  ')
        $("[ myDivIdentifier =" + findindex + "]").find("#first").click(function () {
            newElementadd(findindex);
        });
    });
    var l = localStorage.getItem('Indexs');
    $(document).on("keydown", "#third", function (e) {
        event.preventDefault();
        if (e.which == 9) {
            findingDiv(l);
            l = l + 1;
            if (l == main.length) {
                l = 0;
            }
            localStorage.setItem('Indexs', l);
        }
        if (e.which == 13) {
            textfieldinFname(l - 1);
        }
    });




});