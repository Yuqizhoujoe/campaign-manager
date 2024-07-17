import datastore from "../datastore";
import { AccountType } from "../types/data";

const accountKind = "Account";
const namespace = "campaign-manager-accounts";

export const getAllAccounts = async (): Promise<AccountType[]> => {
  const query = datastore.createQuery(namespace, accountKind);
  const [accounts] = await query.run();
  return accounts;
};

export const getAccountById = async (
  accountId: string
): Promise<AccountType | null> => {
  const key = datastore.key({
    namespace: namespace,
    path: [accountKind, accountId],
  });

  const [account] = await datastore.get(key);
  return account;
};

export const createAccount = async (data: {
  title: string;
  accountId: string;
}): Promise<AccountType> => {
  const key = datastore.key({
    namespace: namespace,
    path: [accountKind, data.accountId],
  });
  const account: Omit<AccountType, "id"> = {
    ...data,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const entity = {
    key,
    data: account,
  };
  await datastore.save(entity);
  return { ...account, id: key.id! };
};

export const updateAccount = async (
  accountId: number,
  accountData: Partial<AccountType>
): Promise<AccountType> => {
  const key = datastore.key({
    namespace: namespace,
    path: [accountKind, accountId],
  });
  const [account] = await datastore.get(key);
  if (!account) {
    throw new Error("Account not available");
  }

  const updatedAccount = {
    ...account,
    ...accountData,
  };
  const entity = {
    key: key,
    data: updatedAccount,
  };

  await datastore.save(entity);
  return updatedAccount;
};
