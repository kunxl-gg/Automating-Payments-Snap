async function connect() {
    await ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
            [snapId] : {},
        }
        })
}
