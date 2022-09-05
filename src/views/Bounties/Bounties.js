import React from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';


import {
// eslint-disable-next-line
  Jobs
} from './components';

const Bounties = () => {
//   const theme = useTheme();
  return (
    <Main>
      <Box>
        <Container>
          <Jobs/>
        </Container>
      </Box>
    </Main>
    


  );
};



export default Bounties;