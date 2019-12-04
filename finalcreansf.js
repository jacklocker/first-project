$(document).ready(function(){
/* make main array*/    
    if (localStorage.getItem('testObject') == null) {
        var main = [];
    } 
    else{
        main = JSON.parse(localStorage.getItem('testObject'));
    }
/* enter element in array and store in testobject main array*/     

$("#first").click(function () {
        $("#demo").empty();
        var fnamea = $("#fname").val();
        var lnamea = $("#lname").val();
        var doba = $("#date").val();
        var iddiv = idin();
        var ages = agecalculator();
        var myObj = {};
        myObj.key = 'fname';
        myObj.value = fnamea;
        myObj.key2 = 'lname';
        myObj.value2 = lnamea;
        myObj.key3 = 'dob';
        myObj.value3 = doba;
        myObj.key4 = 'id';
        myObj.value4 = iddiv;
        myObj.key5 = 'age';
        myObj.value5 = ages;
        main.push(myObj);
           
        localStorage.setItem('testObject', JSON.stringify(main));
    }); 
    
function agecalculator() {
        var dob = $(".inputArea").find('#date').val();
        dob = new Date(dob);
        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
        return age;
    };
function idin() {
        
    }
/* display array object in box*/     
    $("#third").click(function (){
        $("#demo").empty();
            var retrievedObject = localStorage.getItem('testObject');
            var normal = JSON.parse(retrievedObject);
            $.each(normal, function (key, value) {
                $("#demo").append('<div  id= "' + key 
                + '" myDivIdentifier="'+key+'"   style = " width: 250px; height: 210px; position: relative; margin-bottom: 20px;'
                +' margin-top: 20px; float :left; margin-left : 10px; background-color: tomato;">'
                +'<button class = "toggel">Toggle</button><button class = "editbtnform">EDIT</button>'
                +'<button class = "removebtn">DELET</button><div class = "side"><p>Fname:<br>Lname:<br>DOB:<br>Age:</p></div>'
                +'<div class = "fnameBox">'+(value.value)+'</div><div class = "lnameBox">'+(value.value2)+'</div>'
                +'<div class = "dobBox">'+(value.value3)+'</div><div class = "ageBox">'+(value.value5)+'</div></div>');
            });
/*remove button work */            
        $(".removebtn").on('click', function (){
            findindex = $(this).closest( "div" ).attr('myDivIdentifier');
            /*var pos = main[findindex].value4;*/
            
            
            /*var findindex = $(this).parent().attr('id');
            /*var pos = main.map(function (e) {
                return e.value4;
            }).indexOf(findindex);*/
           /* var pos = main.value4;*/
            main.splice(findindex, 1);
            localStorage.setItem('testObject', JSON.stringify(main));

            /*$('#' + findindex).remove();*/
           $('#' + findindex).remove();
          
            $("#third").trigger('click');
         
                
           
 
            /* if (main.length === 0) {
                alert("Now the Array is empty");
            }*/
        });
        



/*edit button work */ 



        $(".editbtnform").on('click', function (){
             var findindex = $(this).parent().attr('id');
            var pos = main.map(function (e) {
                return e.value4;
            }).indexOf(findindex);
            

           /* var fnametemp = main[pos].value;
            var lnametemp = main[pos].value2;
            var dobtemp = main[pos].value3;
            var agetemp = main[pos].value5;*/
/*make text box */
            $('#' + findindex).find(".fnameBox").html('<input id = "newValuefname" type="text" placeholder="FName">');
            $('#' + findindex).find(".fnameBox").find("#newValuefname").focus();
            $('#' + findindex).find(".lnameBox").html('<input id = "newValuelname"  type="text" placeholder="LName">');
            $('#' + findindex).find(".dobBox").html('<input id = "newValuedob" type="text" placeholder="DOB">');
/*with button yes  no            $('#' + findindex).find(".dobBox").html('<input id = "newValuedob" type="text" placeholder="DOB"><br><button class = "editButton" id= "yesBtn">Y</button>&nbsp;<button class = "editButton" id= "noBtn">N</button>');*/
/*for fname*/
/*yes btn action 
            $("#yesBtn").on('click', function () {*/
                $('#' + findindex).find(".fnameBox").on('keydown', '#newValuefname', function(e) { 
                    var keyCode = e.keyCode || e.which; 
                if (keyCode == 9) { 
                main[pos].value = $('#' + findindex).find(".fnameBox").find("#newValuefname").val();
                var newValue = $('#' + findindex).find(".fnameBox").find("#newValuefname").val();
                    localStorage.setItem('testObject', JSON.stringify(main)); 
                $('#' + findindex).find(".fnameBox").html('<p>'+ newValue +'</p>');
                }
            });
 
                /*           });
no btn action
            $("#noBtn").on('click', function () {
                $('#' + findindex).find(".fnameBox").html('<p>'+ fnametemp +'</p>')
            });*/
/*for lname*/
/*yes btn action
            $("#yesBtn").on('click', function () {*/
                $('#' + findindex).find(".lnameBox").on('keydown', '#newValuelname', function(e) { 
                    var keyCode = e.keyCode || e.which; 
                if (keyCode == 9) {
                main[pos].value2 = $('#' + findindex).find(".lnameBox").find("#newValuelname").val();
                var newValue = $('#' + findindex).find(".lnameBox").find("#newValuelname").val();
                    localStorage.setItem('testObject', JSON.stringify(main)); 
                $('#' + findindex).find(".lnameBox").html('<p>'+ newValue +'</p>');
            }
        });
 /*           });
no btn action
            $("#noBtn").on('click', function () {
                $('#' + findindex).find(".lnameBox").html('<p>'+ lnametemp +'</p>')
            });*/
/*for dob*/
/*yes btn action 
            $("#yesBtn").on('click', function () {*/
                $('#' + findindex).find(".dobBox").on('keydown', '#newValuedob', function(e) { 
                    var keyCode = e.keyCode || e.which; 
                if (keyCode == 9) {
                main[pos].value3 = $('#' + findindex).find(".dobBox").find("#newValuedob").val();
                var newValue = $('#' + findindex).find(".dobBox").find("#newValuedob").val();
                    localStorage.setItem('testObject', JSON.stringify(main)); 
                $('#' + findindex).find(".dobBox").html('<p>'+ newValue +'</p>');

                var newage = newagecalculator();
                main[pos].value5 = newage;
                var newValue = newage;
                    localStorage.setItem('testObject', JSON.stringify(main)); 
                $('#' + findindex).find(".ageBox").html('<p>'+ newValue +'</p>');
            }
        });
   /*         });
no btn action
            $("#noBtn").on('click', function () {
                $('#' + findindex).find(".dobBox").html('<p>'+ dobtemp +'</p>')
            });*/
/*for age*/
/*yes btn action
            $("#yesBtn").on('click', function () {*/ 

                


   /*         });
no btn action
            $("#noBtn").on('click', function () {
                $('#' + findindex).find(".ageBox").html('<p>'+ agetemp +'</p>')
            });*/
function newagecalculator() {
    var dob = main[pos].value3;
    dob = new Date(dob);
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
        return age;
            };
        });
    });            
  

   
    $("#third").one("keydown",function(e) {
        
        event .preventDefault();
       
        if(e.which == 9 ){
            
            tab();
        }
    });



    function tab(){
        var l = 0;
        $("#" + l).css({"border" : "5px solid red"});
        
            arrowKey();
}


function arrowKey(){
    var l = 0;
    $("#third").keydown(function(f) {
        if(f.which == 16 ){
            $("#" + l).find(".fnameBox").html('<input id = "newValuefname" type="text" placeholder="FName">'); 
            $("#" + l).find(".fnameBox").find("#newValuefname").focus();          
            cre(l);  
            
        }
        if(f.which == 9 ){
            $("#" + l).css({"border" : "0px"});
            tab();
        }

       
        if(f.which == 39 ){
            
            $("#" + l).css({"border" : "0px"});
            $("#" + (l+1)).css({"border" : "5px solid red"});
        
            l=l+1;
            
                    
            
            
            if(l == main.length)
            {l=0;
            tab();
            
            }
            
        }

        if(f.which == 37 ){
            
            $("#" + l).css({"border" : "0px"});
            $("#" + (l-1)).css({"border" : "5px solid red"});
            l=l-1;
            if(l == 0)
            {
                l = main.length;
                tab();
            }
        }
        
          
        

           
        

       
 
    
       /* if(e.which == 9) {
            $("#" + l).find(".fnameBox").html('<input id = "newValuefname" type="text" placeholder="FName">'); 
            $("#" + l).find(".fnameBox").find("#newValuefname").focus();
           
            
            cre();
            
        }*/

/*cre();*/

        
    });
}
    function cre(l){
       

        
        $("#" + l).find(".fnameBox").find("#newValuefname").keydown(function(e) {
        
            if(e.which == 13) {
                var h = $("#" + l).find(".fnameBox").find("#newValuefname").val();
                main[l].value = $("#" + l).find(".fnameBox").find("#newValuefname").val();
                localStorage.setItem('testObject', JSON.stringify(main)); 
                $("#" + l).find(".fnameBox").html('<p>'+ h +'</p>')
                $("#" + l).find(".lnameBox").html('<input id = "newValuelname" type="text" placeholder="LName">'); 
                $("#" + l).find(".lnameBox").find("#newValuelname").focus();
            }
                $("#" + l).find(".lnameBox").find("#newValuelname").keydown(function(e) {
        
                    if(e.which == 13) {
                        var h = $("#" + l).find(".lnameBox").find("#newValuelname").val();
                        main[l].value2 = $("#" + l).find(".fnameBox").find("#newValuefname").val();
                        localStorage.setItem('testObject', JSON.stringify(main)); 
                $("#" + l).find(".lnameBox").html('<p>'+ h +'</p>')
                        $("#" + l).find(".dobBox").html('<input id = "newValuedob" type="text" placeholder="DOB">'); 
                        $("#" + l).find(".dobBox").find("#newValuedob").focus();
                    
                        $("#" + l).find(".dobBox").find("#newValuedob").keydown(function(e) {
        
                            if(e.which == 13) {
                                var h = $("#" + l).find(".dobBox").find("#newValuedob").val();
                                main[l].value3 = $("#" + l).find(".fnameBox").find("#newValuefname").val();
                                localStorage.setItem('testObject', JSON.stringify(main)); 
                $("#" + l).find(".dobBox").html('<p>'+ h +'</p>')
                                $("#" + (l+1)).find(".fnameBox").html('<input id = "newValuefname" type="text" placeholder="FName">'); 
                                $("#" + (l+1)).find(".fnameBox").find("#newValuefname").focus();
                            
                                l= l+1;
                            cre(l);
                            }
                            
                            
                    
                
                        });
                    }
                    
               
            
        
                });
           
       
    

        });
       
        
   
      
    
    }


/*

    function lnam(){
        
        $("#0").find(".fnameBox").find("#newValuefname").keydown(function(e) {
            for(i=0 ; i< 5;){
        
            event .preventDefault();
            
            if(e.which == 9) {
                
                
                $("#" + i).find(".lnameBox").html('<input id = "newValuelname" type="text" placeholder="FName">'); 
                $("#" + i).find(".lnameBox").find("#newValuelname").focus();
                $("#" + i).find(".lnameBox").find("#newValuelname").keydown(function(e) {
                if(E.which == 9){
                lnam(); 
                
                }
            });
            i++;
            }
        }
            
        
        });
    
    }*/
/*
    $('#' + findindex).find(".fnameBox").find("#newValuefname").keydown(function(e) {
        if(e.which == 9) {
            for(var findindex = 0; findindex<1; findindex++){
            $('#' + findindex).find(".lnameBox").html('<input id = "newValuelname" type="text" placeholder="FName">'); 
            $('#' + findindex).find(".lnameBox").find("#newValuelname").focus(); 
            }
        }
    });

*/

});
