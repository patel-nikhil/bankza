let deposited = 0;
let transactions = [];

/*
Stores a transaction into string array for future use
 */
function saveTransaction(transaction, amount, accountType) {
    let n = transactions.length + 1;
    if (n != 1) n--;
    if (transaction == "Withdrawal") {
        transactions[n] = transaction + ' ' +  "from" + ' ' + accountType + ' ' + ': $' + amount;
    } else {
        transactions[n] = transaction + ' ' + "to" + ' ' + accountType + ' ' + ': $' + amount;
    }
}

/*
Return account name, transactions completed, account balance
 */
function printReceipt(account){
    let today = new Date();
    console.log("Cardholder: " + account.name);
    console.log("Card number: ************" + account.number.substr(12));
    console.log(today);
    console.log("");
    console.log("Transactions");
    transactions[0] = "Account Balances";

    for (i = 0; i <= transactions.length; i++)
        console.log(transactions.pop());
    
    for (i = 0; i < account.balance.length; i++)
        console.log(account.balance[i][accountName] + ": $", account.balance[i][total]);
}

function removeTransactions(){
    transactions = [];
}

// //Log into account using swipe, available on state 0 or 1
$(".acc").each(function(index, btn){
    $(btn).click(function(){
        if(currentState.is($(".start-screen")) || currentState.is(accountEntryState)){
            if (btn.value == "1"){
                activeAccount = account1;
                activeAcc = 1;
            } else if (btn.value == "2"){
                activeAccount = account2;
                activeAcc = 2;
            } else if (btn.value == "F"){
                activeAccount = accountF;
                activeAcc = 3;
            }
           changeState(currentState.is(accountEntryState) ? 1 : 0, 2);
        }
    });
});

// //Log into account 1 using swipe, available on state 0 or 1
// $(".acc1").click(function(){
//     if(state == 0 || state == 1){

//         //Set Account info
//         activeAccount = account1;
//         activeAcc = 1;
//         console.log(activeAccount);
//         changeState(state, 2);
//     }
// });

// //Log into account 2 using swipe, available on state 0 or 1
// $(".acc2").click(function(){
//     if(state == 0 || state == 1){

//         //Set Account info
//         activeAccount = account2;
//         activeAcc = 2;
//         console.log(activeAccount);
//         changeState(state, 2);
//     }
// });

// //Log into foreign using swipe, available on state 0 or 1
// $(".accF").click(function(){
//     if(state == 0 || state == 1){

//         //Set Account info
//         activeAccount = account3;
//         activeAcc = 3;
//         console.log(activeAccount);
//         changeState(state, 2);
//     }
// });

// $(".receipt").click(function(){
//     if (activeAccount == 0) return;
//     printReceipt(activeAccount);
//     removeTransactions();
// })
