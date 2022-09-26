import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Search from '../Search';
import MANAGER from '../../../../chain-info/Manager.json';
import { ethers } from 'ethers';

// eslint-disable-next-line
import { useParams } from 'react-router-dom';

// eslint-disable-next-line


const fetchData = async () => {
  const res = await fetch('https://0xdjango.pythonanywhere.com/api/v1/all-bounties');
  const json = await res.json();
  console.log(json);
  return json;
};

const Jobs = () => {
  const [bounties, setBounties] = useState([]);
  // useEffect(() => {
  //   fetchData().then(bounties => {
  //     setBounties(bounties);
  //     console.log(bounties);

  //     // go through dictionary and add payout and APY data keys to each bounty
  //     const len = Object.keys(bounties).length;
  //     for(var i = 0; i < len; i++){
  //       // const payout = viewBounty(bounties[i]['title']);
  //       const result = [viewBounty('YEEHAW')];
  //       bounties[i]['payout'] = result[0];
  //       // bounties[i]['apy'] = result[1];
  //     }
  //     // bounties[0]['payout'] = len;
  //     console.log(bounties);
  //   });
    
    
  // }, []);
  useEffect(() => {
    fetchData().then(bounties => {
      setBounties(bounties);
      console.log(bounties);
    });
    
    
  }, []);
  const theme = useTheme();

  // for some reason I cant hide my alchemy key
  const mumbaiwss = 'wss://polygon-mumbai.g.alchemy.com/v2/MFd0LBZozOhdiLbJPopgwAMbqIxeZSC7';
  const provider = new ethers.providers.WebSocketProvider(mumbaiwss);
  // eslint-disable-next-line
  async function viewPayout(bountyTitle){

    // const managerAddress = '0x90e4184234fc97f8004E4f4C210CC6F45A11b4d7';
    const managerAddress = '0x46EA853931aB3B232A6786d37b936488e862fd52';

    const managerAbi = MANAGER;
    const contract = new ethers.Contract(managerAddress, managerAbi, provider);
    // const bountyname = 'YEEHAW';
    const bountyName = bountyTitle;
    // const weiDeposit = await contract.viewProjectDeposit(bountyname);
    const weiPayout = await contract.viewBountyPayout(bountyName);

    // const deposit = ethers.utils.formatEther(weiDeposit);

    // var dict = {};
    const payout = ethers.utils.formatEther(weiPayout);
    // const apy = ethers.utils.formatEther(values[1]);

    // dict['payout'] = ethers.utils.formatEther(values[0]);
    // dict['apy'] = ethers.utils.formatEther(values[1]);
    // bounties['payout'] = payout;
    
    // console.log(dict);

    return payout;

  }

  // const [info, setInfo] = useState();
  // useEffect(() => {
  //   viewPayout().then(info => {
  //     setInfo(info);
  //   });
  //   // go through dictionary and add payout and APY data keys to each bounty
  //   const len = Object.keys(bounties).length;
  //   for(var i = 0; i < len; i++){
  //     // const payout = viewBounty(bounties[i]['title']);
  //     const result = [viewPayout('YEEHAW')];
  //     bounties[i]['payout'] = result;
  //     // bounties[i]['apy'] = result[1];
  //   }
  //   console.log(bounties);
    
  // });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          align={'center'}
          color={'text.secondary'}
          sx={{ textTransform: 'uppercase' }}
          variant={'subtitle2'}
          fontWeight={600}
        >go hunt
        </Typography>
        <Typography fontWeight={700} variant={'h4'} align={'center'}>
          Bounties  
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          '.MuiOutlinedInput-root': {
            background: theme.palette.background.paper,
          },
        }}
      >
        <Grid item xs={12} md={2}>
          <FormControl variant="outlined" sx={{ borderRadius: 0, minWidth: 1 }}>
            <InputLabel id="career-listing__jobs-role--label">Filters</InputLabel>
            <Select sx={{ borderRadius: 0 }} labelId="career-listing__jobs-role--label" label="Roles">
              <MenuItem value="">
                <em>All roles</em>
              </MenuItem>
              <MenuItem value={'design'}>Design</MenuItem>
              <MenuItem value={'engineering'}>Engineering</MenuItem>
              <MenuItem value={'product'}>Product</MenuItem>
              <MenuItem value={'support'} >Support</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel id="career-listing__jobs-role--label">Sort by</InputLabel>
            <Select sx={{ borderRadius: 0 }} labelId="career-listing__jobs-role--label" label="Teams">
              <MenuItem value="" >
                <em>All teams</em>
              </MenuItem>
              <MenuItem value={'consumer'}>Consumer</MenuItem>
              <MenuItem value={'consulting'}>Consulting</MenuItem>
              <MenuItem value={'internal-tools'}>Internal tools</MenuItem>
            </Select>
          </FormControl>

        </Grid>
        <Grid item xs={12} md={8} marginTop={-1}>

          <Search />

        </Grid>
      </Grid>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'row' }}
        flex={'1 1 100%'}
        justifyContent={{ sm: 'space-between' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        marginY={4}
      >
      </Box>
      <Grid
        container
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 2,
        }}
      >
        {bounties.map((item, i) => (
          <Grid
            item
            xs={12}
            key={i}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              '&:last-child': {
                borderBottom: 0,
              },
            }}

          >
            <Grid
            // direction = "row"
            >
              <Grid container item padding={4}
                display={'flex'}
                alignItems={'center'}
                flexDirection={{ xs: 'column', sm: 'row' }}
                // direction = "row"
                justifyContent="space-between"
                md={12}
                // spacing={5}

              >
                <Grid item >

                  <Typography item
                    // marginRight={4} 
                    variant={'subtitle1'} fontWeight={700}
                    paddingBottom={{ xs: 2 }}
                  >
                    LOGO
                  </Typography>
                </Grid>
                <Grid item marginBottom={{ xs: 1, sm: 0 }}
                  paddingY={{ xs: 2 }}
                  md={4}
                >

                  <Typography variant={'h6'} fontWeight={700}
                    paddingBottom={{ xs: 1 }}
                  >

                    {item.title}

                  </Typography>

                  <Typography color={'text.secondary'}>
                    {item.description.substring(0,75).trim()}...
                  </Typography>
                </Grid>

                <Grid item md={2}>
                  <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', sm: 'column' }}
                    // flex={'1 1 100%'}
                    justifyContent={{ sm: 'space-between' }}
                    alignItems={{ sm: 'left' }}

                  >
                    <Box>
                      <Typography variant='caption'>
                        Rewards up to
                      </Typography>
                    </Box>
                    <Button
                      // eslint-disable-next-line
                      href={`/bounties/${item.title}`}
                      // href="/bounty"
                      variant="outlined"
                      color="secondary"
                      size="large"
                      fullWidth
                      sx={{ borderRadius: 0 }}
                      endIcon={
                        <Box
                          component={'svg'}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          width={12}
                          height={12}
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </Box>
                      }
                    >
                      <Typography variant='h6'>
                        {/* {viewBounty(item.title)} */}
                        {item.value}
                      </Typography>
                    </Button>
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', sm: 'column' }}
                    // flex={'1 1 100%'}
                    justifyContent={{ sm: 'space-between' }}
                    alignItems={{ sm: 'left' }}

                  >
                    <Box>
                      <Typography variant='caption'>
                        Bounty Pool APY
                      </Typography>
                    </Box>
                    <Button
                      href={`/bounties/${item.title}`}
                      variant="outlined"
                      color="inherit"
                      size="medium"
                      sx={{ borderRadius: 0 }}
                      endIcon={
                        <Box
                          component={'svg'}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          width={12}
                          height={12}
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </Box>
                      }
                    >
                      <Typography variant='subtitle1'>
                        {item.apy}
                      </Typography>
                    </Button>
                  </Box>

                </Grid>

              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Jobs;
