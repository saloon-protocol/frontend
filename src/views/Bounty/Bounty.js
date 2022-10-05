import React, {useEffect, useState} from 'react';
// import VisibilitySensor from 'react-visibility-sensor';
// import CountUp from 'react-countup';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WETH from '../../chain-info/WETH.json';
import MANAGER from '../../chain-info/Manager.json';
import Web3Modal from 'web3modal';
import { useSigner } from '@web3modal/react';
import { CardMedia } from '@mui/material';

import {
// eslint-disable-next-line
  Jobs, Rewards,InScope
} from './components';
import { ethers } from 'ethers';
// eslint-disable-next-line
import { useParams } from 'react-router-dom';

const Bounty = () => {
  const theme = useTheme();

  const {title} = useParams();
  
  const fetchData = async () => {
    // eslint-disable-next-line
    const res = await fetch(`https://portal.saloon.finance/api/v1/bounty?project=${title}`);
    const json = await res.json();
    console.log(json);
  
    return json;
  };


  const [bounty, setBounty] = useState([]);
  useEffect(() => {
    fetchData().then(bounty => {
      setBounty(bounty);
    });
  }, []);

  

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  
  // const polywss = 'wss://polygon-mainnet.g.alchemy.com/v2/QvRTaIZE9c0e1g_KlKSukPkBPFSKo4Du'
  // for some reason I cant hide my alchemy key
  const mumbaiwss = 'wss://polygon-mumbai.g.alchemy.com/v2/MFd0LBZozOhdiLbJPopgwAMbqIxeZSC7';

  // var provider = new ethers.providers.WebSocketProvider(mumbaiwss);
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
  const [allowance, setAllowance] = useState(null);

  const web3Modal = new Web3Modal({
    // network:"mumbai", // optional
    cacheProvider: false, // optional
    provider // required
  });

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      // const provider = new ethers.providers.WebSocketProvider(mumbaiwss);
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
  

  async function approveWETH(){
    const WETHAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'; //mumbai
    const WETHabi = WETH;
    const signer = await provider.getSigner();
    const manager = '0xbA2C02d5c59238d5607aDcbc277c80a51694e73F';
    const contract = new ethers.Contract(WETHAddress, WETHabi, signer);
    await contract.approve(manager,10000000);
  }

  async function transferWETH(){

    const WETHAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'; //mumbai
    const WETHabi = WETH;
    const signer = await library.getSigner();
    const message = 'Send 0.011 ETH';
    const manager = '0xbA2C02d5c59238d5607aDcbc277c80a51694e73F';
    // const defiPandaPool = '0x44bBCa2A3627544371B826C3300d0F7D1e68f9d3';
    // const signer = await library.provider.request({
    //   method: "personal_sign",
    //   params: [message, account]
    // });
    const contract = new ethers.Contract(WETHAddress, WETHabi, signer);
    const sendVal = ethers.utils.parseEther("0.0011");
    await contract.transfer(manager, 10000000);
  }

  const checkAllowance = async () => {
    const provider = new ethers.providers.WebSocketProvider(mumbaiwss);
    // // Should be token address used by bounty
    const WETHAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'; //mumbai
    const WETHabi = WETH;

    const manager = '0xbA2C02d5c59238d5607aDcbc277c80a51694e73F';
    // // my should be signers wallet
    const my = '0x0376e82258Ed00A9D7c6513eC9ddaEac015DEdFc';
    const contract = new ethers.Contract(WETHAddress, WETHabi, provider);
    const bountyAddress = '0x5eAF3aFD1038853D285cf4b2fAf8Ef288915f408';
    const allow = await contract.allowance(my,bountyAddress);
    let formattedAllowance = allow.toString();
    return formattedAllowance;
  };
  

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  // const switchNetwork = async () => {
  //   await window.ethereum.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [{
  //       // chainId: "0x89", // Polygon Mainnet
  //       chainId: "0x13881", // Mumbai Testnet
  //       // rpcUrls: ["https://polygon-rpc.com/"],
  //       // chainName: "Matic Mainnet",
  //       // nativeCurrency: {
  //       //   name: "MATIC",
  //       //   symbol: "MATIC",
  //       //   decimals: 18
  //       // },
  //       // blockExplorerUrls: ["https://polygonscan.com/"]
  //     }]
  //   });
  //   window.location.reload();
  // };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }]
      });
      handleNetwork(network);
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

  // const[chain, setChain] = useState();
  // const checkChainId = async() => {
  //   const signer = await provider.getSigner();
  //   const chainId = await signer.getChainId();
  //   const chain = chainId.toString();
  //   return chain;
  // };

  // useEffect(() => {
  //   checkAllowance().then(allowance => {
  //     setAllowance(allowance);
  //   });
  //   // checkChainId().then(id => {
  //   //   setChain(id);
  //   // });
  // });
 
 
  useEffect(() => {

    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
        
      };
      
      checkAllowance().then(allowance => {
        setAllowance(allowance);
      });

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

  const test = 1;
  // async function trackEvent(){
  //   // const WETHAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // ethereum
  //   const WETHAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'; //mumbai
  //   const WETHabi = WETH;
  //   const contract = new ethers.Contract(WETHAddress, WETHabi, provider);
  //   contract.on('Transfer',(src, dst, wad) => {
  //     console.log({wad});      
  //   }); 
  // }
  return (
    // pass wallet data to MAIN so wallet address shows when connected
    <Main> 
      
      <Container>
        <Grid container spacing={4}
          data-aos="fade-up"
          data-aos-delay={700}
          // data-aos-offset={600}
          data-aos-duration={700}
          
          display={'flex'}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Grid item xs={12} sm={6} >
            <Box display={'flex'} 
              // flexDirection={{ xs: 'row', sm: 'row' }} 
              flexDirection={'row'}
              
              marginBottom={4}
            >

              <Grid item xs={1} md={1} alignSelf={'center'}>
                <CardMedia 
                  // xs={1} md={1}
                  component="img"
                  // sx={{ backgroundImage:item.logo_url }}
                  src={bounty.logo_url}
                  alt="logo"
                >
                </CardMedia>
              </Grid>
              
              <Typography variant={'h3'}
                fontFamily={'Roboto Slab'}
                fontWeight={700} 
                // marginBottom={4} 
                marginLeft={2} 
              >
                {bounty.title}
              </Typography>
            </Box>
            <Typography color={'text.primary'} >
              {bounty.description}
              {/* {JSON.stringify(params)} */}
            </Typography>
          </Grid>

      
          <Grid item xs={12} sm={6}>
            <Rewards 
              data={bounty} 
              // chain_data={info}
            />
            {/* insert SUBMIT BUTTON HERE */}
            <Box paddingTop={1}>
              <Button fullWidth color='secondary'
                href='/bounty'  
                variant='outlined' 
                sx={{borderRadius:0, paddingY:4}} 
                size='large'
                
              >
                SUBMIT BUG
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container marginTop={-5}>
        <Box>
          <Typography variant={'h6'} fontWeight={400} marginBottom={1}  >
            Bounty Staking Pool
          </Typography>
          <Box
            container
            sx={{backgroundColor: theme.palette.alternate.main}}
            // justifyContent={{ sm: 'space-between', md:'space-between' }}
            // xs={12} 
            // md={12}

          > 
            <Box padding={2} 
              // display={'flex'} 
              // alignItems={'center'}
            >
              <Grid container 
                // display={'space-between'}
                // flexDirection={{ xs: 'column', sm: 'row' }}
                // flex={'1 1 50%'}
                justifyContent='space-between'
                alignItems='center'

              >
                <Grid item marginLeft={2}
                  // xs={12} 
                  // md={6}
                >
                  <Typography 
                    variant='h5'
                    fontWeight={700}
                    sx={{textTransform:'uppercase'}}
                  >
                    {/* {info.apy}% APY */}
                    {bounty.pool_apy}% APY
                  </Typography>
                  
                </Grid>
                <Grid item direction="row" display={'flex'} alignItems="center"
                  // xs={12} 
                  // md={6}
                >
                  <Grid item alignItems="center">
                    <Typography color={'text.primary'} fontSize='small'>
                       Staked
                    </Typography>
                    <Typography color={'text.primary'} variant='h5'
                      fontWeight={700}
                    >
                      {/* ${info.staked} /  */}
                      {formatter.format(bounty.pool_total * 2500000 / 10**18)} /
                      {/* $60,000 /  */}
                    </Typography>
                  </Grid>
                  <Grid item marginLeft={1}>
                    <Typography color={'text.primary'} fontSize='small'>
                      Pool Cap
                    </Typography>
                    <Typography color={'text.primary'} variant='h5' 
                      fontWeight={700}
                    >
                      {/* ${info.poolCap} */}
                      $100,000
                      {/* $100,000 */}
                    </Typography>

                  </Grid>
                  
                  
                
                </Grid>

                <Grid item marginRight={2}
                  // xs={12} 
                  // md={6}
                >   
                  {
                    // if wallet is not connected
                    account == null ? (
                      // run if null
                      <Button onClick={connectWallet} // CHANGE THIS TO STAKING FUNCTION
                        color="secondary"
                        variant="outlined"
                        size="large"
                        sx={{ borderRadius: 0 }}
                        fullWidth
                      >
                        CONNECT TO STAKE
                      </Button>
                    ) : (
                      <Box>
                        {
                          // if chain is not polygon
                          // chain == 137 ? (
                          // if chain is not Mumbai
                          chainId == 80001 ? ( 
                            <Box>
                              {
                                // if staking hasnt been allowed
                                allowance > 0 ? (
                                  <Grid direction="column" alignItems="center">
                                    <Grid item color={'text.primary'} fontSize='medium' marginBottom={1}>
                                      <Button onClick={transferWETH} // CHANGE THIS TO STAKING FUNCTION
                                        color="secondary"
                                        variant="outlined"
                                        size="large"
                                        sx={{ borderRadius: 0 }}
                                        fullWidth
                                      >
                                        STAKE
                                      </Button>
                                    </Grid>

                                    <Grid item xs={6}>
                                      <Button
                                        color="inherit"
                                        variant="outlined"
                                        size="large"
                                        sx={{ borderRadius: 0 }}
                                        fullWidth
                                        // onClick={}  IMPLEMENT THIS FUNCTION
                                      >
                                        <Typography marginX={2}>
                                          UNSTAKE
                                        </Typography>
                                            
                                      </Button>
                                    </Grid>
                                  </Grid>
                                
                                ) : (
                                  // if not approved show approve button
                                  <Button onClick={approveWETH} // CHANGE THIS TO APPROVE FUNCTION
                                    color="inherit"
                                    variant="outlined"
                                    size="large"
                                    sx={{ borderRadius: 0 }}
                                    fullWidth
                                  >
                                    APPROVE STAKING
                                  </Button>
                                  
                                  
                                )
                              }
                            </Box> 
                          ) : (
                            <Button onClick={switchNetwork} // CHANGE THIS TO APPROVE FUNCTION
                              color="inherit"
                              variant="outlined"
                              size="large"
                              sx={{ borderRadius: 0 }}
                              fullWidth
                            >
                              SWITCH TO POLYGON
                            </Button>

                          )
                        }
                      </Box>       
                    
                    )
                  }

                
                </Grid>
              </Grid>
              
            </Box>
          
              
          </Box>
        </Box>
        {/* <Button onClick={trackEvent}>
          Test
        </Button> */}
          
      </Container>

      <Box sx={{
        // backgroundImage
        // backgroundImage: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.alternate.main} 100%)`
      }}>
        
        <Container sx={{backgroundColor: theme.palette.background.paper}} >
          <Typography variant={'h4'} fontWeight={700} marginBottom={4}  >
            Project Overview
          </Typography>
          <Typography color={'text.primary'} >
            {bounty.description}
          </Typography>
        </Container>

        <Container >
          <Box>
            <Typography variant={'h4'} fontWeight={700} marginBottom={4}  >
              Assets in Scope
            </Typography>
            <InScope data={bounty}/>
          </Box>
          
        </Container>

        <Container  sx={{backgroundColor: theme.palette.background.paper}} >
          <Typography variant={'h4'} fontWeight={700} marginBottom={4}  >
            Assets Out of Scope
          </Typography>
          <Typography variant={'body1'} fontWeight={400} >
            Assets out of scope.
          </Typography>
        </Container>
      </Box>

    </Main>

  );
};



export default Bounty;