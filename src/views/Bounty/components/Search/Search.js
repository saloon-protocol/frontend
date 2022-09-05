import React from 'react';
// import { useTheme } from '@mui/material/styles';
// import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import InputAdornment from '@mui/material/InputAdornment';

const Search = () => {
//   const theme = useTheme();
  return (
    <Box>
      <Box
        padding={2}
        width={1}
        component={Card}
        boxShadow={4}
        marginBottom={4}
      >
        <form noValidate autoComplete="off">
          <Box display="flex" alignItems={'center'}>
            <Box width={1} marginRight={1}>
              <TextField
                sx={{
                  height: 54,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '0 !important',
                  },
                }}
                variant="outlined"
                color="primary"
                size="small"
                placeholder="Search projects"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component={'svg'}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                        color={'primary.main'}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box display={{ xs: 'none', sm: 'block' }} marginRight={2}>
              <Typography
                color={'text.secondary'}
                variant={'subtitle2'}
                sx={{ whiteSpace: 'nowrap' }}
              >
                123 Results
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{ height: 54, minWidth: 100, whiteSpace: 'nowrap' }}
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
        
              >
                Search
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Search;