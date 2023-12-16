const BillingDetailsResource = async (BillingId, billingDetail, previewData, DocNo, RatePerTonHour) => {

    // get preview data of related customer
    //let filteredData = previewData.filter(obj => obj.CId === billingDetail.CID_web && obj.UnitsConsumedTonHour > 0);
    let filteredData = previewData.filter(obj => obj.CId === billingDetail.CID_web);

    //console.log("\n\n filteredData",filteredData);

    if (filteredData.length > 0)
        filteredData = filteredData[0];

    //console.log("\n\n filteredData",filteredData);
    const OtherCharges = isNaN(parseFloat(billingDetail.OtherCharges))? 0: parseFloat(billingDetail.OtherCharges);
    const Arrears = isNaN(parseFloat(billingDetail.Arrears))? 0: parseFloat(billingDetail.Arrears);
    const ServiceCharges = isNaN(parseFloat(billingDetail.ServiceCharges))? 0: parseFloat(billingDetail.ServiceCharges);
    const AdditionalCharges = isNaN(parseFloat(billingDetail.AdditionalCharges))? 0: parseFloat(billingDetail.AdditionalCharges);

    const Amount = filteredData.UnitsConsumedTonHour * RatePerTonHour;
    const TotalAmount = Amount + OtherCharges + Arrears + ServiceCharges + AdditionalCharges;

    const TotalPayableAmount = TotalAmount * billingDetail.claimedPer/100;

    const convertedData = {
        BillingId: BillingId,
        BillNo: 'JS-' + billingDetail.Code + '-' + DocNo, //JS-15-JUL-2022
        CID_web: BigInt(billingDetail.CID_web),
        FromDate: filteredData.fromDate,
        ToDate: filteredData.toDate,
        RatePerTonHour: RatePerTonHour,
        PreviousReadingTonHour: filteredData.PreviousReadingTonHour,
        CurrentReadingTonHour: filteredData.CurrentReadingTonHour,
        UnitsConsumedTonHour: filteredData.UnitsConsumedTonHour,
        OtherChargesText: billingDetail.OtherChargesText,
        OtherCharges: OtherCharges,
        ArrearsText: billingDetail.ArrearsText,
        Arrears: Arrears,
        ServiceChargesText: billingDetail.ServiceChargesText,
        ServiceCharges: ServiceCharges,
        AdditionalChargesText: billingDetail.AdditionalChargesText,
        AdditionalCharges: AdditionalCharges,
        Amount: Amount,
        TotalAmount: TotalAmount,
        claimedPer: billingDetail.claimedPer,
        TotalPayableAmount: TotalPayableAmount,
    }

    //console.log("\n\n convertedData",convertedData);

    return convertedData;
}
module.exports = BillingDetailsResource;