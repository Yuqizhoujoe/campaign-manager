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

export const createAccount = async (data: {
  title: string;
}): Promise<Account> => {
  const account: Omit<Account, "id"> = {
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: data.title,
  };

  const key = datastore.key(accountKind);
  const entity = {
    key,
    data: account,
  };

  await datastore.save(entity);
  return { ...account, id: key.id! };
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
