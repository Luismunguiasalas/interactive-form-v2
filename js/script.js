document.querySelector(".js-focus").focus(); //Give focus to the name text field by default

const jobDropdown = document.querySelector('.js-Jobs-Dropdown'); // selects job dropdown 'select' element
const jobTextInput = document.querySelector('.js-Jobs__Other__Input') // selects job text input element
const colorDivContainer = document.querySelector('.js-Color-Div-Container'); // selects color div container
const colorDropdown = document.querySelector('.js-Color__Select__Elem'); // selects color dropdown element
const designDropdown = document.querySelector('.js-Design'); // selects design dropdown 'select' element
const activitiesParentContainer = document.querySelector('.js-Activities'); // selects Activities 'fieldset' Element
const activitiesInputChildren = document.querySelectorAll('.js-Activities input'); // get all input[checkbox] elements of parent Activities
const paymentDropdown = document.querySelector('.js-Payment'); // selects payment dropdown
const creditCardPaymentForm = document.querySelector('.js-Credit-Card'); // selects creditcard form
const creditCardCVV = document.querySelector('#cvv'); // selects CVV input
const creditCardNumber = document.querySelector('#cc-num'); //selects credit card input
const zipCode = document.querySelector('#zip'); // selects zipcode input
const paypalForm = document.querySelector('.js-Paypal'); // selects paypal form
const bitcoinForm = document.querySelector('.js-Bitcoin'); // selects bitcoin form
const namecontainer = document.querySelector('.js-name'); // selects fieldset name ***for Name event***
const yourname = document.querySelector(".js-focus"); // selects name input        ***for Name event***
const youremail = document.querySelector('.js-email'); // selects email input      ***for email event***
const button = document.querySelector('.js-submit'); // selects submit button      ***for button***

// create 'p' elements 
const nameValMesg = document.createElement('p'); // create element                 ***for Name event***
const emailValMesg = document.createElement('p'); // create element                ***for email event***
const creditValMesg = document.createElement('p'); // create element                ***for credit event***
const activitiesValMesg = document.createElement('p') // create p elemt for warning        ***for checklist***
const totalPriceElement = document.createElement('p'); // create p element for price                 ***for checklist***

// function to change display
const changeElemDisplay = (Element, displayValue) => Element.style.display = displayValue; // hides element given as a arguement
function validationStyling(element) {
    element.style.textAlign = 'center'; // adds styling to element               ***for Name event***
    element.style.border = 'solid 2px red'; // adds styling to element
}

// styling for validation messages
validationStyling(nameValMesg);
validationStyling(emailValMesg);
validationStyling(creditValMesg);
validationStyling(activitiesValMesg);

// elements to hide initially
changeElemDisplay(jobTextInput, 'none'); // hides other job text input element           ***for other job input***
changeElemDisplay(colorDivContainer, 'none'); // hides color drop down                   ***for color t-shirt***
changeElemDisplay(activitiesParentContainer, 'none'); // hides activities checklist      ***for checklist***
changeElemDisplay(button, 'none');          //                                           ***for button***


let totalPrice = 0; // total price of activities                                          ***for checklist***
let registeredActivities = []; // keeps track of activities for 'register for activities' ***for checklist***
totalPriceElement.textContent = 'Total: $0'; // add content into p element                           ***for checklist***
activitiesParentContainer.append(totalPriceElement); // append p element into activities parent      ***for checklist***
activitiesValMesg.textContent = "Must select atleast One"; // add text content             ***for checklist***



/** 
 * JOB ROLE SECTION
 * listens for a change in state on job dropdown
 * if 'other' is selected from job dropdown, job text input is displayed.
 * else 'other' stays hidden
 **/
jobDropdown.addEventListener('change', e => {
    if (jobDropdown.value === "other") {
        changeElemDisplay(jobTextInput, 'block');
    } else {
        changeElemDisplay(jobTextInput, 'none');
    }
});



/***
 * HELPER FUNCTIONS FOR T-SHIRT INFO SECTION
 ***/

// loops through all 'option' children of color dropdown and sets displays 'inline'
function displayAllColorItems() {
    for (let index = 0; index < 6; index++) {
        changeElemDisplay(colorDropdown[index], 'inline');
    }
}
// loops through color 'option' children and hides elements at start index
function hideColorItems(startInd, endIndex) {
    for (let index = startInd; index < endIndex; index++) {
        changeElemDisplay(colorDropdown[index], 'none');
    }
}
// removes attribute to color 'option' children at indexRem and sets attribute at indexSet
function removeAndSetAttr(indexRem, indexSet) {
    colorDropdown[indexRem].removeAttribute('selected'); // removes selected attribute from option element
    colorDropdown[indexSet].setAttribute('selected', 'selected');
}


