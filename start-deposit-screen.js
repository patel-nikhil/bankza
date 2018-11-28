var depositStartState = $(".start-deposit-screen");

function initStartDeposit(){
	$(".account-selection-deposit").empty();
	$(".account-selection-deposit").append(new Option("Select Account"));
	
	for (i = 0; i < activeAccount.balance.length; i++)
		$(".account-selection-deposit").append(new Option(activeAccount.balance[i][0] + " - $" + activeAccount.balance[i][1],i))

	$(".deposit-continue").addClass("disable");
	$(".deposit-continue").attr("disabled", true);
}


$(".account-selection-deposit").change(function(){
	if ($(this).val() == "Select Account"){
		$(".deposit-continue").addClass("disable");
		$(".deposit-continue").attr("disabled", true);
		return;	
	} 

	activeAccountType = $(this).val();

	$(".balance-title").html("$" + activeAccount.balance[$(this).val()][1]);

	$(".deposit-continue").removeClass("disable");
	$(".deposit-continue").attr("disabled", false);
	
})

$(".deposit-continue").click(function(){
	if(depositStartState.is(currentState)){
		changeState(7, 8);	
	}
});

$(".start-deposit-screen .back-button").click(function(){
	if(depositStartState.is(currentState)){
		changeState(7, 3);	
	}
});