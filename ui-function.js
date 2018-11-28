let bankUI = $("#bank-ui");
let state = 0;

$(".account-entry-screen").toggle();
$(".pin-pad-screen").toggle();
$(".main-menu-screen").toggle();
$(".menu-buttons-set").toggle();
$(".withdraw-screen").toggle();
$(".bill-select-screen").toggle();
$(".withdraw-amount-screen").toggle();
$(".withdraw-finish-screen").toggle();
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

//UI CHANGES need to be made
$(".account-enter").click(function(){
	if(state == 1 && checkAccount()){
		state = 2;
		$(".pin-input").val("");
		toggleStateDisplay($(".account-entry-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".pin-pad-screen"));
		}, 1000);
	} else {
		state == 1;
		$(".pin-input").val("");
		//instert message that account didnt match an existing
		console.log("NOT an account");
	}
	entry = "";
});

//UI CHANGES need to be made
$(".pin-enter").click(function(){
	if(state == 2 && checkPin()){
		state = 3;
		$(".pin-input").val("");
		toggleStateDisplay($(".pin-pad-screen"));
		document.querySelectorAll(".balance-title").forEach(function(btn){btn.innerText = activeAccount.balance[0][total]});
		setTimeout(function(){
			toggleStateDisplay($(".main-menu-screen"));
			toggleStateDisplay($(".menu-buttons-set"));
		}, 1000);
	} else {
		state == 2;
		$(".pin-input").val("");
		//instert message that pin didnt match the account
		console.log("Wrong Pin");
	}
	entry = "";
});

$(".btn-start-withdraw").click(function(){
	if(state == 3){
		state = 7;
		populateAccounts();
		toggleStateDisplay($(".withdraw-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".main-menu-screen"));
			toggleStateDisplay($(".menu-buttons-set"));
		}, 1000);
	}
});

$(".withdraw-amount-button").click(function(){
	if(state == 7 && $(".account-selection").val() != "Select Account"){
		state = 8;
		withdraw_amount = $(this).val();
		current_withdraw_amount = $(this).val();
		updateWithdrawAmount();
		withdraw_bill_count = setDefaultBills(withdraw_amount);

		toggleStateDisplay($(".bill-select-screen"));
		toggleStateDisplay($(".withdraw-amount-screen"));

		for (i = 0; i < 5; i++){
			let amt = withdraw_bill_count[i];
			if (amt == null) $(".bill-text")[i].innerText = 0;
			else $(".bill-text")[i].innerText = amt;
		}

		setTimeout(function(){
			toggleStateDisplay($(".withdraw-screen"));
		}, 1000);
	}
});

$(".custom-amount-button").click(function(){
	if(state == 7){
		state = 8;
		toggleStateDisplay($(".bill-select-screen"));
		toggleStateDisplay($(".withdraw-amount-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".withdraw-screen"));
		}, 1000);
	}
});

$(".withdraw-complete").click(function(){
	if(state == 8){
		state = 9;
		doWithdraw(current_withdraw_amount);
		removeBills(withdraw_bill_count);
		saveTransaction("withdraw", current_withdraw_amount, activeAccount.balance[activeAccountType][accountName]);
		$("#withdraw-amt").text("Successfully withdrew $" + current_withdraw_amount + " from your account.");
		$("#withdraw-balance").text("Your new balance is $" + activeAccount.balance[activeAccountType][total] + ". Please collect your cash below");
		toggleStateDisplay($(".withdraw-finish-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".bill-select-screen"));
			toggleStateDisplay($(".withdraw-amount-screen"));
		}, 1000);
	}
});

