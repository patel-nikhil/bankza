let bankUI = $("#bank-ui");
let state = 0;

$(".account-entry-screen").toggle();
$(".pin-pad-screen").toggle();
$(".main-menu-screen").toggle();
$(".menu-buttons-set").toggle();
$(".start-deposit-screen").toggle();
$(".deposit-screen").toggle();
$(".deposit-finish-screen").toggle();


function toggleStateDisplay(screen){
	screen.fadeToggle(1000);
}

bankUI.click(function(){
	if(state == 0){
		state = 1;
		toggleStateDisplay($(".start-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".account-entry-screen"));	
		}, 1000);

	}
});

$(".account-enter").click(function(){
	if(state == 1){
		state = 2;
		$(".pin-input").val("");
		entry = "";
		toggleStateDisplay($(".account-entry-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".pin-pad-screen"));	
		}, 1000);
	}
});

$(".pin-enter").click(function(){
	if(state == 2){
		state = 3;
		toggleStateDisplay($(".pin-pad-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".main-menu-screen"));
			toggleStateDisplay($(".menu-buttons-set"));
		}, 1000);
	}
});


$(".deposit").click(function(){
	if(state == 3){
		state = 4;
		toggleStateDisplay($(".main-menu-screen"));
		toggleStateDisplay($(".menu-buttons-set"));
		document.querySelectorAll(".deposit-account")[0].innerText = "Chequings Balance $" + activeAccount.balance.chequing;
		document.querySelectorAll(".deposit-account")[1].innerText = "Savings Balance $" + activeAccount.balance.savings;
		setTimeout(function(){
			toggleStateDisplay($(".start-deposit-screen"));
		}, 1000);
	}
});

$(".deposit-back").click(function(){
	if(state == 4){
		state = 3;
		toggleStateDisplay($(".start-deposit-screen"));		
		setTimeout(function(){
			toggleStateDisplay($(".main-menu-screen"));
			toggleStateDisplay($(".menu-buttons-set"));
		}, 1000);
	}
});

$(".deposit-account").click(function(event, btn){
	if(state == 4){
		state = 5;
		activeAccountType = event.target.value;
		toggleStateDisplay($(".start-deposit-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".deposit-screen"));
		}, 1000);
	}
});

$(".deposit-finish").click(function(){
	if(state == 5){
		state = 6;
		let amount = depositAmount(activeAccountType);
		let balance = updateAccountBalance(activeAccountType);
		document.getElementById("deposit-amt").innerHTML = "Successfully deposited $" + amount + " to your account.";
		document.getElementById("deposit-balance").innerHTML = "Your new balance is $" + balance;
		toggleStateDisplay($(".deposit-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".deposit-finish-screen"));
		}, 1000);
	}
});


let pinNumbers = $(".pin-num");
let entry = "";

pinNumbers.each(function(index, btn){
	$(btn).click(function(){
		if($(".pin-input").val().length < 4){
			entry += (index + 1) % 10
			$(".pin-input").val(entry);	
		} else if ($(".pin-input").val().length < 7 && state == 1){
			entry += (index + 1) % 10
			$(".pin-input").val(entry);
		}
	});
});


$(".pin-delete").click(function(){
		
		let numArray = entry.split("");
		numArray.pop();
		entry = numArray.join("");

		$(".pin-input").val(entry);
});

$(".pin-clear").click(function(){
		
	entry = "";
	$(".pin-input").val(entry);
});