/** T-SHIRT INFO SECTION
 * Upon selection of 'Theme', color dropdown is unhidden & 'Activities' section is unhidden
 * Activities Validation Message is inserted and displayed
 * 
 * After selection of an option
 * if user decides not to select a theme
 *  - color dropdown & activities section is hidden
 * else if user selects 'js puns' or 'heart js' design
 *  - any previous 'selected' attribute is removed from option element at index 3 or 0
 *  - attribute 'selected' is added to option element at index  3 or 0
 *  - calls displayColorOption()
 *  - hides all option elements from specified index
 */
designDropdown.addEventListener('change', e => {
    changeElemDisplay(colorDivContainer, 'inline');
    changeElemDisplay(activitiesParentContainer, 'block');
    activitiesParentContainer.before(activitiesValMesg);
    if (designDropdown.value === "Select Theme") { // Incase user doesnt chooses to not select a theme, color option disables
        changeElemDisplay(colorDivContainer, 'none');
        changeElemDisplay(activitiesParentContainer, 'none');
    } else if (designDropdown.value === "js puns") {
        removeAndSetAttr(3, 0); //sets first child option element attribute to selected
        displayAllColorItems(); // display all color options to inline
        hideColorItems(0, 3);// hides element at from startInd to endInd
    } else if (designDropdown.value === "heart js") {
        removeAndSetAttr(0, 3);  //sets third child option element attribute to selected
        displayAllColorItems(); // display all color options to inline
        hideColorItems(3, 6) // hides element at from startInd to endInd
    }
});


/***
 * HELPER FUNCTIONS FOR ACTIVITIES SECTION 
 ***/
let indxName = 0; //readability for what the indexes are for name, time and cost in variable 'listOfSelectAttrValues' & 'listOFValuesToCompare'
let indxTime = 1;
let indxCost = 2;

// loops through All activities and compares attribute values, if names don't match but times do - the 'option' is disabled or enabled  
function findAttributeValueMatch(listOfSelectAttrValues, disable_enable) {
    for (let index = 0; index < activitiesInputChildren.length; index++) {
        let listOfAttrValuesToCompare = getAttrValuesForActivitySelected(index);
        if (listOfSelectAttrValues[indxName] !== listOfAttrValuesToCompare[indxName] && listOfSelectAttrValues[indxTime] === listOfAttrValuesToCompare[indxTime]) {
            activitiesInputChildren[index].disabled = disable_enable; // enables or disables element that doesnt match name but matches time
        }
    }
}
// gets attributes from selected activity at 'index', returns list of attribute values
function getAttrValuesForActivitySelected(index) {
    let eventName = activitiesInputChildren[index].getAttribute('name');
    let eventTime = activitiesInputChildren[index].getAttribute('data-day-and-time');
    let eventCost = activitiesInputChildren[index].getAttribute('data-cost');
    return [eventName, eventTime, eventCost];
}
// subtracts value of price attr from total price
function subtractFromTotalPrice(listOfSelectAttrValues) {
    totalPrice -= parseInt(listOfSelectAttrValues[indxCost]);
    totalPriceElement.textContent = `Total: $${totalPrice}`;
}
// adds value of price attr to total price
function addToTotalPrice(listOfSelectAttrValues) {
    totalPrice += parseInt(listOfSelectAttrValues[indxCost]);
    totalPriceElement.textContent = `Total: $${totalPrice}`;
}


/**
 * ACTIVITIES SECTION
 * 
 * for loop adds event listerener 'change' to each checklist item,
 * store attr values of selected checklist item in 'listOfSelectAttrValue' calls 'getAttrValuesForActivitySelected( )'
 * if selected item name Not in list of 'registeredActivities'
 * - add name to 'registeredActivities', 
 * - add price to 'totalPrice' and update 'totalPriceElement' 
 * - finds checklist items with matched attr values and disables them
 * - Removes Validation Message
 * - Validation block
 * else 
 * - indexOf unselected item name in 'registeredActivities'
 * - removes name from activities list
 * - substracts price from 'totalPrice'
 * - finds chelist items with matched attr values and enables them
 */
