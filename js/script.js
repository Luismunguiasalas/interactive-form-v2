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
const namecontainer = document.querySelector('.js-name'); // selects fieldset name 
const yourname = document.querySelector(".js-focus"); // selects name input        
const youremail = document.querySelector('.js-email'); // selects email input      
const button = document.querySelector('.js-submit'); // selects submit button      
const formm = document.querySelector('form') // selects form element
// create 'p' elements 
const nameValMesg = document.createElement('p'); // create element                         ***for Name event***
const emailValMesg = document.createElement('p'); // create element                        ***for email event***
const creditValMesg = document.createElement('p'); // create element                       ***for credit event***
const activitiesValMesg = document.createElement('p') // create p elemt for warning        ***for checklist***
const totalPriceElement = document.createElement('p'); // create p element for price       ***for checklist***
// function to change display
const changeElemDisplay = (Element, displayValue) => Element.style.display = displayValue; // hides element given as a arguement
// function for styling validation elements
function validationStyling(element) {
    element.style.textAlign = 'center';
    element.style.border = 'solid 2px red';
}
// styling for validation messages
validationStyling(nameValMesg);
validationStyling(emailValMesg);
validationStyling(creditValMesg);
validationStyling(activitiesValMesg);
// elements to hide initially
changeElemDisplay(jobTextInput, 'none'); // hides other job text input element           ***for other job input***
changeElemDisplay(colorDivContainer, 'none'); // hides color drop down                   ***for color t-shirt***
// changeElemDisplay(activitiesParentContainer, 'none'); // hides activities checklist      ***for checklist***
// changeElemDisplay(button, 'none');          // hides button                              ***for submit button***
changeElemDisplay(paypalForm, 'none');      // hides paypal info                         ***for paypal info***
changeElemDisplay(bitcoinForm, 'none');     // hides bitcoin info                        ***for bitcoin info***
// other assignments
// console.log(activitiesInputChildren[0]);
// activitiesInputChildren[0];
// activitiesInputChildren[0].checked = true;
let totalPrice = 0; // total price of activities                                          ***for checklist***
let registeredActivities = []; // keeps track of activities for 'register for activities section'    ***for checklist***
totalPriceElement.textContent = 'Total: $0'; // add content into p element                           ***for checklist***
activitiesParentContainer.append(totalPriceElement); // append p element into activities parent      ***for checklist***
activitiesValMesg.textContent = "Must register for one event"; // add text content             ***for checklist***
paymentDropdown.removeChild(paymentDropdown.children[0]); //for payment dropdown           ***for payment***
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
/** 
 * T-SHIRT INFO SECTION
 * Upon selection of 'Theme', color dropdown is unhidden & 'Activities' section is unhidden
 * Activities Validation Message is inserted and displayed
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
    // changeElemDisplay(activitiesParentContainer, 'block');
    // activitiesParentContainer.before(activitiesValMesg);
    if (designDropdown.value === "Select Theme") {
        changeElemDisplay(colorDivContainer, 'none');
        // changeElemDisplay(activitiesParentContainer, 'none');
    } else if (designDropdown.value === "js puns") {
        removeAndSetAttr(3, 0);
        displayAllColorItems();
        hideColorItems(0, 3);
    } else if (designDropdown.value === "heart js") {
        removeAndSetAttr(0, 3);
        displayAllColorItems();
        hideColorItems(3, 6)
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
 * REGISTER ACTIVITIES SECTION
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
            nameEmailActivitiesValidationBlock(activitiesValMesg); // validation block
            // registeredActivities.splice(registeredActivities.indexOf('not registered'), 1);
        } else {
            // when deselect checklist element
            let indexOfNameMatch = registeredActivities.indexOf(listOfSelectAttrValues[indxName]);
            registeredActivities.splice(indexOfNameMatch, 1);
            subtractFromTotalPrice(listOfSelectAttrValues);
            findAttributeValueMatch(listOfSelectAttrValues, false);
            if (registeredActivities.length === 0) {
                activitiesParentContainer.before(activitiesValMesg);
                // changeElemDisplay(button, 'none');
            }
        }
    });
};
/***
 * HELPER FUNCTIONS FOR PAYMEN SECTION
 ***/
