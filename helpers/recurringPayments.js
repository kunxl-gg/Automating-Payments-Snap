const isMonthlyPaymentScheduled = async ()=>{
    const state = await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
            snapId,
            request:{
                method: 'retrieveAddresses'
            }
        }
    })

    if(state.executeRecurringPayment == 'true'){
        makeMultiplePayments(state.recurringTransactionsList)
    };
}


const makeMultiplePayments = async (transactionDetails) =>{
    console.log("this function ran once")

    // resetting the monthly countDown
    await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
            snapId,
            request: {
                method: 'resetMonthlyCountDown',
            }
        }
    })

    if(transactionDetails.length == 0){
        return;
    }


    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    for(let index = 0; index < transactionDetails.length; index ++){
        const transactionDetail = {
            to: transactionDetails[index].Receiver,
            from: accounts[0],
            value: transactionDetails[index].Value,
            data:
                '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: '0x5',
        }

        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionDetail]
        })

    }
}



setInterval(isMonthlyPaymentScheduled, 5000);

