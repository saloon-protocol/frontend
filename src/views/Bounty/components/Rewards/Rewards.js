import React, {useState} from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from 'react-countup';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Main from 'layouts/Main';
// import Container from 'components/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const Rewards = () => {
  const theme = useTheme();

  const mock = [
    {
      title: 'High',
      figure: 1000000,
      prefix: 'USD $',
      color: theme.palette.primary.superlight,
      font: 'h5'
    },
    {
      title: 'Medium',
      figure: 100000,
      prefix: 'USD $',
      color: theme.palette.primary.superlightred,
      font: 'h6'
    },
    {
      title: 'Low',
      figure: 1000,
      prefix: 'USD $',
      color: theme.palette.background.paper,
      font: 'subtitle1'
    },
  
  ];

  const [viewPortEntered, setViewPortEntered] = useState(false);
  const setViewPortVisibility = (isVisible) => {
    if (viewPortEntered) {
      return;
    }

    setViewPortEntered(isVisible);
  };

  return (

    <Box>
      <Typography variant={'h6'} fontWeight={700} marginBottom={1} >
        Rewards
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
            <Grid padding={2} display={'flex'} alignItems={{ xs: 'left', sm: 'center' }}
              flexDirection={{ xs: 'column', sm: 'row' }}
            >
              <Grid item xs={12} md={6}
                display={'flex'}
                flexDirection={{ xs: 'column', sm: 'row' }}
                flex={'1 1 50%'}
                justifyContent={{ sm: 'space-between' }}
                alignItems={{ sm: 'center' }}
              >
                <Box>
                  <Typography color={'text.primary'} fontSize='small'>
                    Level
                  </Typography>
                  <Typography 
                    variant={item.font} 
                    fontWeight={700}
                    sx={{textTransform:'uppercase'}}
                  >
                    <Link underline='hover' href='/bounty' color={item.color}>
                      {item.title}
                    </Link>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography color={'text.primary'} fontSize='small'>
                  Reward up to
                </Typography>
                <Typography variant={item.font} gutterBottom color={item.color}>
                  <Box fontWeight={600}>
                    <VisibilitySensor
                      onChange={(isVisible) =>
                        setViewPortVisibility(isVisible)
                      }
                      delayedCall
                    >
                      <CountUp
                        duration={2}
                        separator=','
                        end={viewPortEntered ? item.figure : 0}
                        start={0}
                        prefix= {item.prefix}
                      />
                    </VisibilitySensor>
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}    
      </Grid>
    </Box>

    
  );
};

export default Rewards;