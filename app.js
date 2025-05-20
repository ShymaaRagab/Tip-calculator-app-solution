//first solution that i think about first

// const bill = document.getElementById("bill");
// const custom = document.getElementById("custom");
// const allTips = document.querySelectorAll("button");
// const numOfPeople = document.getElementById("numOfPeople");
// const tipAmount = document.getElementsByClassName("tip-amount")[0];
// const total = document.getElementsByClassName("total")[0];
// const reset = document.getElementById("reset");

// allTips.forEach((tip) => {
//   tip.addEventListener("click", () => {
//     data.selectTip = +tip.textContent.replace('%',"").trim();
//     allTips.forEach((btn) => {
//       btn.classList.remove("active");
//     });
//     custom.value = 0;
//     tip.classList.toggle("active");
//   });
// });

// custom.addEventListener('input',()=>{
//   if(custom.value <= 0 || custom.value !=""){
//     data.selectTip = +custom.value;
//     allTips.forEach((btn) => {
//       btn.classList.remove("active");
//     });
//   }
// })

// bill.addEventListener('input',()=>{
//   if(bill.value <= 0 || bill.value !=""){
//     data.bill = +bill.value;
//   }
// })

// numOfPeople.addEventListener('input',()=>{
//   if(numOfPeople.value < 0 || numOfPeople.value !=""){
//     data.numberOfPeople = +numOfPeople.value;
//   }
// })

// let data = {
//   bill: 0,
//   selectTip: 0,
//   numberOfPeople: 0,
// };

// let result = {
//   tip_Amount: (data.bill * data.selectTip) / 100 / data.numberOfPeople,
//   total:
//     (data.bill + (data.bill * data.selectTip) / 100) / data.numberOfPeople,
// };


// reset.addEventListener('click',()=>{
//   data = {
//     bill: 0,
//     selectTip: 0,
//     numberOfPeople: 0,
//   };

//   bill.value = 0;
//   numOfPeople.value = 0;
//   custom.value = 0;

//   allTips.forEach((btn) => {
//     btn.classList.remove("active");
//   });

//   result = {
//     tip_Amount: 0,
//     total: 0,
//   };

//   tipAmount.textContent = result.tip_Amount.toFixed(2);
//   total.textContent = result.total.toFixed(2);
// })

// setInterval(()=>{
//   if(data.bill != "" && data.numberOfPeople!= "" && data.selectTip!=""){
//      result = {
//       tip_Amount: (data.bill * data.selectTip) / 100 / data.numberOfPeople,
//       total:
//         (data.bill + ((data.bill * data.selectTip) / 100)) / data.numberOfPeople,
//     };
//     tipAmount.textContent = result.tip_Amount.toFixed(2);
//     total.textContent = result.total.toFixed(2);
//   }
// },1000);

//final solution try to make my code better 
// Select DOM elements
const billInput = document.getElementById("bill");
const customTipInput = document.getElementById("custom");
const tipButtons = document.querySelectorAll(".all-tips button");
const peopleInput = document.getElementById("numOfPeople");
const tipAmountDisplay = document.querySelector(".tip-amount");
const totalDisplay = document.querySelector(".total");
const resetBtn = document.getElementById("reset");

// Data model
const data = {
  bill: 0,
  tipPercent: 0,
  people: 0,
};

// Update the calculation result
function updateResults() {
  const { bill, tipPercent, people } = data;

  if (bill > 0 && tipPercent >= 0 && people > 0) {
    const tipPerPerson = (bill * tipPercent) / 100 / people;
    const totalPerPerson = (bill + bill * tipPercent / 100) / people;

    tipAmountDisplay.textContent = tipPerPerson.toFixed(2);
    totalDisplay.textContent = totalPerPerson.toFixed(2);
  } else {
    tipAmountDisplay.textContent = "0.00";
    totalDisplay.textContent = "0.00";
  }
}

// Tip button click
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    const percentText = button.textContent.replace("%", "").trim();
    data.tipPercent = parseFloat(percentText);

    // UI changes
    tipButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    customTipInput.value = "";

    updateResults();
  });
});

// Custom tip input
customTipInput.addEventListener("input", () => {
  const val = parseFloat(customTipInput.value);
  if (!isNaN(val) && val >= 0) {
    data.tipPercent = val;

    // Remove active state from buttons
    tipButtons.forEach(btn => btn.classList.remove("active"));

    updateResults();
  }
});

// Bill input
billInput.addEventListener("input", () => {
  const val = parseFloat(billInput.value);
  data.bill = !isNaN(val) && val >= 0 ? val : 0;
  updateResults();
});

// Number of people input
peopleInput.addEventListener("input", () => {
  const val = parseInt(peopleInput.value);
  data.people = !isNaN(val) && val > 0 ? val : 0;
  updateResults();
});

// Reset button
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";

  tipButtons.forEach(btn => btn.classList.remove("active"));

  data.bill = 0;
  data.tipPercent = 0;
  data.people = 0;

  updateResults();
});

