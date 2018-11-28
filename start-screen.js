$(".start-screen").click(function(){
	if($(this).is(currentState)){
		changeState(0, 1);	
	}
});