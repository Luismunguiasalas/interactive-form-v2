document.querySelector(".js-focus").focus(); //Give focus to the name text field by default

const jobDropdown = document.querySelector('.js-jobs'); // selects job dropdown element
const designDropdown = document.querySelector('.js-design'); // selects design dropdown element
const colorDropdown = document.querySelector('.js-color__Select__Elem'); // selects color dropdown element
const jobTextInput = document.querySelector('.js-job__input') // selects job text input element
const colorDivContainer = document.querySelector('.js-color-div-container'); // selects color div
const colorOptionDefault = document.createElement('option'); // creates option element

const activitiesInput = document.querySelectorAll('.activities input')















jobTextInput.style.display = "none"; // hiddes other job text input element

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


/** T-shirt info Section
 * User selects design dropdown
 * After selection of an option
 *  - color dropdown is nolonger disabled
 *  - default option of 'please select T-shirt..' is removed, and no longer displayed as an option
 * if user chooses to not select a theme after all
 *  - color dropdown is disabled and selects and 'please select T-shirt..' is displayed
 * else if user selects 'js puns' or 'heart js' design
 *  - any previous 'selected' attribute is removed from option element at index 3
 *  - attribute 'selected' is added to option element at index 0
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
        colorDropdown[3].removeAttribute('selected'); // removes selected attribute from option element
        colorDropdown[0].setAttribute('selected', 'selected'); //sets first child option element attribute to selected
        displayColorOptions(); // display all color options to inline
        for (let index = 3; index < 6; index++) {
            colorDropdown[index].style.display = 'none'; //hides all option elements from index 3 - 6
        }
    } else if (designDropdown.value === "heart js") {
        colorDropdown[0].removeAttribute('selected'); // removes selected attribute from option
        colorDropdown[3].setAttribute('selected', 'selected'); // sets 4th child's attribute to selected
        displayColorOptions(); // display all color options to inline
        for (let index = 0; index < 3; index++) {  //hides all option elements from index 0 - 3
            colorDropdown[index].style.display = 'none';
        }
    }
})




