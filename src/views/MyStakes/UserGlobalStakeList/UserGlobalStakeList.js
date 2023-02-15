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
import USDCABI from '../../../chain-info/USDC.json';
import SALOONCHEFABI from '../../../chain-info/Saloon.json';
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
} from '../../Bounty/components';
import { ethers } from 'ethers';
// eslint-disable-next-line
import { useParams } from 'react-router-dom';
import { constants } from 'buffer';


const stakeMock = [
  {
    
    picture: 'Pic',
    protocolName: 'Protocol X',
    amount: 100,
    tokenId: '2411',
    apy: '50',
    claimable: '500'
  },
  {
    
    picture: 'Pic',
    protocolName: 'Protocol Z',
    amount: 1000,
    tokenId: '2843',
    apy: '69',
    claimable: '1400'
  }];

const UserGlobalStakeList = () => {
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

  const getAllTokensByOwner = async () => {
    // // Should be token address used by saloon
    const signer = await library.getSigner();
    const contract = new ethers.Contract(USDCAddress, USDCABI, signer); // CHANGE THIS TO SALOON DEPLOYMENT
    const tokens = await contract.getAllTokensByOwner(account); //MAKE A .MAP OUT OF THIS TO GET VALUES FOR EVERY TOKEN
    console.log('Allowance Local:' + allow);
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
  return(
    <Container>
      
      
      <Grid
        container
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 2,
        }}

      >
        {/* {bounties.filter(item=>item.title.toLowerCase().includes(query)).map((item, i) => ( */}
        {stakeMock.map((item, i) => (

          <Grid
            item
            xs={12}
            key={i}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              '&:last-child': {
                borderBottom: 0,
              },
            }}
            paddingY={4}
            data-aos="fade-down"
            data-aos-delay={i * 100}
            data-aos-offset={100}
            data-aos-duration={200}


          >
            <Grid
            // direction = "row"
            >
              <Grid container item padding={1}
                display={'flex'}
                alignItems={{xs:'left', sm:'center'}}
                flexDirection={{ xs: 'column', sm: 'row' }}
                // direction = "row"
                justifyContent="space-between"
                md={12}
                xs={12}
                // spacing={1}

              >
                <Grid item 
                  //   alignSelf={{xs:'center',sm:'center', md:'center'}} 
                  md={1}
                  sm={1}
                  xs={1}
                >
                  {/* <CardMedia
                    component="img"
                    sx={{ backgroundImage:item.logo_url }}
                    src={item.logo_url}
                    alt="logo"
                  >
                  </CardMedia> */}
                  <Typography>
                    {item.picture}
                  </Typography>

                </Grid>
                <Grid item marginBottom={{ xs: 1, sm: 0 }}
                //   paddingY={{ xs: 2 }}
                  md={2}
                >
                  <Typography variant={'caption'} 
                    // paddingBottom={{ xs: 1 }}
                  >

                    #ID {item.tokenId}

                  </Typography>

                  <Typography variant={'h6'} fontWeight={700}
                    // paddingBottom={{ xs: 1 }}
                  >
                    
                    {item.protocolName}

                  </Typography>

                  {/* <Typography color={'text.secondary'}> */}
                  {/* {item.description.substring(0,75).trim()}... */}
                  {/* {item.amount} */}
                  {/* </Typography> */}
                </Grid>
                

                <Grid item lg= {2} md={2} sm={2} xs={12}>
                  <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', sm: 'column' }}
                    // flex={'1 1 100%'}
                    // justifyContent={{ sm: 'space-between' }}
                    // alignItems={{ xs: 'left' }}
                  
                    fullWidth
                  >
                    <Box >
                      <Typography variant='caption' >
                        Stake Amount
                      </Typography>
                    </Box>
            
                    <Typography variant='h6' fontWeight={700}>
                      {/* {viewBounty(item.title)} */}
                      {/* {formatter.format(item.pool_payout)} */}
                      ${item.amount} USD
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={2} sm={2} xs={12} >
                  <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', sm: 'column' }}
                    // flex={'1 1 100%'}
                    justifyContent={{ sm: 'space-between' }}
                    alignItems={{ sm: 'left' }}

                  >
                    <Box>
                      <Typography variant='caption'>
                        Stake APY
                      </Typography>
                    </Box>
                    
                    <Typography variant='h6' fontWeight={700}>
                      {item.apy}%
                    </Typography>
                   
                  </Box>

                </Grid>

                <Grid item md={2} sm={2} xs={2} >
                  <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', sm: 'column' }}
                    // flex={'1 1 100%'}
                    justifyContent={{ sm: 'space-between' }}
                    alignItems={{ sm: 'left' }}
                    marginBottom={{xs: 1, sm: 0}}

                  >
                    
                    <Button 
                      color="inherit"
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 0, marginRight: 2 }}
                      //   fullWidth
                      onClick={switchNetwork}
                    >
                      <Typography 
                        // variant="caption"
                      >
                        CLAIM: ${item.claimable}
                        
                      </Typography>
                    

                    </Button>
                   
                  </Box>

                </Grid>

                <Grid item md={2} sm={2} xs={2} >
                  <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', sm: 'column' }}
                    // flex={'1 1 100%'}
                    justifyContent={{ sm: 'space-between' }}
                    alignItems={{ sm: 'left' }}

                  >
                    
                    <Button 
                      color="inherit"
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 0 }}
                    //   fullWidth
                    // onClick={}  IMPLEMENT THIS FUNCTION
                    >
                      <Typography>
                        UNSTAKE
                      </Typography>

                    </Button>
                   
                  </Box>

                </Grid>

              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default UserGlobalStakeList;