// import React from 'react';
import * as React from 'react';
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
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxDark, pojoaque } from 'react-syntax-highlighter/dist/esm/styles/prism';

import PropTypes from 'prop-types';


const InScope = (props) => {
  const { data } = props;
  const theme = useTheme();

  return (

    <Box>
      <Grid
        container
      >
        {data.impacts?.map((item, i) => (
          <Grid key={i} item
            sx={{
              borderBottom: `3px solid ${theme.palette.wildwest.wine}`,
              '&:last-child': {
                borderBottom: 0,
              },
            }}
            padding={2}
            xs={12}
            data-aos="fade-up"
            data-aos-delay={i * 20}
            data-aos-offset={100}
            data-aos-duration={400}
          >


        

            <Grid 
              // container
              display='flex'
              alignItems={{ xs: 'left', md: 'center' }}
              justifyContent={{ sm: 'space-around' }}
              flexDirection={{ xs: 'column', md: 'row' }}
              // sx={{ width: 1 }}
              // padding={2}
            >
              <Grid item
                // sx={{ width: '10%' }}
                xs={12}
                md={2}
              >
                <Typography
                  variant='h6'
                  fontWeight={700}
                  align={'left'}
                  sx={{ textTransform: 'uppercase' }}

                >
                  <Link underline='hover' href={'https://mumbai.polygonscan.com/address/' + item.address} target="_blank" color={'text.primary'}>
                    {item.severity}
                  </Link>
                </Typography>
                
              </Grid>

              <Grid item md={12}>
                <Typography
                  align='left' color={'text.primary'} fontSize='large'>
                  {item.description}
                </Typography>
              </Grid>
            </Grid>



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