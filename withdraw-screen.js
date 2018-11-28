var withdrawState = $(".withdraw-screen");

function initWithdraw(){
	$(".account-selection").empty();
	$(".account-selection").append(new Option("Select Account"));
	
	for (i = 0; i < activeAccount.balance.length; i++)
		$(".account-selection").append(new Option(activeAccount.balance[i][0] + " - $" + activeAccount.balance[i][1],i))

	initWithdrawButtons();
}

function initWithdrawButtons(){
	$(".withdraw-amount-button").addClass("disable");
	$(".withdraw-amount-button").attr("disabled", true);

	$(".custom-amount-button").addClass("disable");
	$(".custom-amount-button").attr("disabled", true);

<<<<<<< HEAD
	$(".balance-title").html("-");
=======
	$(".withdraw-screen .balance-title").html("-");
>>>>>>> develop
}

$(".account-selection").change(function(){
	if ($(this).val() == "Select Account"){
		initWithdrawButtons();
		return;	
	} 

	activeAccountType = $(this).val();

	$(".balance-title").html("$" + activeAccount.balance[$(this).val()][1]);

	updateAvailableAmounts();
	
});

function updateAvailableAmounts(){
	$(".withdraw-amount-button").removeClass("disable");
	$(".withdraw-amount-button").attr("disabled", false);

	$(".custom-amount-button").removeClass("disable");
	$(".custom-amount-button").attr("disabled", false);

	$(".withdraw-amount-button").each(function(index, btn){
		if($(btn).val() > activeAccount.balance[activeAccountType][1]){
			$(btn).addClass("disable");
			$(btn).attr("disabled", true);
		}
	});
}

$(".withdraw-amount-button").click(function(){
	if(withdrawState.is(currentState) && $(".account-selection").val() != "Select Account"){
		withdraw_amount = $(this).val();
		current_withdraw_amount = $(this).val();

		updateWithdrawAmount();
		withdraw_bill_count = setDefaultBills(withdraw_amount);


		for (i = 0; i < 5; i++){
			let amt = withdraw_bill_count[i];
			if (amt == null) $(".bill-text")[i].innerText = 0;
			else $(".bill-text")[i].innerText = amt;
		}

		changeState(4, 5);
	}
});

$(".withdraw-screen .back-button").click(function(){
	if(withdrawState.is(currentState)){
		changeState(4, 3);
	}
});

$(".custom-amount-button").click(function(){
	if(withdrawState.is(currentState)){
		changeState(4, 11);
	}
});