import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import shop from './shop.jpg';
import Main from 'layouts/Main';
import Container from 'components/Container';
import Link from '@mui/material/Link';

const About = () => {


  const theme = useTheme();
  return (
    <Main>
      <Container>
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
        <Box marginBottom={4}>
          <Link 
            // underline='hover' 
            color='inherit' href='https://docs.saloon.finance/saloon-finance/howdy/introduction#what-is-the-saloon'>
            <Typography fontWeight={700} variant={'h4'} align={'center'}
              marginBottom={2}
            >
              What is the Saloon?
            </Typography>
          </Link>
          <Typography color={theme.palette.wildwest.grey}>
              The Saloon is a next-gen bug bounty platform. 
              A bug bounty platform (BBP) is a necessary tool in order to facilitate 
              the hosting of bug bounties on a codebase. Bug bounties allow hackers to 
              responsibly disclose code vulnerabilities to the project team for a monetary reward, instead of performing the exploit. 
              BBPs have been around for some time and serve as a crucial last line of defence for many protocols.           
            <br />
            <br />
              Most importantly, the Saloon is a fair and transparent BBP that custodies all funds for bounty payouts.            <br />
          </Typography>
        </Box>

        <Box marginBottom={4}>
          <Link 
            // underline='hover' 
            color='inherit' href='https://app.gitbook.com/o/3D1RtG7E2pcRMEUbfZNx/s/5pVnwl1CKzk77DYBLICG/howdy/introduction#undefined'>
            <Typography fontWeight={700} variant={'h4'} align={'center'}
              marginBottom={2}
            >
              What is a bug bounty?
            </Typography>
          </Link>
          <Typography color={theme.palette.wildwest.grey}>
            A bug bounty works just like a regular wild-west bounty. 
            Except we are hunting for bugs in code instead of human heads .          
            <br />
            <br />
            Basically you (the company) put a prize for anyone (hunters) who finds a bug in your code.
          </Typography>
        </Box>

        <Box marginBottom={4}>
          <Link 
            // underline='hover' 
            color='inherit' href='https://app.gitbook.com/o/3D1RtG7E2pcRMEUbfZNx/s/5pVnwl1CKzk77DYBLICG/howdy/introduction#how-does-the-saloon-work'>
            <Typography fontWeight={700} variant={'h4'} align={'center'}
              marginBottom={2}
            >
              How does The Saloon work? 
            </Typography>
          </Link>
          <Typography color={theme.palette.wildwest.grey}>
            The Saloon is comprised of Bounty Pools. 
            <br />
            <br />
            Bounty pools are created by a 
            project when they join the Saloon to post a bounty. 
            <br />
            <br />
            Upon creation, 
            the project will deposit funds to entice hunters to review the codebase.
            <br />
            <br /> 
            Those who deem the code as "bug-free" will decide to stake collateral in 
            the bounty pool. In return, they will receive juicy premium payments for 
            assuming the risk of valid submission payouts.
            <br />
            <br /> 
            An example:
            <br />
            <br />
            1. A project decides they want to post a bounty. 
            <br />
            <br />
            2. The project sets the bounty pool cap and APY. 
            <br />
            <br />
            - E.g. Project wants to host a $1million bounty with a 20% Staker APY. This means that every year, the project will pay a max $200,000 to the stakers in the bounty pool. 
            <br />
            <br />
            3. The project is required to deposit a "seed" amount in order to make hunting worthwhile before the bounty pool fills up. Recommended 10% minimum ($100,000 in above example).
            <br />
            <br />
            4. Early auditors hunt for bugs on the protocol.
            <br />
            <br />
            5. The Saloon sifts invalid bugs out.
            <br />
            <br />
            6. If a valid bug is found, the auditor gets paid.
            <br />
            <br />
            7. If no bugs are present, they can decide to stake their collateral and start earning the premium payments.
            <br />
            <br />
            8. Each week, the project pays their premium and the funds are claimable by the stakers.
            <br />
            <br />
            9.Top performing stake strategies will be shown publicly, ensuring that anyone can make an informed decision on where to stake.
          </Typography>
        </Box>
        
        <Typography fontWeight={700} variant={'h4'} align={'center'}
          marginBottom={2}>
          Why was the Saloon built?
        </Typography>
        
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
