var currentState = $(".start-screen");

var states = [
	$(".start-screen"),
	$(".account-entry-screen"),
	$(".pin-pad-screen"),
	$(".main-menu-screen"),
	$(".withdraw-screen"),
	$(".bill-select-screen"),
	$(".withdraw-finish-screen"),
	$(".start-deposit-screen"),
	$(".deposit-screen"),
	$(".deposit-finish-screen"),
	$(".transfer-start-screen"),
	$(".custom-entry-screen"),
	$(".transfer-entry-screen"),
	$(".transfer-finish-screen")
];

function changeState(state1, state2){
	initializeState(state2);
	currentState = states[state2];

	states[state1].fadeToggle(500);

	setTimeout(function(){
		states[state2].fadeToggle(500);
	}, 500);
}

function disableStates(){

}

function initializeState(state){
	if (state == 0){
		initStartScreen();
	}else if(state == 1){
		initAccountEntry();
	}else if(state == 2){
		initPinEntry();
	}else if(state == 3){
		initMainMenu();
	}else if(state == 4){
		initWithdraw();
	}else if(state == 5){
		initBillSelect();
	}else if(state == 6){
		initWithdrawFinish();
	}else if(state == 7){
		initStartDeposit();
	}else if(state == 8){
		initDeposit();
	}else if(state == 9){
		initFinishDeposit();
	}else if(state == 10){
		initStartTransfer();
	}else if(state == 11){
		initCustomEntry();
	}else if(state == 12){
		initTransferEntry();
	}else if(state == 13){
		initTransferFinish();
	}
}


