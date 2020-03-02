document.querySelector(".js-focus").focus(); //Give focus to the name text field by default

const jobDropdown = document.querySelector('.js-jobs'); // selects job dropdown element
const designDropdown = document.querySelector('.js-design'); // selects design dropdown element
const colorDropdown = document.querySelector('.js-color__Select__Elem'); // selects color dropdown element
const jobTextInput = document.querySelector('.js-job__input') // selects job text input element
const colorDivContainer = document.querySelector('.js-color-div-container'); // selects color div
const activitiesParent = document.querySelector('.activities'); // selects activities fieldset
const colorOptionDefault = document.createElement('option'); // creates option element
const activitiesInput = document.querySelectorAll('.activities input'); // get all input[checkbox] elements of parent .activities
let attendingActivities = []; // list for activities
let totalPrice = 0; // total price of activities

jobTextInput.style.display = "none"; // hiddes other job text input element

const elementprice = document.createElement('p'); // create p element for price
elementprice.textContent = 'Total: $0'; // add content into p element
activitiesParent.append(elementprice); // append p element into activities parent


colorOptionDefault.textContent = "Please Select a T-Shirt Theme"; //add text content to option element
colorOptionDefault.setAttribute('selected', 'selected'); // selects message by default
colorDropdown.appendChild(colorOptionDefault);  // appends message to color dropdown
colorDropdown.setAttribute('disabled', 'disabled'); //disables color dropdown












/** Job Role section
 * listens for a change in state on job dropdown
 * if 'other' is selected from job dropdown, job text input is unhidden
 * else 'other' stays hidden
 **/
jobDropdown.addEventListener('change', e => {
    if (jobDropdown.value === "other") {
        jobTextInput.style.display = "block";
    } else {
        jobTextInput.style.display = "none";
    }
});






/** T-shirt info Section
 * loops through all children of design dropdown and sets displays 'inline'
 */
function displayColorOptions() {
    for (let index = 0; index < 6; index++) {
        colorDropdown[index].style.display = 'inline';
    }
}


/** T-SHIRT INFO SECTION
 * User selects design dropdown
 * After selection of an option
 *  - color dropdown is nolonger disabled
 *  - default option of 'please select T-shirt..' is removed, and no longer displayed as an option
 * if user chooses to not select a theme after all
 *  - color dropdown is disabled and selects and 'please select T-shirt..' is displayed
 * else if user selects 'js puns' or 'heart js' design
 *  - any previous 'selected' attribute is removed from option element at index 3 or 0
 *  - attribute 'selected' is added to option element at index  3 or 0
 *  - calls displayColorOption()
 *  - hides all option elements from specified index
 */
designDropdown.addEventListener('change', e => {
    colorDropdown.removeAttribute('disabled');
    colorOptionDefault.removeAttribute('selected');
    colorOptionDefault.style.display = 'none';
    if (designDropdown.value === "Select Theme") { // Incase user doesnt chooses to not select a theme, color option disables
        colorDropdown.setAttribute('disabled', 'disabled'); //disables color dropdown
        colorOptionDefault.setAttribute('selected', 'selected'); // selects 'please selects T-shirt theme' option
    } else if (designDropdown.value === "js puns") {
        removeAndSetAttr(3, 0); //sets first child option element attribute to selected
        displayColorOptions(); // display all color options to inline
        hideElementsloop(3, 6);// hides element at from startInd to endInd
    } else if (designDropdown.value === "heart js") {
        removeAndSetAttr(0, 3);  //sets third child option element attribute to selected
        displayColorOptions(); // display all color options to inline
        hideElementsloop(0, 3) // hides element at from startInd to endInd
    }
})


function hideElementsloop(startInd, endIndex) {
    for (let index = startInd; index < endIndex; index++) {
        colorDropdown[index].style.display = 'none';
    }
}

function removeAndSetAttr(indexRem, indexSet) {
    colorDropdown[indexRem].removeAttribute('selected'); // removes selected attribute from option element
    colorDropdown[indexSet].setAttribute('selected', 'selected');
}















/*** checklist section
 * 
 * 
 * 
 */
function enableDisableMatchedElement(valueofreturn, dis_en) {
    for (let indx = 0; indx < activitiesInput.length; indx++) { // for loop
        let newvalueofreturn = getAttributeValues(indx); // get All attribute values from options checklist
        if (valueofreturn[1] === newvalueofreturn[1] && valueofreturn[0] !== newvalueofreturn[0]) { // if option selected time matches with any time in checklist && option selected name doesnt match with any name in checklist 
            activitiesInput[indx].disabled = dis_en; // enables or disables element that doesnt match name but matches time
        }
    }
}

function getAttributeValues(index) {
    let eventName = activitiesInput[index].getAttribute('name');
    let eventTime = activitiesInput[index].getAttribute('data-day-and-time');
    let eventCost = activitiesInput[index].getAttribute('data-cost');
    return [eventName, eventTime, eventCost];
}

function subtractFromTotalPrice(valueofreturn) {
    totalPrice -= parseInt(valueofreturn[2]); // removes price from total price
    elementprice.textContent = `Total: $${totalPrice}`;
}

function addToTotalPrice(valueofreturn) {
    totalPrice += parseInt(valueofreturn[2]); // adds price to total price
    elementprice.textContent = `Total: $${totalPrice}`;
}

for (let index = 0; index < activitiesInput.length; index++) {
    activitiesInput[index].addEventListener('change', e => {
        let valueofreturn = getAttributeValues(index); // Only get attribute values for option selected
        // when select checklist element
        if (attendingActivities.indexOf(valueofreturn[0]) === -1) { //if name of attribute was NOT in activities list run nested code
            addToTotalPrice(valueofreturn);
            attendingActivities.push(valueofreturn[0]); //add option name selected to activities list
            enableDisableMatchedElement(valueofreturn, true);
        } else {
            // when deselect checklist element
            let namee = attendingActivities.indexOf(valueofreturn[0]); // searches name of option selected in activities list
            subtractFromTotalPrice(valueofreturn);
            attendingActivities.splice(namee, 1); // removes option name from activities list 
            enableDisableMatchedElement(valueofreturn, false);
        }
    });
};


/**
 *
 *
 *
 */



