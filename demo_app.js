import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {

  // Properties

  const [walletAddress, setWalletAddress] = useState("");

  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if (window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }


  const signTransferPermit = async function () {
    console.log('Attempting to sign message...')

    const SECOND = 1000;

    const fromAddress = walletAddress;
    // JavaScript dates have millisecond resolution
    const expiry = Math.trunc((Date.now() + 120 * SECOND) / SECOND);
    const nonce = 1;
    const spender = walletAddress;

    const createPermitMessageData = function () {
      const message = {
        holder: fromAddress,
        spender: spender,
        nonce: nonce,
        expiry: expiry,
        allowed: true,
      };

      const typedData = JSON.stringify({
        types: {
          EIP712Domain: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "version",
              type: "string",
            },
            {
              name: "chainId",
              type: "uint256",
            },
            {
              name: "verifyingContract",
              type: "address",
            },
          ],
          Permit: [
            {
              name: "holder",
              type: "address",
            },
            {
              name: "spender",
              type: "address",
            },
            {
              name: "nonce",
              type: "uint256",
            },
            {
              name: "expiry",
              type: "uint256",
            },
            {
              name: "allowed",
              type: "bool",
            },
          ],
        },
        primaryType: "Permit",
        domain: {
          name: "Dai Stablecoin",
          version: "1",
          chainId: 42,
          verifyingContract: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
        },
        message: message,
      });

      return {
        typedData,
        message,
      };
    };

    const signData = async function (web3, fromAddress, typeData) {
      const result = await web3.currentProvider.sendAsync({
        id: 1,
        method: "eth_signTypedData_v3",
        params: [fromAddress, typeData],
        from: fromAddress,
      });

      const r = result.result.slice(0, 66);
      const s = "0x" + result.result.slice(66, 130);
      const v = Number("0x" + result.result.slice(130, 132));

      return { v, r, s };
    };

    const messageData = createPermitMessageData();
    const sig = await signData(web3, fromAddress, messageData.typedData);
    console.log(sig);
    return Object.assign({}, sig, messageData.message);
  };






  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={requestAccount}
        >Request Account</button>
        <h3>Wallet Address: {walletAddress}</h3>
        <button
          onClick={signTransferPermit}
        >Sign Message</button>
      </header>
    </div>
  );
}

export default App;
