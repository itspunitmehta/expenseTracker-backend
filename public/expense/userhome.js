const loginToken = localStorage.getItem('token');
const btn = document.getElementById('btn');
const nav = document.getElementById('nav');
const menuUl = document.getElementById('menu');

btn.addEventListener('click', ()=>{
    nav.classList.toggle('active');
    btn.classList.toggle('active');
})

function addExpense(event){
    event.preventDefault();
    const form = new FormData(event.target);

    const expenseDetails = {
        amount: form.get("expenseamount"),
        description: form.get("description"),
        category: form.get("category")

    }
    console.log(expenseDetails);
    axios.post('http://34.207.152.50:8000/user/addexpenses',expenseDetails,{headers: {authorization:loginToken} })
    .then(response=>{
        if(response.status===201){
            addNewExpensetoDOM(response.data.expense);
        }else{
            throw new Error('Failed')
        }
    })
    .catch(err=>{
        console.log(err);
        showError(err);
    })
}

function addNewExpensetoDOM(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            $${expense.amount} - ${expense.category} - ${expense.description}
            <button class="delete-btn" onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
}

window.addEventListener('load',()=>{
    axios.get('http://34.207.152.50:8000/user/getexpenses',{headers: {authorization:loginToken} })
    .then(response=>{
        if(response.status===200){
            if(response.data.premium === true){
                document.body.classList.add('dark')
            menuUl.innerHTML+=`<li><a href="../leaderboard/leaderboard.html">LeaderBoard</a></li>`
            }
            response.data.expenses.forEach(expense => {
                addNewExpensetoDOM(expense)
            })
        }else{
            console.log(response.status);
            throw new Error('Failed To Load')
        }
    })
    .catch(err=>{
        console.log(err);
        alert('Please Log-In First');
        window.location.href = "../login/login.html"
    })
})

function deleteExpense(e, expenseid) {
    axios.delete(`http://34.207.152.50:8000/user/deleteexpense/${expenseid}`, { headers: {"Authorization" : loginToken} })
    .then((response) => {
    if(response.status === 204){
            removeExpensefromUI(expenseid);
        } else {
            throw new Error('Failed to delete');
        }
    })
    .catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}

function download(){
    axios.get('http://34.207.152.50:8000/user/download', { headers: {"Authorization" : loginToken} })
    .then((response) => {
        if(response.status === 200){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }
    })
    .catch((err) => {
        console.log(err);
        showError(err)
    });
}


document.getElementById('rzp-button1').onclick = async function (e) {
    const response  = await axios.get('http://34.207.152.50:8000/purchase/premiummembership', { headers: {"Authorization" : loginToken} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "9354344441"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://34.207.152.50:8000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : loginToken} })
         .then(() => {
             alert('You are a Premium User Now')
                 document.body.classList.add('dark')
         })
         .catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}

