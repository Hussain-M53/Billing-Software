const BillingDetailsResourceEdit = require("./BillingDetailsResourceEdit");

const BillingResource = async (billing) => {
    return {
        BillingId: billing.BillingId,
        DocNo: billing.DocNo,
        DocDate: billing.DocDate,
        fromDate: billing.fromDate,
        toDate: billing.toDate,
        RatePerTonHour: billing.RatePerTonHour,
        BoardMsg: billing.BoardMsg,
        IssueDate: billing.IssueDate,
        DueDate: billing.DueDate,
        Remarks: billing.Remarks,
        headingText: billing.headingText,
        billingDetails: await BillingDetailsResourceEdit(await billing.getBillingDetails()),

    }
}
module.exports = BillingResource;