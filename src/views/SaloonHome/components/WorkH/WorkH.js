import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import Container from 'components/Container';

// import { useTheme } from '@mui/material/styles';
import { ReactComponent as Lever } from '../../../../images/lever.svg';
import { ReactComponent as Balance } from '../../../../images/balance5.svg';
import { ReactComponent as Responsive } from '../../../../images/responsive.svg';

const hunters = [
  {
    title: 'Leverage your knowledge',
    description:
      "On top of the usual bounty payments that a hunter strives to earn, Saloon is opening up other avenues to use your smart contract knowledge and auditing skills to earn money. If you've audited a project and believe it is bug-free and/or exploit-proof, you can stake your capital to earn payments directly from the project.",
    
    image: <Lever/>,
    link: 'https://saloon-finance.gitbook.io/saloon-finance/hunter-manual/how-to-hunt',
  },
  {
    title: 'Fairness',
    description:
      "We will review every submission to determine validity and potential duplicate status to save your time. No need to wait on a response from a project when it's not necessary.",
    image: <Balance/>,
    link: 'https://saloon-finance.gitbook.io/saloon-finance/hunter-manual/how-to-hunt',
  },
  // {
  //   title: 'Responsive',
  //   description:
  //     'Protect your users and investors. Who better to assume the risk than the auditors who have poured hundreds of hours into pentesting?',
  //   image: <Responsive/>,
  // },
];

const WorkH = () => {
  // const theme = useTheme();

  return (
    <Box 
      
      paddingY={4}
      // justifyContent={'center'}
      // alignContent={'center'}
    >
      <Box>
        
        <Typography marginBottom={2}
          variant={'h3'} sx={{ fontWeight: 700 }} align={'center'}>
          Why should hunters drink at the Saloon?
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align={'center'}
          marginBottom={0}
        >
          We aim to make smart contract auditing (aka hunting) the most profitable skill in the entire services market. With our knowledge based staking opportunities hunters will be able to multiply their earnings many times over.
        </Typography>

      </Box>

      <Grid spacing={4}  md={12}
        // justifyContent={'center'} 
        // maxWidth="xl"
      >
        {hunters.map((item, i) => (
          <Grid
            data-aos="fade-up"
            data-aos-delay={i * 100}
            data-aos-offset={100}
            data-aos-duration={600}
            key={i}
            item
            // container
            // xs={6}
            spacing={4}
            direction={{ sm: i % 2 === 1 ? 'row-reverse' : 'row', xs: 'column'}}
            // justifyContent='space-evenly'
            sx={{
              // backgroundColor: i % 2 === 1 ? theme.palette.alternate.main : 'inherit', 
              margin: 6}}
            display={'flex'}
            xs={12} md={12}
            flex={'1 1 50%'}
            justifyContent={{ sm: 'space-between' }}
            alignItems={{ sm: 'center' }}
            
            
          >
            <Grid item alignItems={'center'} xs={12} sm={12} md={12}>
              <Box paddingX={4}>
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
                  href={item.link}
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
        
              justifyContent={'center'}
              alignItems={'center'}
              xs={12}
              sm={12}
              md={6}
              // paddingBottom={{xs:6}}
              
              
            >
              {item.image}
            
              
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkH;
