function update_withdraw_buttons()
{
    $(".modify-button").each(function(index, btn){
        if (index % 2 == 0){
            let billNumber = parseInt($(btn)[0].nextElementSibling.innerText, 10);
            if (current_withdraw_amount - Object.values(billValue)[Math.floor(index/2)] < 0 || billNumber - 1 < 0) {
                $(btn)[0].disabled = true;
                $(btn)[0].style.color = "lightgray";
            } else {
                $(btn)[0].disabled = false;
                $(btn)[0].style.color = "#0099ff";
            }
        } else if (index % 2 == 1){
            let billNumber = parseInt($(btn)[0].previousElementSibling.innerText, 10);
            let bills = withdraw_bill_count;
            bills[Object.values(billName)[Math.floor(index/2)]] = billNumber + 1;
            if (billTotal(bills) > withdraw_amount || !hasBills(bills)) {
                bills[Object.values(billName)[Math.floor(index/2)]] = billNumber;
                $(btn)[0].disabled = true;
                $(btn)[0].style.color = "lightgray";
            } else {
                bills[Object.values(billName)[Math.floor(index/2)]] = billNumber;
                $(btn)[0].disabled = false;
                $(btn)[0].style.color = "#0099ff";
            }
        }
    });

    if (current_withdraw_amount < withdraw_amount){
        document.querySelector(".compare-total").innerText = "Warning: Current total less than original amount";
        document.querySelector(".compare-total").style.color = "red";
    } else
        document.querySelector(".compare-total").innerText = "";

    if (current_withdraw_amount == 0) {
        document.querySelector(".withdraw-complete").disabled = true;
        document.querySelector(".withdraw-complete").style.color = "lightgray";
    } else {
        document.querySelector(".withdraw-complete").disabled = false;
        document.querySelector(".withdraw-complete").style.color = "#0099ff";
    }
}

$(".modify-button").each(function(index, btn){
    if (index % 2 == 0){
        let billNumber = parseInt($(btn)[0].nextElementSibling.innerText, 10);
        if (current_withdraw_amount - Object.values(billValue)[Math.floor(index/2)] < 0 || billNumber - 1 < 0) {
            $(btn)[0].disabled = true;
            $(btn)[0].style.color = "lightgray";
        } else {
            $(btn)[0].disabled = false;
		    $(btn)[0].style.color = "#0099ff";
        }
    } else if (index % 2 == 1){
        let billNumber = parseInt($(btn)[0].previousElementSibling.innerText, 10);
        let bills = withdraw_bill_count;
        bills[Object.values(billName)[Math.floor(index/2)]] = billNumber + 1;
        if (billTotal(bills) > withdraw_amount || !hasBills(bills)) {
            bills[Object.values(billName)[Math.floor(index/2)]] = billNumber;
            $(btn)[0].disabled = true;
            $(btn)[0].style.color = "lightgray";
        } else {
            $(btn)[0].disabled = false;
		    $(btn)[0].style.color = "#0099ff";
        }
    }

    $(btn).click(function(){
        if (index % 2 == 0){
            let billNumber = parseInt($(btn)[0].nextElementSibling.innerText, 10);
            if (billNumber - 1 < 0) return;
            if (current_withdraw_amount - Object.values(billValue)[Math.floor(index/2)] < 0) return;
            $(btn)[0].nextElementSibling.innerText = billNumber - 1;
            withdraw_bill_count[Object.values(billName)[Math.floor(index/2)]] = billNumber - 1;
            current_withdraw_amount = billTotal(withdraw_bill_count);
        } else {
            let billNumber = parseInt($(btn)[0].previousElementSibling.innerText, 10);
            let bills = withdraw_bill_count;
            bills[Object.values(billName)[Math.floor(index/2)]] = billNumber + 1;
            if (billTotal(bills) > withdraw_amount || !hasBills(bills)) {
                bills[Object.values(billName)[Math.floor(index/2)]] = billNumber;
                return;
            }
            $(btn)[0].previousElementSibling.innerText = billNumber + 1;
            withdraw_bill_count[Object.values(billName)[Math.floor(index/2)]] = billNumber + 1;
            current_withdraw_amount = billTotal(withdraw_bill_count);
        }
        updateWithdrawAmount();
        update_withdraw_buttons();
    });
});

function updateWithdrawAmount(){
    document.querySelector(".current-withdraw-amount").innerText = "$" + current_withdraw_amount;
    document.querySelector(".withdraw-amount").innerText = "$" + withdraw_amount;
}