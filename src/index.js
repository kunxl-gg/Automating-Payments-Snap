module.exports.onRpcRequest = async ({ origin, request }) => {

  let state = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  if (!state) {
    state = {hello: 'not world'} 
    // initialize state if empty and set default data
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', state],
    });
  }

  switch (request.method) {
    case 'storeAddress': 
    state.hello = 'world',
      await wallet.request({
        method: 'snap_manageState', 
        params: ['update', state], 
      }); 
      return true; 
    case 'retrieveAddresses': 
      return state.hello; 
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description: 'Address book:',
            textAreaContent: state.hello,
          },
        ],
      });

      // getting trasactionDetails
      case 'getTransactionDetails':
        return wallet.request({
          method: 'sanp_manageState',
          params: [
            'get',
          ]
        })
    default:
      throw new Error('Method not found.');
  }
};


