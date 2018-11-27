/*
 * Global Variables
 * account1
 * billName
 * billValue
 * billCount
 * withdraw_bill_count
 */

/*
 * Functions
 * atmTotal : float
 * setDefaultBills(amount) : null ? Object
 * beginWithdraw(account, amount) : Boolean
 * tryWithdraw(account, amount, bills) : Boolean
 * checkAmount(account, amount) : Boolean
 * hasBills (bills) : Boolean
 * updateBills(amount, denom, value, change) : Boolean
 * doWithdraw(account, amount) : None 
 * removeBills(bills) : None
 */

var activeAccount;

/* First dummy account */
var account1 = {
	number: "1234567890904321",
	balance: {chequing: 100.51, savings: 50.00},
	name: "Adam Geneva",
	pin: "1234"
}

/* Bill names */
var billName = {
	five: "five",
	ten: "ten",
	twenty: "twenty",
	fifty: "fifty",
	hundred: "hundred"
}

/* Bill values */
var billValue = {
	five: 5.00,
	ten: 10.00,
	twenty: 20.00,
	fifty: 50.00,
	hundred: 100.00
}

/* Number of bills of each type in the ATM */
var billCount = {
	five: 100,
	ten: 100,
	twenty: 100,
	fifty: 100,
	hundred: 100
}

/* State variable storing bills to be withdrawn */
var withdraw_bill_count = {
	five: 0,
	ten: 0,
	twenty: 0,
	fifty: 0,
	hundred: 0
}

function populateAccounts(){
	var acct_dropdown = document.querySelector(".account-selection");
	acct_dropdown.appendChild(new Option("Chequing  $" + activeAccount.balance.chequing, 1));
	acct_dropdown.appendChild(new Option("Savings  $" + activeAccount.balance.savings, 2));
}

$(".account-selection").on(
	{"change": function(){
		updateAvailableAmounts(document.querySelector(".account-selection").value);
		updateCurrentBalance(document.querySelector(".account-selection").value);
	}
});

function updateAvailableAmounts (acct_type){
	if (acct_type == "1"){
		$(".withdraw-amount-button").each(function(index, btn){
			if (parseInt(btn.innerText.substr(1),10) > activeAccount.balance.chequing){
				btn.disabled = true;
				btn.style.color = "lightgray";
			} else {
				btn.disabled = false;
				btn.style.color = "#0099ff";
			}
		});
	} else if (acct_type == "2"){
		$(".withdraw-amount-button").each(function(index, btn){
			if (parseInt(btn.innerText.substr(1),10) > activeAccount.balance.savings){
				btn.disabled = true;
				btn.style.color = "lightgray";
			} else {
				btn.disabled = false;
				btn.style.color = "#0099ff";
			}
		});
	} else {
		$(".withdraw-amount-button").each(function(index, btn){
			if (parseInt(btn.innerText.substr(1),10) > activeAccount.balance.savings){
				btn.disabled = false;
				btn.style.color = "#0099ff";
			}
		});
	}
}

function updateCurrentBalance(acct_type){
	if (acct_type == "2"){
		document.querySelectorAll(".balance-title").forEach(function(btn){btn.innerText = activeAccount.balance.savings});	
	} else {
		document.querySelectorAll(".balance-title").forEach(function(btn){btn.innerText = activeAccount.balance.chequing});	
	}
}

/*
 * Returns total amount of money stored in ATM
 */
function atmTotal(){
	return billCount.five * 5 + billCount.ten * 10 + billCount.twenty * 20 + billCount.fifty * 50 + billCount.hundred * 100;
}

/*
 * Calculates number of each bill to use
 * Uses highest possible available denomination method
 */
