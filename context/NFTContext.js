import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { MarketAddress, MarketAddressAbI } from "./constants";
import { pinata } from "../utils/config";

const uploadFileToPinata = async (file) => {
  try {
    const uploadResult = await pinata.upload.file(file);
    return uploadResult;
  } catch (error) {
    console.log(error);
  }
};

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const nftCurrency = "ETH";

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("please install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("no accounts found");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const checkWallet = async () => {
      if (isMounted) {
        await checkIfWalletIsConnected();
      }
    };

    checkWallet();

    return () => {
      isMounted = false;
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("please install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  return (
    <NFTContext.Provider
      value={{ nftCurrency, connectWallet, currentAccount, uploadFileToPinata }}
    >
      {children}
    </NFTContext.Provider>
  );
};
