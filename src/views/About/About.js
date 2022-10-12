import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import shop from './shop.jpg';
import Main from 'layouts/Main';
import Container from 'components/Container';

const About = () => {


  const theme = useTheme();
  return (
    <Main>
      <Container>
        <Box marginBottom={4}>
          <Typography
            align={'center'}
            color={'text.secondary'}
            sx={{ textTransform: 'uppercase' }}
            variant={'subtitle2'}
            fontWeight={600}
            marginBottom={2}
          >
            About
          </Typography>
          <Box marginBottom={2}>
            <Typography fontWeight={700} variant={'h4'} align={'center'}
              marginBottom={2}
            >
              What is the Saloon?
            </Typography>
            <Typography color={theme.palette.wildwest.grey}>
                Saloon Finance (aka The Saloon) is a next-gen bug bounty platform. 
                A bug bounty platform (BBP) is a necessary tool in order to facilitate 
                the hosting of bug bounties on a codebase. Bug bounties allow hackers to 
                responsibly disclose code vulnerabilities to the project team for a monetary reward, instead of performing the exploit. 
                BBPs have been around for some time and serve as a crucial last line of defense for many protocols.           
              <br />
              <br />
                Most importantly, the Saloon is a fair and transparent BBP that custodies all funds for bounty payouts.            <br />
            </Typography>
          </Box>
          
          <Typography fontWeight={700} variant={'h4'} align={'center'}>
            Why was the Saloon built?
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid
            item
            container
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            xs={12}
            md={6}
          >
            <Typography color={theme.palette.wildwest.grey}>
              Millions keep getting hacked week after week in Web3. Inverstors and users keep shying away 
              from the industry fearing they will lose their money to hackers.
              After hunting for bugs on different bug bounty platforms many times it became obvious the security provided by them is, at the very least, questionable and judging by the ongoing number of hacks, definitely not enough.
              <br />
              <br />
              This frustration with the State of the Art of web3 security led to the creation of the 
              Saloon. A new concept for a Bug Bounty Platform to perpetually enhance the Web3 security landscape.
              <br />
              <br />
              
            </Typography>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Typography color={theme.palette.wildwest.grey}>
            
              First and foremost, we aim to secure the web3 space. We strongly believe that current Bug Bounty platforms are 
              mostly a PR stunt and many times actually do a disservice to the security of protocols, and by extension, investor and user funds.
              <br />
              <br />
              Our plan consists of offering the protocols that are actually serious about security a way to show their commitment.
              <br />
              <br />
              We want to raise the bar so security can`t be faked. 
              We want to make it as clear as a Caribbean lagoon who is serious and can be trusted in this industry.
              <br />
              <br />
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sx={{
              '& .lazy-load-image-background.lazy-load-image-loaded': {
                width: '100%',
                height: '100%'
              }
            }}
            paddingY={4}
            
          >
            <Box
              component={LazyLoadImage}
              height={1}
              width={1}
              maxHeight={{ xs: 300, sm: 400, md: 520 }}
              borderRadius={2}
              src={shop}
              alt={'...'}
              effect={'blur'}
              // paddingY={4}
            
              sx={{
                objectFit: 'cover',
                filter: 'brightness(0.6)'
              }}
            />
            
          </Grid>
        </Grid>
      </Container>
    </Main>
  );
};

export default About;
