// $(".modify-button").each(function(index, btn){
//     $(btn).click(function(){
//         let denom_index = Object.values(denom)[Math.floor(index/2)];
//         let value = bill_value[denom_index];
//         let billCount = withdraw_bill_count[denom_index];
//         let atmCount = atm_bill_count[denom_index];

//         if (index % 2 == 0){
//             if (billCount - 1 < 0 || current_withdraw_amount - value < 0) return;
//             withdraw_bill_count[denom_index] = billCount - 1;
//             current_withdraw_amount = billTotal(withdraw_bill_count);
//         } else {
//             if (billTotal(withdraw_bill_count) + value > withdraw_amount || billCount + 1 > atmCount) return;
//             withdraw_bill_count[denom_index] = billCount + 1;
//             current_withdraw_amount = billTotal(withdraw_bill_count);
//         }
//         updateWithdrawAmount();
//         update_withdraw_buttons();
//     });
// });


// $(".modify-button").each(function(index, btn){
//     let adjIndex = Math.floor(index/2);
//     let denom_index = Object.values(denom)[adjIndex];
//     let value = bill_value[adjIndex];
//     let billCount = withdraw_bill_count[denom_index];
//     let atmCount = atm_bill_count[denom_index];

//     if (index % 2 == 0 && (current_withdraw_amount - value < 0 || billCount - 1 < 0)){
//         //Not valid
//     } else if (index % 2 == 1 && (billTotal(withdraw_bill_count) + value > withdraw_amount || billCount + 1 > atmCount)){
//         //Not valid
//     } else {
//         //valid
//     }
// });

// /* Function to update UI from updated bill count */
// function update_withdraw_buttons(){
//     // $(".bill-text").each(function(index, btn){
//     //     btn.innerText = withdraw_bill_count[Object.values(billName)[index]] == undefined ? 0 : withdraw_bill_count[Object.values(billName)[index]];
//     // });
//     $(".bill-text").each(function(index, btn){
//         btn.innerText = withdraw_bill_count[Object.values(denom)[index]];
//     });
    
//     if (current_withdraw_amount < withdraw_amount){
//         document.querySelector(".compare-total").innerText = "Warning: Current total less than original amount";
//         document.querySelector(".compare-total").style.color = "red";
//     } else
//         document.querySelector(".compare-total").innerText = "";

//     if (current_withdraw_amount == 0) {
//         document.querySelector(".withdraw-complete").disabled = true;
//         document.querySelector(".withdraw-complete").style.color = "lightgray";
//     } else {
//         document.querySelector(".withdraw-complete").disabled = false;
//         document.querySelector(".withdraw-complete").style.color = "#0099ff";
//     }

// }

// /* Function to update UI with updated balance */
// function updateWithdrawAmount(){
//     document.querySelector(".current-withdraw-amount").innerText = "$" + current_withdraw_amount;
//     document.querySelector(".withdraw-amount").innerText = "$" + withdraw_amount;
// }





// // function update_withdraw_buttons_old()
// // {
// //     $(".modify-button").each(function(index, btn){
// //         let billNumber = withdraw_bill_count[Object.values(billName)[Math.floor(index/2)]];
// //         if (index % 2 == 0){
// //             if (current_withdraw_amount - Object.values(billValue)[Math.floor(index/2)] < 0 || billNumber - 1 < 0) {
// //                 $(btn)[0].disabled = true;
// //                 $(btn)[0].style.color = "lightgray";
// //             } else {
// //                 $(btn)[0].disabled = false;
// //                 $(btn)[0].style.color = "#0099ff";
// //             }
// //         } else if (index % 2 == 1){
// //             withdraw_bill_count[Object.values(billName)[Math.floor(index/2)]] = billNumber + 1;
// //             if (billTotal(withdraw_bill_count) > withdraw_amount || !hasBills(withdraw_bill_count)) {
// //                 withdraw_bill_count[Object.values(billName)[Math.floor(index/2)]] = billNumber;
// //                 $(btn)[0].disabled = true;
// //                 $(btn)[0].style.color = "lightgray";
// //             } else {
// //                 withdraw_bill_count[Object.values(billName)[Math.floor(index/2)]] = billNumber;
// //                 $(btn)[0].disabled = false;
// //                 $(btn)[0].style.color = "#0099ff";
// //             }
// //         }
// //     });

// //     if (current_withdraw_amount < withdraw_amount){
// //         document.querySelector(".compare-total").innerText = "Warning: Current total less than original amount";
// //         document.querySelector(".compare-total").style.color = "red";
// //     } else
// //         document.querySelector(".compare-total").innerText = "";

// //     if (current_withdraw_amount == 0) {
// //         document.querySelector(".withdraw-complete").disabled = true;
// //         document.querySelector(".withdraw-complete").style.color = "lightgray";
// //     } else {
// //         document.querySelector(".withdraw-complete").disabled = false;
// //         document.querySelector(".withdraw-complete").style.color = "#0099ff";
// //     }
// // }
