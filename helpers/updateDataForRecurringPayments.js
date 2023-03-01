
const input = document.getElementById('recurringPaymentsFileUpload');
input.addEventListener("change", () => {
    console.log("hello world")
    const reader = new FileReader();
    console.log(reader)
    reader.onload = function () {
        const csvData = reader.result;
        const csvRows = csvData.split("\n");
        const headers = csvRows[0].split(",");
        const json = [];
        for (let i = 1; i < csvRows.length; i++) {
            const row = csvRows[i].split(",");
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = row[j];
            }
            json.push(obj);
        }
        console.log(json);

        updateRecurringPaymentList(json);
    };
    reader.readAsText(input.files[0]);
})

const updateRecurringPaymentList = async (json) => {
    return await ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
            snapId,
            request:{
                method: 'updateRecurringPaymentList',
                params: {
                    recurringPaymentList: json
                }
            }
        }
    })
}