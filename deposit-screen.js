var depositState = $(".deposit-screen");

function initDeposit(){

}

$(".deposit-finish").click(function(){
	if(depositState.is(currentState)){
		makeDeposit();
		changeState(8, 9);
	}
});

function makeDeposit(){
	activeAccount.balance[activeAccountType][1] += parseFloat($("#deposit").val());	
}

