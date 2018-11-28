let entry = "";
var accountEntryState = $(".account-entry-screen");
var pinEntryState = $(".pin-pad-screen");
var customEntryState = $(".custom-entry-screen");
var transferEntryState = $(".transfer-entry-screen");

function initAccountEntry(){
	entry = "";
	$(".account-input").val("");
	$(".account-error-text").addClass("hidden");
}

function initPinEntry(){
	entry = "";
	$(".pin-input").val("");
	$(".pin-error-text").addClass("hidden");
}

function initCustomEntry(){
	entry = "";
	$(".custom-input").val("");
	$(".custom-error-text").addClass("hidden");
}

function initTransferEntry(){
	entry = "";
	$(".transfer-input").val("");
	$(".transfer-error-text").addClass("hidden");
}

$(".account-enter").click(function(){
	let valid = checkAccountNumber(entry);

	if(accountEntryState.is(currentState) && valid){
		changeState(1, 2);
	}

	if(!valid){
		$(".account-error-text").removeClass("hidden");
	}
});

$(".pin-enter").click(function(){
	let valid = checkPin(entry);

	if(pinEntryState.is(currentState) && valid){
		changeState(2, 3);
	}

	if(!valid){
		$(".pin-error-text").removeClass("hidden");
	}
});

$(".custom-enter").click(function(){
	let valid = checkCustom(entry);

	if(customEntryState.is(currentState) && valid){
		withdraw_amount = parseFloat(entry);
		current_withdraw_amount = parseFloat(entry);

		updateWithdrawAmount();
		withdraw_bill_count = setDefaultBills(withdraw_amount);


		for (i = 0; i < 5; i++){
			let amt = withdraw_bill_count[i];
			if (amt == null) $(".bill-text")[i].innerText = 0;
			else $(".bill-text")[i].innerText = amt;
		}
		changeState(11, 5);
	}

	if(!valid){
		$(".custom-error-text").removeClass("hidden");
	}
});


$(".transfer-enter").click(function(){
	let valid = checkTransfer(entry);

	if(transferEntryState.is(currentState) && valid){
		makeTransfer();
		changeState(12, 13);
	}

	if(!valid){
		$(".transfer-error-text").removeClass("hidden");
	}
});

function makeTransfer(){
	activeAccount.balance[transferAcct1][1] -= parseFloat(entry);
	activeAccount.balance[transferAcct2][1] += parseFloat(entry);
}


$(".pin-num").each(function(index, btn){
	$(btn).click(function(){
		if(accountEntryState.is(currentState) && entry.length < 19){
			$(".account-error-text").addClass("hidden");
			entry += (index + 1) % 10;
			if(entry.length == 4 || entry.length == 9 || entry.length == 14){
				entry += "-"
			}
			$(".account-input").val(entry);
		}else if(pinEntryState.is(currentState) && entry.length < 4){
			$(".pin-error-text").addClass("hidden");
			entry += (index + 1) % 10;
			$(".pin-input").val(entry);	
		}else if(customEntryState.is(currentState) && entry.length < 3){
			$(".custom-error-text").addClass("hidden");
			entry += (index + 1) % 10;
			$(".custom-input").val(entry);	
		}else if(transferEntryState.is(currentState) && entry.length < 3){
			$(".transfer-error-text").addClass("hidden");
			entry += (index + 1) % 10;
			$(".transfer-input").val(entry);
		}
	});
});


$(".pin-delete").click(function(){
	let numArray = entry.split("");
	if(numArray.pop() == "-"){
		numArray.pop();
	}

	entry = numArray.join("");

	if(accountEntryState.is(currentState)){
		$(".account-input").val(entry);	
		$(".account-error-text").addClass("hidden");
	}else if(pinEntryState.is(currentState)){
		$(".pin-input").val(entry);
		$(".pin-error-text").addClass("hidden");
	}else if(customEntryState.is(currentState)){
		$(".custom-input").val(entry);
		$(".custom-error-text").addClass("hidden");
	}else if(transferEntryState.is(currentState)){
		$(".transfer-input").val(entry);
		$(".transfer-error-text").addClass("hidden");
	}
	
});

$(".pin-clear").click(function(){
	entry = "";
	if(accountEntryState.is(currentState)){
		$(".account-input").val(entry);	
	}else if(pinEntryState.is(currentState)){
		$(".pin-input").val(entry);
	}else if(customEntryState.is(currentState)){
		$(".custom-input").val(entry);
	}else if(transferEntryState.is(currentState)){
		$(".transfer-input").val(entry);
	}
});


$(".back-button").click(function(){
	if(accountEntryState.is(currentState)){
		changeState(1, 0);
	}else if(pinEntryState.is(currentState)){
		changeState(2, 0);
	}else if(customEntryState.is(currentState)){
		changeState(11, 5);
	}else if(transferEntryState.is(currentState)){
		changeState(12, 10);
	}
});