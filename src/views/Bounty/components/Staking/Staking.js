import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Main from 'layouts/Main';
// import Container from 'components/Container';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

// import Web3Modal from 'web3modal';

// import {ethers} from 'ethers';
// import ManagerProxy from '../../../../chain-info/abi/ManagerProxy.json';


const Staking = () => {
  const theme = useTheme();

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const [web3Provider, setWeb3Provider] = useState(null);
  // async function connectWallet() {
  //   try {
  //     let web3Modal = new Web3Modal({
  //       cacheProvider:false,
  //       provider,
  //     });
  //     const web3ModalInstance = await web3Modal.connect();
  //     const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
  //     if(web3ModalProvider){
  //       setWeb3Provider(web3ModalProvider);
  //     }
  //   } catch(error){
  //     console.error(error);
  //   }
  // }

  // async function viewBountyValue () {
  //   const managerAddress = '0x90e4184234fc97f8004E4f4C210CC6F45A11b4d7';
  //   const managerABI= ManagerProxy;
    
  //   const contract = new ethers.Contract(managerAddress, managerABI, provider);
  //   var bounty = await contract.viewProjectDeposit('YEEHAW');
  //   console.log('intial number', bounty.toString());

  // }
  

  return (

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
                X% APY
                
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
                  $10,000 / 
                </Typography>
              </Grid>
              <Grid item marginLeft={1}>
                <Typography color={'text.primary'} fontSize='small'>
                  Pool Cap
                </Typography>
                <Typography color={'text.primary'} variant='h5' 
                  fontWeight={700}
                >
                  $100,000
                </Typography>

              </Grid>
              
              
            
            </Grid>

            <Grid item marginRight={2}
              // xs={12} 
              // md={6}
            >
              <Grid direction="column" alignItems="center">
                <Grid item color={'text.primary'} fontSize='medium' marginBottom={1}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="large"
                    sx={{ borderRadius: 0 }}
                    // maxWidth={10}
                    // onClick={}
                    
                  >
                    <Typography marginX={4}>
                      STAKE
                    </Typography>
                      
                  </Button>
                </Grid>
              
                <Grid item xs={6}>
                  <Button
                    color="inherit"
                    variant="outlined"
                    size="large"
                    sx={{ borderRadius: 0 }}
                    fullWidth
                    // onClick={}
                  >
                    <Typography marginX={2}>
                      UNSTAKE
                    </Typography>
                        
                  </Button>
                </Grid>
              </Grid>
              
            
            </Grid>
          </Grid>
          
        </Box>
       
          
      </Box>
    </Box>

    
  );
};

export default Staking;