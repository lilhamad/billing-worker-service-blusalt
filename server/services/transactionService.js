import database from "../infrastructure/models";
import transaction from "../infrastructure/models/transaction";
import axiosCall from '../utils/axioscall';
import Sequelize, { DOUBLE, Op, Transaction } from 'sequelize';
import Queue from '../utils/queue';
const { sequelize } = require("../infrastructure/models");

require('dotenv').config();

class transactionService {
  static async fundAccount(body) {
    const t = await sequelize.transaction();
    try {
      const transaction = await database.transaction.create(body, { transaction: t });
      // If the execution reaches this line, no errors were thrown.
      await t.commit();
      return { status: true, data: transaction};
    } catch (error) {
      await t.rollback();
      console.log("Request error -- " + JSON.stringify(error));
      console.log("Request error --m " + error.message);
      return { status: false, message : JSON.stringify(error)}
    }
  }  
  
  static async processedTransaction(transaction) {
    const t = await sequelize.transaction();
    try {
      setTimeout(async function(){
        let result = await database.transaction.update({status :"success"}, { transaction: t, where: { id: Number(transaction.id) }});        
        await t.commit();
      }, 2000);      
    } catch (error) {
      await t.rollback();
      console.log("Request error --m " + error.message);
    }
  }  
  
  
  static async pullFromQueue(){
    await Queue.pullFromQueue();
  }
  
  
  static async getAllUnprocessedTransactions() {
    try {
      let unprocessedTransactions = await database.transaction.findAll({
        where: {
          isSentToQueue: { [Op.or]: [null, false] },
        }
      });
      return unprocessedTransactions;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  static async updateIsSentToQueueStatus(transactions) {
    try {
      transactions.forEach( async (transaction) => {
        if(transaction){
          let isSaveIsSentToQueue =  await database.transaction.update({isSentToQueue: true }, { where: { id: Number(transaction.id) } });
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
export default transactionService;
