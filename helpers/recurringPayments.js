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
        state.recurringTransactionsList.map(()=>{
            const detail = {
                
            }
        })
    }
}