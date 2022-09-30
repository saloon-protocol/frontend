import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import { Reviews } from '../../components';

const HeroCareer = () => {
  const theme = useTheme();


  return (
    <Box
      sx={{
        position: 'relative',
        // backgroundColor: theme.palette.wildwest.wine,
        backgroundImage: `radial-gradient(${theme.palette.wildwest.darkbrown} 0%, ${theme.palette.wildwest.wine} 100%)`,

        // backgroundImage: `linear-gradient(180deg, ${theme.palette.wildwest.wine} 10%, ${theme.palette.wildwest.darkbrown} 100%)`,
        marginTop: -17,
        paddingTop: 16,
      }}
    >
      <Container marginTop={{xs:0, sm:-4}}>
        <Box>
          <Box
            marginBottom={{ xs: 0, sm: 4 }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            
            <Typography
              variant="h1"
              gutterBottom
              align={'center'}
              sx={{
                fontWeight:900,
              }}

              

            >
            Welcome to the
            </Typography>
            <Typography
              variant="h1"
              align={'center'}
              color={'white'}
              gutterBottom
              sx={{ 
                fontFamily: 'Diplomata',
                // textShadowColor: 'rgba(#FC0, 1, 0, 0.75)',
                // textShadowColor: 'blue',
                // textShadowOffset: {width: 5, height: 5},
                // textShadowRadius: 10
              }}
            >
              Saloon
            </Typography>
           
            <Typography
              variant="h5"
              component="p"
              color="text.primary"
              align={'center'}
              sx={{ marginBottom: 1, fontWeight:900 }}
            >
              Next-Gen Bug Bounty Platform
              <br />
              <br />
              Only for those who take web3 security seriously.
            </Typography>

          </Box>
          <Reviews/>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroCareer;
