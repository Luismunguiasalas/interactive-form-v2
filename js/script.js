//Give focus to the name text field by default
document.querySelector(".js-focus").focus();

const jobSelectElem = document.querySelector('.js-jobs');
const jobTextInput = document.querySelector('.js-job--input')
const jobOther = document.querySelector('.js-job--other');
const designSelectElem = document.querySelector('.js-design');
const colorSelectElem = document.querySelector('.js-color');
const colorDivContainer = document.querySelector('.js-colorDiv')
// const message = document.createElement('span');
// colorSelectElem.style.display = 'none';
// console.log(colorSelectElem);

jobTextInput.style.display = "none";

// job role sections
jobSelectElem.addEventListener('change', e => {
    if (jobSelectElem.value === "other") {
        jobTextInput.style.display = "block";
    } else {
        jobTextInput.style.display = "none";
    }
})

// console.log(designSelectElem.value);
function checkTheme() {
    const message = document.createElement('span');
    const selectedTheme = designSelectElem.value
    if (selectedTheme === 'Select Theme') {
        colorSelectElem.style.display = 'none';
        // const message = document.createElement('span');
        message.textContent = "Please Select a T-Shirt Theme";
        // console.log(message);
        colorDivContainer.append(message);
    } else {
        // colorSelectElem.remove(message);
        colorSelectElem.style.display = 'span';

    }
}

// console.log(colorSelectElem[1].getAttribute('value'));
console.log(colorSelectElem)
designSelectElem.addEventListener('change', e => {
    checkTheme();
    // console.log(designSelectElem.value);
    if (designSelectElem.value === "js puns") {
        // for (let index = 0; index < 3; index++) {
        //     colorSelectElem[index].style.display = 'none';
        // }
        colorSelectElem[3].style.display = 'hidden';
        colorSelectElem[4].style.display = 'hidden';
        colorSelectElem[5].style.display = 'hidden';

        // cornflowerblue
        // darkslategrey
        // gold
        // designSelectElem.childNodes.v
    } else if (designSelectElem.value === "heart js") {
        // colorSelectElem[0].style.display = 'none';
        // colorSelectElem[1].style.display = 'none';
        // colorSelectElem[2].style.display = 'none';
        // colorSelectElem[3].style.display = 'span';
        // colorSelectElem[4].style.display = 'span';
        // colorSelectElem[5].style.display = 'span';
        // tomato
        // dimgrey
        // steelblue
    }
})




// otherOption.addEventListener('click', e => {
//     console.log('hello');
// })