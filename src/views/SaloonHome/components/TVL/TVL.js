import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const TVL = () => {
  return (
    <Box >

      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        marginBottom={4}
      >

        <Grid item md={12}>
          <Box alignItems="center" display="flex">
            <Typography fontWeight={700} variant={'h1'} align={'center'} marginBottom={2} paddingX={2}>
              $5,500
            </Typography>
            <Typography variant={'h6'} align={'right'} color="text.secondary">
              available in bounties.
            </Typography>
          </Box>
          <Typography variant={'h6'} align={'center'} color="text.secondary" sx={{fontStyle: 'italic'}}>
            All funds under custody.
          </Typography>
        </Grid>
        
        <Grid item md={12} // place holder for future additions like premiums and bounties paid 
        >
        </Grid>

      </Grid>
      <Divider/>
    </Box>

  );
};
export default TVL;