for (let index = 0; index < activitiesInputChildren.length; index++) {
    activitiesInputChildren[index].addEventListener('change', e => {
        let listOfSelectAttrValues = getAttrValuesForActivitySelected(index); // get attribute values from activity selected and 
        // when select checklist element
        if (registeredActivities.indexOf(listOfSelectAttrValues[indxName]) === -1) { //if name of attribute was NOT in activities list run nested code
            registeredActivities.push(listOfSelectAttrValues[indxName]); //add option name selected to activities list
            addToTotalPrice(listOfSelectAttrValues);
            findAttributeValueMatch(listOfSelectAttrValues, true);
            activitiesValMesg.remove();
            // validations block
            if (namecontainer.children.length > 8) {
                changeElemDisplay(button, 'none');
            } else if (registeredActivities.length === 0) {
                changeElemDisplay(button, 'none');
            } else if (creditCardNumber.value === '' || creditCardCVV.value === '' || zipCode.value === '') {
                changeElemDisplay(button, 'none');
            } else {
                changeElemDisplay(button, 'block');
            }
        } else {
            // when deselect checklist element
            let indexOfNameMatch = registeredActivities.indexOf(listOfSelectAttrValues[indxName]);
            registeredActivities.splice(indexOfNameMatch, 1);
            subtractFromTotalPrice(listOfSelectAttrValues);
            findAttributeValueMatch(listOfSelectAttrValues, false);
            if (registeredActivities.length === 0) {
                activitiesParentContainer.before(activitiesValMesg);
                changeElemDisplay(button, 'none');
            }
        }
    });
};


/**
 * 
 * payment
 * 
 */

paymentDropdown.removeChild(paymentDropdown.children[0]);

changeElemDisplay(paypalForm, 'none');
changeElemDisplay(bitcoinForm, 'none');


// hides all but selected element
function displayAndHidePaymentInfo(e) {
    if (e.target.value === 'paypal') {
        changeElemDisplay(paypalForm, 'block');
        changeElemDisplay(creditCardPaymentForm, 'none');
        changeElemDisplay(bitcoinForm, 'none');
        if (namecontainer.children.length > 8) {
            changeElemDisplay(button, 'none');
        } else if (registeredActivities.length === 0) {
            changeElemDisplay(button, 'none');
        } else {
            changeElemDisplay(button, 'block');
        }
    }
    else if (e.target.value === 'bitcoin') {
        changeElemDisplay(bitcoinForm, 'block');
        changeElemDisplay(paypalForm, 'none');
        changeElemDisplay(creditCardPaymentForm, 'none');
        changeElemDisplay(button, 'block');
        if (namecontainer.children.length > 8) {
            changeElemDisplay(button, 'none');
        } else if (registeredActivities.length === 0) {
            changeElemDisplay(button, 'none');
        } else {
            changeElemDisplay(button, 'block');
        }
    }
    else {
        changeElemDisplay(creditCardPaymentForm, 'block');
        changeElemDisplay(paypalForm, 'none');
        changeElemDisplay(bitcoinForm, 'none');
        changeElemDisplay(button, 'none');
    }
}

paymentDropdown.addEventListener('change', e => {
    displayAndHidePaymentInfo(e);
});

// 
// functions for event listeners
// 
function noName() {  //for name
    if (yourname.value === "") {
        nameValMesg.textContent = "Must enter name"; // adds styling to p element          ***for Name event***
        yourname.before(nameValMesg);
        changeElemDisplay(button, 'none')
    }
}

// event listener for name
function removesOrAddsAlertWhileTypingName() {  // for name
    if (yourname.value === "") {
        nameValMesg.textContent = "Must enter name"; // adds styling to p element          ***for Name event***
        yourname.before(nameValMesg);
        changeElemDisplay(button, 'none');
        yourname.style.border = 'none'
    }
    else if (yourname.value.length > 0) {
        nameValMesg.remove();
        yourname.style.border = '3px solid lightgreen';
        if (namecontainer.children.length > 8) {
            changeElemDisplay(button, 'none');
        } else if (registeredActivities.length === 0) {
            changeElemDisplay(button, 'none');
        } else if (creditCardNumber.value === '' || creditCardCVV.value === '' || zipCode.value === '') {
            changeElemDisplay(button, 'none');
        } else {
            changeElemDisplay(button, 'none');
        }
    }
}

// event listener for email
function removesOrAddsAlertWhileTypingEmail() { // for email
    let thestringemail = youremail.value;
    if (thestringemail.indexOf('@') > thestringemail.indexOf('.com') || thestringemail.indexOf('.com') !== thestringemail.length - 4) {
        emailValMesg.textContent = "Please enter Email and format correctly";
        youremail.style.border = 'none';
        youremail.before(emailValMesg);
        changeElemDisplay(button, 'none');
    } else if (thestringemail.includes('@') && thestringemail.includes('.com')) {
        emailValMesg.remove();
        youremail.style.border = '3px solid lightgreen';
        if (namecontainer.children.length > 8) {
            changeElemDisplay(button, 'none');
        } else if (registeredActivities.length === 0) {
            changeElemDisplay(button, 'none');
        } else if (creditCardNumber.value === '' || creditCardCVV.value === '' || zipCode.value === '') {
            changeElemDisplay(button, 'none');
        } else {
            changeElemDisplay(button, 'block');
        }
    }
}

function verifyEmail() {  // for email
    let thestringemail = youremail.value;
    if (thestringemail.indexOf('@') === -1 || thestringemail.indexOf('.com') === -1) {
        emailValMesg.textContent = "Please enter Email and format correctly";
        youremail.before(emailValMesg);
        changeElemDisplay(button, 'none')
    }
}


