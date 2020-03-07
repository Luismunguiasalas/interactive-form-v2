document.querySelector(".js-focus").focus(); //Give focus to the name text field by default

const jobDropdown = document.querySelector('.js-Jobs-Dropdown'); // selects job dropdown 'select' element
const jobTextInput = document.querySelector('.js-Jobs__Other__Input') // selects job text input element
const colorDivContainer = document.querySelector('.js-Color-Div-Container'); // selects color div container
const colorDropdown = document.querySelector('.js-Color__Select__Elem'); // selects color dropdown element
const designDropdown = document.querySelector('.js-Design'); // selects design dropdown 'select' element
const activitiesParent = document.querySelector('.js-Activities'); // selects Activities 'fieldset' Element
const activitiesInputChildren = document.querySelectorAll('.js-Activities input'); // get all input[checkbox] elements of parent Activities
const paymentDropdown = document.querySelector('.js-Payment'); // selects payment dropdown
const creditCardInfo = document.querySelector('.js-Credit-Card'); // selects creditcard info
const paypalInfo = document.querySelector('.js-Paypal'); // selects paypal info
const bitcoinInfo = document.querySelector('.js-Bitcoin'); // selects bitcoin info



let attendingActivities = []; // list for activities
let totalPrice = 0; // total price of activities

const colorOptionDefault = document.createElement('option'); // creates option element
jobTextInput.style.display = "none"; // hiddes other job text input element  ***for job***

const checklistWarning = document.createElement('p') // create p elemt for warning ***for checklist***
checklistWarning.textContent = "Must select ATLEAST ONE"; // add text content      ***for checklist***
checklistWarning.style.textAlign = 'center'; // adds styling to p element          ***for checklist***
checklistWarning.style.backgroundColor = 'crimson'; // adds styling to p element   ***for checklist***
checklistWarning.style.color = 'white'; // adds styling to p element               ***for checklist***

const elementprice = document.createElement('p'); // create p element for price    ***for checklist***
elementprice.textContent = 'Total: $0'; // add content into p element              ***for checklist***
activitiesParent.append(elementprice); // append p element into activities parent  ***for checklist***


// colorOptionDefault.textContent = "Please Select a T-Shirt Theme"; //add text content to option element  ***for t-shirt****
// colorOptionDefault.setAttribute('selected', 'selected'); // selects message by default                  ***for t-shirt****
// colorDropdown.appendChild(colorOptionDefault);  // appends message to color dropdown                    ***for t-shirt****
// colorDropdown.setAttribute('disabled', 'disabled'); //disables color dropdown                           ***for t-shirt****






const cvvinput = document.querySelector('#cvv');
const creditinput = document.querySelector('#cc-num');
const zipinput = document.querySelector('#zip');





colorDivContainer.style.display = 'none'; // hides color drop down
activitiesParent.style.display = 'none'; // hides checklist






// console.log(activitiesInputChildren[0].setAttribute('selected', 'selected'));
const allconference = activitiesInputChildren[0];
// allconference.checked = true; // auto check main conference
// console.log(allconference);




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

function hideElementsloop(startInd, endIndex) {
    for (let index = startInd; index < endIndex; index++) {
        console.log(colorDropdown[index]);
        colorDropdown[index].style.display = 'none';
    }
}

