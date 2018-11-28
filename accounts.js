var activeAccount;
var activeAccountType;
var accountName = 0;
var total = 1;

var account1 = {
    number: "1234567890904321",
    balance: [["Chequing", 100.00], ["Savings", 50.00]],
    name: "Adam Geneva",
    pin: "1234"
}

var account2 = {
    number: "1234567890904322",
    balance: [["Chequing", 200.00], ["Savings", 50.00]],
    name: "Inspectah Malicious",
    pin: "1234"
}

var account3 = {
    number: "523456789090432",
    balance: [["Chequing", 300.00], ["Savings", 50.00]],
    name: "King Mickey",
    pin: "1234"
}
//Confirm that the account exists
function checkAccount(){
var i;
for (i = 1; i <= 3; i++) {
  console.log(activeAccount.number);
	if (activeAccount.number == account(i).number){return true;}
}
return false;
}

//Verify the PIN
function checkPin(pin){
if (activeAccount.number == account1.number && account.pin == account1.pin){
	return true;
} else if (account.number == account2.number && account.pin == account2.pin){
	return true;
} else if (account.number == account3.number && account.pin == account3.pin){
	return true;
} else {
	return false;
}
}
