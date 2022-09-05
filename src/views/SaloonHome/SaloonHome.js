import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import Divider from '@mui/material/Divider';

import {
// eslint-disable-next-line
  Work, WorkH, Hero, Newsletter, About, CompanyValues, Reviews, HeroCareer, Process
} from './components';

const SaloonHome = () => {
  const theme = useTheme();
  return (
    <Main>
      <Box>
        <HeroCareer/>
      </Box>
      <Box
        sx={{
          // backgroundImage: `linear-gradient(90deg,${theme.palette.wildwest.wine} 50%, ${theme.palette.wildwest.darkbrown} 100%)`,
        }}
      >
        <Container>
          <Work/>
        </Container>
      </Box>
      <Box 
        sx={{
          // backgroundColor: theme.palette.wildwest.darkbrown,
          backgroundImage: `radial-gradient(${theme.palette.wildwest.darkbrown} 0%, ${theme.palette.wildwest.wine} 100%)`,

        }}
        // paddingTop={{xs:6}}
      >
        <Container 
        >
          <WorkH/>
        </Container>
      </Box>
      <Box>
        
        <Container>
          <Divider />
        </Container>
        <Container>
          <About/>
        </Container>
      </Box>
    </Main>
  );
};

export default SaloonHome;
