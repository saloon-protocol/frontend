import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Main from 'layouts/Main';
// import Container from 'components/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';


const InScope = (props) => {
  const { data } = props;
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
  console.log(mock);

  return (

    <Box>
      <Typography variant={'h4'} fontWeight={700} marginBottom={4}  >
        {/* {data.assets.map((home,i) => <div>{home.title},{i}</div>)} */}
      </Typography>
      <Grid
        container
        sx={{backgroundColor: theme.palette.alternate.main}}
      >
        {data.assets?.map((item, i) => (
          <Grid key={i} item
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              '&:last-child': {
                borderBottom: 0,
              },
            }}
            xs={12}
          >


            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"                
              >
                
                
                <Box 
                  sx={{ width: '33%'}}
                  // justifyContent='space-between'
                >
                  <Typography 
                    variant='h6'
                    fontWeight={700}
                    sx={{textTransform:'uppercase'}}
                  >
                    <Link underline='hover' href={'https://etherscan.io/'+item.address} target="_blank" color={'text.primary'}>
                      {item.address}
                    </Link>
                  </Typography>
                  <Typography variant= 'body1' gutterBottom color={'text.primary'} 
                    fontWeight={500}>
                    {item.title}
                  </Typography>
                </Box>
                
                <Typography align='center' color={'text.primary'} fontSize='medium'>
                  {item.description}
                </Typography>
                
                

              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                  Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>



          </Grid>
        ))}    
      </Grid>
    </Box>

    
  );
};

InScope.propTypes = {
  data: PropTypes.object
};

export default InScope;