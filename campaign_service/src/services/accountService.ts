import datastore from "../datastore";
import { Account } from "../types/data";

const accountKind = "Account";

export const getAccountById = async (
  accountId: string
): Promise<Account | null> => {
  const key = datastore.key([accountKind, datastore.int(accountId)]);
  const [account] = await datastore.get(key);
  return account;
};

export const createAccount = async (
  data: Partial<Account>
): Promise<Account> => {
  const account: Account = {
    status: "ACTIVE",
    created: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    name: data.name ? data.name : "",
    timezone: data.timezone ? data.timezone : "",
  };

  const key = datastore.key(accountKind);
  const entity = {
    key,
    data: account,
  };

  await datastore.save(entity);
  return { ...account, accountId: key.id! };
};

export const updateAccount = async (
  accountId: string,
  account: Partial<Account>
): Promise<Account> => {
  const key = datastore.key([accountKind, datastore.int(accountId)]);
  const [existingAccount] = await datastore.get(key);
  if (!existingAccount) {
    throw new Error("Account not found!!");
  }

  const updatedAccount = { ...existingAccount, ...account };
  await datastore.save({ key, data: updateAccount });
  return updatedAccount;
};
