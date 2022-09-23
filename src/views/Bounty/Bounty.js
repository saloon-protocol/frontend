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
// import WETH from '../../chain-info/WETH.json';
import {
// eslint-disable-next-line
  Jobs, Rewards,InScope
} from './components';
// import { ethers } from 'ethers';
// import { use } from '@maticnetwork/maticjs';
// import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers';
// install ethers plugin
// use(Web3ClientPlugin);


const fetchData = async () => {
  const res = await fetch('https://0xdjango.pythonanywhere.com/api/v1/bounty?project=defi%20panda');
  const json = await res.json();
  // console.log(json);
  return json;
};



const Bounty = () => {
  const theme = useTheme();
  // for some reason I cant hide my alchemy key
  // const provider = new ethers.providers.WebSocketProvider('wss://polygon-mainnet.g.alchemy.com/v2/QvRTaIZE9c0e1g_KlKSukPkBPFSKo4Du');
  
  // const signer = provider.getSigner();
  // async function trackEvent(){
  //   // const WETHAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  //   const WETHAddress = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';

  //   const WETHabi = WETH;
  //   const contract = new ethers.Contract(WETHAddress, WETHabi, provider);
  //   contract.on('Transfer',(src, dst, wad) => {
  //     console.log({wad});
  //     transfers += wad;
      
  //   }); 

  // }
  
  const [bounty, setBounty] = useState([]);
  useEffect(() => {
    fetchData().then(bounty => {
      setBounty(bounty);
    });
  }, []);

  return (
    
    <Main>

      <Container>
        <Grid container spacing={4}>
          <Grid item xs={6} >
            <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} alignItems='baseline'>
              <Typography variant={'h5'} fontWeight={700} marginRight={1} >
                LOGO
              </Typography>
              <Typography variant={'h3'} fontWeight={700} marginBottom={4} >
                {bounty.title}
              </Typography>
            </Box>
            <Typography color={'text.primary'} >
              {bounty.description}
            </Typography>
          </Grid>

      
          <Grid item xs={6}>
            <Rewards data={bounty}/>
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
                    {bounty.apy} APY
                    
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

        {/* <Container >
          <Box>
            <InScope data={bounty}/>
          </Box>
          
        </Container> */}

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