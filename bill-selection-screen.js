var billSelectState = $(".bill-select-screen");

function initBillSelect(){
	$(".modify-button:nth-child(2)").each(function(index, btn){
    	if(withdraw_bill_count[index] == 0){
    		$(btn).addClass("disable");
    		$(btn).attr("disabled", true);
    	}
    });

    $(".modify-button:nth-child(4)").each(function(index, btn){
    	if(withdraw_amount + bill_value[index] > withdraw_amount){
    		$(btn).addClass("disable");
    		$(btn).attr("disabled", true);
    	}
    });

    $(".withdraw-warning-text").addClass("hidden");
}

/* Bill names */
var denom = {
	five: 0,
	ten: 1,
	twenty: 2,
	fifty: 3,
	hundred: 4
}

/* Bill values */
var bill_value = [5, 10, 20, 50, 100];

/* Number of bills of each type in the ATM */
var atm_bill_count = [100, 100, 100, 100, 100];

/* State variable storing bills to be withdrawn */
var withdraw_bill_count = [0, 0, 0, 0, 0];

function billTotal(bills){
	let amt = 0;
	for (i = 0; i < bills.length; i++){
		amt += bills[i] * bill_value[i];
	}
	return amt;
}


/*
 * Calculates number of each bill to use
 * Uses highest possible available denomination method
 */
function setDefaultBills(amount){
	var bills = [0, 0, 0, 0, 0];
	var overflow = 0;
	bills[denom.twenty] = Math.floor(amount/ 20);
	if (bills[denom.twenty] > atm_bill_count[denom.twenty]) {
		bills[denom.twenty] = atm_bill_count[denom.twenty];
		overflow = (amount/ 20) - atm_bill_count[denom.twenty];
	} else {
		overflow = 0;
	}
	amount = amount % 20;
	bills[denom.ten] = Math.floor((amount + overflow * 20)/ 10);
	if (bills[denom.ten] > atm_bill_count[denom.ten]) {
		bills[denom.ten] = atm_bill_count[denom.ten];
		overflow = Math.floor((amount + overflow * 20)/ 10) - atm_bill_count[denom.ten];
	} else {
		overflow = 0;
	}
	amount = amount % 10;
	bills[denom.five] = Math.floor((amount + overflow * 10)/ 5);
	if (bills[denom.five] > atm_bill_count[denom.five]) {
		bills[denom.five] = atm_bill_count[denom.five];
		overflow = Math.floor((amount + overflow * 10)/ 5) - atm_bill_count[denom.five];
	} else {
		overflow = 0;
	}
	amount = amount % 5;
	if (overflow != 0) return setDefaultBillsMaxDenomination(amount);
	return bills;
}

function setDefaultBillsMaxDenomination(amount){
	var bills = [0, 0, 0, 0, 0];
	var overflow = 0;
	bills[denom.hundred] = Math.floor(amount / 100);
	if (bills[denom.hundred] > atm_bill_count[denom.hundred]) {
		bills[denom.hundred] = atm_bill_count[denom.hundred];
		overflow = Math.floor(amount / 100) - atm_bill_count[denom.hundred];
	} else {
		overflow = 0;
	}
	amount = amount % 100;
	bills[denom.fifty] = Math.floor((amount + overflow * 100)/ 50);
	if (bills[denom.fifty] > atm_bill_count[denom.fifty]) {
		bills[denom.fifty] = atm_bill_count[denom.fifty];
		overflow = Math.floor((amount + overflow * 100)/ 50) - atm_bill_count[denom.fifty];
	} else {
		overflow = 0;
	}
	amount = amount % 50;
	bills[denom.twenty] = Math.floor((amount + overflow * 50)/ 20);
	if (bills[denom.twenty] > atm_bill_count[denom.twenty]) {
		bills[denom.twenty] = atm_bill_count[denom.twenty];
		overflow = ((amount + overflow * 50)/ 20) - atm_bill_count[denom.twenty];
	} else {
		overflow = 0;
	}
	amount = amount % 20;
	bills[denom.ten] = Math.floor((amount + overflow * 20)/ 10);
	if (bills[denom.ten] > atm_bill_count[denom.ten]) {
		bills[denom.ten] = atm_bill_count[denom.ten];
		overflow = Math.floor((amount + overflow * 20)/ 10) - atm_bill_count[denom.ten];
	} else {
		overflow = 0;
	}
	amount = amount % 10;
	bills[denom.five] = Math.floor((amount + overflow * 10)/ 5);
	if (bills[denom.five] > atm_bill_count[denom.five]) {
		bills[denom.five] = atm_bill_count[denom.five];
		overflow = Math.floor((amount + overflow * 10)/ 5) - atm_bill_count[denom.five];
	} else {
		overflow = 0;
	}
	amount = amount % 5;
	if (overflow != 0) return null;
	return bills;
}
/*
 * Check that the user has enough money in their account
 * Check that the amount to be withdrawn is positive
 * Check that the ATM has enough money (total, ignores exact change)
 */
