import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';


import {
// eslint-disable-next-line
  Jobs
} from './components';

const Bounties = () => {
//   const theme = useTheme();
  useEffect(() => {
    document.title = "Bounties";
  }, []);
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