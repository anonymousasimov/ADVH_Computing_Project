//Allows for the user to enter new object data
//Requires the user to press submit before continuing

function new_object(){
    //Resets simulation
    reset();
    //Displays form
    display("new_object", "block");
}

function append_data(){ 
    //Validity score
    var valid = 0;
    //Checks that name, mass, vy exist
    valid += presence_check("name") + presence_check("mass") + presence_check("orbital velocity") + presence_check("distance");
    //max distance m
    var maxm = document.getElementById("canvas").width/ 2 / (175/149597870660);
    //max distance(m *10 **9)
    var maxdist = maxm * 10 ** -9;
    //ensures distance value is +ve so it can be compared to maxdist
    var distance = Math.sqrt(document.getElementById("distance").value **2);
    //Validates distance
    if (distance > maxdist){
        print("Maximum allowed distance is " + maxdist+ ".\n");//displays error msg
    }
    else{
        valid += 1
    }
    //Defines value for trail 
    if (document.getElementById("trail").checked == true){
        var trail = true;
    }
    else{
        var trail = false;
    }
    //If data is valid - Appends to CurrentSystem element
    if (valid == 5){
        //object data array
        const object = [];
        //appends all data to array
        object.push("\n" + document.getElementById("name").value);//name
        object.push(document.getElementById("mass").value);//mass
        object.push(document.getElementById("distance").value);//posx
        object.push(0,0);//posy & vx
        object.push(document.getElementById("orbital velocity").value);//vy
        object.push(document.getElementById("color").value);//colour
        object.push(trail);//trail
        document.getElementById("CurrentSystem").append(object);
        //Hides form
        document.getElementById("new_object").style.display = "none";
        //resets form
        document.getElementById("new_object").reset();
        print("Object added.\n");
    }
}