// verifies all conditions before displaying submit button
function paymentValidationBlock() {
    if (namecontainer.children.length > 8) {
        // changeElemDisplay(button, 'none');
    } else if (registeredActivities.length === 0) {
        // changeElemDisplay(button, 'none');
    } else {
        changeElemDisplay(button, 'block');
    }
}
// hides all but selected element
function displayAndHidePaymentInfo(e) {
    if (e.target.value === 'paypal') {
        changeElemDisplay(paypalForm, 'block');
        changeElemDisplay(creditCardPaymentForm, 'none');
        changeElemDisplay(bitcoinForm, 'none');
        // creditCardNumber.removeEventListener('keyup', creditcardValidation, false);
        // creditCardNumber.removeEventListener('focusout', creditcardValidation, false);
        // formm.removeEventListener('submit', creditcardValidation, false);
        // formm.addEventListener('submit', verifyEmail, false);
        // formm.addEventListener('submit', formsubmittwo, false);
        // paymentValidationBlock()
    }
    else if (e.target.value === 'bitcoin') {
        changeElemDisplay(bitcoinForm, 'block');
        changeElemDisplay(paypalForm, 'none');
        changeElemDisplay(creditCardPaymentForm, 'none');
        changeElemDisplay(button, 'block');
        // creditCardNumber.addEventListener('keyup', creditcardValidation, false);
        // creditCardNumber.addEventListener('focusout', creditcardValidation, false);
        // formm.addEventListener('submit', verifyEmail, false);
        // formm.addEventListener('submit', formsubmittwo, false);
        // paymentValidationBlock();
        // formm.removeEventListener('submit', creditcardValidation, false);
    }
    else {
        changeElemDisplay(creditCardPaymentForm, 'block');
        changeElemDisplay(paypalForm, 'none');
        changeElemDisplay(bitcoinForm, 'none');
        // formm.addEventListener('submit', creditcardValidation, false);
        // creditCardNumber.addEventListener('keyup', creditcardValidation, false);
        // creditCardNumber.addEventListener('focusout', creditcardValidation, false);
        // formm.removeEventListener('submit,', formsubmit, false);
        // formm.addEventListener('submit', formsubmitthree, false);
        // formm.addEventListener('submit', verifyEmail, false);
        // formm.addEventListener('submit', noName, false);
        // changeElemDisplay(button, 'none');
    }
}
/**
 * PAYMENT SECTION
 * event listener for changes to payment dropdown
 */
paymentDropdown.addEventListener('change', e => {
    displayAndHidePaymentInfo(e);
});
/***
 * VALIDATIONS For other sections, HELPER FUNCTIONS FOR EVENT LISTENERS
 * must pass conditions before displaying submit button
 ***/
