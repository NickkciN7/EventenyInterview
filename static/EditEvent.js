window.onload = (event) => {

    // So I didn't have to manually make an option for every state in the select tag. copied this array from https://usastatescode.com/state-array-json
    stateselect = document.getElementById('stateSelect');
    stateArray = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
        'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    for (i = 0; i < stateArray.length; i++) {
        var opt = document.createElement('option');
        opt.value = stateArray[i];
        opt.innerHTML = stateArray[i];
        stateselect.appendChild(opt);
    }

    fetch('getInfo.php?' + new URLSearchParams({
        eventID: 25
    })).then(response => response.json()).then(data => {
        console.log(data);
        fillInputs(data);
    });
};

//fill inputs with the values that were stored in the database
function fillInputs(eventInfo) {
    // console.log(eventInfo.name);
    document.getElementById('name').value = eventInfo.name;

    document.getElementById('address').value = eventInfo.address;

    document.getElementById('city').value = eventInfo.city;

    document.getElementById('stateSelect').value = eventInfo.state;

    document.getElementById('zipInput').value = eventInfo.zipCode;


    startSplit = eventInfo.start.split(" ");
    //append T in middle in order to be in proper format to change the input value
    start = startSplit[0] + "T" + startSplit[1];
    //get rid of seconds
    start = start.substring(0, start.length - 3);
    document.getElementById('start').value = start;
    // console.log(start);

    endSplit = eventInfo.end.split(" ");
    end = endSplit[0] + "T" + endSplit[1];
    end = end.substring(0, end.length - 3);
    document.getElementById('end').value = end;

    document.getElementById('description').value = eventInfo.description;;
}


function zip() {
    zipCodeElement = document.getElementById('zipInput');
    zipCode = zipCodeElement.value;
    lastLetter = zipCode.charAt(zipCode.length - 1);
    //isn't a number
    if (!(lastLetter >= '0' && lastLetter <= '9') & zipCode != '') {
        document.getElementById('zipSpan').innerHTML = "Can Only Contain Numbers"; //warning message
        //delete the last character
        zipCodeElement.value = zipCode.slice(0, -1);
    } else {
        document.getElementById('zipSpan').innerHTML = "";
    }
}


ADD_EVENT = 1;
RETRY = 0;
//Set to ADD_EVENT if successfully added event
//Set to RETRY if user did not input all data or the insert query was unsuccessful
OK_TYPE = 0;

//used upon clicking Add button on AddEvent page
function add() {
    //array of strings of which input fields have no input


    empty = [];
    eventName = document.getElementById('name').value;
    if (isEmpty(eventName)) { empty.push('Name'); }

    picName = document.getElementById('pic').value;
    if (isEmpty(picName)) { empty.push('Picture'); }

    address = document.getElementById('address').value;
    if (isEmpty(address)) { empty.push('Address'); }
    city = document.getElementById('city').value;
    if (isEmpty(city)) { empty.push('City'); }
    state = document.getElementById('stateSelect').value;
    if (state === '--Select A State--') { empty.push('State'); }
    zipCode = document.getElementById('zipInput').value;
    if (isEmpty(zipCode)) { empty.push('Zip Code'); }

    start = document.getElementById('start').value;
    if (isEmpty(start)) { empty.push('Start Time'); }
    end = document.getElementById('end').value;
    if (isEmpty(end)) { empty.push('End Time'); }

    description = document.getElementById('description').value;
    if (isEmpty(description)) { empty.push('Description'); }

    // console.log(empty);

    modal = document.getElementById("modal");
    modal.style.display = "block";
    modalText = document.getElementById("modalText");
    // if (empty.length = 0) {}
    if (empty.length == 0) {
        console.log("empty");
        //nothing is empty so make a Post request

        //apparently need a FormData variable to be able to use $_POST[] according to stackoverflow posts
        const eventInfo = new FormData();
        eventInfo.set('name', eventName);
        eventInfo.set('pic', pic);
        eventInfo.set('address', address);
        eventInfo.set('city', city);
        eventInfo.set('state', state);
        eventInfo.set('zipCode', zipCode);
        eventInfo.set('start', start);
        eventInfo.set('end', end);
        eventInfo.set('description', description);

        var input = document.querySelector('input[type="file"]');
        eventInfo.append('pic', input.files[0])

        fetch('add.php', {
            method: 'POST',
            body: eventInfo,
            'Content-Type': 'multipart/form-data'
        }).then(response => response.json()).then(data => {
            if (data == "Success") {
                console.log("good");
                // alert("Successfully added event.");
                modalText.innerHTML = "Successfully added event. Click Ok to see your events.";
                OK_TYPE = ADD_EVENT;
            } else {
                // alert("Failure to add event.")
                // alert(data);
                console.log("bad");
                modalText.innerHTML = data;
                OK_TYPE = RETRY;
            }
        });

    } else {
        //make comma separated string from empty array and make alert notifying user what needs input

        emptyString = '';
        for (i = 0; i < empty.length; i++) {
            emptyString += empty[i] + ', ';
        }
        //get rid of last comma and space
        emptyString = emptyString.slice(0, -2);
        // console.log(emptyString);
        // alert("Please provide input for the following: \n" + emptyString);
        modalText.innerHTML = "Please provide input for the following:<br>" + emptyString;
        OK_TYPE = RETRY;
    }
}
//checks if string is null or has length of 0.
function isEmpty(str) {
    return (!str || str.length === 0);
}

function ok() {
    if (OK_TYPE === ADD_EVENT) {
        window.location.href = "MyEvents.php";
    } else {
        modal = document.getElementById("modal");
        modal.style.display = "none";
    }
}

function picInfo() {
    alert('Leaving Picture as "No file chosen" will keep the picture currently associated with this event.')
}