$(".withdraw-continue").click(function(){
	if(state == 9){
		state = 3;
		$(".balance-title").each(function(index, btn){
			$(btn).text(activeAccount.balance[activeAccountType][total])
		});
		toggleStateDisplay($(".withdraw-finish-screen"));
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
		$(".deposit-account")[0].innerText = "Chequings Balance $" + activeAccount.balance[0][total];
		$(".deposit-account")[1].innerText = "Savings Balance $" + activeAccount.balance[1][total];
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

// $(".deposit-finish").click(function(){
// 	if(state == 5){
// 		state = 6;
// 		let amount = depositAmount(activeAccountType);
// 		let balance = updateAccountBalance(activeAccountType);
// 		document.getElementById("deposit-amt").innerHTML = "Successfully deposited $" + amount + " to your account.";
// 		document.getElementById("deposit-balance").innerHTML = "Your new balance is $" + balance;
// 		toggleStateDisplay($(".deposit-screen"));
// 		setTimeout(function(){
// 			toggleStateDisplay($(".deposit-finish-screen"));
// 		}, 1000);
// 	}
// });

$(".deposit-continue").click(function(){
	if(state == 6){
		state = 3;
		document.querySelectorAll(".balance-title").forEach(function(btn){btn.innerText = activeAccount.balance.chequing});
		toggleStateDisplay($(".deposit-finish-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".main-menu-screen"));
			toggleStateDisplay($(".menu-buttons-set"));
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

// $(".btn-start-deposit").click(function(){
//     if(state == 3){
//         state = 4;
//         toggleStateDisplay($(".main-menu-screen"));
//         toggleStateDisplay($(".menu-buttons-set"));
//         setTimeout(function(){
//             toggleStateDisplay($(".deposit-screen"));
//         }, 1000);
//     }
// });

// Needs to track which account is accepting the money and pass that to saveTransaction for receipt printing
$(".deposit-finish").click(function(){
    if(state == 5){
        state = 6;
		let amount = depositAmount();
 		let balance = updateAccountBalance();
 		$("#deposit-amt").html("Successfully deposited $" + amount + " to your account.");
 		$("#deposit-balance").html("Your new balance is $" + balance);

		/////
		saveTransaction("deposit", deposited, activeAccount.balance[activeAccountType][accountName]);
		/////

		toggleStateDisplay($(".deposit-screen"));
      setTimeout(function(){
            toggleStateDisplay($(".deposit-finish-screen"));
        }, 1000);
        deposited = 0;
    }
});

////////////////////////////////////////Karnvir return buttons//////////////////////////////////////////////////////
// $(".btn-info").click(function(){
//     if(state == 5){
//         state = 3;
//         toggleStateDisplay($(".deposit-finish-screen"));
//         setTimeout(function(){
//             toggleStateDisplay($(".main-menu-screen"));
//             toggleStateDisplay($(".menu-buttons-set"));
//         }, 1000);
//     }
// });

$(".btn-danger").click(function(){
    if(state == 6 || state == 9){
		state = 0;
       	removeTranscations();

        if(activeAcc == 1){
            account1 = activeAccount;
            account = 0;
        } else if(activeAcc == 2){
            account2 = activeAccount;
            account = 0;
        } else if(activeAcc == 3){
            account3 = activeAccount;
            account = 0;
        }else{
            console.log("No Existing Account Active");
        }

        activeAcc = 0;
        if (state == 6) toggleStateDisplay($(".deposit-finish-screen"));
		if (state == 9) toggleStateDisplay($(".withdraw-finish-screen"));
        setTimeout(function(){
			toggleStateDisplay($(".start-screen"));
		}, 1000);
    }
});

$(".btn-secondary").click(function(){
    if(state == 6 || state == 9){
		state = 0;
        printReceipt(activeAccount);

        if(activeAcc == 1){
            account1 = activeAccount;
            activeAccount = 0;
        } else if(activeAcc == 2){
            account2 = activeAccount;
            activeAccount = 0;
        } else if(activeAcc == 3){
            account3 = activeAccount;
            activeAccount = 0;
        }else{
            console.log("No Existing Account Active");
        }

		activeAcc = 0;
		if (state == 6) toggleStateDisplay($(".deposit-finish-screen"));
		if (state == 9) toggleStateDisplay($(".withdraw-finish-screen"));
        setTimeout(function(){
			toggleStateDisplay($(".start-screen"));
		}, 1000);
    }
});
