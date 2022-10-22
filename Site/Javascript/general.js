//Contains some more generally useful functions

//Checks if present - returns boolean
function presence_check(id){
    if (document.getElementById(id).value.length > 0){
        //exists
        return 1
    }
    else{
        //Does not exist
        print(id + " input is required.\n")//displays error msg
        return 0
    }
}

//Appends to textoutput
function print(string){
    document.getElementById("textoutput").append(string);
}

//Updates display style
function display(id, value){
    document.getElementById(id).style.display = value;
}

//Resets simulation
function reset(){
    document.getElementById('status').innerHTML = 'clear';
    display("run", "block");
    display("reset", "none");
}