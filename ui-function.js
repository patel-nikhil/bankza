let bankUI = $("#bank-ui");
let state = 0;

$(".account-entry-screen").toggle();
$(".pin-pad-screen").toggle();
$(".main-menu-screen").toggle();
$(".menu-buttons-set").toggle();
$(".withdraw-screen").toggle();
$(".bill-select-screen").toggle();
$(".withdraw-amount-screen").toggle();


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
		document.querySelectorAll(".balance-title").forEach(function(btn){btn.innerText = activeAccount.balance.chequing});
		setTimeout(function(){
			toggleStateDisplay($(".main-menu-screen"));
			toggleStateDisplay($(".menu-buttons-set"));
		}, 1000);
	}
});

$(".btn-start-withdraw").click(function(){
	if(state == 3){
		state = 6;
		toggleStateDisplay($(".withdraw-screen"));
		populateAccounts();
		setTimeout(function(){
			toggleStateDisplay($(".main-menu-screen"));
			toggleStateDisplay($(".menu-buttons-set"));
		}, 1000);
	}
});

$(".withdraw-amount-button").click(function(){
	if(state == 6){
		state = 7;
		withdraw_amount = this.innerHTML.substr(1);
		document.querySelector(".withdraw-amount").innerText = "$" + withdraw_amount;
		var bills = setDefaultBills(withdraw_amount);

		for (i = 0; i < 5; i++){
			let amt = bills[Object.values(billName)[i]];
			if (amt == null) document.querySelectorAll(".bill-modify")[i].children[2].innerText = 0;
			else document.querySelectorAll(".bill-modify")[i].children[2].innerText = amt;
		}

		toggleStateDisplay($(".bill-select-screen"));
		toggleStateDisplay($(".withdraw-amount-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".withdraw-screen"));
		}, 1000);
	}
});

$(".custom-amount-button").click(function(){
	if(state == 6){
		state = 7;
		toggleStateDisplay($(".bill-select-screen"));
		toggleStateDisplay($(".withdraw-amount-screen"));
		setTimeout(function(){
			toggleStateDisplay($(".withdraw-screen"));
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