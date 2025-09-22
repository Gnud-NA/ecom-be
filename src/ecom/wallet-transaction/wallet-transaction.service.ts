import { Injectable } from "@nestjs/common";
import { WalletTransactionRepository } from "./wallet-transaction.repository";

@Injectable()
export class WalletTransactionService {
    constructor(private walletTransactionRepo: WalletTransactionRepository) {}
}