yourname.addEventListener('focusout', noName, false);
yourname.addEventListener('keyup', removesOrAddsAlertWhileTypingName, false);

youremail.addEventListener('keyup', removesOrAddsAlertWhileTypingEmail, false);
youremail.addEventListener('focusout', verifyEmail, false);


/**
 * if the selected payment option is "Credit Card," 
 * make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
 * Credit Card field should only accept a number between 13 and 16 digits.
 *  The Zip Code field should accept a 5-digit number.
 * The CVV should only accept a number that is exactly 3 digits long.
 */


// creditcardCVV event listener
creditCardCVV.addEventListener('keyup', e => {
    let creditCardCVVvalue = creditCardCVV.value;
    for (let index = 0; index < creditCardCVVvalue.length; index++) {
        if (isNaN(creditCardCVVvalue[index])) {
            creditCardCVV.style.border = 'solid 2px red';
            changeElemDisplay(button, 'none');
        } else if (creditCardCVVvalue.length > 3) {
            creditCardCVV.style.border = 'solid 2px red';
            changeElemDisplay(button, 'none');
        } else if (creditCardCVVvalue.length === 3) {
            creditCardCVV.style.border = '3px solid lightgreen';
            if (registeredActivities.length === 0) {
                changeElemDisplay(button, 'none');
            } else if (namecontainer.children.length > 8) {
                changeElemDisplay(button, 'none');
            } else if (creditCardNumber.value === '' || zipCode.value === '') {
                changeElemDisplay(button, 'none');
            } else {
                changeElemDisplay(button, 'block');
            }
        }
    }
})


// zipcode event listener
zipCode.addEventListener('keyup', e => {
    let zipCodevalue = zipCode.value;
    for (let index = 0; index < zipCodevalue.length; index++) {
        if (isNaN(zipCodevalue[index])) {
            zipCode.style.border = 'solid 2px red';
            changeElemDisplay(button, 'none');
        } else if (zipCodevalue.length > 5 || zipCodevalue.length < 5) {
            zipCode.style.border = 'solid 2px red';
            changeElemDisplay(button, 'none');
        } else if (zipCodevalue.length === 5) {
            zipCode.style.border = '3px solid lightgreen';
            if (registeredActivities.length === 0) {
                changeElemDisplay(button, 'none');
            } else if (namecontainer.children.length > 8) {
                changeElemDisplay(button, 'none');
            } else if (creditCardNumber.value === '' || creditCardCVV.value === '') {
                changeElemDisplay(button, 'none');
            } else {
                changeElemDisplay(button, 'block');
            }
        }
    }
});

// event listener for credit card
creditCardNumber.addEventListener('keyup', e => {
    let creditCardNumbervalue = creditCardNumber.value;

    if (creditCardNumbervalue.length < 13) {
        creditValMesg.textContent = "Please enter a number that is between 13 and 16 digits long.";
        creditCardNumber.before(creditValMesg);
        creditCardNumber.style.border = '2px solid red';
        changeElemDisplay(button, 'none')
    } else if (creditCardNumbervalue.length > 16) {
        creditValMesg.textContent = "must be within 13 - 16 digits";
        creditCardNumber.before(creditValMesg);
        creditCardNumber.style.border = '2px solid red';
        changeElemDisplay(button, 'none')
    } else {
        creditCardNumber.style.border = '3px solid lightgreen';
        creditValMesg.remove();
        if (registeredActivities.length === 0) {
            changeElemDisplay(button, 'none');
        } else if (namecontainer.children.length > 8) {
            changeElemDisplay(button, 'none');
        } else if (creditCardCVV.value === '' || zipCode.value === '') {
            changeElemDisplay(button, 'none');
        } else {
            changeElemDisplay(button, 'block');
        }
    }
});


function nocreditCard() {  //for name
    let creditCardNumbervalue = creditCardNumber.value;
    if (creditCardNumber.value === "") {
        creditValMesg.textContent = "please enter creditcard number"; // adds styling to p element          ***for Name event***
        creditCardNumber.before(creditValMesg);
        changeElemDisplay(button, 'none');
    }
    for (let index = 0; index < creditCardNumbervalue.length; index++) {
        if (isNaN(creditCardNumbervalue[index])) {
            creditCardNumber.style.border = 'solid 2px red';
            changeElemDisplay(button, 'none');
            creditValMesg.textContent = "must be digits"; // adds styling to p element          ***for Name event***
            creditCardNumber.before(creditValMesg);
        }
    }
}

creditCardNumber.addEventListener('keyup', nocreditCard, false);
creditCardNumber.addEventListener('focusout', nocreditCard, false);
