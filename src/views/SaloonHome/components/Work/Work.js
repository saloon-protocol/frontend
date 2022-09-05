import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
import { ReactComponent as Hourglass } from '../../../../images/hourglass4.svg';
import { ReactComponent as Shield } from '../../../../images/shield3.svg';
import { ReactComponent as Spring } from '../../../../images/spring.svg';

const projects = [
  {
    title: 'Dynamic Bounties',
    description:
      'Want to post a $1,000,000 bounty but don`t have the funds? \n Open up a crowd-sourced bounty pool at the Saloon.',
    
    image: <Spring/>,
  },
  {
    title: 'Fair and integrated triaging at the core',
    description:
      'We will filter out the invalid bugs as to not waste the project team`s time.',
    image: <Hourglass/>,
  },
  {
    title: 'Get insurance (coming soon)',
    description:
      'Protect your users and investors. Who better to assume the risk than the auditors who have poured hundreds of hours into pentesting?',
    image: <Shield/>,
  },
];


const Work = () => {
  // const theme = useTheme();

  return (
    <Box>
      <Box>
        
        <Typography marginBottom={2}
          variant={'h3'} sx={{ fontWeight: 700 }} align={'center'}>
          Why should projects drink at the Saloon?
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align={'center'}
          marginBottom={6}
        >
          We provide projects that are really serious about 
          security a way to actually show their commitment.
        </Typography>
        <Box marginTop={2} display={'flex'} justifyContent={'center'}>
      
        </Box>
      </Box>
      <Grid container spacing={4}>
        {projects.map((item, i) => (
          <Grid
            data-aos="fade-up"
            data-aos-delay={i * 100}
            data-aos-offset={100}
            data-aos-duration={600}
            key={i}
            item
            container
            xs={12}
            spacing={4}
            direction={i % 2 === 1 ? 'row-reverse' : 'row'}
            justifyContent='space-evenly'
            sx={{
              // backgroundColor: i % 2 === 1 ? theme.palette.alternate.main : 'inherit', 
              margin: 6}}
            
          >
            <Grid item container alignItems={'center'} xs={12} sm={6}>
              <Box>
                <Typography
                  variant={'h4'}
                  gutterBottom
                  sx={{ fontWeight: 700 }}
                >
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.description}
                </Typography>
                <Button
                  size={'large'}
                  sx={{ marginTop: 2 }}
                  endIcon={
                    <Box
                      component={'svg'}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      width={24}
                      height={24}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </Box>
                  }
                >
                  Learn more
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              container
              justifyContent={'center'}
              alignItems={'center'}
              xs={12}
              sm={4}
              
              
            >
              {item.image}
             
              
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Work;
