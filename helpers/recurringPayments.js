setInterval(()=>{}, 86,400,000)


async function checkMonthEnd(){
    const state = await ethereum.request({
        method: 'wallet_invokeSnap',
        prams: [
            snapId,
            {
                method: 'retrieveAdress'
            }
        ]
    })

    if(state.executeRecurringTransaction == 'true'){
        makeInstallment(state);
    }
}

async function makeInstallment(givenState){

    // making a list of transaction details 
    const finalTransactionDetailList = [];

    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    })

    const account = accounts[0];

    givenState.recurringTransactionsList.map( data => {
        const detail = {
            to: data.Receiver, // Required except during contract publications.
            from: account, // must match user's active address.
            value: data.Value,// Only required to send ether to the recipient from the initiating external account.
            data:
                '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: '0x5', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        finalTransactionDetailList.push(detail);
    })

    for(let index = 0; index < finalTransactionDetailList.length; index++){
        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [finalTransactionDetailList[index]]
        })
    }
}