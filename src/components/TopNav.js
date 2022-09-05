import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
// import ThemeModeToggler from 'components/ThemeModeToggler';

const TopNav = () => {
  // const theme = useTheme();
  return (
    <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
      <Box marginRight={{ xs: 1, sm: 2 }}>
        <Button
          sx = {{borderRadius:0}}
          variant="outlined"
          size="small"
          color="secondary"
          
        >
          <Typography 
            color="secondary"
            sx={{textTransform: 'uppercase'}}
          >
            Bounties
          </Typography>
        </Button> 
      </Box>
      <Box>
      </Box>
    </Box>
  );
};

TopNav.propTypes = {
  colorInvert: PropTypes.bool,
};

export default TopNav;
