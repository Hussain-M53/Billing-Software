const db = require("../db/models");
const Customer = db.Customer;
const CustomerResource = require('./CustomerResource')

const BillingDetailsResourceEdit = async (billingDetails) => {

    //console.log("\n\n billingDetails",billingDetails);

    // filter where CID_web is null
    const filteredBillingDetais = billingDetails.filter(billingDetail => billingDetail.CID_web !== null);

    //console.log("\n\n filteredBillingDetais",filteredBillingDetais);

    const convertedBillingDetails = await filteredBillingDetais.map(async (billingDetail)=>{
        // get customer details
        const id = billingDetail.CID_web;
        const customer = await CustomerResource(await Customer.findByPk(id));
        //console.log("\n\n customer",customer);

        // get meter and floor details also

        const convertedData = {
            CName: customer.CName,
            Code: customer.Code,
            CodeName: customer.Code + ' - ' + customer.CName,
            customer: customer, // give full customer resource
            BillingId: billingDetail.BillingId,
            RowNo: billingDetail.RowNo,
            BillNo: billingDetail.BillNo,
            CID_web: billingDetail.CID_web,
            FromDate: billingDetail.FromDate,
            ToDate: billingDetail.ToDate,
            RatePerTonHour: billingDetail.RatePerTonHour,
            PreviousReadingTonHour: billingDetail.PreviousReadingTonHour,
            CurrentReadingTonHour: billingDetail.CurrentReadingTonHour,
            UnitsConsumedTonHour: billingDetail.UnitsConsumedTonHour,
            OtherChargesText: billingDetail.OtherChargesText,
            OtherCharges: billingDetail.OtherCharges,
            ArrearsText: billingDetail.ArrearsText,
            Arrears: billingDetail.Arrears,
            ServiceChargesText: billingDetail.ServiceChargesText,
            ServiceCharges: billingDetail.ServiceCharges,
            AdditionalChargesText: billingDetail.AdditionalChargesText,
            AdditionalCharges: billingDetail.AdditionalCharges,
            Amount: billingDetail.Amount,
            TotalAmount: billingDetail.TotalAmount,
            claimedPer: billingDetail.claimedPer,
            TotalPayableAmount: billingDetail.TotalPayableAmount,
        }

        //console.log("\n\n convertedData",convertedData);

        return convertedData;
    })

    const resolvedBillingDetailsConverted = await Promise.all(convertedBillingDetails); // Resolve the promises

    //console.log("\n\n resolvedBillingDetailsConverted",resolvedBillingDetailsConverted);
    return resolvedBillingDetailsConverted;
}
module.exports = BillingDetailsResourceEdit;