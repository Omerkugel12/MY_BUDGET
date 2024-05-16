const incomesArrayFromLocalStorage = JSON.parse(localStorage.getItem('incomes'))
const expensesArrayFromLocalStorage = JSON.parse(localStorage.getItem('expenses'))
//function to show the incomes on the DOM before the window was closed 
function showIncomesArrayFromLocalStorage(){
    if(incomesArrayFromLocalStorage!==null){
    for(let i = 0;i<incomesArrayFromLocalStorage.length;i++){
        incomeElem.innerHTML += `<li><span>${incomesArrayFromLocalStorage[i].description}</span><span class="income-value">+${incomesArrayFromLocalStorage[i].value.toFixed(2)}</span><span class="removeFromIncome" onclick="removeIncome(this)"><i class="fa-regular fa-circle-xmark"></i></span></li>`
    }}

}
//function to show the expenses on the DOM before the window was closed
function showexpensesArrayFromLocalStorage(){
    if(expensesArrayFromLocalStorage!==null){
    for(let i = 0;i<expensesArrayFromLocalStorage.length;i++){
        expensElem.innerHTML += `<li><span>${expensesArrayFromLocalStorage[i].description}</span><span class="expenses-value">-${expensesArrayFromLocalStorage[i].value.toFixed(2)}</span><span class="removeFromExpenses" onclick="removeExpens(this)"><i class="fa-regular fa-circle-xmark"></i></span></li>`
    }}
    
}
//function to save the updated incomes array to the Local Storage
function saveIncomeArrayToLocalStorage(){
    const incomesArrayAsJson = JSON.stringify(incomesArray)
    localStorage.setItem('incomes', incomesArrayAsJson)
}
//function to save the updated expenses array to Local Storage
function saveExpensesArrayToLocalStorage(){
    const expensesArrayAsJson = JSON.stringify(expensesArray)
    localStorage.setItem('expenses', expensesArrayAsJson)
}
//function to initial the incomes array
function initialeIncomesLocalStorage(){
    if(localStorage.getItem('incomes') == null){
        //localStorage.getItem('incomes') = []
        return []
    }
    return JSON.parse(localStorage.getItem('incomes'))
}
//function to initial the expenses array
function initialeExpensesLocalStorage(){
    if(localStorage.getItem('expenses') == null){
        return []
    }
    return JSON.parse(localStorage.getItem('expenses'))
}