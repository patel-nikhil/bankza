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
	let deposit = parseFloat($("#deposit").val());
	if (isNaN(deposit) || deposit < 0) return;
	activeAccount.balance[activeAccountType][1] += deposit;	
	saveTransaction("Deposit", deposit, activeAccount.balance[activeAccountType][accountName]);
}