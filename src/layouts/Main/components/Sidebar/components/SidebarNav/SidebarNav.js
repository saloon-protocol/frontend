import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
import { Link } from '@mui/material';
// import NavItem from './components/NavItem';
import { SimpleNavItem } from './components';


const SidebarNav = ({ pages }) => {
  // const theme = useTheme();
  // const { mode } = theme.palette;

  const {
    docs: docsPage,
    about: aboutPage,
  } = pages;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          // component="a"
          href="/"
          title="theFront"
          width={{ xs: 100, md: 120 }}
        >
          <Link
            height={1}
            width={1}
            fontFamily='Diplomata'
            variant={'h6'}
            color="white"
            underline='none'
            href='/'
            // component='a'
          >
            Saloon
          </Link>
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box paddingY={1}>
          <SimpleNavItem
            title={'Docs'}
            id={'docs-page'}
            items={docsPage}
          />
        </Box>
        <Box>
          <SimpleNavItem
            title={'About'}
            id={'about-page'}
            items={aboutPage}
          />
        </Box>

        <Box marginTop={2}>
        </Box>
        <Box marginTop={2}>
          <Button href='/bounties' 
            color='secondary' variant='contained' sx={{borderRadius:0}} size='large'
            fullWidth
          >
            BOUNTIES
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
};

export default SidebarNav;
