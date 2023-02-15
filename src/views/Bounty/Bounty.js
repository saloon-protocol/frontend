import React, { useEffect, useState } from 'react';
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
import USDCABI from '../../chain-info/USDC.json';
import SALOONCHEFABI from '../../chain-info/Saloon.json';
import Web3Modal from 'web3modal';
import { useSigner } from '@web3modal/react';
import { CardMedia } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import Countdown from 'react-countdown';
import CircularProgress from '@mui/material/CircularProgress';
import CountUp from 'react-countup';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import {
  // eslint-disable-next-line
  Jobs, Rewards, InScope, Impacts, UserStakeList
} from './components';
import { ethers } from 'ethers';
// eslint-disable-next-line
import { useParams } from 'react-router-dom';
import { constants } from 'buffer';

const Bounty = () => {
  const theme = useTheme();
  const { title } = useParams();
  useEffect(() => {
    document.title = "Bounty";
  }, []);

  const containerRef = React.useRef(null);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span style={{ color: '#BB9725' }}>NOW!</span>;
    } else {
      // Render a countdown
      return <Typography>in&nbsp;<span style={{ color: '#BB9725' }}>{days}d, {hours}h, {minutes}m, {seconds}s</span></Typography>;
    }
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [saloonChef, setSaloonChef] = useState('0x5088CE3706104d36DD3083B63e98b162C3f89A38');
  const [pid, setPid] = useState(-1);
  const USDCAddress = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'; // BSC
  // const USDCAddress = '0xA451b801aB64744A51ebdA169D1bEA9c023D8028'; // Testnet SUSDC
  const [dataReturned, setDataReturned] = useState(false);

  const fetchData = async () => {
    // eslint-disable-next-line
    const res = await fetch(`https://portal.saloon.finance/api/v1/bounty?project=${title}`);
    var json = await res.json();
    setDataReturned(true);
    return json;
  };

  var temp = 0;
  const [bounty, setBounty] = useState([]);
  const [userStaked, setUserStaked] = useState(0);
  const [userTimelockTimestamp, setUserTimelockTimestamp] = useState(0);
  const [userTimelockAmount, setUserTimelockAmount] = useState(0);
  const [account, setAccount] = useState();
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const [allowance, setAllowance] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeAmountVisibility, setStakeAmountVisibility] = useState(false);
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [unstakeAmountVisibility, setUnstakeAmountVisibility] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const [claimPending, setClaimPending] = useState(false);

  useEffect(() => {
    fetchData().then(bounty => {
      setBounty(bounty);
      setPid(bounty.pid);
      getUserInfo(pid);
    });
  }, [userStaked, pid]);

  useEffect(() => {
    const walletAddress = window.localStorage.getItem('WALLET_ADDRESS');
    if (walletAddress !== "undefined") {
      setAccount(walletAddress);
      connectWallet(true).then(console.log('Connect wallet done.'));
    }
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

  const web3Modal = new Web3Modal({
    // network:"mumbai", // optional
    cacheProvider: false, // optional
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


  async function approveUSDC() {
    const provider = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(provider);
    const maxInt = ethers.constants.MaxUint256; // Will pass into solidity as uint 2**256 - 1
    const signer = await library.getSigner();
    const contract = new ethers.Contract(USDCAddress, USDCABI, signer);
    const tx = await contract.approve(saloonChef, maxInt);
    setAmountVisibilities(false, false);
    setTransactionPending(true);
    setAmounts("", "");
    const receipt = await tx.wait();
    if (receipt.status) {
      console.log(`Transaction receipt : https://bscscan.com/tx/${receipt.logs[1].transactionHash}\n`);
      setAllowance(maxInt);
      setTransactionPending(false);
      fetchData().then(bounty => {
        setBounty(bounty);
        temp += 1;
      });
    }
  }

  const setAmountVisibilities = async (stake, unstake) => {
    setStakeAmountVisibility(stake);
    setUnstakeAmountVisibility(unstake);
    setAmounts("", "");
  };

  const setAmounts = async (stake, unstake) => {
    setStakeAmount(stake);
    setUnstakeAmount(unstake);
  };


  async function stake(amount) {
    console.log('Stake', pid, amount);
    const signer = await library.getSigner();
    const contract = new ethers.Contract(saloonChef, SALOONCHEFABI, signer);
    amount = ethers.utils.parseEther(amount);
    const tx = await contract.stake(pid, account, amount);
    setAmountVisibilities(false, false);
    setTransactionPending(true);
    setAmounts("", "");
    const receipt = await tx.wait();
    if (receipt.status) {
      console.log(`Transaction receipt : https://bscscan.com/tx/${receipt.logs[1].transactionHash}\n`);
      setTransactionPending(false);
      fetchData().then(bounty => {
        // console.log(bounty);
        setBounty(bounty);
        temp += 1;
        getUserInfo(pid);
      });
    }
  }

  async function claimPremium() {
    console.log('Claim Premium', pid);
    const signer = await library.getSigner();
    const contract = new ethers.Contract(saloonChef, SALOONCHEFABI, signer);
    const tx = await contract.claimPremium(pid);
    setAmountVisibilities(false, false);
    setClaimPending(true);
    setAmounts("", "");
    const receipt = await tx.wait();
    if (receipt.status) {
      setClaimPending(false);
      alert(`[Success] Txn receipt: https://bscscan.com/tx/${receipt.logs[1].transactionHash}\n`);
    }
  }


  async function scheduleUnstake(amount) {
    console.log('Schedule Unstake', pid, amount);
    const signer = await library.getSigner();
    const contract = new ethers.Contract(saloonChef, SALOONCHEFABI, signer);
    amount = ethers.utils.parseEther(amount);
    const tx = await contract.scheduleUnstake(pid, amount);
    setAmountVisibilities(false, false);
    setTransactionPending(true);
    setAmounts("", "");
    const receipt = await tx.wait();
    if (receipt.status) {
      console.log(`Transaction receipt : https://bscscan.com/tx/${receipt.logs[1].transactionHash}\n`);
      setTransactionPending(false);
      fetchData().then(bounty => {
        // console.log(bounty);
        setBounty(bounty);
        temp += 1;
        getUserInfo(pid);
      });
    }
  }

  async function unstake(amount) {
    console.log('Unstake', pid, amount);
    const signer = await library.getSigner();
    const contract = new ethers.Contract(saloonChef, SALOONCHEFABI, signer);
    amount = ethers.utils.parseEther(amount);
    const tx = await contract.unstake(pid, amount);
    setAmountVisibilities(false, false);
    setTransactionPending(true);
    setAmounts("", "");
    const receipt = await tx.wait();
    if (receipt.status) {
      console.log(`Transaction receipt : https://bscscan.com/tx/${receipt.logs[1].transactionHash}\n`);
      setTransactionPending(false);
      fetchData().then(bounty => {
        // console.log(bounty);
        setBounty(bounty);
        temp += 1;
        getUserInfo(pid);
      });
    }
  }


  const checkAllowance = async () => {
    // // Should be token address used by bounty
    const signer = await library.getSigner();
    const contract = new ethers.Contract(USDCAddress, USDCABI, signer);
    const allow = await contract.allowance(account, saloonChef);
    console.log('Allowance Local:' + allow);
    setAllowance(allow);
  };

  const getUserInfo = async (pid) => {
    if (pid == -1) return;
    await delay(3000);
    const signer = await library.getSigner();
    const contract = new ethers.Contract(saloonChef, SALOONCHEFABI, signer);
    (async () => {
      const userInfoLocal = await contract.viewUserInfo(pid, account);
      setUserStaked(ethers.utils.formatEther(userInfoLocal[0]));
      if (userInfoLocal[2] > 0) {
        setUserTimelockTimestamp(userInfoLocal[3] * 1000);
        setUserTimelockAmount(ethers.utils.formatEther(userInfoLocal[2]));
      } else {
        setUserTimelockTimestamp(0);
        setUserTimelockAmount(0);
      }
    })();
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleStakeInputChange = (e) => {
    const stake_msg = e.target.value;
    setStakeAmount(stake_msg);
  };

  const handleUnstakeInputChange = (e) => {
    const unstake_msg = e.target.value;
    setUnstakeAmount(unstake_msg);
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
    console.log('Attempting switch...');
    const provider = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(provider);
    const network = await library.getNetwork();

    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }]
        // params: [{ chainId: "0x61" }]
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
        if (accounts) {
          setAccount(accounts[0]);
          window.localStorage.setItem('WALLET_ADDRESS', accounts[0]);
        }

      };

      checkAllowance();

      getUserInfo(pid);

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
  }, [provider, account]);

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
        {/* <Alert
          severity="warning"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Pre-Bounty is live! Please note that the reward $ amounts are for demo purposes only. Rewards for findings can be found here: https://discord.gg/CFSkjaKwbq
        </Alert> */}
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
                href={'http://portal.saloon.finance/new-submission?project=' + title}
                variant='outlined'
                sx={{ borderRadius: 0, paddingY: 4 }}
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
            sx={{ backgroundColor: theme.palette.alternate.main }}
            // justifyContent={{ sm: 'space-between', md:'space-between' }}
            // xs={12} 
            // md={12}

          >
            <Box padding={2}
            // display={'flex'} 
            // alignItems={'center'}
            >
              <Grid
                container
                display='flex'
                flexDirection={{ xs: 'column', lg: 'row' }}
                // flex={'1 1 50%'}
                justifyContent='space-between'
                alignItems='center'
                // spacing={4}

              >
                <Grid item marginLeft={2} lg={3} xs={12} alignItems="left"
                  marginBottom={{ xs: 6, lg: 0 }}
                >
                  <Typography
                    // variant={{lg:'h5', xs:'h5'}}
                    fontSize={{ lg: 30, xs: 35 }}
                    fontWeight={700}
                    sx={{ textTransform: 'uppercase' }}

                  >
                    {/* {info.apy}% APY */}
                    {bounty.pool_apy}% APY
                  </Typography>

                </Grid>
                <Grid direction="column"
                  justifyContent={'center'}
                  alignItems="center" marginBottom={{ xs: -6, lg: 0 }}>
                  <Grid item direction="row" display={'flex'} alignItems="center" xs={12}
                    lg={4}
                  // md={6}
                  >
                    {claimPending ? <CircularProgress color="secondary" style={{ marginLeft: '6%', maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px', marginTop: '-15%' }} /> :
                      <Button onClick={() => { claimPremium(); }} // CHANGE THIS TO STAKING FUNCTION
                        color="secondary"
                        variant="outlined"
                        size="small"
                        style={{ maxWidth: '60px', maxHeight: '30px', minWidth: '60px', minHeight: '30px', marginTop: '-15%' }}
                        sx={{ borderRadius: 0 }}
                      >Claim!
                      </Button>
                    }
                  </Grid>
                  <Grid item direction="row" display={'flex'} alignItems="center" xs={12}
                    lg={4}
                  // md={6}
                  >
                    <Grid item alignItems="right">
                      <Typography color={'text.primary'} fontSize='small'>
                        Your Stake
                      </Typography>
                      <Typography color={'text.primary'} variant='h5'
                        fontWeight={700}
                      >
                        {/* ${info.staked} /  */}
                        {/* {formatter.format(userStaked * 10 ** 18)} /   */}
                        <CountUp
                          duration={2}
                          separator=','
                          end={userStaked}
                          start={0}
                          prefix={'$'}
                        // decimals = {3}
                        /> /
                        {/* $60,000 /  */}
                      </Typography>
                    </Grid>
                    <Grid item alignItems="center" marginLeft={1}>
                      <Typography color={'text.primary'} fontSize='small'>
                        Total Staked
                      </Typography>
                      <Typography color={'text.primary'} variant='h5'
                        fontWeight={700}
                      >
                        {/* ${info.staked} /  */}
                        <CountUp
                          duration={2}
                          separator=','
                          end={bounty.pool_staked}
                          start={0}
                          prefix={'$'}
                        // decimals = {3}
                        /> /
                        {/* $60,000 /  */}
                      </Typography>
                    </Grid>
                    <Grid alignItems="center" item marginLeft={1}>
                      <Typography color={'text.primary'} fontSize='small'>
                        Pool Cap
                      </Typography>
                      <Typography color={'text.primary'} variant='h5'
                        fontWeight={700}
                      >
                        {/* ${info.poolCap} */}
                        {formatter.format(bounty.pool_cap)}
                        {/* $100,000 */}
                      </Typography>

                    </Grid>

                  </Grid>
                  {userTimelockTimestamp > 0 ?
                    <Grid item direction="row" display={'flex'} alignItems="center" marginTop={2} xs={4}>
                      You have <span style={{ color: '#BB9725' }}>&nbsp;${userTimelockAmount} USDC&nbsp;</span> to unstake&nbsp;<Countdown date={userTimelockTimestamp} renderer={countdownRenderer} />
                    </Grid> : null
                  }

                </Grid>

                <Grid item marginRight={2} xs={12} lg={0.5}>
                </Grid>

                <Grid item direction="row" fontSize='medium' marginRight={-2} lg={1.5}
                  marginBottom={1}
                  xs={12}
                  ref={containerRef}
                >
                  {stakeAmountVisibility == true ? <Slide direction="left" in={stakeAmountVisibility} container={containerRef.current}><TextField
                    id="stake-input"
                    label="USDC"
                    onChange={handleStakeInputChange}
                    value={stakeAmount}
                    color="secondary"
                  >
                  </TextField></Slide> : <div><br></br><br></br><br></br></div>}

                  {unstakeAmountVisibility == true ? <Slide direction="left" in={unstakeAmountVisibility} container={containerRef.current}><TextField
                    id="unstake-input"
                    label="USDC"
                    onChange={handleUnstakeInputChange}
                    value={unstakeAmount}
                    // color='warning'
                    inputProps={{ style: { color: 'white' } }}
                  >
                  </TextField></Slide> : <div><br></br><br></br></div>}
                </Grid>

                <Grid item marginRight={2} xs={12} lg={2}
                // xs={12} 
                // md={6}
                >
                  {
                    // if wallet is not connected
                    account == null ? (
                      // run if null
                      <Button onClick={() => connectWallet(false)} // CHANGE THIS TO STAKING FUNCTION
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
                          // BNB TEST 97
                          // BNB MAIN 56
                          chainId == 56 ? (
                            <Box>
                              {
                                // if staking hasnt been allowed
                                transactionPending ? <CircularProgress color="secondary" style={{ marginLeft: "auto" }} /> :
                                  allowance > 0 ? (
                                    <Grid direction="column" alignItems="center">
                                      <Grid item color={'text.primary'} fontSize='medium' marginBottom={1}>
                                        <Button onClick={() => { stakeAmount > 0 ? stake(stakeAmount) : setAmountVisibilities(true, false); }} // CHANGE THIS TO STAKING FUNCTION
                                          color="secondary"
                                          variant="outlined"
                                          size="large"
                                          sx={{ borderRadius: 0 }}
                                          fullWidth
                                        >
                                          <Typography marginX={2}
                                            fontWeight={700}
                                            marginY={1}
                                          >
                                            STAKE
                                          </Typography>
                                        </Button>
                                      </Grid>

                                      {userTimelockTimestamp > 0 && userTimelockTimestamp <= Math.floor(Date.now() / 1000) ?
                                        <Grid item xs={6}>
                                          <Button onClick={() => { unstakeAmount > 0 ? unstake(unstakeAmount) : setAmountVisibilities(false, true); }}
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
                                        :
                                        <Grid item xs={6}>
                                          <Button onClick={() => { unstakeAmount > 0 ? scheduleUnstake(unstakeAmount) : setAmountVisibilities(false, true); }}
                                            color="inherit"
                                            variant="outlined"
                                            size="large"
                                            sx={{ borderRadius: 0 }}
                                            fullWidth
                                          // onClick={}  IMPLEMENT THIS FUNCTION
                                          >
                                            <Typography marginX={2}
                                              variant='body2'
                                              fontWeight={10}
                                            >
                                              SCHEDULE UNSTAKE
                                            </Typography>

                                          </Button>
                                        </Grid>}
                                    </Grid>

                                  ) : (
                                    // if not approved show approve button
                                    <Button onClick={() => approveUSDC()} // CHANGE THIS TO APPROVE FUNCTION
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
                              SWITCH TO BSC
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
        {
          account == null ? (
            // run if null
            <Box>

            </Box>
          ) : (
            <Box padding={1}> 
              <Typography variant='h6' marginBottom={1}>
                My Current Staking Positions 
              </Typography>
              <UserStakeList/>
            </Box>
            
          )
        }
        

      </Container>

      <Box sx={{
        // backgroundImage
        // backgroundImage: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.alternate.main} 100%)`
      }}>

        <Container sx={{ backgroundColor: theme.palette.background.paper }} >
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
              Impacts in Scope
            </Typography>
            <Impacts data={bounty} />
          </Box>

        </Container>

        <Container >
          <Box>
            <Typography variant={'h4'} fontWeight={700} marginBottom={4}  >
              Assets in Scope
            </Typography>
            <InScope data={bounty} />
          </Box>

        </Container>

        <Container sx={{ backgroundColor: theme.palette.background.paper }} >
          <Typography variant={'h4'} fontWeight={700} marginBottom={4}  >
            Out of Scope
          </Typography>
          <Box marginBottom={2}>
            <Typography variant={'h5'} fontWeight={600}
              marginBottom={1}
            >
              Impacts out of scope
            </Typography>
            <Typography
              // variant={'h6'} 
              fontWeight={400}
            >
              - List with impacts out of scope
            </Typography>
          </Box>
          <Divider />
          <Box marginBottom={2}>
            <Typography variant={'h5'} fontWeight={600}
              marginBottom={2}
              marginTop={2}

            >
              Assets out of scope
            </Typography>
            <Typography
              // variant={'h6'} 
              fontWeight={400}
            >
              - List with assets out of scope
            </Typography>

          </Box>
          <Divider />
          <Box >
            <Typography variant={'h5'} fontWeight={600}
              marginBottom={1}
              marginTop={2}
            >
              Known vulnerabilities
              <Tooltip title="Number represents UTC timestamp of which the vunerability was disclosed." placement="top-start">
                <IconButton>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography
              // variant={'h6'} 
              fontWeight={400}
            >
              {bounty.known_vulns?.map((item, i) => (
                "- (" + item.timestamp + ") " + item.description
              ))}
            </Typography>

          </Box>
        </Container>

      </Box>

    </Main>

  );
};



export default Bounty;