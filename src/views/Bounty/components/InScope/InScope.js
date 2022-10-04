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

  const mock = [
    {
      title: 'Smart Contract Name',
      loc: 1290,
      prefix: 'LOC ',
      link: '/bounty',
      description: 'This should be a one-line short description',
      code: 'lalala'
    },
    {
      title: 'Smart Contract Name 2',
      loc: 874,
      prefix: 'LOC ',
      link: '/bounty',
      description: 'This should be a one-line short description',
      code: 'lalala'

    },

  ];

  const code = 'contract ERC20 is Context, IERC20, IERC20Metadata {  \n  mapping(address => uint256) private _balances;  \n  mapping(address => mapping(address => uint256)) private _allowances; \n   uint256 private _totalSupply; \n   string private _name; \n   string private _symbol;    /**  \n   * @dev Sets the values for {name} and {symbol}.     *  \n   * The default value of {decimals} is 18. To select a different value for  \n   * {decimals} you should overload it.     *  \n   * All two of these values are immutable: they can only be set once during     * construction.     */  \n  constructor(string memory name_, string memory symbol_) {        _name = name_;        _symbol = symbol_;    }';
  console.log(mock);

  return (

    <Box>
      <Grid
        container
      >
        {data.assets?.map((item, i) => (
          <Grid key={i} item
            sx={{
              borderBottom: `4px solid ${theme.palette.wildwest.wine}`,
              '&:last-child': {
                borderBottom: 0,
              },
            }}
            xs={12}
          >


            <Accordion
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1d-content"
                id="panel1a-header"
                sx={{
                  backgroundColor: theme.palette.oldwest.darkbrown
                }}
              >

                <Box display='flex'
                  sx={{ width: 1 }}
                  alignItems={'center'}
                  padding={2}
                >
                  <Box
                    sx={{ width: '33%' }}
                  >
                    <Typography
                      variant='h6'
                      fontWeight={700}
                      sx={{ textTransform: 'uppercase' }}

                    >
                      <Link underline='hover' href={'https://mumbai.polygonscan.com/address/' + item.address} target="_blank" color={'text.primary'}>
                        {item.title}
                      </Link>
                    </Typography>
                    <Typography variant='body1' gutterBottom color={'text.primary'}
                      fontWeight={500}>
                      LOC 1234
                    </Typography>
                  </Box>

                  <Typography
                    align='center' color={'text.primary'} fontSize='medium'>
                    {item.description}
                  </Typography>
                </Box>


              </AccordionSummary>
              <AccordionDetails

                sx={{
                  backgroundColor: theme.palette.alternate.main
                }}
              >
                <SyntaxHighlighter language="javascript" style={gruvboxDark}
                  padding={3} showLineNumbers
                >
                  {item.source_code}
                </SyntaxHighlighter>
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