var mainMenuState = $(".main-menu-screen");

function initMainMenu(){
	$(".welcome-text").html("Welcome " + activeAccount.name + "!");

	let totalBalance = 0;
	activeAccount.balance.forEach(function(amount){
		totalBalance += amount[1];
	});
	
	$(".balance-title").html("$" + totalBalance);
}

$(".btn-start-withdraw").click(function(){
	if(mainMenuState.is(currentState)){
		changeState(3, 4);
	}
});


$(".btn-start-deposit").click(function(){
	if(mainMenuState.is(currentState)){
		changeState(3, 7);
	}
});

$(".btn-start-transfer").click(function(){
	if(mainMenuState.is(currentState)){
		changeState(3, 10);
	}
});

$(".btn-exit").click(function(){
	printReceipt(activeAccount);
	if(mainMenuState.is(currentState)){
		changeState(3, 0);
	}
});