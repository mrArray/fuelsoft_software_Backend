const { getConnection } = require("../../connectionManager");
const transactionService = require("../../service/transaction");
const pumpService = require("../../service/pump");
const tagService = require("../../service/tag");

// const userService = require("../../service/user");

const transactionSignUp = async (req, res) => {
  try {
    const dbConnection = getConnection();
    // console.log("transactionSignUp dbConnection", dbConnection.name);
    const transaction = await transactionService.createTransaction(dbConnection, req.body);
    const station = req.headers.fuel_station;

    res.status(200).json(
      { 
        success: true,
        station: station,
        transaction:transaction,
      }
    );
  } catch (err) {
    // console.log("transactionSignUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const transactiones = await transactionService.getAllTransactiones(dbConnection);
    const pumps = await pumpService.getAllPumpes(dbConnection);
    const tags = await tagService.getAllTages(dbConnection);
    
    const station = req.headers.fuel_station;
    // console.log(dbConnection)


    //monthly report
    let calculatedResult = new Object()
    // console.log(transactiones)
    transactiones.forEach((d) => {
        const date = new Date(d.DateTime);
        calculatedResult[date.toLocaleString('default', { month: 'long' })] = calculatedResult[date.toLocaleString('default', { month: 'long' })]
            ?
            ++calculatedResult[date.toLocaleString('default', { month: 'long' })]
            :
            1
    })

    const propertyKeys = Object.keys(calculatedResult);
    const propertyValues = Object.values(calculatedResult);

    const monthNames = propertyKeys;
    const Counts = propertyValues;
    const month = {};
    const monthsArray = [];
    for (let i = 0; i < 12; i++) {
        // month.id = (i + 1);
        month.month = monthNames[i] != null ? monthNames[i] : 0;
        month.total = Counts[i] != null ? Counts[i] : 0;
        monthsArray.push({ ...month });
    }


    // transaction_sum_by_pump
    const transaction_sum_by_pump = [];
    const pumpObj = {}
    for (let i = 0; i < pumps.length; i++) {
      const newArray = transactiones.filter(function (el) {
        return el.Pump === pumps[i].Id

      }
      );
      pumpObj.pump = pumps[i].Id != null ? pumps[i].Id : 0;
      pumpObj.sum_of_pump_rev = newArray.map(v => v.Amount).reduce((a, c) => {
        return a + c
      }, 0);
      pumpObj.volume_sold = newArray.map(v => v.Volume).reduce((a, c) => {
        return a + c
      }, 0);

      transaction_sum_by_pump.push({ ...pumpObj });
    }

           // transaction_sum_by_tag

    const transaction_sum_by_tag = [];
    const TagObj = {}
    for (let i = 0; i < tags.length; i++) {
        const newArray = transactiones.filter(function (el) {
            return el.Tag === tags[i].Tag
        }
        );
        // console.log(tags[i].Data.Tag)
        TagObj.tag = tags[i].Tag;
        TagObj.name = tags[i].Name;
        TagObj.sum_of_tag_rev = newArray.map(v => v.Amount).reduce((a, c) => {
            return a + c
        }, 0);
        TagObj.volume_sold = newArray.map(v => v.Volume).reduce((a, c) => {
            return a + c
        }, 0);

        transaction_sum_by_tag.push({ ...TagObj });
    }

    //total rest
    let total_revenue = transactiones.map(o => o.Amount).reduce((a, c) => {
      return a + c}, 0);
  let total_volume_sold = transactiones.map(v => v.Volume).reduce((a, c) => {
      return a + c } , 0);
  let max_fuel_price = transactiones.map(v => v.Price).reduce(function (a, b) {
      return Math.max(a, b); }  , 0);
  const format_total_revenue = total_revenue.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  
  


    //modified transactions
    const custome_transaction = [];
    const transactionObj = {}
    for (let i = 0; i < transactiones.length; i++) {
      
      transactionObj.id = transactiones[i]._id ;
      transactionObj.station = station;
      transactionObj.UserId = transactiones[i].UserId ;
      transactionObj.Tag = transactiones[i].Tag ;
      transactionObj.TotalAmount = transactiones[i].TotalAmount ;
      transactionObj.TotalVolume = transactiones[i].TotalVolume ;
      transactionObj.Amount = transactiones[i].Amount ;
      transactionObj.Price = transactiones[i].Price ;
      transactionObj.TCVolume = transactiones[i].TCVolume ;
      transactionObj.Volume = transactiones[i].Volume ;
      transactionObj.Transaction = transactiones[i].Transaction ;
      transactionObj.Nozzle = transactiones[i].Nozzle ;
      transactionObj.Pump = transactiones[i].Pump ;
      transactionObj.DateTime = transactiones[i].DateTime ;
      transactionObj.DateTimeStart = transactiones[i].DateTimeStart ;
      transactionObj.createdAt = transactiones[i].createdAt ;
      transactionObj.updatedAt = transactiones[i].updatedAt ;
      // transactionObj.__v = transactiones[i].__v ;

      custome_transaction.push({ ...transactionObj });
    }

    res.status(200).json({
      success: true,
      total_revenue: format_total_revenue,
      total_volume_sold: total_volume_sold,
      max_fuel_price: max_fuel_price,
      monthly_transaction_chart: monthsArray,
      transactions: custome_transaction,
      transaction_sum_by_pump: transaction_sum_by_pump,
      transaction_sum_by_tag: transaction_sum_by_tag,
      

    });

  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const transactiones = await transactionService.getTransactionById(dbConnection);
    const singleTransaction= await transactiones.findById(req.params.transactionId);

    res.status(200).json(
      { success: true, 
       transactiones: singleTransaction,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const transactiones = await transactionService.getDeleteById(dbConnection);
    const removeTransaction= await transactiones.remove({_id:req.params.transactionId});

    res.status(200).json(
      {
        success: true, 
        message: "Transaction Successfully Deleted", 
        transactiones: removeTransaction,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const transactiones = await transactionService.getDeleteById(dbConnection);

    const transactionData = {

    _id: req.params.transactionId,
    UserId: req.body.UserId,
    Tag:req.body.Tag,
    TotalAmount: req.body.TotalAmount,
    TotalVolume:req.body.TotalVolume,
    Amount: req.body.Amount,
    Price: req.body.Price,
    Transaction: req.body.Transaction,
    TCVolume: req.body.TCVolume,
    Volume: req.body.Volume,
    Nozzle: req.body.Nozzle,
    Pump: req.body.Pump,
    DateTime: req.body.DateTime,
    DateTimeStart: req.body.DateTimeStart,
      
    };

    const updateTransaction= await transactiones.updateMany(
      {_id:req.params.transactionId},  transactionData    
      );

    res.status(200).json(
      {
        success: true, 
        message: "Transaction Successfully Updated", 
        transactiones: updateTransaction,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


module.exports = { transactionSignUp, fetchAll,fetchById,deleteById,updateById };

