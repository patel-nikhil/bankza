let state = 0;

$(".account-entry-screen").toggle();
$(".pin-pad-screen").toggle();
$(".main-menu-screen").toggle();
$(".withdraw-screen").toggle();
$(".bill-select-screen").toggle();
$(".withdraw-finish-screen").toggle();
$(".start-deposit-screen").toggle();
$(".deposit-screen").toggle();
$(".deposit-finish-screen").toggle();
$(".custom-entry-screen").toggle();
$(".transfer-start-screen").toggle();
$(".transfer-entry-screen").toggle();
$(".transfer-finish-screen").toggle();



function toggleStateDisplay(screen){
	screen.fadeToggle(500);
}




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
		$(".balance-title").each(function(index, btn){
			$(btn).text(activeAccount.balance[activeAccountType][total])
		});
		toggleStateDisplay($(".deposit-finish-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".main-menu-screen"));
			toggleStateDisplay($(".menu-buttons-set"));
		}, 1000);
	}
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
		if (deposit <= 0) {
			$("#deposit-amt").html("No funds were inserted to be deposited.");
			$("#deposit-balance").html("Your balance is still $" + updateAccountBalance());
			//return;
		} else {
			let amount = depositAmount();
 			let balance = updateAccountBalance();
 			$("#deposit-amt").html("Successfully deposited $" + amount + " to your account.");
 			$("#deposit-balance").html("Your new balance is $" + balance);
			saveTransaction("deposit", deposit, activeAccount.balance[activeAccountType][accountName]);
		}
		toggleStateDisplay($(".deposit-screen"));
      setTimeout(function(){
            toggleStateDisplay($(".deposit-finish-screen"));
        }, 1000);
        deposit = 0;
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
		state = 0;
        setTimeout(function(){
			toggleStateDisplay($(".start-screen"));
		}, 1000);
    }
});

$(".btn-secondary").click(function(){
    if(state == 6 || state == 9){
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
		state = 0;
        setTimeout(function(){
			toggleStateDisplay($(".start-screen"));
		}, 1000);
    }
});