function creditCardValidationBlock(inputOne, inputTwo) {
    if (registeredActivities.length === 0) {
        // changeElemDisplay(button, 'none');
    } else if (namecontainer.children.length > 8) {
        // changeElemDisplay(button, 'none');
    } else if (inputOne.value === '' || inputTwo.value === '') {
        // changeElemDisplay(button, 'none');
    } else {
        // changeElemDisplay(button, 'block');
    }
}
function nameEmailActivitiesValidationBlock(valMesg) {
    valMesg.remove();
    // if (namecontainer.children.length > 8) {
    //     changeElemDisplay(button, 'none');
    // } else if (registeredActivities.length === 0) {
    //     changeElemDisplay(button, 'none');
    // } else if (creditCardNumber.value === '' || creditCardCVV.value === '' || zipCode.value === '') {
    //     changeElemDisplay(button, 'none');
    // } else {
    //     changeElemDisplay(button, 'block');
    // }
}
//////////////////////////////////////////// validation condition for name section
// function noName() {  //for name
//     if (yourname.value === "") {
//         // nameValMesg.style.backgroundColor = '9BBEEF';
//         nameValMesg.style.border = 'solid 2px red';
//         // nameValMesg.style.color = 'black';
//         nameValMesg.textContent = "Must enter name"; // adds styling to p element          ***for Name event***
//         yourname.before(nameValMesg);
//         // changeElemDisplay(button, 'none')
//     }
// }
//////////////////////////////////////////// validation condition for name section
function removesOrAddsAlertWhileTypingName() {  // for name
    if (yourname.value === "") {
        // nameValMesg.style.backgroundColor = '9BBEEF';
        nameValMesg.style.border = 'solid 2px red';
        // nameValMesg.style.color = 'black';
        nameValMesg.textContent = "Must enter name"; // adds styling to p element          ***for Name event***
        yourname.before(nameValMesg);
        // changeElemDisplay(button, 'none');
        yourname.style.border = 'none'
    } else if (yourname.value.length > 0) {
        yourname.style.border = '3px solid lightgreen';
        nameEmailActivitiesValidationBlock(nameValMesg); // validation block
    }
}
//////////////////////////////////////////// validation conditions for email section
function removesOrAddsAlertWhileTypingEmail() {
    let thestringemail = youremail.value;
    if (thestringemail.indexOf('@') === -1 || thestringemail.indexOf('.com') === -1) {
        emailValMesg.textContent = "Please enter Email and format correctly";
        youremail.before(emailValMesg);
        youremail.style.border = 'none'
        // changeElemDisplay(button, 'none')
    }
    else if (thestringemail.indexOf('@') > thestringemail.indexOf('.com') || thestringemail.indexOf('.com') !== thestringemail.length - 4) {
        emailValMesg.textContent = "Please enter Email and format correctly";
        youremail.style.border = 'none';
        youremail.before(emailValMesg);
        // changeElemDisplay(button, 'none');
    } else if (thestringemail.includes('@') && thestringemail.includes('.com')) {
        youremail.style.border = '3px solid lightgreen';
        nameEmailActivitiesValidationBlock(emailValMesg); // validation block for other sections
    }
}
//////////////////////////////////////////// validation conditions for email section
// function verifyEmail() {
//     let thestringemail = youremail.value;
//     if (thestringemail.indexOf('@') === -1 || thestringemail.indexOf('.com') === -1) {
//         emailValMesg.textContent = "Please enter Email and format correctly";
//         youremail.before(emailValMesg);
//         // changeElemDisplay(button, 'none')
//     }
// }
//////////////////////////////////////////// validation conditions for creditcard section
function creditcardValidation() {
    let creditCardNumbervalue = creditCardNumber.value;
    if (creditCardNumber.value === "") {
        creditValMesg.textContent = "please enter a creditcard number and validate zipcode and cvv";
        creditCardNumber.style.border = 'solid 2px red';
        creditCardPaymentForm.before(creditValMesg);
        // changeElemDisplay(button, 'none');
    }
    else if (creditCardNumbervalue.length < 13) {
        creditValMesg.textContent = "Please enter a number that is between 13 and 16 digits long.";
        creditCardPaymentForm.before(creditValMesg);
        creditCardNumber.style.border = '2px solid red';
        // changeElemDisplay(button, 'none')
    }
    else if (creditCardNumbervalue.length > 16) {
        creditValMesg.textContent = "must be within 13 - 16 digits";
        creditCardPaymentForm.before(creditValMesg);
        creditCardNumber.style.border = '2px solid red';
        // changeElemDisplay(button, 'none')
    }
    else {
        creditCardNumber.style.border = '3px solid lightgreen';
        creditValMesg.remove();
        // creditCardValidationBlock(creditCardCVV, zipCode);
    }
    for (let index = 0; index < creditCardNumbervalue.length; index++) {
        if (isNaN(creditCardNumbervalue[index])) {
            // changeElemDisplay(button, 'none');
            creditCardNumber.style.border = '2px solid red';
            creditValMesg.textContent = "must be digits";
            creditCardPaymentForm.before(creditValMesg);
        }
    }
}

