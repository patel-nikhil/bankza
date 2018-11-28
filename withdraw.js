/*
 * Global Variables
 * account1
 * billName
 * bill_value
 * atm_bill_count
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


/* Bill names */
var denom = {
	five: 0,
	ten: 1,
	twenty: 2,
	fifty: 3,
	hundred: 4
}

/* Bill values */
var bill_value = [5, 10, 20, 50, 100];

/* Number of bills of each type in the ATM */
var atm_bill_count = [100, 100, 100, 100, 100];

/* State variable storing bills to be withdrawn */
var withdraw_bill_count = [0, 0, 0, 0, 0];

var withdraw_amount, current_withdraw_amount;

function billTotal(bills){
	let amt = 0;
	for (i = 0; i < bills.length; i++){
		amt += bills[i] * bill_value[i];
	}
	return amt;
}

/*
 * Returns total amount of money stored in ATM
 */
function atmTotal(){
	return billTotal(atm_bill_count);
}


function populateAccounts(){
	
}

// $(".account-selection").on(
// 	{"change": function(){
// 		if ($(this).val() == "Select Account") return;
// 		updateAvailableAmounts($(this).val());
// 		updateCurrentBalance($(this).val());
// 		activeAccountType = $(this).val();
// 	}
// });

// function updateAvailableAmounts (acct_type){
// 	$(".withdraw-amount-button").each(function(index, btn){
// 		if ($(this).val() > activeAccount.balance[acct_type][total]) {
// 			$(this).disabled = true;
// 		}
// 	});

	// if (acct_type == "1"){
	// 	$(".withdraw-amount-button").each(function(index, btn){
	// 		if (parseInt(btn.innerText.substr(1),10) > activeAccount.balance.chequing){
	// 			btn.disabled = true;
	// 			btn.style.color = "lightgray";
	// 		} else {
	// 			btn.disabled = false;
	// 			btn.style.color = "#0099ff";
	// 		}
	// 	});
	// } else if (acct_type == "2"){
	// 	$(".withdraw-amount-button").each(function(index, btn){
	// 		if (parseInt(btn.innerText.substr(1),10) > activeAccount.balance.savings){
	// 			btn.disabled = true;
	// 			btn.style.color = "lightgray";
	// 		} else {
	// 			btn.disabled = false;
	// 			btn.style.color = "#0099ff";
	// 		}
	// 	});
	// } else {
	// 	$(".withdraw-amount-button").each(function(index, btn){
	// 		if (parseInt(btn.innerText.substr(1),10) > activeAccount.balance.savings){
	// 			btn.disabled = false;
	// 			btn.style.color = "#0099ff";
	// 		}
	// 	});
	// }
// }

function updateCurrentBalance(acct_type){
	$(".balance-title").each(function(index, btn){
		btn.innerText = activeAccount.balance[acct_type][total]
	});
}

/*
 * Calculates number of each bill to use
 * Uses highest possible available denomination method
 */
function setDefaultBills(amount){
	var bills = [0, 0, 0, 0, 0];
	var overflow = 0;
	bills[denom.twenty] = Math.floor(amount/ 20);
	if (bills[denom.twenty] > atm_bill_count[denom.twenty]) {
		bills[denom.twenty] = atm_bill_count[denom.twenty];
		overflow = (amount/ 20) - atm_bill_count[denom.twenty];
	} else {
		overflow = 0;
	}
	amount = amount % 20;
	bills[denom.ten] = Math.floor((amount + overflow * 20)/ 10);
	if (bills[denom.ten] > atm_bill_count[denom.ten]) {
		bills[denom.ten] = atm_bill_count[denom.ten];
		overflow = Math.floor((amount + overflow * 20)/ 10) - atm_bill_count[denom.ten];
	} else {
		overflow = 0;
	}
	amount = amount % 10;
	bills[denom.five] = Math.floor((amount + overflow * 10)/ 5);
	if (bills[denom.five] > atm_bill_count[denom.five]) {
		bills[denom.five] = atm_bill_count[denom.five];
		overflow = Math.floor((amount + overflow * 10)/ 5) - atm_bill_count[denom.five];
	} else {
		overflow = 0;
	}
	amount = amount % 5;
	if (overflow != 0) return setDefaultBillsMaxDenomination(amount);
	return bills;
}

function setDefaultBillsMaxDenomination(amount){
	var bills = [0, 0, 0, 0, 0];
	var overflow = 0;
	bills[denom.hundred] = Math.floor(amount / 100);
	if (bills[denom.hundred] > atm_bill_count[denom.hundred]) {
		bills[denom.hundred] = atm_bill_count[denom.hundred];
		overflow = Math.floor(amount / 100) - atm_bill_count[denom.hundred];
	} else {
		overflow = 0;
	}
	amount = amount % 100;
	bills[denom.fifty] = Math.floor((amount + overflow * 100)/ 50);
	if (bills[denom.fifty] > atm_bill_count[denom.fifty]) {
		bills[denom.fifty] = atm_bill_count[denom.fifty];
		overflow = Math.floor((amount + overflow * 100)/ 50) - atm_bill_count[denom.fifty];
	} else {
		overflow = 0;
	}
	amount = amount % 50;
	bills[denom.twenty] = Math.floor((amount + overflow * 50)/ 20);
	if (bills[denom.twenty] > atm_bill_count[denom.twenty]) {
		bills[denom.twenty] = atm_bill_count[denom.twenty];
		overflow = ((amount + overflow * 50)/ 20) - atm_bill_count[denom.twenty];
	} else {
		overflow = 0;
	}
	amount = amount % 20;
	bills[denom.ten] = Math.floor((amount + overflow * 20)/ 10);
	if (bills[denom.ten] > atm_bill_count[denom.ten]) {
		bills[denom.ten] = atm_bill_count[denom.ten];
		overflow = Math.floor((amount + overflow * 20)/ 10) - atm_bill_count[denom.ten];
	} else {
		overflow = 0;
	}
	amount = amount % 10;
	bills[denom.five] = Math.floor((amount + overflow * 10)/ 5);
	if (bills[denom.five] > atm_bill_count[denom.five]) {
		bills[denom.five] = atm_bill_count[denom.five];
		overflow = Math.floor((amount + overflow * 10)/ 5) - atm_bill_count[denom.five];
	} else {
		overflow = 0;
	}
	amount = amount % 5;
	if (overflow != 0) return null;
	return bills;
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
	if (bills[denom.five] > atm_bill_count[denom.five] || bills[denom.ten] > atm_bill_count[denom.ten] ||
		bills[denom.twenty] > atm_bill_count[denom.twenty] || bills[denom.fifty] > atm_bill_count[denom.fifty] ||
		bills[denom.hundred] > atm_bill_count[denom.hundred]) return false;
	return true;
}

/* Decreases account balance by appropriate amount */
function doWithdraw(amount) {
	activeAccount.balance[activeAccountType][total] -= amount;
}

/* Decreases ATM bill count by appropriate amounts */
function removeBills(bills){
	atm_bill_count[denom.five] -= bills[denom.five];
	atm_bill_count[denom.ten] -= bills[denom.ten];
	atm_bill_count[denom.twenty] -= bills[denom.twenty];
	atm_bill_count[denom.fifty] -= bills[denom.fifty];
	atm_bill_count[denom.hundred] -= bills[denom.hundred];
}
// 
// let withdraw_amount = 100.00;
// let current_withdraw_amount = 100.00;
// activeAccount = account1;
