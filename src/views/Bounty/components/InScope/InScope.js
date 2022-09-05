import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Main from 'layouts/Main';
// import Container from 'components/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const InScope = () => {
  const theme = useTheme();

  const mock = [
    {
      title: 'Smart Contract Name',
      loc: 1290,
      prefix: 'LOC ',
      link: '/bounty',
      description: 'This should be a one-line short description'
    },
    {
      title: 'Smart Contract Name 2',
      loc: 874,
      prefix: 'LOC ',
      link: '/bounty',
      description: 'This should be a one-line short description'
    },
  
  ];

  return (

    <Box>
      <Typography variant={'h4'} fontWeight={700} marginBottom={4}  >
        Assets in Scope
      </Typography>
      <Grid
        container
        sx={{backgroundColor: theme.palette.alternate.main}}
      >
        {mock.map((item, i) => (
          <Grid key={i} item
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              '&:last-child': {
                borderBottom: 0,
              },
            }}
            xs={12}
          >
            <Box padding={2} display={'flex'} alignItems={'center'}>
              <Grid container
                display={'flex-start'}
                flexDirection={{ xs: 'column', sm: 'row' }}
                flex={'1 1 50%'}
                justifyContent={{ sm: 'flex-start' }}
                alignItems={{ sm: 'center' }}

              >
                <Grid item xs={12} md={6}>
                  <Typography 
                    variant='h6'
                    fontWeight={700}
                    sx={{textTransform:'uppercase'}}
                  >
                    <Link underline='hover' href={item.link} color={'text.primary'}>
                      {item.title}
                    </Link>
                  </Typography>
                  <Typography variant= 'body1' gutterBottom color={'text.primary'} 
                    fontWeight={500}>
                    {item.prefix}{item.loc}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color={'text.primary'} fontSize='medium'>
                    {item.description}
                  </Typography>
                
                </Grid>
              </Grid>
              
            </Box>
          </Grid>
        ))}    
      </Grid>
    </Box>

    
  );
};

export default InScope;