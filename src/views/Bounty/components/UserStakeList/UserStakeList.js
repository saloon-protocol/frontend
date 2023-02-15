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
// import USDCABI from '../../chain-info/USDC.json';
// import SALOONCHEFABI from '../../chain-info/Saloon.json';
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

// import {
//   // eslint-disable-next-line
//   Jobs, Rewards, InScope, Impacts
// } from './components';
import { ethers } from 'ethers';
// eslint-disable-next-line
import { useParams } from 'react-router-dom';
import { constants } from 'buffer';


const stakeMock = [
  {
    
    picture: 'Pic',
    protocolName: 'Protocol X',
    amount: 100,
    tokenId: '1',
    apy: '50',
  },
  {
    
    picture: 'Pic',
    protocolName: 'Protocol Z',
    amount: 1000,
    tokenId: '2',
    apy: '69',
  }];

const UserStakeList = () => {
  const theme = useTheme();
  return(
    <Box>
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
            // data-aos="fade-down"
            // data-aos-delay={i * 300}
            // data-aos-offset={100}
            // data-aos-duration={300}


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

                  <Typography variant={'h6'} fontWeight={700}
                    // paddingBottom={{ xs: 1 }}
                  >

                    #ID {item.tokenId}

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
                      <Typography variant='caption'>
                        Stake Amount
                      </Typography>
                    </Box>
            
                    <Typography variant='h6'>
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
                    
                    <Typography variant='h6'>
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
                      sx={{ borderRadius: 0 }}
                    //   fullWidth
                    // onClick={}  IMPLEMENT THIS FUNCTION
                    >
                      <Typography>
                        CLAIM
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
    </Box>
  );
};
export default UserStakeList;