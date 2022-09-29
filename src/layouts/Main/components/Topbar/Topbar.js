import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { alpha, useTheme} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { SimpleNavItem } from './components';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import Web3Modal from 'web3modal';
import '@ethersproject/shims';
import {ethers} from 'ethers';
// import WalletConnectProvider from '@walletconnect/web3-provider';
// eslint-disable-next-line
import { useState, useEffect } from 'react';

// NavItem has popover function instead of SimpleNavItem

const Topbar = ({ onSidebarOpen, pages, colorInvert = false }) => {

  const mumbaiwss = 'wss://polygon-mumbai.g.alchemy.com/v2/MFd0LBZozOhdiLbJPopgwAMbqIxeZSC7';
  
  var provider;
  if(window.ethereum){
    const provider = new ethers.providers.WebSocketProvider(mumbaiwss);
  }

  const [provids, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    provider // required
  });

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
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
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
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
  }, [provider]);

  const {
    // eslint-disable-next-line

    testing: testPage,
    about: aboutPage,
    // bounties: bountiesPage
  } = pages;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
      sx={{mt:4}}
      
    >
      <Box
        display={'flex'}
        marginLeft={2}
        // component="a"
        // href="/home"
        // title="Saloon"
        // width={{ xs: 100, md: 120 }}
      >
        <Link

          height={1}
          width={1}
          fontFamily='Diplomata'
          variant={'h6'}
          color="inherit"
          underline="none"
          href='/'
        >
          Saloon
        </Link>
        <Typography 
          // align='center'
        >
          TESTNET 
        </Typography>
      </Box>
      
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>

        <Box marginLeft={4}>
          {/* <SimpleNavItem
            title={'Bounties'}
            id={'bounties-page'}
            items={bountiesPage}
            colorInvert={colorInvert}
          /> */}
          <Button href='/bounties' color='secondary' variant='outlined' sx={{borderRadius:0}} size='large'>
            BOUNTIES
          </Button>
        </Box>
        <Box marginLeft={4}>
          <SimpleNavItem
            title={'Docs'}
            id={'test-page'}
            items={testPage}
            colorInvert={colorInvert}
          />
        </Box>
        <Box marginLeft={4}>
          <SimpleNavItem
            title={'About'}
            id={'about-page'}
            items={aboutPage}
            colorInvert={colorInvert}
          />
        </Box>
        
        {
          !account ? (
          // Realised connect button on top is redundant
          // <Button onClick={connectWallet}>
          //   Connect
          // </Button>
            null
          ) : (
            // run if there (update this to something more fun)
            // figure out how to truncate this address
            <Box marginLeft={4}>
              <Typography>
                {truncateAddress(account)}
              </Typography>
            </Box>
            
          )
        }
        {/* <Button onClick={connectWallet}>
          Connect
        </Button> */}
        
        <Box marginLeft={4}>
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'} paddingX={4}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 0,
            minWidth: 'auto',
            padding: 1,
            // borderColor: alpha('primary', 0.2),
            borderColor: 'inherit'
          }}
          color='inherit'
      
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};

export default Topbar;
