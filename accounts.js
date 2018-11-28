var activeAccount;
var activeAccountType;
var accountName = 0;
var total = 1;

var account1 = {
    number: "123",
    balance: [["Chequing", 100.00], ["Savings", 50.00]],
    name: "Adam Geneva",
    pin: "1234"
}

var account2 = {
    number: "567",
    balance: [["Chequing", 200.00], ["Savings", 50.00]],
    name: "Inspectah Malicious",
    pin: "1234"
}

var account3 = {
    number: "523",
    balance: [["Chequing", 300.00], ["Savings", 50.00]],
    name: "King Mickey",
    pin: "1234"
}
//Confirm that the account exists
function checkAccount(){
if (entry == account1.number){
  activeAccount = account1;
  activeAcc = 1;
	return true;
} else if (entry == account2.number){
  activeAccount = account2;
  activeAcc = 2;
	return true;
} else if (entry == account3.number){
  activeAccount = account3;
  activeAcc = 3;
	return true;
} else {
return false;
}
}

//Verify the PIN
function checkPin(){
if (activeAccount.number == account1.number){ //&& account.pin == account1.pin){
  console.log("Active: " + activeAccount.number + "acc1: " + account1.number);
	return true;
} else if (account.number == account2.number ){ //&& account.pin == account2.pin){
  console.log("Active: " + activeAccount.number + "acc2: " + account2.number);
	return true;
} else if (account.number == account3.number ){ //&& account.pin == account3.pin){
  console.log("Active: " + activeAccount.number + "acc3: " + account3.number);
	return true;
} else {
	return false;
}
}
