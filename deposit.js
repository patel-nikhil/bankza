// /* First dummy account */
// var account1 = {
// 	number: "1234567890904321",
// 	balance: {chequing: 100.51, savings: 50.00},
// 	name: "Adam Geneva",
// 	pin: "1234"
// }
//
// //Confirm that the account exists
// function checkAccount(account){
// var deposit = parseFloat(document.querySelector("#deposit-input").innerText);
// var i;
// for (i = 1; i <= 3; i++) {
// 	if (account.number == account[i].number){return true;}
// }
// return false;
// }
var activeAccount;
var activeAccountType = 1;

/* First dummy account */
var account1 = {
	number: "1234567890904321",
	balance: {chequing: 100.51, savings: 50.00},
	name: "Adam Geneva",
	pin: "1234"
}

activeAccount = account1;

function depositAmount(acct_type){
	var deposit = parseFloat(document.querySelector("#deposit-input").value);
  if (acct_type == 2){
		activeAccount.balance.savings += deposit;
	} else {
		activeAccount.balance.chequing += deposit;
	}
  return deposit;
}

function updateAccountBalance(acct_type){
	if (acct_type == 2){
		//document.querySelectorAll(".balance-title").forEach(function(btn){btn.innerText = activeAccount.balance.savings});
    return activeAccount.balance.savings;
  } else {
		//document.querySelectorAll(".balance-title").forEach(function(btn){btn.innerText = activeAccount.balance.chequing});
    return activeAccount.balance.chequing;
  }
}

$("#deposit-input").focus(function(){
	this.value = "";
})

// //Account information
// function getAccount(account){
// }
//
// //Verify the PIN
// function checkPin(account){
// if (account.number == account1.number && account.pin == account1.pin){
// 	return true;
// } else if (account.number == account2.number && account.pin == account2.pin){
// 	return true;
// } else if (account.number == account3.number && account.pin == account3.pin){
// 	return true;
// } else {
// 	return false;
// }
// }
//
// function changePin(pin){
// if (account.number == account1.number) {
// 	account1.pin = pin;
// } else if (account.number == account2.number){
// 	account2.pin = pin;
// } else if (account.number == account3.number){
// 	account3.pin = pin;
// } else {
// 	return false;
// }
// }
