var deposit;

function depositAmount(){
	if (activeAccountType == 1){
		activeAccount.balance[0][total] += deposit; //chequing is 1
	} else {
		activeAccount.balance[1][total] += deposit; //savings is 2
	}
	return deposit;
}

function updateAccountBalance(){
	if (activeAccountType == 1){
    return activeAccount.balance[0][total];
  } else {
    return activeAccount.balance[1][total];
  }
}

$(".input-deposit").click(function(){
	deposit = parseFloat($("#deposit").val());
})
