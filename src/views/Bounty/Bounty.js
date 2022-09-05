import React from 'react';
// import VisibilitySensor from 'react-visibility-sensor';
// import CountUp from 'react-countup';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
// eslint-disable-next-line
  Jobs, Rewards,InScope
} from './components';



const Bounty = () => {
  const theme = useTheme();

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
                Project Name
              </Typography>
            </Box>
            <Typography color={'text.primary'} >
              Quick description of what the project is about.
            </Typography>
          </Grid>

      
          <Grid item xs={6}>
            <Rewards/>
          </Grid>
        </Grid>
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