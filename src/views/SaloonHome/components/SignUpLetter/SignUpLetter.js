import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const SignUpLetter = () => {
  return (
    <Box >

      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        marginBottom={8}
      >

        <Grid item>
          <Typography fontWeight={700} variant={'h4'} align={'center'} marginBottom={2}>
            Sign up for Postage
          </Typography>
          <Typography variant={'h6'} align={'center'} color="text.secondary">
            Count on our pony express to keep you in the loop 
            <br />
            with the most recent bounties
            and news in the wildwest of Web3.
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Button 
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 0,textTransform: 'uppercase'}}
            fullWidth
            href='https://mailchi.mp/47ae7c35bae0/saloon-finance-pre-launch'
            target='blank'
          >
            Sign Up
          </Button>
        </Grid>

      </Grid>
      <Divider/>
    </Box>

  );
};
export default SignUpLetter;