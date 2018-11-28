var startTransferState = $(".transfer-start-screen");
var transferAcct1;
var transferAcct2;

function initStartTransfer(){
	$(".account-selection-transfer-1").empty();
	$(".account-selection-transfer-1").append(new Option("Select Account"));

	$(".account-selection-transfer-2").empty();
	$(".account-selection-transfer-2").append(new Option("Select Account"));
	
	for (i = 0; i < activeAccount.balance.length; i++){
		$(".account-selection-transfer-1").append(new Option(activeAccount.balance[i][0] + " - $" + activeAccount.balance[i][1],i))
		$(".account-selection-transfer-2").append(new Option(activeAccount.balance[i][0] + " - $" + activeAccount.balance[i][1],i))
	}
		

	$(".transfer-continue").addClass("disable");
	$(".transfer-continue").attr("disabled", true);
}

$(".account-selection-transfer-1").change(function(){
	if($(this).val() == $(".account-selection-transfer-2").val() || $(this).val() == "Select Account" || $(".account-selection-transfer-2").val() == "Select Account"){
		$(".transfer-continue").addClass("disable");
		$(".transfer-continue").attr("disabled", true);

		return;
	}

	

	$(".transfer-continue").removeClass("disable");
	$(".transfer-continue").attr("disabled", false);
});


$(".account-selection-transfer-2").change(function(){
	if($(this).val() == $(".account-selection-transfer-1").val() || $(this).val() == "Select Account" || $(".account-selection-transfer-1").val() == "Select Account"){
		$(".transfer-continue").addClass("disable");
		$(".transfer-continue").attr("disabled", true);

		return;
	}

	$(".transfer-continue").removeClass("disable");
	$(".transfer-continue").attr("disabled", false);
});



$(".transfer-continue").click(function(){
	if(startTransferState.is(currentState)){
		transferAcct1 = $(".account-selection-transfer-1").val();
		transferAcct2 = $(".account-selection-transfer-2").val();
		changeState(10, 12);
	}
});