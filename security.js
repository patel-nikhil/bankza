function checkAccountNumber(entry){
	let parsedEntry = entry.replace(/-/g, "");

	if(parsedEntry == account1.number){
		activeAccount = account1;
		return true;
	}else if(parsedEntry == account2.number){
		activeAccount = account2;
		return true
	}else if(parsedEntry == accountF.number){
		activeAccount = accountF;
	}

	return false;
}

function checkPin(entry){
	if(entry == activeAccount.pin){
		return true;
	}

	return false;
}

function checkCustom(entry){
	if(parseInt(entry) % 5 == 0 && parseFloat(entry) <= activeAccount.balance[activeAccountType][1]){
		return true;
	}

	return false;
}

function checkTransfer(entry){
	if(entry <= activeAccount.balance[transferAcct1][1]){
		return true;
	}

	return false;
}