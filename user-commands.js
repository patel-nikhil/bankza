let account = 0;
let deposited = 0;
let activeacc = 0;
let transactions = [];

var account1 = {
    number: "1234567890904321",
    balance: {chequing : 100.00, savings: 50.00},
    name: "Adam Geneva",
    pin: "1234"
}

var account2 = {
    number: "1234567890904322",
    balance: {chequing : 200.00, savings: 50.00},
    name: "Inspectah Malicious",
    pin: "1234"
}

var accountF = {
    number: "523456789090432",
    balance: {chequing : 300.00, savings: 50.00},
    name: "King Mickey",
    pin: "1234"
}

/*
Stores a transaction into string array for future use
 */
function saveTransaction(transaction, amount, subaccount) {
    let n = transactions.length + 1;
    if (n != 1) n--;
    if (transaction == "withdraw") {
        transactions[n] = transaction + ' ' +  "from" + ' ' + subaccount + ' ' + '-' + amount;
    } else {
        transactions[n] = transaction + ' ' + "to" + ' ' + subaccount + ' ' + '+' + amount;
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

    console.log("Chequings:", account.balance.chequing);
    console.log("Savings:", account.balance.savings);
}

function removeTranscations(){
    transactions = [];
}

//Log into account 1 using swipe, available on state 0 or 1
$(".acc1").click(function(){
    if(state == 0 || state == 1){

        //Set Account info
        account = account1;
        activeacc = 1;
        console.log(account);

        //Next Display
        $(".pin-input").val("");
        entry = "";
        if(state == 0) {
            toggleStateDisplay($(".start-screen"));
            console.log("cool beans");
        }else{
            toggleStateDisplay($(".account-entry-screen"));
            console.log("but why though");
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
        account = account2;
        activeacc = 2;
        console.log(account);

        //Next Display
        $(".pin-input").val("");
        entry = "";
        if(state == 0) {
            toggleStateDisplay($(".start-screen"));
            console.log("cool beans");
        }else{
            toggleStateDisplay($(".account-entry-screen"));
            console.log("but why though");
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
        account = accountF;
        activeacc = 3;
        console.log(account);

        //Next Display
        $(".pin-input").val("");
        entry = "";
        if(state == 0) {
            toggleStateDisplay($(".start-screen"));
            console.log("cool beans");
        }else{
            toggleStateDisplay($(".account-entry-screen"));
            console.log("but why though");
        }
        setTimeout(function(){
            toggleStateDisplay($(".pin-pad-screen"));
        }, 1000);

        //Set new state
        state = 2;
    }
});

$(".input-deposit").click(function(){
   deposited =  document.getElementById("deposit").value;
   console.log(deposited);
   //saveTransaction("deposit", deposited, "saving");
})

$(".receipt").click(function(){
    printReceipt(account);
})

