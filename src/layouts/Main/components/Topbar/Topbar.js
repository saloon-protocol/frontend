import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { alpha, useTheme} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { SimpleNavItem } from './components';
// import { Typography } from '@mui/material';
import { Link } from '@mui/material';
// import Web3Modal from 'web3modal';
// import {ethers} from 'ethers';
// import WalletConnectProvider from '@walletconnect/web3-provider';
// import { useState } from 'react';
// NavItem has popover function instead of SimpleNavItem

const Topbar = ({ onSidebarOpen, pages, colorInvert = false }) => {
  // const [web3Provider, setWeb3Provider] = useState(null);
  // const theme = useTheme();
  // const { mode } = theme.palette;
  const {
    // eslint-disable-next-line

    testing: testPage,
    about: aboutPage,
    // bounties: bountiesPage
  } = pages;


  // const providerOptions = {
  //   walletconnect: {
  //     package: WalletConnectProvider, // required
  //     options: {
  //       infuraId: {3: 'https://ropsten.infura.io/v3/c520361dc356433d881e7cb3a00193e7'}, // required
  //     },
  //   },
  // };
  

  // async function connectWallet() {
  //   try {
  //     let web3Modal = new Web3Modal({
  //       cacheProvider:false,
  //       providerOptions,
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
        {/* <Box marginLeft={4}>
          {
            web3Provider == null ? (
              // run if null
              <Button onClick={connectWallet}>
                Connect
              </Button>
            ) : (
              // run if there (update this to something more fun)
              <Typography>
                Connected
              </Typography>
            )
          }

        </Box> */}
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
