//Searches Systems element for search term
//returns sysdata or 404
function binary_search(searchterm){
    //String of all System data
    const systems = document.getElementById("Systems").innerHTML;
    //Splits data into array of systems
    const sysdata = systems.split("$");
    //Empty array of system names
    const sysnames = new Array(sysdata.length/2);
    //Reads system names from sysdata
    let counter = 0;
    for (let i = 0; i < sysdata.length; i +=2){
        sysnames[counter] = new Array(2);
        sysnames[counter][0] = sysdata[i];
        sysnames[counter][1] = i;
        counter ++;
    }
    //Sorts sysnames alphabetically
    sysnames.sort();
    var found = false;
    //Lower bracket
    var low = 0;
    //upper bracket
    var high = sysnames.length;
    while (low <= high && found == false){
        //midpoint of section
        var mid = Math.floor((low + high) / 2);
        //Checks if found
        if (sysnames[mid][0] == searchterm){
            found = true;
            //Returns system data
            return sysdata[sysnames[mid][1] +1];
        }
        else if (sysnames[mid][0] < searchterm){
            low = mid + 1;
        }
        else{
            high = mid - 1;
        }
        
    }
    if (found == false){
        return found;
    }
}

//Validates savename value
//If valid saves CurrentSystem to System under savename
function save(){
    //Reads save name from input
    let savename = document.getElementById("savename").value;
    //Checks savename has a value returns error if empty
    if (presence_check("savename") == 1){
        //Checks savename does not already exist
        if (binary_search(savename) != false){
            print("That savename already exists. Try another.\n");
        }
        else{
            //Reads data from current system and appends savename
            const savedata ="$" + savename + "$" + document.getElementById("CurrentSystem").innerHTML;
            //Saves data
            document.getElementById("Systems").append(savedata);
            print("System saved!\n");
            display("saveform", "none");
        }
    }
    //Clears savename form
    document.getElementById("saveform").reset();
}

//Validates search term
//If valid saves System data to CurrentSystem
function load(){
    //Reads Searchterm from input
    let searchterm = document.getElementById("searchterm").value;
    //Checks searchterm exists
    if (presence_check("searchterm") == 1){
        const systemdata = binary_search(searchterm);
        //Validates searchterm exisists in Systems
        if (systemdata != false){
            reset();
            //Saves systemdata to CurrentSystem
            document.getElementById("CurrentSystem").innerHTML = systemdata;
            print("System loaded!\n");
            display("loadform", "none");
        }
        else{
            print("That system does not exist.\n")
        }
    }
    //Clears searchterm form
    document.getElementById("loadform").reset();
}