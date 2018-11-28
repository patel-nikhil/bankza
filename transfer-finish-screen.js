var finishTransferState = $(".transfer-finish-screen");

function initTransferFinish(){
<<<<<<< HEAD
	$(".remaining-balance-transfer").html("New Balances: $" + activeAccount.balance[transferAcct1][1] + " & $" + activeAccount.balance[transferAcct2][1] );
=======
	$(".remaining-balance-transfer").html(activeAccount.balance[transferAcct1][0] + ": $" + activeAccount.balance[transferAcct1][1] + " | " + activeAccount.balance[transferAcct2][0] + ": $" + activeAccount.balance[transferAcct2][1]);
>>>>>>> develop
}


$(".transfer-finish-screen .return-menu").click(function(){
	if(finishTransferState.is(currentState)){
		changeState(13, 3);
	}
});

$(".transfer-finish-screen .finish-all-print").click(function(){
	printReceipt(activeAccount);
	if(finishTransferState.is(currentState)){
		changeState(13, 0);
	}
});

$(".transfer-finish-screen .finish-all").click(function(){
	if(finishTransferState.is(currentState)){
		changeState(13, 0);
	}
});