function setDefaultBills(amount){
	var bills = {};
	var overflow = 0;
	bills["twenty"] = Math.floor(amount/ 20);
	if (bills["twenty"] > billCount["twenty"]) {
		bills["twenty"] = billCount["twenty"];
		overflow = ((amount + overflow * 50)/ 20) - billCount["twenty"];
	} else {
		overflow = 0;
	}
	amount = amount % 20;
	bills["ten"] = Math.floor((amount + overflow * 20)/ 10);
	if (bills["ten"] > billCount["ten"]) {
		bills["ten"] = billCount["ten"];
		overflow = Math.floor((amount + overflow * 20)/ 10) - billCount["ten"];
	} else {
		overflow = 0;
	}
	amount = amount % 10;
	bills["five"] = Math.floor((amount + overflow * 10)/ 5);
	if (bills["five"] > billCount["five"]) {
		bills["five"] = billCount["five"];
		overflow = Math.floor((amount + overflow * 10)/ 5) - billCount["five"];
	} else {
		overflow = 0;
	}
	amount = amount % 5;
	if (overflow != 0) return setDefaultBillsMaxDenomination(amount);
	return bills;
}

function setDefaultBillsMaxDenomination(amount){
	var bills = {};
	var overflow = 0;
	bills["hundred"] = Math.floor(amount / 100);
	if (bills["hundred"] > billCount["hundred"]) {
		bills["hundred"] = billCount["hundred"];
		overflow = Math.floor(amount / 100) - billCount["hundred"];
	} else {
		overflow = 0;
	}
	amount = amount % 100;
	bills["fifty"] = Math.floor((amount + overflow * 100)/ 50);
	if (bills["fifty"] > billCount["fifty"]) {
		bills["fifty"] = billCount["fifty"];
		overflow = Math.floor((amount + overflow * 100)/ 50) - billCount["fifty"];
	} else {
		overflow = 0;
	}
	amount = amount % 50;
	bills["twenty"] = Math.floor((amount + overflow * 50)/ 20);
	if (bills["twenty"] > billCount["twenty"]) {
		bills["twenty"] = billCount["twenty"];
		overflow = ((amount + overflow * 50)/ 20) - billCount["twenty"];
	} else {
		overflow = 0;
	}
	amount = amount % 20;
	bills["ten"] = Math.floor((amount + overflow * 20)/ 10);
	if (bills["ten"] > billCount["ten"]) {
		bills["ten"] = billCount["ten"];
		overflow = Math.floor((amount + overflow * 20)/ 10) - billCount["ten"];
	} else {
		overflow = 0;
	}
	amount = amount % 10;
	bills["five"] = Math.floor((amount + overflow * 10)/ 5);
	if (bills["five"] > billCount["five"]) {
		bills["five"] = billCount["five"];
		overflow = Math.floor((amount + overflow * 10)/ 5) - billCount["five"];
	} else {
		overflow = 0;
	}
	amount = amount % 5;
	if (overflow != 0) return null;
	return bills;
}

/*
 * Sets the default bill distribution
 * Returns false is unable to make exact change
 */
function beginWithdraw(account, amount){
	var bills = setDefaultBills(amount);
	if (bills == null) return false;
	console.log(bills);
	withdraw_bill_count.five = bills.five;
	withdraw_bill_count.ten = bills.ten;
	withdraw_bill_count.twenty = bills.twenty;
	withdraw_bill_count.fifty = bills.fifty;
	withdraw_bill_count.hundred = bills.hundred;
	if (!checkAmount(account, amount)) return false;
	Object.keys(bills).forEach(function(item, index, array){
		document.getElementById("num_" + item).value = withdraw_bill_count[item];
	});
	return tryWithdraw(account, amount, bills);
}


/* 
 * Perform withdraw action
 */
function tryWithdraw(account, amount, bills){
	if(!hasBills(bills)) return false;
	doWithdraw(account, amount, bills);
	removeBills(bills);
	return true;
}

/*
 * Check that the user has enough money in their account
 * Check that the amount to be withdrawn is positive
 * Check that the ATM has enough money (total, ignores exact change)
 */
function checkAmount(account, amount){
	if (amount > account.balance || amount < 0 || amount > atmTotal()) return false;
	return true;
}

/* 
 * Check that the ATM has enough of each bill type
 * Check that the bill counts are zero or positive
 */
function hasBills (bills){
	Object.values(bills).forEach(function(item, index, array){
		if (item < 0) return false;
	});
	if (bills.five > billCount.five || bills.ten > billCount.ten || bills.twenty > billCount.twenty || bills.fifty > billCount.fifty || bills.hundred > billCount.hundred) return false;	
	return true;
}


