import React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
// import { CardMedia } from '@mui/material';
// import cowboy from '../../../../images/cowboy.jpg';
import { CardContent } from '@mui/material';
const mock = [
  {
    title: 'Projects',
    subtitle:
    "Show how serious you are about security. Get top tier auditors reviewing your code and pay a fraction of the cost.", 
    button: 'Put up a Bounty',
    link: 'https://share.hsforms.com/1HYlSPJAmRiGYbe0PDV6hpwdk5fo'
  },
  {
    title: 'Hunters',
    subtitle:
      "Leverage your auditing skills like never before.\nFind bugs. Get Paid. Didn't find anything? Stake for crazy returns.",
    // button: 'Sign up for Launch Updates',
    button: 'Go Hunt',

    // image: cowboy,
    link: '/bounties'
  },
];

const Reviews = () => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container 
      // spacing={2} 
        alignItems={'center'} 
        justifyContents={'space-between'} 
        // sx={{

        //   '&:hover': {
        //     transform: `translateY(-${theme.spacing(1 / 2)})`,
        //     boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
        //   },
        //   // backgroundColor: theme.palette.wildwest.darkbrown,

        // }}
      >
        {mock.map((item, i) => (
          <Grid item xs={12} md={6} key={i}
            padding={2}
            sx={{

              '&:hover': {
                transform: `translateY(-${theme.spacing(1 / 2)})`,
                boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
              },

            }}
          
          >
            <Grid md={12} 
              // justifyContents={''} 
              display={'grid'}
              gridTemplateRows={'repeat(3, 3fr)'}
              // gridAutoColumns={'1fr'}
              // gridAutoFlow= {'row'}
              
              // alignItems={'center'} 
              // direction={'cloumn'}
            >
              <Grid item >
                <Typography
                  variant={'h4'}
                  // gutterBottom
                  align={'center'}
                  // color={theme.palette.wildwest.wine}
                  color={theme.palette.wildwest.grey}
                  sx={{ fontWeight: 600 }}

                >
                  {item.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography 
                  // marginBottom={2}
                  // color={theme.palette.wildwest.wine}
                  color={theme.palette.wildwest.grey}
                  align='center'
                >
                  {item.subtitle}
                </Typography>
              </Grid>
              {/* <Box
                component='img'
                src={cowboy}
                maxHeight={{ xs: 300, sm: 400, md: 520 }}
                sx={{
                  objectFit: 'cover',
                  filter: 'brightness(0.6)',
                }}>

              </Box> */}
              <Grid item>
                {
                  i == 1 ? (
                
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ borderRadius: 0, borderColor: 'white', borderWidth: 2 }}
                      href={item.link}
                      fullWidth
                      endIcon={
                        <svg
                          width={16}
                          height={16}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          color='white'


                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      }
                    >
                      <Typography paddingY={2}
                        fontWeight={900}

                        color={theme.palette.wildwest.grey}
                        sx={{ textTransform: 'uppercase' }}
                      >
                        {item.button}
                      </Typography>
                    </Button>
                  ):(
                    <Grid container 
                      display='flex'
                      // flexDirection={{ xs: 'column', lg: 'row' }}
                      // flex={'1 1 50%'}
                      flexDirection='row'
                      justifyContent='space-between'
                      alignItems='center'
                      spacing={1}
                    >

                      <Grid item xs={6}>
                        
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          sx={{ borderRadius: 0, borderColor: 'white', borderWidth: 2 }}
                          href={item.link}
                          fullWidth
                          endIcon={
                            <svg
                              width={16}
                              height={16}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              color='white'


                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          }
                        >
                          <Typography paddingY={2}
                            fontWeight={900}

                            color={theme.palette.wildwest.grey}
                            sx={{ textTransform: 'uppercase' }}
                          >
                            TELEGRAM
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          sx={{ borderRadius: 0, borderColor: 'white', borderWidth: 2 }}
                          href={item.link}
                          fullWidth
                          endIcon={
                            <svg
                              width={16}
                              height={16}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              color='white'


                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          }
                        >
                          <Typography paddingY={2}
                            fontWeight={900}

                            color={theme.palette.wildwest.grey}
                            sx={{ textTransform: 'uppercase' }}
                          >
                            DISCORD
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  )
                }
              </Grid>
            </Grid>
            {/* </Box> */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reviews;
