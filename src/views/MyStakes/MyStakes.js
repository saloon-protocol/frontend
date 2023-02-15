import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import UserGlobalStakeList from './UserGlobalStakeList';
import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import {Topbar} from '../../layouts/Main/components/Topbar';




const MyStakes = () => {
  const theme = useTheme();
  const mumbaiwss = 'wss://polygon-mumbai.g.alchemy.com/v2/MFd0LBZozOhdiLbJPopgwAMbqIxeZSC7';
  
  // var provider;
  // if(window.ethereum){
  //   const provider = new ethers.providers.WebSocketProvider(mumbaiwss);
  // }

  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  // useEffect(() => {
  //   const walletAddress = window.localStorage.getItem('WALLET_ADDRESS');
  //   if (walletAddress == true) {
  //     setAccount("null");
  //   } 
    
  // },[]);

  useEffect(() => {
    const walletAddress = window.localStorage.getItem('WALLET_ADDRESS');
    if (walletAddress !== "undefined") {
      setAccount(walletAddress);
      connectWallet(true).then(console.log('Connect wallet done.'));
    } 
    
  },[]);

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    provider // required
  });

  const connectWallet = async (existingWallet) => {
    try {
      const provider = await web3Modal.connect();
      // const provider = new ethers.providers.WebSocketProvider(mumbaiwss);
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);

      if (existingWallet == false) {
        if (accounts) {
          setAccount(accounts[0]);
          window.localStorage.setItem('WALLET_ADDRESS', accounts[0]);
        }
      }
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  // useEffect(() => {
  //   if (web3Modal.cachedProvider) {
  //     connectWallet();
  //   }
  // }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) {
          setAccount(accounts[0]);
          window.localStorage.setItem('WALLET_ADDRESS', accounts[0]);
        }

      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider,account]); 

  //   const account2 = true;
  return(
    <Main>
      <Container>
        {
          account == null ? (
            <Typography variant="h1" marginBottom={6} align={"center"} padding={10}>
              Connect your wallet to see your current stakes
            </Typography>

          ) : (
            
            <Box>
              <Typography variant="h2" marginBottom={6}>
                My Current Stakes
              </Typography>
              <UserGlobalStakeList/>
            </Box>
          )
        }
        
      </Container>

    </Main>
  );
};
export default MyStakes;