/*
 * Recalculates the number of bills being distributed
 *
 * Parameters:
 * amount	- total amount being withdrawn
 * denom	- denominator of bill for which the number is being changed
 *				0 = five, 1 = ten, 2 = twenty, 3 = fifty, 4 = hundred
 * 
 * value	- number of bills by which amount is being increased/decreased
 * change	- "increase" or "decrease"
 *
 * Return Values:
 * true if bills are successfully reallocated, false otherwise
 *
 * Side Effects:
 * Updates withdraw_bill_count
 *
 */
function updateBills(amount, denom, value, change){
	if (billCount[denom] < value) return false; 										/* Not enough bills, don't allow to increase */
	if (value > Math.floor(amount / Object.values(billValue)[denom])) return false; 	/* Goes higher than withdrawal amount */
	
	var new_amts = [0, 0, 0, 0, 0];
	for (i = 0; i < 5; i++) new_amts[i] = Object.values(withdraw_bill_count)[i];
	
	console.log("Passed initial checks");
	
	/*if (change == "decrease"){*/
	if (change == "decrease"){
		new_amts[denom] -= value;
	} else if (change == "increase"){
		new_amts[denom] += value;
	}
	
	/* Try and reallocate all other bill values */
	/* amt_change = Object.values(billValue)[denom] */
	amt_change = Object.values(billValue)[denom] * value;
	console.log(amt_change);
	for (i = 4; i >= 0; i--){
		if (i == denom) continue;
		if (document.getElementById(Object.values(billName)[i]).disabled == true) continue;	/* Allow user to 'lock in' a number for bill denomination */
		if (Object.values(billCount)[i] <= Object.values(withdraw_bill_count)[i]) continue;	/* Used up all of these bills so go to next highest denomination */
		var denomAmt = Math.floor(amt_change / Object.values(billValue)[i]);
		if (denomAmt == 0) continue;
		
		/* Use as many of these bill types as you can */
		if (denomAmt > Object.values(billCount)[i] - Object.values(withdraw_bill_count)[i]){
			denomAmt = Object.values(billCount)[i] - Object.values(withdraw_bill_count)[i];
		}
		
		if (change == "decrease"){
			new_amts[i] += denomAmt;
		} else if (change == "increase"){
			if (new_amts[i] - denomAmt < 0) continue; 
			new_amts[i] -= denomAmt;
		}
		/*new_amts[i] = denomAmt;*/
		amt_change -= denomAmt * Object.values(billValue)[i];								/* Update selection to reflect to bill count */
		console.log("Reallocated");
		console.log(Object.values(billName)[i]);
		console.log(new_amts[i]);
		if (amt_change == 0) break;
	}
	if (amt_change != 0) return false;
	for (i = 0; i < 5; i++) withdraw_bill_count[Object.values(billName)[i]] = new_amts[i];
	/*withdraw_bill_count[Object.values(billName)[denom]] -= 1;*/
	return true;
}

/* Decreases account balance by appropriate amount */
function doWithdraw(account, amount) {
	account.balance -= amount;
	console.log("Withdrew amount successfully");
}

/* Decreases ATM bill count by appropriate amounts */
function removeBills(bills){
	billCount.five -= bills.five;
	billCount.ten -= bills.ten;
	billCount.twenty -= bills.twenty;
	billCount.fifty -= bills.fifty;
	billCount.hundred -= bills.hundred;
}

let withdraw_amount = 100.00;
activeAccount = account1;
// document.getElementById("balance").value = "$" + account1.balance;
// beginWithdraw(account1, 50.00);
// console.log("New balance is " + account1.balance);

/*
 * tryWithdraw(account1, 50.00, {five: 0, ten: 0, twenty: 0, fifty: 1, hundred: 0});
 * tryWithdraw(account1, 50.00, {five: 0, ten: 0, twenty: 0, fifty: 1, hundred: 0});
 */

/*
 *
 * Use this code to test the user updating the number of bills of a certain type
 *
 * account1.balance = 200;
 * setDefaultBills(125);
 * beginWithdraw(account1, 125);
 * document.getElementById("hundred").disabled = true;
 * updateBills(125, 3, 2, "increase");
 */