//////////////////////////////////////////// validation conditions for zipcode
function zipCodekeyup() {
    let zipCodevalue = zipCode.value;
    if (zipCodevalue.length > 5 || zipCodevalue.length < 5) {
        zipCode.style.border = 'solid 2px red';
        // changeElemDisplay(button, 'none');
    }
    else if (zipCodevalue.length === 5) {
        zipCode.style.border = '3px solid lightgreen';
        // creditCardValidationBlock(creditCardCVV, creditCardNumber);
    }
    for (let index = 0; index < zipCodevalue.length; index++) {
        // zipcode validation conditions
        if (isNaN(zipCodevalue[index])) {
            zipCode.style.border = 'solid 2px red';
            // changeElemDisplay(button, 'none');
        }
    }
}


//////////////////////////////////////////// validation conditions for cvv

function creditCardCVVkeyup() {
    let creditCardCVVvalue = creditCardCVV.value;
    if (creditCardCVVvalue.length > 3 || creditCardCVVvalue.length < 3) {
        creditCardCVV.style.border = 'solid 2px red';
        // changeElemDisplay(button, 'none');
    }
    else if (creditCardCVVvalue.length === 3) {
        creditCardCVV.style.border = '3px solid lightgreen';
        // creditCardValidationBlock(creditCardNumber, zipCode);
    }
    for (let index = 0; index < creditCardCVVvalue.length; index++) {
        // CVV validation conditions
        if (isNaN(creditCardCVVvalue[index])) {
            creditCardCVV.style.border = 'solid 2px red';
            // changeElemDisplay(button, 'none');
        }
    }
}

formm.addEventListener('submit', e => {
    anotherFunction();
}, false);

// yourname.addEventListener('focusout', noName, false);
yourname.addEventListener('keyup', removesOrAddsAlertWhileTypingName, false);
yourname.addEventListener('focusout', removesOrAddsAlertWhileTypingName, false);


youremail.addEventListener('keyup', removesOrAddsAlertWhileTypingEmail, false);
youremail.addEventListener('focusout', removesOrAddsAlertWhileTypingEmail, false);
// youremail.addEventListener('focusout', verifyEmail, false);

creditCardNumber.addEventListener('keyup', creditcardValidation, false);
creditCardNumber.addEventListener('focusout', creditcardValidation, false);

creditCardCVV.addEventListener('keyup', creditCardCVVkeyup, false);
zipCode.addEventListener('keyup', zipCodekeyup, false);


///////////////////////


formm.addEventListener('submit', removesOrAddsAlertWhileTypingName, false);
// formm.addEventListener('submit', removesOrAddsAlertWhileTypingName, false);

formm.addEventListener('submit', removesOrAddsAlertWhileTypingEmail, false);
// formm.addEventListener('submit', removesOrAddsAlertWhileTypingEmail, false);

formm.addEventListener('submit', creditcardValidation, false);
// formm.addEventListener('submit', creditcardValidation, false);

formm.addEventListener('submit', creditCardCVVkeyup, false);
formm.addEventListener('submit', zipCodekeyup, false);


paymentDropdown.addEventListener('change', e => {
    if (e.target.value === 'paypal') {
        creditValMesg.remove();
        // console.log('1');
        formm.removeEventListener('submit', creditcardValidation, false);
        // formm.addEventListener('submit', removesOrAddsAlertWhileTypingEmail, false);
        // formm.removeEventListener('submit', creditcardValidation, false);

        formm.removeEventListener('submit', creditCardCVVkeyup, false);
        formm.removeEventListener('submit', zipCodekeyup, false);
        formm.removeEventListener('submit', anotherFunction, false);
        formm.addEventListener('submit', e => {
            smallerFunction();
        }, false)

    }
    else if (e.target.value === 'bitcoin') {

        creditValMesg.remove();
        // formm.addEventListener('submit', removesOrAddsAlertWhileTypingEmail, false);
        formm.removeEventListener('submit', creditcardValidation, false);
        // formm.removeEventListener('submit', creditcardValidation, false);

        formm.removeEventListener('submit', creditCardCVVkeyup, false);
        formm.removeEventListener('submit', zipCodekeyup, false);
        formm.addEventListener('submit', e => {
            smallerFunction();
        }, false);
        console.log('2');
    }
    else {
        formm.addEventListener('submit', creditcardValidation, false);
        // formm.addEventListener('submit', creditcardValidation, false);

        formm.addEventListener('submit', creditCardCVVkeyup, false);
        formm.addEventListener('submit', zipCodekeyup, false);
        // formm.addEventListener('submit', e => {
        //     anotherFunction();
        // }, false);
    }
});

