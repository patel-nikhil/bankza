function depositAmount(acct_type){
	var deposit = parseFloat(document.querySelector(".input-deposit").value);
	if (acct_type == 2){
		activeAccount.balance[1][total] += deposit;
	} else {
		activeAccount.balance[0][total] += deposit;
	}
	return deposit;
}

function updateAccountBalance(acct_type){
	if (acct_type == 2){
    return activeAccount.balance[1][total];
  } else {
    return activeAccount.balance[0][total];
  }
}
