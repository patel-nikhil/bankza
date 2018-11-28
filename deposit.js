function depositAmount(acct_type){
	var deposit = parseFloat(document.querySelector(".input-deposit").value);
	if (acct_type == 2){
		activeAccount.balance[acct_type][total] += deposit;
	} else {
		activeAccount.balance[acct_type][total] += deposit;
	}
	return deposit;
}

function updateAccountBalance(acct_type){
	if (acct_type == 1){
    return activeAccount.balance[acct_type][total];
  } else {
    return activeAccount.balance[acct_type][total];
  }
}