function anotherFunction() {
    let countercvv = 0;
    let counterzip = 0;
    let countercredit = 0;
    console.log(countercvv);
    console.log(counterzip);
    console.log(countercredit);
    event.preventDefault();
    let creditCardCVVvalue = creditCardCVV.value;
    let zipCodevalue = zipCode.value;
    let thestringemail = youremail.value;
    let creditCardNumbervalue = creditCardNumber.value;
    var letters = /^[A-Za-z]+$/;
    var numbers = /^[0-9]+$/;
    for (let index = 0; index < creditCardCVVvalue.length; index++) {
        // CVV validation conditions
        if (isNaN(creditCardCVV.value[index])) {
            // creditCardCVV.style.border = 'solid 2px red';
            console.log('cvv -+ 1');
            countercvv -= 1;
            console.log(countercvv);
            // changeElemDisplay(button, 'none');
        }
        else {
            console.log('cvv + 1');
            countercvv += 1;
            console.log(countercvv);
        }
    }
    for (let index = 0; index < zipCode.value.length; index++) {
        // zipcode validation conditions
        if (isNaN(zipCodevalue[index])) {
            // zipCode.style.border = 'solid 2px red';
            console.log('zipcode -+ 1');
            counterzip -= 1;
            // console.log(counterzip);
            // changeElemDisplay(button, 'none');
        }
        else {
            console.log('zip + 1');
            counterzip += 1;
            // console.log(counterzip);
        }
    }
    for (let index = 0; index < creditCardNumber.value.length; index++) {
        if (isNaN(creditCardNumbervalue[index])) {
            // countercredit -= 1
            // changeElemDisplay(button, 'none');
            console.log('creditcard -+ 1');
            countercredit -= 4;
            // console.log(countercredit);
            // creditCardNumber.style.border = '2px solid red';
            // creditValMesg.textContent = "must be digits";
            // creditCardPaymentForm.before(creditValMesg);
        }
        else {
            console.log('credit + 1');
            countercredit += 1;
            // console.log(countercredit);
        }
    }
    if (registeredActivities.length === 0) {
        activitiesParentContainer.before(activitiesValMesg);
        console.log('1');
    }
    ///////////////////////////////
    else if (yourname.value === "") {
        // nameValMesg.style.backgroundColor = '9BBEEF';
        // nameValMesg.style.border = 'solid 2px red';
        // // nameValMesg.style.color = 'black';
        // nameValMesg.textContent = "Must enter name"; // adds styling to p element          ***for Name event***
        // yourname.before(nameValMesg);
        // // changeElemDisplay(button, 'none');
        // yourname.style.border = 'none'
        console.log('2');
    }
    // else if (yourname.value.length > 0) {
    //     yourname.style.border = '3px solid lightgreen';
    //     nameEmailActivitiesValidationBlock(nameValMesg); // validation block
    //     console.log('3')
    // }
    else if (thestringemail.indexOf('@') === -1 || thestringemail.indexOf('.com') === -1) {
        // emailValMesg.textContent = "Please enter Email and format correctly";
        // youremail.before(emailValMesg);
        // youremail.style.border = 'none'
        // changeElemDisplay(button, 'none')
        console.log('4');
    }
    else if (thestringemail.indexOf('@') > thestringemail.indexOf('.com') || thestringemail.indexOf('.com') !== thestringemail.length - 4) {
        // emailValMesg.textContent = "Please enter Email and format correctly";
        // youremail.style.border = 'none';
        // youremail.before(emailValMesg);
        console.log('5');
        // changeElemDisplay(button, 'none');
    }
    // else if (thestringemail.includes('@') && thestringemail.includes('.com')) {
    //     youremail.style.border = '3px solid lightgreen';
    //     nameEmailActivitiesValidationBlock(emailValMesg); // validation block for other sections
    //     console.log('6')
    // }
    else if (creditCardNumber.value === "") {
        // creditValMesg.textContent = "please enter a creditcard number and validate zipcode and cvv";
        // creditCardNumber.style.border = 'solid 2px red';
        // creditCardPaymentForm.before(creditValMesg);
        console.log('7');
        // changeElemDisplay(button, 'none');
    }
    else if (creditCardNumbervalue.length < 13) {
        // creditValMesg.textContent = "Please enter a number that is between 13 and 16 digits long.";
        // creditCardPaymentForm.before(creditValMesg);
        // creditCardNumber.style.border = '2px solid red';
        console.log('8');
        // changeElemDisplay(button, 'none')
    }
    else if (creditCardNumbervalue.match(letters)) {
        console.log('leter');
    }
    else if (creditCardNumbervalue.length > 16) {
        // creditValMesg.textContent = "must be within 13 - 16 digits";
        // creditCardPaymentForm.before(creditValMesg);
        // creditCardNumber.style.border = '2px solid red';
        console.log('9');
        // changeElemDisplay(button, 'none')
    }
    else if (zipCodevalue.length > 5 || zipCodevalue.length < 5) {
        // zipCode.style.border = 'solid 2px red';
        console.log('10');
        // changeElemDisplay(button, 'none');
    }
    else if (zipCodevalue.length === 5 && zipCodevalue.match(letters)) {
        // zipCode.style.border = '3px solid lightgreen';
        console.log('11');
        // creditCardValidationBlock(creditCardCVV, creditCardNumber);
    }
    else if (creditCardCVVvalue.length > 3 || creditCardCVVvalue.length < 3) {
        // creditCardCVV.style.border = 'solid 2px red';
        console.log('12');
        // changeElemDisplay(button, 'none');
    }
    else if (creditCardCVVvalue.length === 3 && creditCardCVVvalue.match(letters)) {
        // creditCardCVV.style.border = '3px solid lightgreen';
        console.log('13');
        // creditCardValidationBlock(creditCardNumber, zipCode);
    }
    else if (creditCardCVVvalue.match(letters)) {
        console.log('contains letters');
        console.log('14');
    }
    else if (zipCodevalue.match(letters)) {
        console.log('contains letters');
        console.log('15');
    }
    else if (creditCardNumbervalue.match(letters)) {
        console.log('contains letters');
        console.log('16');
    }
    ////////////////////////////////
    else if (countercvv === 3 && counterzip === 5 && (countercredit >= 13 && countercredit <= 16)) {
        formm.submit();
    }
}