function removeAndSetAttr(indexRem, indexSet) {
    colorDropdown[indexRem].removeAttribute('selected'); // removes selected attribute from option element
    colorDropdown[indexSet].setAttribute('selected', 'selected');
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
    colorDivContainer.style.display = 'inline';
    activitiesParent.style.display = 'block';
    activitiesParent.insertBefore(checklistWarning, activitiesParent.childNodes[0]);
    // colorDropdown.removeAttribute('disabled');
    // colorOptionDefault.removeAttribute('selected');
    // colorOptionDefault.style.display = 'none';
    if (designDropdown.value === "Select Theme") { // Incase user doesnt chooses to not select a theme, color option disables
        colorDivContainer.style.display = 'none';
        activitiesParent.style.display = 'none';
        // colorDropdown.setAttribute('disabled', 'disabled'); //disables color dropdown
        // colorOptionDefault.setAttribute('selected', 'selected'); // selects 'please selects T-shirt theme' option
    } else if (designDropdown.value === "js puns") {
        console.log('js puns');
        colorDropdown.childNodes[3].style.display = 'none';
        colorDropdown.childNodes[4].style.display = 'none';
        colorDropdown.childNodes[5].style.display = 'none';
        // removeAndSetAttr(3, 0); //sets first child option element attribute to selected
        // displayColorOptions(); // display all color options to inline
        // hideElementsloop(0, 3);// hides element at from startInd to endInd
    } else if (designDropdown.value === "heart js") {
        console.log('heart js');
        // removeAndSetAttr(0, 3);  //sets third child option element attribute to selected
        // displayColorOptions(); // display all color options to inline
        // hideElementsloop(3, 6) // hides element at from startInd to endInd
    }
})



/*** checklist section
 * 
 * 
 * 
 */
function enableDisableMatchedElement(valueofreturn, dis_en) {
    for (let indx = 0; indx < activitiesInputChildren.length; indx++) { // for loop
        let newvalueofreturn = getAttributeValues(indx); // get All attribute values from options checklist
        if (valueofreturn[1] === newvalueofreturn[1] && valueofreturn[0] !== newvalueofreturn[0]) { // if option selected time matches with any time in checklist && option selected name doesnt match with any name in checklist 
            activitiesInputChildren[indx].disabled = dis_en; // enables or disables element that doesnt match name but matches time
        }
    }
}

