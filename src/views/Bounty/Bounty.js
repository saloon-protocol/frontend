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
  Jobs, Rewards,InScope,Staking
} from './components';
// import { ethers } from 'ethers';
// import { use } from '@maticnetwork/maticjs';
// import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers';
// install ethers plugin
// use(Web3ClientPlugin);


const fetchData = async () => {
  const res = await fetch('https://0xdjango.pythonanywhere.com/api/v1/bounty?project=defi%20panda');
  const json = await res.json();
  console.log(json);
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
              {bounty.subtitle}
            </Typography>
          </Grid>

      
          <Grid item xs={6}>
            <Rewards/>
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
        <Staking />
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
            Overview of the project, including what the project is about, main concerns and other things.
          </Typography>
        </Container>

        <Container >
          <Box>
            <InScope/>
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