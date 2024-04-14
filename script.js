//getting all the globally needed elements
const form = document.getElementById("form");
let annualIncome = document.getElementById("annual-income");
let extraIncome = document.getElementById("extra-income");
let deductionIncome = document.getElementById("deduction-income");
let ageGroup = document.getElementById("age-group");
let finalIncome = document.getElementById("result");
let taxAmt = document.getElementById("taxAmt");
let outputWindow = document.querySelector(".result-container");

//function to display Amount with commas.
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// reset function to set the form to default
function reset() {
  annualIncome.value = "";
  extraIncome.value = "";
  ageGroup.value = 0;
  deductionIncome.value = "";
}

//function to check if the feild is empty
function checkEmpty(inputValue, warning) {
  if (inputValue === "" || isNaN(inputValue) || inputValue == "0") {
    warning.style.display = "block";
    warning.style.backgroundColor = "red";
    warning.style.color = "white";

    setTimeout(() => {
      warning.style.display = "none";
    }, 2500);
    reset();
    return false;
  }
  return true;
}

//function to calculate the taxes

function calculateTax(annualInc, extraInc, deductionAmt, ageGrp) {
  let overallIncome = annualInc + extraInc - deductionAmt;
  let taxPercent;
  if (overallIncome <= 800000) {
    taxPercent = 0;
  } else {
    if (ageGrp == "1") {
      taxPercent = 0.3;
    } else if (ageGrp == "2") {
      taxPercent = 0.4;
    } else if (ageGrp == "3") {
      taxPercent = 0.1;
    }
  }
  var totalTax = (overallIncome - 800000) * taxPercent;
  return totalTax;
}

//close button for the Result modal
let closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", function () {
  outputWindow.style.display = "none";
});

//form submission function
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let annualWarn = document.querySelector(".input-field + #ann-x-claim");
  let extraWarn = document.querySelector(".input-field + #extra-x-claim");
  let ageWarn = document.querySelector(".input-field + #age-x-claim");
  let deductionWarn = document.querySelector(
    ".input-field + #deduction-x-claim"
  );

  annualValue = parseFloat(annualIncome.value);
  extraValue = parseFloat(extraIncome.value);
  ageValue = parseFloat(ageGroup.value);
  deductionValue = parseFloat(deductionIncome.value);

  if (
    checkEmpty(annualValue, annualWarn) ||
    checkEmpty(extraValue, extraWarn) ||
    (checkEmpty(deductionValue, deductionWarn) && checkEmpty(ageValue, ageWarn))
  ) {
    let tax = calculateTax(annualValue, extraValue, deductionValue, ageValue);
    let result = annualValue + extraValue - deductionValue - tax;
    console.log(result);

    // display the output
    finalIncome.innerHTML = `₹${numberWithCommas(result.toFixed(2))}`;
    taxAmt.innerHTML = `₹${numberWithCommas(tax?tax.toFixed(2): 'No Tax')}`;
    outputWindow.style.display = "block";

    //reset the form to default
    reset();
  }
});
