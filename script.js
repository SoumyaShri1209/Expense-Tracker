document.addEventListener("DOMContentLoaded",()=>{
    let formName=document.getElementById("expense-form");
    let expense_id=document.getElementById("expense-id");
    let expense_amount=document.getElementById("expense-amount");
    let expense_list=document.getElementById("expense-list");
    let total=document.getElementById("total");
    let total_amount=document.getElementById("total-amount");



    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
 
    let totalAmount = calculateTotal();
       renderData();
       updateAmount();


    formName.addEventListener("submit",(e)=>{
        e.preventDefault();
        let name = expense_id.value.trim();
        let amount= parseFloat(expense_amount.value.trim());
      
        if(name!="" && !isNaN(amount) && amount>0){
            let newExpense = {
                id:Date.now(),
                name:name,
                amount:amount
            }

            expenses.push(newExpense);
            saveExpenseToLocal();
            renderData();
            updateAmount();

            expense_id.value="";
            expense_amount.value="";
        }
        
    })
     function saveExpenseToLocal(){
        localStorage.setItem("expenses",JSON.stringify(expenses))
     }



     function calculateTotal(){
        return expenses.reduce((sum,expense)=>(sum + expense.amount),0)
     }

     function updateAmount(){
        totalAmount = calculateTotal();
        total_amount.textContent= `₹${totalAmount.toFixed(2)}`;
        saveExpenseToLocal();
     }

     function renderData(){
        expense_list.innerHTML ="";
        expenses.forEach((expense)=>{
         const li = document.createElement("li");
         li.innerHTML=`
            ${expense.name} - ₹${expense.amount.toFixed(2)}
            <button data-id="${expense.id}" class="dele-btn">Delete</button>
         `  
         expense_list.appendChild(li)
        })
        
     }

       expense_list.addEventListener("click", (e) => {
         if (e.target.tagName === "BUTTON") {
           const expenseId = parseInt(e.target.getAttribute("data-id"));
                  console.log(expenseId);
         

          expenses = expenses.filter(expenses=> expenses.id !== expenseId)

         saveExpenseToLocal();
         renderData();
         updateAmount();

         }
       });
     

})       