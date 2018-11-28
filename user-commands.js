let deposited = 0;
let transactions = [];

/*
Stores a transaction into string array for future use
 */
function saveTransaction(transaction, amount, accountType) {
    let n = transactions.length + 1;
    if (n != 1) n--;
    if (transaction == "withdraw") {
        transactions[n] = transaction + ' ' +  "from" + ' ' + accountType + ' ' + ': $' + amount;
    } else {
        transactions[n] = transaction + ' ' + "to" + ' ' + accountType + ' ' + ': $' + amount;
    }
    console.log(transactions);
}

/*
Return account name, transactions completed, account balance
 */
function printReceipt(account){
    console.log(account.name);
    console.log(account.number);

    transactions[0] = "Account Balances";

    for (i = 0; i <= transactions.length; i++)
        console.log(transactions.pop());

    console.log("Chequings:", account.balance[0][total]);
    console.log("Savings:", account.balance[1][total]);
}

function removeTranscations(){
    transactions = [];
}

//Log into account 1 using swipe, available on state 0 or 1
$(".acc1").click(function(){
    if(state == 0 || state == 1){

        //Set Account info
        activeAccount = account1;
        activeAcc = 1;
        console.log(activeAccount);

        //Next Display
        $(".pin-input").val("");
        entry = "";
        if(state == 0) {
            toggleStateDisplay($(".start-screen"));
        }else{
            toggleStateDisplay($(".account-entry-screen"));
        }
        setTimeout(function(){
            toggleStateDisplay($(".pin-pad-screen"));
        }, 1000);

        //Set new state
        state = 2;
    }
});

//Log into account 2 using swipe, available on state 0 or 1
$(".acc2").click(function(){
    if(state == 0 || state == 1){

        //Set Account info
        activeAccount = account2;
        activeAcc = 2;
        console.log(activeAccount);

        //Next Display
        $(".pin-input").val("");
        entry = "";
        if(state == 0) {
            toggleStateDisplay($(".start-screen"));
        }else{
            toggleStateDisplay($(".account-entry-screen"));
        }
        setTimeout(function(){
            toggleStateDisplay($(".pin-pad-screen"));
        }, 1000);

        //Set new state
        state = 2;
    }
});

//Log into foreign using swipe, available on state 0 or 1
$(".accF").click(function(){
    if(state == 0 || state == 1){

        //Set Account info
        activeAccount = account3;
        activeAcc = 3;
        console.log(activeAccount);

        //Next Display
        $(".pin-input").val("");
        entry = "";
        if(state == 0) {
            toggleStateDisplay($(".start-screen"));
        }else{
            toggleStateDisplay($(".account-entry-screen"));
        }
        setTimeout(function(){
            toggleStateDisplay($(".pin-pad-screen"));
        }, 1000);

        //Set new state
        state = 2;
    }
});

$(".receipt").click(function(){
    printReceipt(activeAccount);
})
