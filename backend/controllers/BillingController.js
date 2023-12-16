const db = require("../db/models");
const Billing = db.Billing;
const BillingDetails = db.BillingDetails;
const BillingResource = require('../resources/BillingResource')
const BillingCollection = require('../resources/collections/BillingCollection')
const Customer = db.Customer;
const Paging = require('../helpers/Paging')
const {Op} = require('sequelize')
const ResponseType = require('../enums/ResponseType')
const moment = require('moment');
const BillingDetailsResource = require("../resources/BillingDetailsResource");
const Company = db.Company;


module.exports = {
    async getNewId(){
        let id=1;
        let limit=1;
        let order = [
            ['BillingId', 'DESC']
        ];

        await Billing.findAll({
        //    where: condition,
            order: order,
            limit,
        })
        .then(async data => {
            //console.log("data.rows.........",data[0]);
            if (data[0] !== undefined) 
                id = BigInt(data[0].BillingId) + BigInt(1);
        });

        return id;
    },
    async getResolvedBillingDetails(BillingId, billingDetails, previewData, DocNo, RatePerTonHour){
        //' do not generate bill if consumed =0
        const filteredBillingDetails = billingDetails.filter((billing) => {
            // Find corresponding units consumed in previewData
            const filteredData = previewData.find((preview) => preview.CId === billing.CID_web);
          
            // Check if filteredData exists and UnitsConsumedTonHour is != 0
            return filteredData && parseFloat(filteredData.UnitsConsumedTonHour) != 0;
          });
                  
        //console.log("\n\n filteredBillingDetails",filteredBillingDetails);

        const billingDetailsConverted = filteredBillingDetails.map(async (billingDetail)=>{
                    return await BillingDetailsResource(BillingId, billingDetail, previewData, DocNo, RatePerTonHour);
                })

        // //' do not generate bill if consumed =0
        const resolvedBillingDetailsConverted = await Promise.all(billingDetailsConverted); // Resolve the promises
        //console.log("\n\n upper.... resolvedBillingDetailsConverted",resolvedBillingDetailsConverted);

        return resolvedBillingDetailsConverted;
},

    async create(req, res) {
        let response = null;
        const {DocDate, DocNo, IssueDate, DueDate, fromDate, toDate, RatePerTonHour, CoID, billingDetails, previewData,headingText,} = req.body;

        const id = await module.exports.getNewId();

        const resolvedBillingDetailsConverted = await module.exports.getResolvedBillingDetails(id,billingDetails,previewData,DocNo,RatePerTonHour);

        if (resolvedBillingDetailsConverted.length == 0){
            // no need to save the bill if no customer has consumed anything
            console.error('Cannot create billing as no consumption made');
            return res.status(409).json({'message': 'Cannot create billing as no consumption made'});
        }

        const newBilling = {
            // fields for Billing table
            BillingId: id,
            DocDate: DocDate,
            DocNo: DocNo,
            IssueDate: IssueDate,
            DueDate: DueDate,
            fromDate: fromDate,
            toDate: toDate,
            RatePerTonHour: RatePerTonHour,
            BoardMsg: "",
            Remarks: "",
            headingText: headingText,
            CoID: CoID,
            TransUID:req.user.user_id,
          };
        
        let billing ={};
        try{
            // const billing = await Billing.create(newBilling, 
            //     { include: [{ model: BillingDetails, as: 'billingDetails' }] }
            //     );

            // await db.sequelize.transaction(async (t) => {
            //     billing = await Billing.create(newBilling, { transaction: t });
            //     for (const billingDetail of newBilling.BillingDetails) {
            //         //console.log("\n\n billingDetail",billingDetail);

            //         await BillingDetails.create({ ...billingDetail, BillingId: billing.BillingId }, { transaction: t });
            //     }
            //     });

            
            db.sequelize.transaction((transaction) => {
                return Billing.create(newBilling, {
                  include: [{
                    model: BillingDetails,
                    as: 'billingDetails', // Specify the alias here
                  }],
                  transaction: transaction,
                })
                  .then(async (savedBilling) => {
                    //console.log('Billing saved:', savedBilling);
                    billing = savedBilling;

                    // const resolvedBillingDetailsConverted = await Promise.all(billingDetailsConverted); // Resolve the promises
                    //console.log("\n\n resolvedBillingDetailsConverted",resolvedBillingDetailsConverted);

                    // Access the saved billing ID
                    const billingId = BigInt(savedBilling.BillingId);
              
                    // Create an array of BillingDetails objects with the associated billingId
                    const billingDetails = resolvedBillingDetailsConverted.map((details) => {
                      return {
                        ...details,
                        BillingId: billingId,
                      };
                    });

                    //console.log("\n\nbillingDetails",billingDetails);

              
                    // Save the billing details
                    return BillingDetails.bulkCreate(billingDetails, { transaction: transaction });
                  })
                  .then((savedBillingDetails) => {
                    //console.log('Billing details saved:', savedBillingDetails);
                  });
              })
                .then(async () => {
                  //console.log('Transaction committed.');

                  //' update Rate/Ton-hour default - in company
                    const company = await Company.update({
                        RatePerTonHour: RatePerTonHour,
                    }, {where: {CoID: CoID}})

                    //console.log("\n\n billing",billing);
                    //console.log("\n\n BillingResource",await BillingResource(billing));

                    // no need to send back billing
                    response = res.status(201).json({
                        message: 'Bill(s) generated successfully.',
                        //billing: await BillingResource(billing)
                    });
                    return response;
                })
                .catch((error) => {
                  console.error('Error saving billing:', error);
                });
              
                            
        } catch (error) {
            console.error('Some error occured:', error);
            return res.status(409).json({'message': 'Some error occured'});
        }

        // console.log("\n\n billing",billing);

        // const isEmpty = Object.keys(billing).length === 0;
        // if (isEmpty){
        //     response = res.status(409).json({'message': 'Some error occured'});
        // }else{
        //     response = res.status(201).json({
        //         message: 'Bill(s) generated successfully.',
        //         billing: BillingResource(billing)
        //     });
        // }

        // return response;
    },

    async billings(req, res) {
        let responseType = req.params.response_type;
        if (!responseType) {
            responseType = ResponseType.FULL;
        }
        if (responseType == ResponseType.PAGINATED) {
            const {size, currentPage, search, sortBy, orderBy} = req.query;
            const {limit, offset} = Paging.getPagination(currentPage, size);
            let condition = {
                [Op.or]: [
                    {
                        DocNo: {
                            [Op.like]: `%${search}%`
                        }
                    },
                ]
            }
            // // do not show records where CID_web is null
            // condition = {
            //     ...condition,
            //     '$billingDetails.CID_web$': {
            //       [Op.ne]: null,
            //     },
            //   };

            let order = [
                ['BillingId', 'DESC']
            ];
            if (sortBy) {
                order = [[sortBy, orderBy]]
            }
            await Billing.findAndCountAll({
                include: [{
                    model: BillingDetails,
                    as: 'billingDetails', // Specify the alias here
                    where: {
                        CID_web: { [Op.ne]: null }, // Add condition for CID_web directly in the include
                      },                    
                  }],
                where: condition,
                order: order,
                limit,
                offset
            })
                .then(async data => {
                    const billings = await BillingCollection(data.rows);
                    const pagination = await Paging.getPagingData(data, currentPage, limit, search);
                    res.send({billings, pagination});
                });
        } else if (responseType === ResponseType.FULL) {
            let condition={};
            // // do not show records where CID_web is null
            // condition = {
            //     ...condition,
            //     '$billingDetails.CID_web$': {
            //         [Op.ne]: null,
            //     },
            // };
            let order = [
                ['BillingId', 'DESC']
            ];
    
            let billings = await Billing.findAll({
                include: [{
                    model: BillingDetails,
                    as: 'billingDetails', // Specify the alias here
                    where: {
                        CID_web: { [Op.ne]: null }, // Add condition for CID_web directly in the include
                      },
                }],
                where: condition,
                order: order,
            });
            // no need to send full object with billing details as of now.
            //return res.status(200).json({billings: await BillingCollection(billings)})
            return res.status(200).json({billings: await BillingCollection(billings)})
        }
    },

    async billing(req, res) {
        let response = null;
        const id = req.params.id;
        const billing = await Billing.findByPk(id);
        response = res.status(200).json({billing: await BillingResource(billing)});
        return response;
    },
    async billingWithHistory(req, res) {
        let response = null;
        const id = req.params.id;
        const { CID_web,} = req.query;

        //console.log("\n\n\n  reached billingWithHistory: ",id, ' \n CID_web', CID_web);


        // params are sent as string
        if (id === 'null' || id.trim() === '') {
            //console.error('\n\n Error fetching bill(s).......:');
            return res.status(409).json({'message': 'Error fetching bill(s)'});
        }

        let combinedBillingWithHistory;

        try {
            const billing = await Billing.findByPk(id);
            let billingWithHistory_ = await BillingResource(billing);
    
            // filter billings if CID_web is not null
            if (CID_web !=null && CID_web>0){

                const filteredBillingDetails = billingWithHistory_.billingDetails.filter(
                    billingDetail => billingDetail.CID_web == CID_web);

                    //update billing details parent object
                    billingWithHistory_.billingDetails = filteredBillingDetails;
            }

           // console.log('\n\n billingWithHistory_',billingWithHistory_);
            
            // get last 15 billing details for each customer
            const billingDetailsWithHistory_ = await Promise.all(
                billingWithHistory_.billingDetails.map(async (billingDetail)=>{
                    let limit=15;
                    let order = [
                        //['RowNo', 'DESC'],
                        ['BillingId', 'DESC']
                    ];
            
                    let billingDetailsHistory = await BillingDetails.findAll({
                        where: {
                            CID_web: billingDetail.CID_web,
                            BillingId: 
                                {
                                    [Op.ne]: id,
                                }
                            },
                        order: order,
                        limit: limit,
                    })
                    // add DocNo to billingDetailsHistory from its parent
                    billingDetailsHistory = await Promise.all(
                        billingDetailsHistory.map(async (billingDetail)=>{
                            // get billingDetail parent
                            const bill = await billingDetail.getBilling();
                            //console.log('\n\n bill',bill);
                            const DocNo = {DocNo: bill.DocNo};
                            
                            //console.log('\n\n',{...billingDetail, ...DocNo});
                            //console.log('\n\n\n ',billingDetail);

                            // note that actual object properties are present in .dataValues object
                            return {...billingDetail.dataValues, ...DocNo};
                        })
                    );

                    //console.log('\n\n\n billingDetailsHistory',billingDetailsHistory);

                    return {...billingDetail, billingDetailsHistory};
                })
            );
    
            //console.log("\n\n billingWithHistory_",billingWithHistory_);
            //console.log("\n\n billingDetailsWithHistory_",billingDetailsWithHistory_);
    
            // remove billingsDetails object as details are already there in historyObject
            delete billingWithHistory_.billingDetails;

            combinedBillingWithHistory = {...billingWithHistory_, billingDetailsWithHistory_};
    
        } catch (error) {
            console.error('Error fetching bill(s):', error);
            return res.status(409).json({'message': 'Error fetching bill(s)'});
        }

        //console.log("\n\ncombinedBillingWithHistory",combinedBillingWithHistory);

        response = res.status(200).json({billing: combinedBillingWithHistory});
        return response;
    },

    async update(req, res) {
        const id = req.params.id;
        const {DocDate, DocNo, IssueDate, DueDate, fromDate, toDate, RatePerTonHour, CoID, billingDetails, previewData,headingText,} = req.body;

        const order = [
            ['BillingId', 'DESC']
        ];

        let condition={};

        // check if there are any billings created after this billing, then do not allow update
        const lastBilling= await BillingDetails.findAll({
            where: condition,
            order: order,
            limit: 1,
        })//.then((result) => {
            //let lastBilling = result[0];
            if (lastBilling[0].BillingId > id){
                // do not allow update
                //console.error('Error updating: Bill(s) created after this bill');
                return res.status(409).json({'message': 'Error updating: Bill(s) created after this bill'});
            }
        //})

        //let billing = await Billing.findByPk(id);
        //billing.set({
        let billing= {
            BillingId: id,
            DocDate: DocDate,
            DocNo: DocNo,
            IssueDate: IssueDate,
            DueDate: DueDate,
            fromDate: fromDate,
            toDate: toDate,
            RatePerTonHour: RatePerTonHour,
            BoardMsg: "",
            Remarks: "",
            headingText: headingText,
            CoID: CoID,
            TransUID:req.user.user_id,
        }
        
        /////////// wrap all in transaction ////////////
        db.sequelize.transaction(async (transaction) => {

            //await billing.save()
            const updatedRows = await Billing.update(billing, 
                { where: { BillingId: id } },
                {transaction: transaction,}
                )

            // delete billingDetails and create again
            await BillingDetails.destroy(
                {where: { BillingId: id }},
                {transaction: transaction,}
            );

            // Access the saved billing ID
            const billingId = id;
        
            const resolvedBillingDetailsConverted = await module.exports.getResolvedBillingDetails(id,billingDetails,previewData,DocNo,RatePerTonHour);

            /////////// id already present -  no need ///////
            // // Create an array of BillingDetails objects with the associated billingId
            // const billingDetails = resolvedBillingDetailsConverted.map((details) => {
            //     return {
            //     ...details,
            //     BillingId: billingId,
            //     };
            // });

            //console.log("\n\nbillingDetails",billingDetails);

        
            // Save the billing details
            await BillingDetails.bulkCreate(resolvedBillingDetailsConverted, 
                { transaction: transaction }
            );
        })
        .then(async () => {
            //console.log('Transaction committed.');

            //' update Rate/Ton-hour default - in company
              const company = await Company.update({
                  RatePerTonHour: RatePerTonHour,
              }, {where: {CoID: CoID}})

              // get updated record
              billing = await Billing.findByPk(id);

              //console.log("\n\n billing",billing);
              //console.log("\n\n BillingResource",await BillingResource(billing));

              // no need to send back billing
              response = res.status(201).json({
                  message: 'Bill(s) updated successfully.',
                  //billing: await BillingResource(billing)
              });
              return response;
          })
          .catch((error) => {
            console.error('Error updating bill(s):', error);
            return res.status(409).json({'message': 'Error updating bill(s)'});
          });

        //return res.status(200).json({billing: await BillingResource(billing)});
    },

    async destroy(req, res) {
        const id = req.params.id;

        const order = [
            ['BillingId', 'DESC']
        ];

        let condition={};

        // check if there are any billings created after this billing, then do not allow delete
        const lastBilling= await BillingDetails.findAll({
            where: condition,
            order: order,
            limit: 1,
        })//.then((result) => {
            //let lastBilling = result[0];
            if (lastBilling[0].BillingId > id){
                // do not allow update
                //console.error('Error deleting: Bill(s) created after this bill');
                return res.status(409).json({'message': 'Error deleting: Bill(s) created after this bill'});
            }
        //})

        try{
            // // Delete Billing and associated BillingDetails
            // // this will only work if onDelete is set to CASCADE
            // await Billing.destroy({
            //     where: { BillingId: id },
            //     include: [{
            //     model: BillingDetails,
            //     as: 'billingDetails',
            //     where: { BillingId: id }
            //     }]
            // });

            // Delete associated BillingDetails first
            await BillingDetails.destroy({
                where: { BillingId: id }
            });
            
            // Delete the parent Billing record
            await Billing.destroy({
                where: { BillingId: id }
            });            

        } catch (error) {
            console.error('Error deleting records:', error);
            return res.status(409).json({'message': 'Some error occured'});
        }

        return res.status(200).json({'message': 'Billing deleted successfully.'});
    },
    
    async getPreviewData(req, res) {
        let response = null;
        let {fromDate, toDate, id} = req.query;
        let customers =[];
        let returnData=[];

        if (fromDate == undefined || toDate == undefined)
            return res.status(404).json({error: 'Invalid from/to Date'});

        fromDate = fromDate.replace(/"/g, ''); // remove "" quotes from string
        toDate = toDate.replace(/"/g, ''); // remove "" quotes from string

        // get customer list where status = true and meter status=true
        const query = `Select cs.* from customer_web as cs where cs.status=1 and cs.MeterId in 
        (Select m.id from meters as m where m.status =1)
        order by cs.code`

        try{

            customers = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT
            });
        } catch (error) {
            // Handle the error
            console.log('Error executing the query:', error);
            response = res.status(404).json({error: error});
            return response;        
        }

        //console.log("\n\customers",customers);

        let billingDetails=[];

        returnData = await Promise.all(
            customers.map(async (customer)=>{
                let PreviousReadingTonHour = 0;
                let CurrentReadingTonHour = 0;
                let UnitsConsumedTonHour=0;
                let fromDateNew = fromDate;

            // check if there exist previous bill of this customer
                try{
                    const order = [
                        ['ToDate', 'DESC']
                    ];
                   
                    let condition = {
                        CID_web: customer.CId,
                    };

                    // check if billingId is there, then get reading details from there.
                    if (id != undefined){
                        condition = Object.assign(
                            {
                                BillingId: id,
                            },condition);                
                    }

                    // get last billing details
                    billingDetails = await BillingDetails.findAll({
                        where: condition,
                        order: order,
                        limit: 1,
                    })//.then(async result => {
                        // console.log("\n result",result);

                        let fromTotalValue =0;
                        let toTotalValue =0;

                        // billingDetails = result[0];
                        //console.log("billingDetails",billingDetails);
                        if (billingDetails.length >0) {
                            if (id != undefined){
                                // get values from db
                                PreviousReadingTonHour = billingDetails[0].PreviousReadingTonHour;
                            } else{
                                // get ending date and last meter reading
                                fromDateNew = moment(billingDetails[0].ToDate).add(1,'d').format('YYYY-MM-DD');
                                PreviousReadingTonHour = billingDetails[0].CurrentReadingTonHour;
                            }
                        }

                            ////////////////////////// from total value ////////////////////
                            let spResult={};
                            try {
                                spResult = await db.sequelize.query('EXEC proc_getFromTotalValue @Cid = :CId, @fromDate = :fromDate, @toDate = :toDate, @isMBTU = :isMBTU', 
                                {
                                    replacements: {
                                        CId : customer.CId,
                                        fromDate: moment(fromDateNew).startOf('day').format('YYYY-MM-DD HH:mm:ss'), // + ' 00:00',
                                        toDate: moment(toDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'), // + ' 23:59:59',
                                        isMBTU: false, // need results in Ton-Hour
                                    },
                                        type: db.sequelize.QueryTypes.RAW,
                                }, 
                                ).then(spResult => {
                                    // Process the result of the stored procedure call
                                    //console.log("stored procedure result............",spResult);
            
                                    // note: stored procedure returns result as [ [], 3]
                                    // where first item is an array or results
                                    let data = spResult[0];
                                    //console.log("\n\n fromTotalValue",data);
            
                                    // if no data found as per criteria then return 0
                                    if (data.length > 0){
                                        fromTotalValue = data[0].fromTotalValue;
                                    }

                                    });         
                                } catch (error) {
                                    console.error('Error calling stored procedure:', error);
                                }

                            // if there is any previous billing, then previous reading will not be zero.
                            // if zero it means no previous billing, get previous reading from sp result
                            if (PreviousReadingTonHour ==0)
                                PreviousReadingTonHour = fromTotalValue;

                            
                            ////////////////////////// to total value ////////////////////
                            
                            try {
                                spResult = await db.sequelize.query('EXEC proc_getToTotalValue @Cid = :CId, @fromDate = :fromDate, @toDate = :toDate, @isMBTU = :isMBTU', 
                                {
                                    replacements: {
                                        CId : customer.CId,
                                        fromDate: moment(fromDateNew).startOf('day').format('YYYY-MM-DD HH:mm:ss'), // + ' 00:00',
                                        toDate: moment(toDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'), // + ' 23:59:59',
                                        isMBTU: false, // need results in Ton-Hour
                                    },
                                        type: db.sequelize.QueryTypes.RAW,
                                }, 
                                    ).then(spResult => {
                                    // Process the result of the stored procedure call
                                    //console.log("stored procedure result............",spResult);
            
                                    // note: stored procedure returns result as [ [], 3]
                                    // where first item is an array or results
                                    let data = spResult[0];
            
                                    //console.log("\n\n toTotalValue",data);

                                    // if no data found as per criteria then return 0
                                    if (data.length > 0){
                                        toTotalValue = data[0].toTotalValue;
                                    }

                                    });         
                                } catch (error) {
                                    console.error('Error calling stored procedure:', error);
                                }

                                // set current reading 
                                CurrentReadingTonHour = toTotalValue;
                        //});

                    } catch (error) {
                        console.error('\nSome error occured', error);
                        response = res.status(404).json({error: error});
                        return response;        
                    }

                    UnitsConsumedTonHour = CurrentReadingTonHour - PreviousReadingTonHour;

                    // do not allow -ive values
                    //UnitsConsumedTonHour = UnitsConsumedTonHour <=0? 0 : UnitsConsumedTonHour;
                
                // complete 1st customer
                const data = {
                    CId: customer.CId,
                    CName: customer.CName,
                    Code: customer.Code,
                    fromDate: fromDateNew,
                    toDate: toDate,
                    PreviousReadingTonHour: Math.round(PreviousReadingTonHour),
                    CurrentReadingTonHour: Math.round(CurrentReadingTonHour),
                    UnitsConsumedTonHour: Math.round(UnitsConsumedTonHour),
                }
    
               //returnData.push(data);
                return data;
            })
        )
        //console.log("\n\nreturnData",returnData);

        response = res.status(200).json({previewData: returnData});
        return response;        

    },

    async getNewBillingDetails(req,res){
            // get customer list and return empty billing details object
            let condition={
                status: true,
            };
            let order = [
                ['Code', 'ASC']
            ];

            let customers = await Customer.findAll({
                where: condition,
                order: order,
            });

            const billingDetails = customers.map((customer,index)=>{
                const data = {
                    RowNo: index,
                    BillingId: 0,
                    CID_web: customer.CId,
                    CName: customer.CName,
                    Code: customer.Code,
                    claimedPer: customer.claimedPer,
                    OtherChargesText: "",
                    OtherCharges: "",
                    ArrearsText: "",
                    Arrears: "",
                    ServiceChargesText: "",
                    ServiceCharges: "",
                    AdditionalChargesText: "",
                    AdditionalCharges: "",
                    CodeName: customer.Code + ' - ' + customer.CName,
                };

                return data;
            });

            //console.log("\n\n billingDetails",billingDetails);

            return res.status(200).json({billingDetails: billingDetails})

    },

    async getNewBillingMonthDetails(req, res) {
        let response = null;
        //const id = req.params.id;
        let dtBillingMonth = moment().startOf('M') //.utcOffset(0); //.format('YYYY-MM-DD HH:mm:ss')
        //console.log("\n\dtBillingMonth",dtBillingMonth);

        const issueDateThreshold = 4;
        const dueDateThreshold = 14;

        // default values
        let DocNo = moment(dtBillingMonth).format('MMM-YYYY');
        let IssueDate = moment(dtBillingMonth).add(1,'M').add(issueDateThreshold,'d').format('YYYY-MM-DD');
        let DueDate = moment(dtBillingMonth).add(1,'M').add(dueDateThreshold,'d').format('YYYY-MM-DD');

        // from value take from previous toDate value. if not present then previous month 1st day
        let fromDate = moment(dtBillingMonth).subtract(1,'M').startOf('month').format('YYYY-MM-DD');
        //let toDate = moment(fromDate).endOf('M').format('YYYY-MM-DD');
        let fromDateDisabled = false;

        const order = [
            ['BillingId', 'DESC']
        ];
        const condition = {};

        try{
            // get last billing month
            await Billing.findAll({
                //where: condition,
                order: order,
                limit: 1,
            }).then(async data => {
                //console.log("\ndata",data);
                // first record only
                let lastBilling = data[0];
                //console.log("lastBilling",lastBilling);
                //2022-07-01T15:01:46.000Z

                lastBilling = await BillingResource(lastBilling);
                //console.log("lastBilling",lastBilling);

                dtBillingMonth = moment(lastBilling.DocDate).add(1,'M').startOf('month').format('YYYY-MM-DD');
                //console.log("\ndtBillingMonth",dtBillingMonth);

                // doc-name as MMM-YYYY
                DocNo = moment(dtBillingMonth).format('MMM-YYYY');
                IssueDate = moment(dtBillingMonth).add(1,'M').add(issueDateThreshold,'d').format('YYYY-MM-DD');
                DueDate = moment(dtBillingMonth).add(1,'M').add(dueDateThreshold,'d').format('YYYY-MM-DD');

                // from value take from previous toDate value. if not present then previous month 1st day
                fromDate = moment(lastBilling.toDate).add(1,'d').format('YYYY-MM-DD');
                fromDateDisabled = true;

                const innerData = {
                    dtBillingMonth: dtBillingMonth, 
                    DocNo: DocNo, 
                    IssueDate: IssueDate,
                    DueDate: DueDate,
                    fromDate: fromDate,
                    toDate: moment(fromDate).endOf('M').format('YYYY-MM-DD'),
                    fromDateDisabled,
                };

                //console.log("\n\ninnerData",innerData);

            })
        } catch (error) {
            console.error('\nSome error occured', error);
            response = res.status(404).json({error: error});
            return response;        
        }

        const returnData = {
            dtBillingMonth: dtBillingMonth, 
            DocNo: DocNo, 
            IssueDate: IssueDate,
            DueDate: DueDate,
            fromDate: fromDate,
            toDate: moment(fromDate).endOf('M').format('YYYY-MM-DD'),
            fromDateDisabled,
        };

        //console.log("\nreturnData",returnData);

        response = res.status(200).json(returnData);
        return response;        

    },

}

