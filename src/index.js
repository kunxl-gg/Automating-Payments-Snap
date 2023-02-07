module.exports.onRpcRequest = async ({ origin, request }) => {

  let state = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  if (!state) {
    state = {amountToStore: '', addressToStore: '', dateToStore: '', executeTransaction: 'false', executeRecurringPayment: 'false', recurringTransactionsList : []}; 
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', state],
    });
  }

  switch (request.method) {

    // method to update the state with user input fields
    case 'storeAddress': 
    state.amountToStore = request.params.amountToStore,
    state.addressToStore = request.params.addressToStore,
    state.dateToStore = request.params.dateToStore
      await wallet.request({
        method: 'snap_manageState', 
        params: ['update', state], 
      }); 
      return true; 


    // method to retrieve the data of the state
    case 'retrieveAddresses': 
      return state; 

    case 'clearAddress':
      state = {amountToStore: '', addressToStore: '', dateToStore: '', executeTransaction: 'false'};
      return wallet.request({
        method: 'snap_manageState',
        params: ['update', state]
      });

    // method to show the current state of the data
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description: 'Address book:',
            textAreaContent: `${state.amountToStore} ${state.addressToStore} ${state.dateToStore} ${state.executeTransaction} `,
          },
        ],
      });


    // default method
    default:
      throw new Error('Method not found.');
  }
};


// cronJob cofigured 
module.exports.onCronjob = async ({ request }) => {
  switch (request.method) {
    case 'checkTransaction':
      let state = await wallet.request({
        method: 'snap_manageState',
        params: ['get'],
      });

      if(state.dateToStore != ''){
        let dateToVerify = true;

        if(dateToVerify){
          state.executeTransaction = 'true';
          await wallet.request({
            method: 'snap_manageState',
            params: ['update', state],
          });
        }
      }

      case "recurringTransaction":

        // monthly payments 
        if(state.executeRecurringPayment == 'false'){
          state.executeRecurringPayment == 'true'
        }

        // updating the state after a month
        await wallet.request({
          method: 'snap_manageState',
          params: ['update', state]
        })
        

    default:
      throw new Error('Method not found.');
  }
};