function smallerFunction() {
    event.preventDefault();

    let thestringemail = youremail.value;

    if (registeredActivities.length === 0) {
        // activitiesParentContainer.before(activitiesValMesg);
        console.log('1');
    }
    ///////////////////////////////
    else if (yourname.value === "") {
        // nameValMesg.style.backgroundColor = '9BBEEF';
        // nameValMesg.style.border = 'solid 2px red';
        // // nameValMesg.style.color = 'black';
        // nameValMesg.textContent = "Must enter name"; // adds styling to p element          ***for Name event***
        // yourname.before(nameValMesg);
        // // changeElemDisplay(button, 'none');
        // yourname.style.border = 'none'
        console.log('2');
    }
    // else if (yourname.value.length > 0) {
    //     yourname.style.border = '3px solid lightgreen';
    //     nameEmailActivitiesValidationBlock(nameValMesg); // validation block
    //     console.log('3')
    // }
    else if (thestringemail.indexOf('@') === -1 || thestringemail.indexOf('.com') === -1) {
        // emailValMesg.textContent = "Please enter Email and format correctly";
        // youremail.before(emailValMesg);
        // youremail.style.border = 'none'
        // changeElemDisplay(button, 'none')
        console.log('4');
    }
    else if (thestringemail.indexOf('@') > thestringemail.indexOf('.com') || thestringemail.indexOf('.com') !== thestringemail.length - 4) {
        // emailValMesg.textContent = "Please enter Email and format correctly";
        // youremail.style.border = 'none';
        // youremail.before(emailValMesg);
        console.log('5');
        // changeElemDisplay(button, 'none');
    }

    ////////////////////////////////
    else {
        formm.submit();
    }
}
