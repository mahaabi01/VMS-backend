import { Request, Response } from "express";
import CreditLedger from "../database/models/CreditLedger";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../database/models/User";

class CreditLedgerController {
  //update when payment is made
  async updatePayment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { paymentAmount } = req.body;
    if (!paymentAmount) {
      res.status(400).json({
        message: "Please provide paid amount.",
      });
      return;
    }
    //get paidAmount
    const creditDetail = await CreditLedger.findByPk(id);
    console.log(creditDetail);
    let paidAmount = creditDetail?.dataValues.paidAmount;
    paidAmount = paidAmount + paymentAmount;
    let totalCredit = creditDetail?.dataValues.total_credit;
    let remainingAmount = creditDetail?.dataValues.remainingAmount;
    remainingAmount = totalCredit - paidAmount;
    let lastPaymentDate = Date.now();
    await CreditLedger.update(
      {
        ...(paidAmount && { paidAmount }),
        ...(remainingAmount && { remainingAmount }),
        ...(lastPaymentDate && { lastPaymentDate }),
      },
      {
        where: { id },
      }
    );
    res.status(200).json({
      message: "Payment updated succesfully.",
    });
  }

  //get creditLedger by userId
  async getCreditLedgerById(req: AuthRequest, res: Response): Promise<void> {
    const id = req.params.id;
    const creditLedger = await CreditLedger.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "phone", "address"],
        },
      ],
    });
    if (!creditLedger) {
      res.status(407).json({
        message: "No credit ledger found.",
      });
    } else {
      res.status(200).json({
        message: "Credit Ledger fetched succesfully.",
        creditLedger,
      });
    }
  }

  //get creditLedger by Customer
  async getMyCreditLedger(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const creditLedger = await CreditLedger.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "phone", "address"],
        },
      ],
    });
    if (creditLedger.length === 0) {
      res.status(404).json({
        message: "No credit ledger found.",
      });
    }
    else{
      res.status(200).json({
        message: "Credit Ledger fetched successfully.",
        data: creditLedger,
      })
    }
  }
}

export default new CreditLedgerController();
