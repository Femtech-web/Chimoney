import { Response, Request, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import AppError from './helpers/appError';

const prisma = new PrismaClient();

class Controller {
  static async SendHello(req: Request, res: Response) {
    res.send("Hello there!");
  }

  static async createUserWallet(req: Request, res: Response) {

  }
}

export default Controller;

// {
//   "status": "success",
//   "data": {
//     "id": "434396c3-ac55-4c66-bd10-144ab5555500",
//     "parent": "OsdmSLaIU0TyNdPrN6xUS03tbEt2",
//     "uid": "434396c3-ac55-4c66-bd10-144ab5555500",
//     "approved": true,
//     "createdDate": "2024-02-24T15:40:55.392Z",
//     "meta": {},
//     "approvals": [
//       {
//         "changedFields": [
//           "all"
//         ],
//         "deviceTime": "2/24/2024",
//         "timestamp": "2024-02-24T15:40:55.392Z"
//       }
//     ],
//     "name": "femi",
//     "verified": true,
//     "isScrimUser": false,
//     "subAccount": true
//   }
// }

// {
//   "status": "success",
//   "data": {
//     "id": "434396c3-ac55-4c66-bd10-144ab5555500",
//     "parent": "OsdmSLaIU0TyNdPrN6xUS03tbEt2",
//     "uid": "434396c3-ac55-4c66-bd10-144ab5555500",
//     "approved": true,
//     "createdDate": "2024-02-24T15:40:55.392Z",
//     "meta": {},
//     "name": "femi",
//     "verified": true,
//     "isScrimUser": false,
//     "subAccount": true,
//     "wallets": [
//       {
//         "id": "0G9vDglax5FmAs4WUkL5",
//         "owner": "434396c3-ac55-4c66-bd10-144ab5555500",
//         "balance": 1000,
//         "type": "airtime",
//         "transactions": [
//           {
//             "amount": 0,
//             "balanceBefore": 1000,
//             "meta": {
//               "date": {
//                 "_seconds": 1708789256,
//                 "_nanoseconds": 76000000
//               }
//             },
//             "newBalance": 1000,
//             "description": "new wallet creation transaction"
//           }
//         ]
//       },
//       {
//         "id": "9gQXScGNkHCYBNNAIQxx",
//         "owner": "434396c3-ac55-4c66-bd10-144ab5555500",
//         "balance": 1000,
//         "type": "chi",
//         "transactions": [
//           {
//             "amount": 0,
//             "balanceBefore": 1000,
//             "meta": {
//               "date": {
//                 "_seconds": 1708789255,
//                 "_nanoseconds": 392000000
//               }
//             },
//             "newBalance": 1000,
//             "description": "new wallet creation transaction"
//           }
//         ]
//       },
//       {
//         "id": "MlZ32RB8vzXlw67h2Syj",
//         "owner": "434396c3-ac55-4c66-bd10-144ab5555500",
//         "balance": 1000,
//         "type": "momo",
//         "transactions": [
//           {
//             "amount": 0,
//             "balanceBefore": 1000,
//             "meta": {
//               "date": {
//                 "_seconds": 1708789255,
//                 "_nanoseconds": 744000000
//               }
//             },
//             "newBalance": 1000,
//             "description": "new wallet creation transaction"
//           }
//         ]
//       }
//     ]
//   }
// }

// {
//   "status": "success",
//   "data": {
//     "paymentLink": "https://sandbox.chimoney.io/pay/?issueID=434396c3-ac55-4c66-bd10-144ab5555500_10_1708790189633",
//     "data": [
//       {
//         "id": "UNWixMy33UbmQSxFqtMG",
//         "valueInUSD": 10,
//         "chimoney": 10000,
//         "issueID": "434396c3-ac55-4c66-bd10-144ab5555500_10_1708790189633",
//         "fee": 0,
//         "type": "chimoney",
//         "issuer": "434396c3-ac55-4c66-bd10-144ab5555500",
//         "initiatorKey": "U2FsdGVkX18F5U/94WyNXP9SvkZD8pkxSctOP2yMuSuw/YccZ4bhQ7u3opU3TRGpf8pCaByMKmd0zprPS0udeoJMNvbtp/HluTx1JaFADQ5j3NFvWH+NaslWYkRSwhGQ",
//         "chiRef": "8fa02292-fecd-4e0f-b1fb-88d3c5a276cb",
//         "integration": {
//           "appID": "aPDbsZzZQbrDynvW9RyS"
//         },
//         "issueDate": "2024-02-24T15:56:29.906Z",
//         "redeemData": {},
//         "initiatedBy": "OsdmSLaIU0TyNdPrN6xUS03tbEt2",
//         "meta": {
//           "payer": "434396c3-ac55-4c66-bd10-144ab5555500"
//         },
//         "updatedDate": "2024-02-24T15:56:31.417Z",
//         "paymentDate": "2024-02-24T15:56:31.417Z",
//         "enabledToRedeem": [],
//         "redeemLink": "https://sandbox.chimoney.io/redeem/?chi=8fa02292-fecd-4e0f-b1fb-88d3c5a276cb"
//       }
//     ],
//     "chimoneys": [
//       {
//         "id": "UNWixMy33UbmQSxFqtMG",
//         "valueInUSD": 10,
//         "chimoney": 10000,
//         "issueID": "434396c3-ac55-4c66-bd10-144ab5555500_10_1708790189633",
//         "fee": 0,
//         "type": "chimoney",
//         "issuer": "434396c3-ac55-4c66-bd10-144ab5555500",
//         "initiatorKey": "U2FsdGVkX18F5U/94WyNXP9SvkZD8pkxSctOP2yMuSuw/YccZ4bhQ7u3opU3TRGpf8pCaByMKmd0zprPS0udeoJMNvbtp/HluTx1JaFADQ5j3NFvWH+NaslWYkRSwhGQ",
//         "chiRef": "8fa02292-fecd-4e0f-b1fb-88d3c5a276cb",
//         "integration": {
//           "appID": "aPDbsZzZQbrDynvW9RyS"
//         },
//         "issueDate": "2024-02-24T15:56:29.906Z",
//         "redeemData": {},
//         "initiatedBy": "OsdmSLaIU0TyNdPrN6xUS03tbEt2",
//         "meta": {
//           "payer": "434396c3-ac55-4c66-bd10-144ab5555500"
//         },
//         "updatedDate": "2024-02-24T15:56:31.417Z",
//         "paymentDate": "2024-02-24T15:56:31.417Z",
//         "enabledToRedeem": [],
//         "redeemLink": "https://sandbox.chimoney.io/redeem/?chi=8fa02292-fecd-4e0f-b1fb-88d3c5a276cb"
//       }
//     ],
//     "error": "None",
//     "payouts": {
//       "0": {
//         "id": "UNWixMy33UbmQSxFqtMG",
//         "valueInUSD": 10,
//         "chimoney": 10000,
//         "issueID": "434396c3-ac55-4c66-bd10-144ab5555500_10_1708790189633",
//         "fee": 0,
//         "type": "chimoney",
//         "issuer": "434396c3-ac55-4c66-bd10-144ab5555500",
//         "initiatorKey": "U2FsdGVkX18F5U/94WyNXP9SvkZD8pkxSctOP2yMuSuw/YccZ4bhQ7u3opU3TRGpf8pCaByMKmd0zprPS0udeoJMNvbtp/HluTx1JaFADQ5j3NFvWH+NaslWYkRSwhGQ",
//         "chiRef": "8fa02292-fecd-4e0f-b1fb-88d3c5a276cb",
//         "integration": {
//           "appID": "aPDbsZzZQbrDynvW9RyS"
//         },
//         "issueDate": "2024-02-24T15:56:29.906Z",
//         "redeemData": {},
//         "initiatedBy": "OsdmSLaIU0TyNdPrN6xUS03tbEt2",
//         "meta": {
//           "payer": "434396c3-ac55-4c66-bd10-144ab5555500"
//         },
//         "updatedDate": "2024-02-24T15:56:31.417Z",
//         "paymentDate": "2024-02-24T15:56:31.417Z",
//         "status": "paid"
//       },
//       "issueID": "434396c3-ac55-4c66-bd10-144ab5555500_10_1708790189633"
//     }
//   }
// }