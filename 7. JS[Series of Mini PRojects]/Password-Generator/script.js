const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]"); 
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 0;
let checkCount = 0;

handleSlider();

//set strength circle color to grey

//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow
}

function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber() {
    return getRandInteger(0,9);
}

function generateLowerCase() {
    return String.fromCharCode(getRandInteger(97,123));
}

function generateUpperCase() {
    return String.fromCharCode(getRandInteger(65,91));
}

function generateSymbol() {
    const randNum = getRandIteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let haslower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked){
        hasUpper = true;
    }
    if(lowercaseCheck.checked) {
        haslower = true;
    }
    if(numbersChecked.check) {
        hasNum = true;
    }
    if(symbolsCheck.checked) {
        hasSym = true;
    }

    if(hasUpper && haslower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked) {
            checkCount++;
        }
    });

    //special condition : suppose we select password length as 3 but we select 4 checkboxes, then the generate password length will be 4
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider()

    }
}

allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value) {
        copyContent();
    }
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected
    if(checkCount <= 0) {
        return;
    }

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //let's start the journey to find new password

    //remove old password
    password = "";

//    if(uppercaseCheck.checked) {
//         password += generateUpperCase();
//    } 

//    if(lowercaseCheck.checked) {
//         password += generateLowerCase();
//    }

//    if(numbersCheck.checked) {
//         password += generateRandomNumber();
//    }

//    if(symbolsCheck.checked) {
//         password += generateSymbol();
//    }


    let funArr = [];

    if(uppercaseCheck.checked) {
        funArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked) {
        funArr.push(generateLowerCase);
    }
    if(numbersCheck.checked) {
        funArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked) {
        funArr.push(generateSymbol);
    }

    //compulsory addition
    for(let i=0; i<funArr.length; i++) {
        password += funArr[i]();
    }

    //remaining addition
    for(let i=0; i<passwordLength-funArr.length; i++) {
        let randIndex = getRandInteger(0, funArr.length);
        password += funArr[randIndex]();
    }

    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show in UI
    passwordDisplay.value = password;
    //calculate strength
    calcStrength();

})