function getAttributeValues(index) {
    let eventName = activitiesInputChildren[index].getAttribute('name');
    let eventTime = activitiesInputChildren[index].getAttribute('data-day-and-time');
    let eventCost = activitiesInputChildren[index].getAttribute('data-cost');
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

for (let index = 0; index < activitiesInputChildren.length; index++) {
    activitiesInputChildren[index].addEventListener('change', e => {
        let valueofreturn = getAttributeValues(index); // Only get attribute values for option selected
        // when select checklist element
        if (attendingActivities.indexOf(valueofreturn[0]) === -1) { //if name of attribute was NOT in activities list run nested code
            addToTotalPrice(valueofreturn);
            attendingActivities.push(valueofreturn[0]); //add option name selected to activities list
            enableDisableMatchedElement(valueofreturn, true);
            // console.log(attendingActivities);
            checklistWarning.remove();
            // console.log(namecontainer.children.length + " children");

            if (namecontainer.children.length > 8) {
                button.style.display = 'none';
                console.log('name 1')
            }
            else if (attendingActivities.length === 0) {
                button.style.display = 'none';
                console.log('name 2')
                // console.log('zerooo')
            } else if (creditinput.value === '' || cvvinput.value === '' || zipinput.value === '') {
                button.style.display = 'none';
                console.log('name 3')
            } else {
                button.style.display = 'block';
                console.log('name 4')
            }



        } else {
            // when deselect checklist element
            let namee = attendingActivities.indexOf(valueofreturn[0]); // searches name of option selected in activities list
            subtractFromTotalPrice(valueofreturn);
            attendingActivities.splice(namee, 1); // removes option name from activities list 
            enableDisableMatchedElement(valueofreturn, false);
            // console.log(attendingActivities.length);
            // checklistWarning.remove();
            if (attendingActivities.length === 0) {
                activitiesParent.insertBefore(checklistWarning, activitiesParent.childNodes[0]);
                button.style.display = 'none';
                // console.log('zerooo')

            }
        }
    });
};


/**
 *
 *
 *
 */
/**
 * 
 * payment
 * 
 */

paymentDropdown.removeChild(paymentDropdown.children[0]);

function createChildren() {
    const creditCard = paymentDropdown.children[1];
    const paypal = paymentDropdown.children[2];
    const bitcoin = paymentDropdown.children[3];
    return { creditCard, paypal, bitcoin };

}

const { creditCard, paypal, bitcoin } = createChildren();

// console.log(paymentDropdown.children[1]);

// const creditCard = paymentDropdown.children[1];  // selects child credit card from payment drop down  ***for payment***
// const paypal = paymentDropdown.children[2];      // selects child paypal from payment drop down       ***for payment***
// const bitcoin = paymentDropdown.children[3];     // selects child bitcoin from payment drop down      ***for payment***
// creditCard.setAttribute('selected', 'selected');  // selects credit card by default                   ***for payment***
// console.log(creditCard);

paypalInfo.style.display = 'none';  // hiddes paypal   ***for payment***
bitcoinInfo.style.display = 'none'; // hiddes other job text input element  ***for payment***

// hides all but selected element
function displayAndHidePaymentInfo(e) {
    if (e.target.value === 'paypal') {
        paypalInfo.style.display = 'block';
        creditCardInfo.style.display = 'none';
        bitcoinInfo.style.display = 'none';
        button.style.display = 'block';
    }
    else if (e.target.value === 'bitcoin') {
        bitcoinInfo.style.display = 'block';
        paypalInfo.style.display = 'none';
        creditCardInfo.style.display = 'none';
        button.style.display = 'block';
    }
    else {
        creditCardInfo.style.display = 'block';
        paypalInfo.style.display = 'none';
        bitcoinInfo.style.display = 'none';
        button.style.display = 'none';
    }
}
// paypalInfo.style.display = 'block';
// console.log(paymentDropdown.children);
// console.log(paymentDropdown.childNodes);
paymentDropdown.addEventListener('change', e => {
    displayAndHidePaymentInfo(e);
});


/**
 * payment
 *
 *
 *
 */










/**
 *
 *
 *form validation
 *
 *
*/
const namecontainer = document.querySelector('.js-name'); // selects fieldset name ***for Name event***
const nameWarning = document.createElement('p'); // create element                 ***for Name event***
const yourname = document.querySelector(".js-focus"); // selects name input        ***for Name event***
const button = document.querySelector('.js-submit'); // selects submit button      ***for button***
button.style.display = 'none';
// console.log(namecontainer.length);

// nameWarning.textContent = "Must enter name"; // adds styling to p element          ***for Name event***
nameWarning.style.textAlign = 'center'; // adds styling to p element               ***for Name event***
nameWarning.style.backgroundColor = 'crimson'; // adds styling to p element        ***for Name event***
nameWarning.style.color = 'white'; // adds styling to p element                    ***for Name event***
// nameWarning.setAttribute('id', 'namealert');

const youremail = document.querySelector('.js-email'); // selects email input      ***for email event***
const emailWarning = document.createElement('p'); // create element                ***for email event***
// console.log(youremail);



emailWarning.style.textAlign = 'center' // adds styling to p element               ***for email event***
emailWarning.style.backgroundColor = 'crimson'; // adds styling to p element       ***for email event***
emailWarning.style.color = 'white'; // adds styling to p element                   ***for email event***
// emailWarning.setAttribute('id', 'emailalert');
// let canOrCantSubmit = [];

const creditWarning = document.createElement('p'); // create element                ***for credit event***
// console.log(youremail);


creditWarning.style.textAlign = 'center' // adds styling to p element               ***for credit event***
creditWarning.style.backgroundColor = 'crimson'; // adds styling to p element       ***for credit event***
creditWarning.style.color = 'white'; // adds styling to p element                   ***for credit event***



function noName() {  //for name
    if (yourname.value === "") {
        nameWarning.textContent = "Must enter name"; // adds styling to p element          ***for Name event***
        yourname.before(nameWarning);
        button.style.display = 'none';
    }
}
// && namecontainer.children.length > 10
function removesOrAddsAlertWhileTypingName() {  // for name
    if (yourname.value === "") {
        nameWarning.textContent = "Must enter name"; // adds styling to p element          ***for Name event***
        yourname.before(nameWarning);
        yourname.style.border = 'none';
        button.style.display = 'none';
    }
    else if (yourname.value.length > 0) {
        nameWarning.remove();
        yourname.style.border = '3px solid lightgreen';
        // button.style.display = 'block';
        if (namecontainer.children.length > 8) {
            button.style.display = 'none';
            console.log('name 1')
        }
        else if (attendingActivities.length === 0) {
            button.style.display = 'none';
            console.log('name 2')
            // console.log('zerooo')
        } else if (creditinput.value === '' || cvvinput.value === '' || zipinput.value === '') {
            button.style.display = 'none';
            console.log('name 3')
        } else {
            button.style.display = 'block';
            console.log('name 4')
        }
    }
    // else if (yourname.value.length > 0) {
    //     button.style.display = 'block';
    // }
}


function removesOrAddsAlertWhileTypingEmail() { // for email
    let thestringemail = youremail.value;
    // if (thestringemail.indexOf('@') === -1 || thestringemail.indexOf('.com') === -1) {
    //     emailWarning.textContent = "Must enter email also Verify that it is formatted correctly";
    //     youremail.before(emailWarning);
    //     button.style.display = 'none';
    // }
    if (thestringemail.indexOf('@') > thestringemail.indexOf('.com') || thestringemail.indexOf('.com') !== thestringemail.length - 4) {
        emailWarning.textContent = "Must format correctly";
        youremail.style.border = 'none';
        youremail.before(emailWarning);
        button.style.display = 'none';
    } else if (thestringemail.includes('@') && thestringemail.includes('.com')) {
        emailWarning.remove();
        youremail.style.border = '3px solid lightgreen';
        if (namecontainer.children.length > 8) {
            button.style.display = 'none';
            console.log('email 1')
        } else if (attendingActivities.length === 0) {
            button.style.display = 'none';
            console.log('email 2')
            // console.log('zerooo')
        }

        else if (creditinput.value === '' || cvvinput.value === '' || zipinput.value === '') {
            button.style.display = 'none';
            console.log('email 3')
        } else {
            // console.log('thissss');
            console.log('email 4')
            // youremail.style.border = '3px solid lightgreen';
            button.style.display = 'block';
        }
    }
}

function verifyEmail() {  // for email
    let thestringemail = youremail.value;
    if (thestringemail.indexOf('@') === -1 || thestringemail.indexOf('.com') === -1) {
        emailWarning.textContent = "Must enter email also Verify that it is formatted correctly";
        youremail.before(emailWarning);
        button.style.display = 'none';
    }
}


yourname.addEventListener('focusout', noName, false);

yourname.addEventListener('keyup', removesOrAddsAlertWhileTypingName, false);

youremail.addEventListener('keyup', removesOrAddsAlertWhileTypingEmail, false);
youremail.addEventListener('focusout', verifyEmail, false);





/**
 * 
 * 
 * if the selected payment option is "Credit Card," 
 * make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
 * Credit Card field should only accept a number between 13 and 16 digits.
 *  The Zip Code field should accept a 5-digit number.
 * The CVV should only accept a number that is exactly 3 digits long.
 */


// const cvvinput = document.querySelector('#cvv');
// const creditinput = document.querySelector('#cc-num');
// const zipinput = document.querySelector('#zip');

cvvinput.addEventListener('keyup', e => {
    let cvvinputvalue = cvvinput.value;
    console.log(cvvinputvalue.length);
    for (let index = 0; index < cvvinputvalue.length; index++) {
        if (isNaN(cvvinputvalue[index])) {
            cvvinput.style.border = 'solid 2px red';
            button.style.display = 'none';
        }
        else if (cvvinputvalue.length > 3) {
            cvvinput.style.border = 'solid 2px red';
            button.style.display = 'none';
        }
        else if (cvvinputvalue.length === 3) {
            cvvinput.style.border = '3px solid lightgreen';
            console.log('4')
            // button.style.display = 'block';
            if (attendingActivities.length === 0) {
                button.style.display = 'none';
                console.log('cvv1')
            }
            else if (namecontainer.children.length > 8) {
                button.style.display = 'none';
                console.log('cvv2')
            }
            else if (creditinput.value === '' || zipinput.value === '') {
                button.style.display = 'none';
                console.log('cvv3')
            }
            else {
                console.log('cvv4')
                button.style.display = 'block';
            }

        }
    }
})

// 

zipinput.addEventListener('keyup', e => {
    let zipinputvalue = zipinput.value;
    console.log(zipinputvalue.length);
    for (let index = 0; index < zipinputvalue.length; index++) {
        if (isNaN(zipinputvalue[index])) {
            zipinput.style.border = 'solid 2px red';
            button.style.display = 'none';
        }
        else if (zipinputvalue.length > 5 || zipinputvalue.length < 5) {
            zipinput.style.border = 'solid 2px red';
            button.style.display = 'none';
        } else if (zipinputvalue.length === 5) {
            zipinput.style.border = '3px solid lightgreen';
            if (attendingActivities.length === 0) {
                button.style.display = 'none';
                console.log('zip 1');
            }
            else if (namecontainer.children.length > 8) {
                button.style.display = 'none';
                console.log('zip 2')
            }
            else if (creditinput.value === '' || cvvinput.value === '') {
                button.style.display = 'none';
                console.log('zip 3')
            }
            else {
                button.style.display = 'block';
                console.log('zip 4')
            }
        }

    }
});
// const creditcardparent = document.querySelector('#credit-card');

creditinput.addEventListener('keyup', e => {
    let creditinputvalue = creditinput.value;

    if (creditinputvalue.length < 13) {
        // const creditcardparent = document.querySelector('#credit-card');
        creditWarning.textContent = "Please enter a number that is between 13 and 16 digits long."; // adds styling to p element          ***for Name event***
        creditinput.before(creditWarning);
        creditinput.style.border = '2px solid red';

        // console.log('must be within 13 - 16 digits');
        button.style.display = 'none';
    } else if (creditinputvalue.length > 16) {
        creditWarning.textContent = "must be within 13 - 16 digits"; // adds styling to p element          ***for Name event***
        creditinput.before(creditWarning);
        creditinput.style.border = '2px solid red';

        // console.log('must be within 13 - 16 digits');
        button.style.display = 'none';
    }
    else {
        creditinput.style.border = '3px solid lightgreen';
        creditWarning.remove();
        if (attendingActivities.length === 0) {
            button.style.display = 'none';
            console.log('credit 1')
        }
        else if (namecontainer.children.length > 8) {
            button.style.display = 'none';
            console.log('credit 2')
        }
        else if (cvvinput.value === '' || zipinput.value === '') {
            button.style.display = 'none';
            console.log('credit 3')
        }
        else {
            button.style.display = 'block';
            console.log('credit 4')
        }
    }
});


function nocreditCard() {  //for name
    // if (creditinput.value === "") {
    //     // const creditcardparent = document.querySelector('#credit-card');
    //     creditWarning.textContent = "please enter creditcard number"; // adds styling to p element          ***for Name event***
    //     // creditinput.before(nameWarning);
    //     // creditinput.textContent = "please enter creditcard number"; // adds styling to p element          ***for Name event***
    //     creditinput.before(creditWarning);
    //     button.style.display = 'none';
    let creditinputvalue = creditinput.value;
    // }
    if (creditinput.value === "") {
        // const creditcardparent = document.querySelector('#credit-card');
        creditWarning.textContent = "please enter creditcard number"; // adds styling to p element          ***for Name event***
        // creditinput.before(nameWarning);
        // creditinput.textContent = "please enter creditcard number"; // adds styling to p element          ***for Name event***
        creditinput.before(creditWarning);
        button.style.display = 'none';
    }


    for (let index = 0; index < creditinputvalue.length; index++) {
        if (isNaN(creditinputvalue[index])) {
            creditinput.style.border = 'solid 2px red';
            button.style.display = 'none';
            creditWarning.textContent = "must be digits"; // adds styling to p element          ***for Name event***
            creditinput.before(creditWarning);
        }
    }
}

creditinput.addEventListener('keyup', nocreditCard, false);
creditinput.addEventListener('focusout', nocreditCard, false);
creditinput.addEventListener('keyup', nocreditCard, false);
