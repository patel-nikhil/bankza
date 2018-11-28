var finishDepositState = $(".deposit-finish-screen");

function initFinishDeposit(){
	$(".remaining-balance-deposit").html("New Balance: $" + activeAccount.balance[activeAccountType][1]);
}



$(".deposit-finish-screen .return-menu").click(function(){
	if(finishDepositState.is(currentState)){
		changeState(9, 3);
	}
});

$(".deposit-finish-screen .finish-all-print").click(function(){
	if(finishDepositState.is(currentState)){
		changeState(9, 0);
	}
});

$(".deposit-finish-screen .finish-all").click(function(){
	if(finishDepositState.is(currentState)){
		changeState(9, 0);
	}
});