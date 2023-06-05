import {
  wallet_account,
  wallet_category,
  wallet_transaction,
  wallet_transaction_type,
} from "@prisma/client";

type walletCategoryType = wallet_category & wallet_transaction_type;

export type transactionAllType = wallet_transaction & {
  wallet_account: wallet_account;
  wallet_category: walletCategoryType;
  date: string;
  time: string;
};
