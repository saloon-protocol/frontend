import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import shop from './shop.jpg';

const About = () => {


  const theme = useTheme();
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          align={'center'}
          color={'text.secondary'}
          sx={{ textTransform: 'uppercase' }}
          variant={'subtitle2'}
          fontWeight={600}
        >
          About
        </Typography>
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
            After hunting for bugs on different bug bounty platforms many times we realised the security provided by them is, at the very least, questionable. This frustration with the State of the Art of web3 security led the to the creation of the Saloon. A new concept for a Bug Bounty Platform to perpetually enhance the Web3 security landscape.
            <br />
            <br />
            First and foremost, we aim to secure the web3 space. We strongly believe that current Bug Bounty platforms are mostly a PR stunt and many times actually doing a disservice to the security of protocols, and by extension, investor and user funds.
            <br />
          </Typography>
        </Grid>
        <Grid item container xs={12} md={6}>
          <Typography color={theme.palette.wildwest.grey}>
            Our plan consists of offering the protocols that are really serious about security a way to actually show their commitment.
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
          
            sx={{
              objectFit: 'cover',
              filter: 'brightness(0.6)'
            }}
          />
          
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
