import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material/styles';

const Footer = () => {
  // const theme = useTheme();
  // const { mode } = theme.palette;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            display={'flex'}
            component="a"
            // href="/"
            // title="theFront"
            width={80}
          >
            <Link
          
              height={1}
              width={1}
              fontFamily='Diplomata'
              variant={'body1'}
              color="inherit"
              underline="none"
              href='/saloonhome'

            >
         
              Saloon
              
              
            </Link>
          </Box>
          <Box display="flex" 
            // flexWrap={'wrap'} 
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={'center'}>

            <Box marginTop={1} marginRight={2}> 
              <Typography
                // align={'center'}
                variant={'caption'}
                color="text.secondary"
                // fontWeight={2}
                sx={{textTransform: 'uppercase'}}
              >
                &copy;2022 Saloon. All rights reserved
              </Typography>
            </Box>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'row', sm: 'row' }}
              alignItems={{ xs: 'center', sm: 'center' }}
              justifyContent="space-between"
            >
              <Box marginTop={1} marginRight={2}>
                <Button
                  component="a"
                  href="/docs/introduction"
                  color="inherit"
                  variant="outlined"
                  size="small"
                  sx={{borderRadius:0}}
                >
                  DISCORD
                </Button>
              </Box>
              <Box marginTop={1} marginRight={2}>
                <Button
                  component="a"
                  href="/docs/introduction"
                  color="inherit"
                  variant="outlined"
                  size="small"
                  sx={{borderRadius:0}}
                >
                  TWITTER
                </Button>
              </Box>
              <Box marginTop={1}>
                <Button
                  component="a"
                  href="/docs/introduction"
                  color="inherit"
                  variant="outlined"
                  size="small"
                  sx={{borderRadius:0}}
                >
                  GITHUB
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
