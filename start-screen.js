function initStartScreen(){
	activeAccount = 0;
	activeAccountType = 0;
}

$(".start-screen").click(function(){
	if($(this).is(currentState)){
		changeState(0, 1);	
	}
});