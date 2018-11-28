var deposit;

function depositAmount(){
	console.log(activeAccount.balance[activeAccountType][total]);
	activeAccount.balance[activeAccountType][total] += deposit; //chequing is 0, savings is 1
	console.log("to: " + activeAccount.balance[activeAccountType][total]);
	return deposit;
}

function updateAccountBalance(){
    return activeAccount.balance[activeAccountType][total];
}

$(".input-deposit").click(function(){
	deposit = parseFloat($("#deposit").val());
	if (isNaN(deposit) || deposit < 0) deposit = -1;
})