function checkAmount(account, amount){
	if (amount > account.balance || amount < 0 || amount > atmTotal()) return false;
	return true;
}

/* 
 * Check that the ATM has enough of each bill type
 * Check that the bill counts are zero or positive
 */
function hasBills (bills){
	Object.values(bills).forEach(function(item, index, array){
		if (item < 0) return false;
	});
	if (bills[denom.five] > atm_bill_count[denom.five] || bills[denom.ten] > atm_bill_count[denom.ten] || 
		bills[denom.twenty] > atm_bill_count[denom.twenty] || bills[denom.fifty] > atm_bill_count[denom.fifty] || 
		bills[denom.hundred] > atm_bill_count[denom.hundred]) return false;	
	return true;
}

/* Decreases account balance by appropriate amount */
function doWithdraw(amount) {
	activeAccount.balance[activeAccountType][1] -= amount;
}

/* Decreases ATM bill count by appropriate amounts */
function removeBills(bills){
	atm_bill_count[denom.five] -= bills[denom.five];
	atm_bill_count[denom.ten] -= bills[denom.ten];
	atm_bill_count[denom.twenty] -= bills[denom.twenty];
	atm_bill_count[denom.fifty] -= bills[denom.fifty];
	atm_bill_count[denom.hundred] -= bills[denom.hundred];
}


$(".modify-button").each(function(index, btn){
    $(btn).click(function(){
        let denom_index = Object.values(denom)[Math.floor(index/2)];
        let value = bill_value[denom_index];
        let billCount = withdraw_bill_count[denom_index];
        let atmCount = atm_bill_count[denom_index];

        if (index % 2 == 0){
            if (billCount - 1 < 0 || current_withdraw_amount - value < 0) return;
            withdraw_bill_count[denom_index] = billCount - 1;
            current_withdraw_amount = billTotal(withdraw_bill_count);
        } else {
            if (billTotal(withdraw_bill_count) + value > withdraw_amount || billCount + 1 > atmCount) return;
            withdraw_bill_count[denom_index] = billCount + 1;
            current_withdraw_amount = billTotal(withdraw_bill_count);
        }

        updateWithdrawAmount();
        update_withdraw_buttons();
    });
});


$(".modify-button").each(function(index, btn){
    let adjIndex = Math.floor(index/2);
    let denom_index = Object.values(denom)[adjIndex];
    let value = bill_value[adjIndex];
    let billCount = withdraw_bill_count[denom_index];
    let atmCount = atm_bill_count[denom_index];



    // if (index % 2 == 0 && (current_withdraw_amount - value < 0 || billCount - 1 < 0)){
    //     //Not valid
    // } else if (index % 2 == 1 && (billTotal(withdraw_bill_count) + value > withdraw_amount || billCount + 1 > atmCount)){
    //     //Not valid
    // } else {
    //     //valid
    // }
});

/* Function to update UI from updated bill count */
function update_withdraw_buttons(){
    // $(".bill-text").each(function(index, btn){
    //     btn.innerText = withdraw_bill_count[Object.values(billName)[index]] == undefined ? 0 : withdraw_bill_count[Object.values(billName)[index]];
    // });


    $(".bill-text").each(function(index, btn){
        btn.innerText = withdraw_bill_count[Object.values(denom)[index]];
    });

    $(".modify-button:nth-child(2)").each(function(index, btn){
    	if(withdraw_bill_count[index] == 0){
    		$(btn).addClass("disable");
    		$(btn).attr("disabled", true);
    	}else{
    		$(btn).removeClass("disable");
    		$(btn).attr("disabled", false);
    	}
    });

    $(".modify-button:nth-child(4)").each(function(index, btn){
    	if(current_withdraw_amount + bill_value[index] > withdraw_amount){
    		$(btn).addClass("disable");
    		$(btn).attr("disabled", true);
    	}else{
    		$(btn).removeClass("disable");
    		$(btn).attr("disabled", false);
    	}
    });
    
    if (current_withdraw_amount < withdraw_amount){
        $(".withdraw-warning-text").removeClass("hidden");
    } else
        $(".withdraw-warning-text").addClass("hidden");

    if (current_withdraw_amount == 0) {
    	$(".withdraw-complete").addClass("disable");
    	$(".withdraw-complete").attr("disabled", true);
    } else {
        $(".withdraw-complete").removeClass("disable");
        $(".withdraw-complete").attr("disabled", false);
    }

}

/* Function to update UI with updated balance */
function updateWithdrawAmount(){
    document.querySelector(".current-withdraw-amount").innerText = "$" + current_withdraw_amount;
    document.querySelector(".withdraw-amount").innerText = "$" + withdraw_amount;
}

$(".withdraw-complete").click(function(){
	if(billSelectState.is(currentState)){
		doWithdraw(current_withdraw_amount);
		removeBills(withdraw_bill_count);
		saveTransaction("Withdrawal", current_withdraw_amount, activeAccount.balance[activeAccountType][accountName]);
		changeState(5, 6);
	}
});