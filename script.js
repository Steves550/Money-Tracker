const balance = document.getElementById('balance');
const moneyAdd = document.getElementById('money-add');
const moneySubtract = document.getElementById('money-subtract');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

  let transactions =  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// New transaction

function newTransaction(event) {
    event.preventDefault();

    if (text.value === '' || amount.value === '') {
        alert('Please add transaction and amount');
    } else {
        const submitTransaction = {
            text: text.value,
            amount: +amount.value
        };

       transactions.push(submitTransaction);
       addTransaction(submitTransaction); 

       updateValues();
       updateLocalStorage();

       text.value = '';
       amount.value = '';
       
    }
}

function addTransaction(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'subtract' : 'add');

    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
       <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// Removing transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id );

    initApp();

    updateLocalStorage();
}


// Update values (Income , Spending)
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    console.log(amounts);

    const total = amounts.reduce((total, amount) => (total += amount), 0).toFixed(2);

    const income = (amounts.filter(item => item > 0).reduce((total, amount) => (total += amount), 0).toFixed(2));

    const spending = ( amounts.filter(item => item < 0).reduce((total, amount) => (total += amount), 0 ) * -1).toFixed(2)

    balance.innerText = `$${total}`;
    moneyAdd.innerText = `$${income}`;
    moneySubtract.innerText = `$${spending}`;

}

// Local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Initialize App
function initApp() {
    list.innerHTML = '';

    transactions.forEach(addTransaction);
    updateValues();
}

initApp();

form.addEventListener('submit', newTransaction);