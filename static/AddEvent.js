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

};

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

//used upon clicking Add button on AddEvent page
function add() {
    //array of strings of which input fields have no input
    empty = [];
    eventName = document.getElementById('name').value;
    if (isEmpty(eventName)) { empty.push('Name'); }

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

    if (empty.length == 0) {
        //nothing is empty so make a Post request

        //apparently need a FormData variable to be able to use $_POST[] according to stackoverflow posts
        const eventInfo = new FormData();
        eventInfo.set('name', eventName);
        eventInfo.set('address', address);
        eventInfo.set('city', city);
        eventInfo.set('state', state);
        eventInfo.set('zipCode', zipCode);
        eventInfo.set('start', start);
        eventInfo.set('end', end);
        eventInfo.set('description', description);

        fetch('add.php', {
            method: 'POST',
            body: eventInfo,
        }).then(response => response.json()).then(data => {
            if (data == "Success") {
                alert("Successfully added event.");
            } else {
                alert("Failure to add event.")
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
        alert("Please provide input for the following: \n" + emptyString);
    }




}

//checks if string is null or has length of 0.
function isEmpty(str) {
    return (!str || str.length === 0);
}