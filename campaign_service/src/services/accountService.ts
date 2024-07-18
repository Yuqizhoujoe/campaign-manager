import datastore from "../datastore";
import { AccountType } from "../types/data";

const accountKind = "Account";
const namespace = "campaign-manager-accounts";

export const getAllAccounts = async (): Promise<AccountType[]> => {
  const query = datastore.createQuery(namespace, accountKind);
  const [accounts] = await query.run();
  return accounts;
};

// export const queryAccountById = async (q: string): Promise<AccountType[]> => {
//   /*
//     search jo

//     .filter("accountId", ">=", q)
//     This will match all strings that are equal to or greater than "jo"

//     .filter("accountId", "<", q + "\ufffd")
//     This ensures that the results include only those strings that start with "jo".
//   */
//   const query = datastore
//     .createQuery(namespace, accountKind)
//     .filter("accountId", ">=", q)
//     .filter("accountId", "<", q + "\ufffd"); // \ufffd highest Unicode character

//   const [accounts] = await query.run();
//   return accounts;
// };

export const queryAccountByName = async (q: string): Promise<AccountType[]> => {
  const query = datastore.createQuery(namespace, accountKind);
  const [accounts] = await query.run();
  const results = accounts.filter(
    (account) =>
      account.title && account.title.toLowerCase().includes(q.toLowerCase())
  );

  return results;
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
