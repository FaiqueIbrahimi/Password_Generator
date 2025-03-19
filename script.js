const inputSlider = document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const paswwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[dataindicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

console.log('ankit');
let password = "";
let passwordLength = 10;
let checkCountor = 0;
handleslider();

// set password length  
function handleslider() {
    inputSlider.value = passwordLength;
    //jo length hai woh starting ma 10 ho
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi krna chaiya
    const min = inputSlider.min;
    const max = inputSlider.max;
  
    inputSlider.style.backgroundSize =
      ((passwordLength - min) * 100) / (max - min) + "%100%";
  }

  function setindicator(color) {
    indicator.style.backgroundColor = color;
    //shadow 
    indicator.style.boxShadow = `0px 0px 12px 1px ${color} `;
  }

  function getRandomInteger(min, max) {
    
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function generateRandomInteger() {
    return getRandomInteger(0, 9);
  }

  function generateUpperCase() {
    //A assci value 65 and z have ascii value 91
    return String.fromCharCode(getRandomInteger(65, 91));
  }

  function generateLowerCase() {
    //a assci value 97 and z have ascii value 123
    return String.fromCharCode(getRandomInteger(97, 123));
  }

  function generateSymbols() {
    //string len find in order to find max
    const randNum = getRandomInteger(0, symbols.length);
  
    return symbols[randNum];
  }

  function calculateStrength() 
  
  {
    let hasupper = false;
    let haslower = false;
    let hasNum = false;
    let hasSymbol = false;
  
    if (upperCaseCheck.checked) {
      hasupper = true;
    }
    if (lowerCaseCheck.checked) {
      haslower = true;
    }
    if (numberCheck.checked) {
      hasNum = true;
    }
    if (symbolCheck.checked) {
      hasSymbol = true;
    }
  
    if (hasupper && haslower && (hasNum || hasSymbol) && passwordLength >= 8) {
      setindicator("#0f0");
    } else if (
      (haslower || hasupper) &&
      (hasNum || hasSymbol) &&
      passwordLength >= 6
    ) {
      setindicator("#ff0");
    } else {
      setindicator("#f00");
    }
  }



  async function copyContent() {
    
    try 
    {
      await navigator.clipboard.writeText(paswwordDisplay.value);
      copyMsg.innerText = "Copied";
    }
     catch (error)
    {
      copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
  
    copyMsg.classList.add("active");
  
    //copy wala text ko gyab krne ka liye
  
    setTimeout(() => {
      copyMsg.classList.remove("active");
    }, 2000);
  }


  inputSlider.addEventListener("input", (e) => {
    //pasword length ko updat kr diya
    passwordLength = e.target.value;
    console.log(e);
  
    handleslider();
  });

  copyBtn.addEventListener("click", () => {
    if (paswwordDisplay.value) {
      copyContent();
    }
  });


  function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
      //random J, find out using random function
      const j = Math.floor(Math.random() * (i + 1));
      //swap number at i index and j index
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }

  function handleCheckBoxChange() {
    checkCountor = 0;
    allCheckBox.forEach((checkbox) => {
      if (checkbox.checked) {
        checkCountor++;
      }
    });
  
    //special condition of password length< no of checkbocx count
    if (passwordLength < checkCountor) {
      passwordLength = checkCountor;
      handleslider();
    }
  }


  allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
  });




  generateBtn.addEventListener("click", () => {
   
    if (checkCountor <= 0) {
      return;
    }
  
    if (passwordLength < checkCountor) {
      passwordLength = checkCountor;
      handleslider();
    }
  
    // console.log("stating the journey");
  
    //lets start to journey to find new password
  
    //remove old password
    password = "";
    
    let funcArr = [];
    if (upperCaseCheck.checked) {
      funcArr.push(generateUpperCase);
    }
    if (lowerCaseCheck.checked) {
      funcArr.push(generateLowerCase);
    }
    if (numberCheck.checked) {
      funcArr.push(generateRandomInteger);
    }
    if (symbolCheck.checked) {
      funcArr.push(generateSymbols);
    }
    //is function ma sari chiz daldi jo bhi chceked hai
  
    //compulsory addition
    //jo tick kiya hua hai
  
    for (let i = 0; i < funcArr.length; i++) {
      password += funcArr[i]();
    }
    // console.log("Compulsory addition done");
  
    //remaining addition
  
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
      let randIndex = getRandomInteger(0, funcArr.length);
  
      password += funcArr[randIndex]();
    }
    // console.log("Remaining addition Done");
  
    //shuffle krna padega
    //pasword ko array ka frm ma bhje diya
    password = shufflePassword(Array.from(password));
    // console.log("Shuffling done");
    paswwordDisplay.value = password;
    // console.log("Ui addition done");
    //paswword bn ka bad strength bhi call krni padegi
    calculateStrength();

  });


