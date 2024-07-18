import React, { useEffect, useState } from "react";

import axios from "../axios";
import { useNavigate } from "react-router-dom";
// types
import { AccountType } from "../types";

import "./AccountSearch.css";

function AccountSearch() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  const navigate = useNavigate();

  const debounce = (fn: () => void, delay: number) => {
    return () => {
      // clear previous timer id -> cancel previous job
      clearTimeout(timerId);
      let timer = setTimeout(() => {
        return fn();
      }, delay);
      setTimerId(timer);
    };
  };

  const handleSearchInput = (event: any) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (searchInput) {
      const searchAccounts = async () => {
        try {
          const response = await axios.get(
            `/platforms/p1/accounts?q=${searchInput}`
          );
          setAccounts(response.data);
        } catch (error: any) {
          console.error("SEARCH_ACCOUNTS_ERROR: ", error);
        }
      };

      const debounceSearchAccounts = debounce(searchAccounts, 1000);

      debounceSearchAccounts();
    } else {
      setSearchInput("");
      setAccounts([]);
    }
  }, [searchInput]);

  const handleAccountOnSelect = (accountId: string) => {
    navigate(`/accounts/${accountId}`);
  };

  const renderAccounts = () => {
    if (!accounts || !accounts.length) return null;
    return (
      <div className="accounts-container">
        {accounts.map((account) => {
          return (
            <div
              key={account.accountId}
              className="account"
              onClick={() => handleAccountOnSelect(account.accountId)}
            >
              <h3 className="account-title">{account.title}</h3>
              <b className="account-id">{account.accountId}</b>
              <p className="account-status">
                {account.status}
                <span className="account-created">
                  Created: {account.createdAt}
                </span>
                <span className="account-updated">
                  Updated: {account.updatedAt}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="account-search-container">
      <input
        type="text"
        name="search"
        value={searchInput}
        onChange={handleSearchInput}
      />
      {renderAccounts()}
    </div>
  );
}

export default AccountSearch;
