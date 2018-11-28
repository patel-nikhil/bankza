var withdrawFinishState = $(".withdraw-finish-screen");

function initWithdrawFinish(){
	$(".remaining-balance").html("Remaining Balance: $" + activeAccount.balance[activeAccountType][1]);
}

$(".return-menu").click(function(){
	if(withdrawFinishState.is(currentState)){
		changeState(6, 3);
	}
});

$(".finish-all-print").click(function(){
	printReceipt(activeAccount);
	if(withdrawFinishState.is(currentState)){
		changeState(6, 0);
	}
});

$(".finish-all").click(function(){
	removeTransactions();
	if(withdrawFinishState.is(currentState)){
		changeState(6, 0);
	}
});