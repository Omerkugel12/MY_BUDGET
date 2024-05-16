const incomesArray = initialeIncomesLocalStorage()
const expensesArray = initialeExpensesLocalStorage()
const inputDescreptionElem = document.querySelector('#text')
const inputvalueElem = document.querySelector('#num')
const incomeElem = document.querySelector('.income-list')
const expensElem = document.querySelector('.expenses-list')
const incomeHeaderElem = document.querySelector('.income-header')
const expensesHeaderElem = document.querySelector('.exspens-header')
const elemSelect = document.querySelector('#opertor-select')
const balanceElem = document.querySelector('.balance')
const dateElem = document.querySelector('.date')
const submitIcon = document.querySelector('.apply')
const removeFromIncomes = document.querySelector('.removeFromIncome')
const removeFromExpenses = document.querySelector('.removeFromExpenses')
let colorVar = '#38B2AD'
//getting the name of the current month
function findCurrentMonthAndYear(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const currrentDate = new Date()
    const monthIndex = currrentDate.getMonth()
    const currentMonthName = monthNames[monthIndex]
    const currentYear = new Date().getFullYear()
    dateElem.innerText = `${currentMonthName} ${currentYear}:`
}
//add new item to the incomes array
function addToIncomeArray(){
    const incomeItem = {description: inputDescreptionElem.value, value: inputvalueElem.valueAsNumber}
    if(inputDescreptionElem.value.trim() === '' || isNaN(inputvalueElem.valueAsNumber) || inputvalueElem.valueAsNumber <= 0){
        alert('All inputs must be filled and value must be a positive number')
    }else{
        incomesArray.push(incomeItem)
        incomeElem.innerHTML += `<li><span>${incomeItem.description}</span><span class="income-value">+${incomeItem.value.toFixed(2)}</span><span class="removeFromIncome" onclick="removeIncome(this)"><i class="fa-regular fa-circle-xmark"></i></span></li>`
}
}
//add new item to the expenses array
function addToExpensesArray(){
    const expensItem = {description: inputDescreptionElem.value, value: inputvalueElem.valueAsNumber}
    if(inputDescreptionElem.value.trim() === "" || isNaN(inputvalueElem.valueAsNumber) || inputvalueElem.valueAsNumber <= 0){
        alert('All inputs must be filled and value must be a positive number')
    }else{
        expensesArray.push(expensItem)
        expensElem.innerHTML += `<li><span>${expensItem.description}</span><span class="expenses-value">-${expensItem.value.toFixed(2)}</span><span class="removeFromExpenses" onclick="removeExpens(this)"><i class="fa-regular fa-circle-xmark"></i></span></li>`
}}
//function to compute the sum of any array
function computeArraySum(array){
    let sum = 0
    for(let item of array){
        sum += item.value
    }
    return sum
}
//function to submit by the buttom all the operates
function submit(){
    if(elemSelect.value === '+'){
        addToIncomeArray()
        saveIncomeArrayToLocalStorage()
        incomeHeaderElem.innerText = `+${parseFloat(computeArraySum(incomesArray)).toFixed(2)}`
    }
    if(elemSelect.value === '-'){
        addToExpensesArray()
        saveExpensesArrayToLocalStorage()
        expensesHeaderElem.innerText = `-${parseFloat(computeArraySum(expensesArray)).toFixed(2)}`
    }  
    inputDescreptionElem.value = ''
    inputvalueElem.value = ''
    balanceElem.innerText = `${computeBalanace()}`
}
//Allow the 'Enter' button in the keyboard to submit instead pressing the 'V' button
inputDescreptionElem.addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        submit()
    }
})
//Allow the 'Enter' button in the keyboard to submit instead pressing the 'V' button
inputvalueElem.addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        submit()
    }
})
//function to copute the balance between the incomes to the expenses
function computeBalanace(){
    let balanceSum = parseFloat(computeArraySum(incomesArray)).toFixed(2) - parseFloat(computeArraySum(expensesArray)).toFixed(2)
    if(Number(balanceSum>=0)){
        return `+${Number(balanceSum).toFixed(2)}`
    }
    return Number(balanceSum).toFixed(2)
}
function removeIncome(elem){
    const listItem = elem.parentElement;
    const description = listItem.querySelector('span').innerText;
    const value = listItem.querySelector('.income-value').innerText
    
    // Remove the item from the incomesArray
    incomesArray.forEach((item, index) => {
        if (item.description === description) {
            incomesArray.splice(index, 1);
        }
    });
    
    // Update the DOM
    listItem.remove();
    
    // Update incomeHeaderElem
    incomeHeaderElem.innerText = `+${parseFloat(computeArraySum(incomesArray)).toFixed(2)}`;
    
    // Update balanceElem
    balanceElem.innerText = `${computeBalanace()}`;

    // Save updated incomesArray to local storage
    saveIncomeArrayToLocalStorage();
}
function removeExpens(elem){
    const liElem = elem.parentElement
    const description = liElem.querySelector('span').innerText

    for(let i = 0;i<expensesArray.length;i++){
        if(expensesArray[i].description === description){
            expensesArray.splice(i,1)
        }
    }
    liElem.remove()
    expensesHeaderElem.innerText = `-${parseFloat(computeArraySum(expensesArray)).toFixed(2)}`
    balanceElem.innerText = `${computeBalanace()}`;
    saveExpensesArrayToLocalStorage()
}
findCurrentMonthAndYear(); //calling the function to show the current month and year
showIncomesArrayFromLocalStorage(); //calling the function to show the incomes on the DOM after the window was closed
showexpensesArrayFromLocalStorage(); //calling the function to show the expenses on the DOM after the window was closed
incomeHeaderElem.innerText = `+${parseFloat(computeArraySum(incomesArray)).toFixed(2)}` 
expensesHeaderElem.innerText = `-${parseFloat(computeArraySum(expensesArray)).toFixed(2)}`
balanceElem.innerText = `${computeBalanace()}`

elemSelect.addEventListener('change', ()=>{
    let classToAdd;
    let classToRemove;
    if(elemSelect.value === '+'){
        classToAdd = 'green';
        classToRemove = 'red';
        colorVar = '#38B2AD'
    }
    else{
        classToAdd = 'red';
        classToRemove = 'green';
        colorVar = '#F83D41'
    }
    elemSelect.classList.remove(classToRemove)
    inputDescreptionElem.classList.remove(classToRemove)
    inputvalueElem.classList.remove(classToRemove)
    elemSelect.classList.add(classToAdd)
    inputDescreptionElem.classList.add(classToAdd)
    inputvalueElem.classList.add(classToAdd)
    submitIcon.style.color = colorVar
    document.querySelector(".active").style.border = `1px solid ${colorVar} !important;`;
})