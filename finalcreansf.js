$(document).ready(function(){
/* make main array*/    
    if (localStorage.getItem('testObject') == null) {
        var main = [];
    } 
    else{
        main = JSON.parse(localStorage.getItem('testObject'));
    }
/* enter element in array and store in testobject main array*/     
function updateMainarray(){
    localStorage.setItem('testObject', JSON.stringify(main));
    };
function insertinMainarray(myObj){
    main.push(myObj);
    };  
function agecalculator(dob) {
        dob = new Date(dob);
        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
        return age;
    };
function createDetailbox(key , value){
        $("#demo").append('<div  id= "' 
                + '" myDivIdentifier="'+key+'"   style = " width: 250px; height: 210px; position: relative; margin-bottom: 20px;'
                +' margin-top: 20px; float :left; margin-left : 10px; background-color: tomato;">'
                +'<button class = "toggel">Toggle</button><button class = "editbtnform">EDIT</button>'
                +'<button class = "removebtn">DELET</button><div class = "side"><p>Fname:<br>Lname:<br>DOB:<br>Age:</p></div>'
                +'<div class = "fnameBox">'+(value.value)+'</div><div class = "lnameBox">'+(value.value2)+'</div>'
                +'<div class = "dobBox">'+(value.value3)+'</div><div class = "ageBox">'+(value.value5)+'</div></div>');
    };
function textfieldinFname(findindex){
        $("[ myDivIdentifier ="+findindex+"]").find(".fnameBox").html('<input id = "newValuefname" type="text" placeholder="FName">');
        $("[ myDivIdentifier ="+findindex+"]").find(".fnameBox").find("#newValuefname").focus();
        $("[ myDivIdentifier ="+findindex+"]").find(".fnameBox").on('keydown', '#newValuefname', function(e) { 
            var keyCode = e.keyCode || e.which; 
        if (keyCode == 9) {
            main[findindex].value = $("[ myDivIdentifier ="+findindex+"]").find(".fnameBox").find("#newValuefname").val();
                        
                        $("[ myDivIdentifier ="+findindex+"]").find(".fnameBox").html('<p>'+ main[findindex].value +'</p>');
                        updateMainarray();
                        textfieldinLname(findindex);
                        
        }
       
        });
        
    };
function textfieldinLname(findindex){
        $("[ myDivIdentifier ="+findindex+"]").find(".lnameBox").html('<input id = "newValuelname"  type="text" placeholder="LName">');
        $("[ myDivIdentifier ="+findindex+"]").find(".lnameBox").on('keydown', '#newValuelname', function(e) { 
            var keyCode = e.keyCode || e.which; 
        if (keyCode == 9) {
            main[findindex].value2 = $("[ myDivIdentifier ="+findindex+"]").find(".lnameBox").find("#newValuelname").val();
                        
                        $("[ myDivIdentifier ="+findindex+"]").find(".lnameBox").html('<p>'+ main[findindex].value2 +'</p>');
                        updateMainarray();
                        textfieldinDob(findindex);
                        
        }
       
        });
    };
function textfieldinDob(findindex){
        $("[ myDivIdentifier ="+findindex+"]").find(".dobBox").html('<input id = "newValuedob" type="text" placeholder="DOB">');
        $("[ myDivIdentifier ="+findindex+"]").find(".dobBox").on('keydown', '#newValuedob', function(e) { 
            var keyCode = e.keyCode || e.which; 
            
        if (keyCode == 9) {
           
            main[findindex].value3 = $("[ myDivIdentifier ="+findindex+"]").find(".dobBox").find("#newValuedob").val();
                        
                        $("[ myDivIdentifier ="+findindex+"]").find(".dobBox").html('<p>'+ main[findindex].value3 +'</p>');
                        updateMainarray();
                        newage(main[findindex].value3 , findindex);
                        
                        
        }
       
        });
    };
function newage(dob , findindex){
        
        main[findindex].value4 = agecalculator(dob);
        updateMainarray();
        $("[ myDivIdentifier ="+findindex+"]").find(".ageBox").html('<p>'+ main[findindex].value4 +'</p>');
        $("#third").trigger('click');
    
    };
function divIncrement(l){
        
        $("[ myDivIdentifier ="+l+"]").css({"border" : "5px solid red"});
        $("[ myDivIdentifier ="+(l-1)+"]").css({"border" : "0px"});
        
    };
function findingDiv(l){
        if(l==0){
            initialPosition(l);
            
        }
        else if(l>0){
            
            divIncrement(l);
            
            
    
        } 
    };
function initialPosition(l){
        $("[ myDivIdentifier ="+l+"]").css({"border" : "5px solid red"});
        $("[ myDivIdentifier ="+(main.length-1)+"]").css({"border" : "0px"});
        
        
    };
$("#first").click(function () {
        $("#demo").empty();
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var dob = $("#date").val();
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
        
    });
$(document).on("click", ".removebtn" , function (){
        
        findindex = $(this).closest( "div" ).attr("myDivIdentifier");
        
        main.splice(findindex, 1);
       updateMainarray();
       $('#' + findindex).remove();
      
        $("#third").trigger('click');
     
    });
$("#third").click(function (){
        $("#demo").empty();
            var normalMainarray = JSON.parse(localStorage.getItem('testObject'));
            $.each(normalMainarray, function (key, value) {
                createDetailbox(key , value);
            });
    
    });                
$(document).on("click", ".editbtnform" , function (){
        findindex = $(this).closest( "div" ).attr("myDivIdentifier");
        textfieldinFname(findindex);
        
    });
var l = 0;
$(document).on("keydown", "#third" , function(e) {
        
        event .preventDefault();
      
        if(e.which == 9 ){
            
        
            findingDiv(l); 
            l=l+1;
            if(l==main.length)
            {l=0;
            }          
            
        }
        if(e.which == 13 ){
            textfieldinFname(l-1);
        }
        

       
       
        
    });
});
