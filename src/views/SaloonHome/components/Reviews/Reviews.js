import React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
// import { CardMedia } from '@mui/material';
import cowboy from '../../../../images/cowboy.jpg';
import { CardContent } from '@mui/material';
const mock = [
  {
    title: 'Hunters',
    subtitle:
      'A very simple and modern template with a very harmonious color scheme. Also the additional plugins like the statistics are great and fit perfectly into the overall picture.',
    button: 'Go Hunt',
    image: cowboy,
    link: '/bounties'
  },
  {
    title: 'Projects',
    subtitle:
      'Keep your entire team in sync with development and easily manage tasks, goals, and deadlines. Easily manage and edit any Adwords campaign inline to improve ROI with constant review.',
    button: 'Put up a Bounty',
    link: '/'
  },
];

const Reviews = () => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2}>
        {mock.map((item, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Box
              display='flex'
              // component={'a'}
              href={''}
              // display={'block'}
              width={1}
              height={1}
              sx={{
                
                textDecoration: 'none',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                  boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
                },
                
                
                // transition: 'all .2s ease-in-out',
                // '&:hover': {
                //   transform: `translateY(-${theme.spacing(1 / 2)})`,
                // },
              }}
            >
              <Card
                // component={Card}
                width={1}
                height={1}
                data-aos={'fade-up'}
                data-aos-delay={i * 100}
                data-aos-offset={100}
                data-aos-duration={600}
                flexDirection={'column'}
                display={'flex'}
                sx={{borderRadius: 0, 
                  backgroundImage: cowboy,
                  boxShadow: 0,
                  
                }}
                
                
              >
            
                
                <CardContent
                  
                  sx={{
                    borderRadius: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    backgroundColor: theme.palette.wildwest.darkbrown,
                    
                    // backgroundImage: `linear-gradient(0deg, ${theme.palette.wildwest.wine} 1%, ${theme.palette.wildwest.darkbrown} 100%)`,
                    // boxShadow: 0
                    
                  }}
                >
                  <Typography
                    variant={'h4'}
                    gutterBottom
                    alignItems={'center'}
                    color={theme.palette.wildwest.wine}
                    sx={{ fontWeight: 600 }}
                    
                  >
                    {item.title}
                  </Typography>
                  
                
                  
                  
                  <Typography marginBottom= {2} 
                    color={theme.palette.wildwest.wine}
                  >
                    {item.subtitle}
                  </Typography>
                  
                  {/* <Box
                    component='img'
                    src={cowboy}
                    maxHeight={{ xs: 300, sm: 400, md: 520 }}
                    sx={{
                      objectFit: 'cover',
                      filter: 'brightness(0.6)',
                    }}>

                  </Box> */}
                  <Button
                    variant="contained"
                    color= "primary"
                    size="large"
                    sx ={{borderRadius: 0, borderColor: 'white', borderWidth:2}}
                    
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
                      sx={{textTransform: 'uppercase'}}
                    >
                      {item.button}
                    </Typography>
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reviews;
