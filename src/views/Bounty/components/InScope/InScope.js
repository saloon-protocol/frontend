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
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import IconButton from '@mui/material/IconButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxDark, pojoaque } from 'react-syntax-highlighter/dist/esm/styles/prism';

import PropTypes from 'prop-types';


const InScope = (props) => {
  const { data } = props;
  const theme = useTheme();

  const code = 'contract ERC20 is Context, IERC20, IERC20Metadata {  \n  mapping(address => uint256) private _balances;  \n  mapping(address => mapping(address => uint256)) private _allowances; \n   uint256 private _totalSupply; \n   string private _name; \n   string private _symbol;    /**  \n   * @dev Sets the values for {name} and {symbol}.     *  \n   * The default value of {decimals} is 18. To select a different value for  \n   * {decimals} you should overload it.     *  \n   * All two of these values are immutable: they can only be set once during     * construction.     */  \n  constructor(string memory name_, string memory symbol_) {        _name = name_;        _symbol = symbol_;    }';

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
            data-aos="fade-up"
            data-aos-delay={i * 20}
            data-aos-offset={100}
            data-aos-duration={400}
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

                {/* <Box display='flex'
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
                      {item.title}
                    </Typography>
                    <IconButton 
                      href={item.github_url} 
                      target="_blank" 
                      // color={'text.primary'} marginLeft={1} marginRight={0.5}
                    >
                      <GitHubIcon />
                    </IconButton>
                    <Link href={item.explorer_url} target="_blank" color={'text.primary'}>
                      <ArticleIcon />
                    </Link>
                    
                    <Typography variant='body1' gutterBottom color={'text.primary'}
                      fontWeight={500}>
                      {item.loc} LOC
                    </Typography>
                  </Box>

                  <Typography
                    align='center' color={'text.primary'} fontSize='medium'>
                    {item.description}
                  </Typography>
                </Box> */}
                <Grid 
                  container
                  display='flex'
                  // sx={{ width: 1 }}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  padding={2}
                  
                >
                  <Grid item
                    // sx={{ width: '33%' }}
                    md={3}
                  >
                    <Grid 
                      container
                      display='flex'
                      // sx={{ width: 1 }}
                      flexDirection={'row'}
                      alignItems={'center'}
                      justifyContent={'flex-start'}
                    >
                      <Grid item 
                      >
                        <Typography
                          variant='h6'
                          fontWeight={700}
                          // sx={{ textTransform: 'uppercase' }}
                        >
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton 
                          href={item.github_url} 
                          target="_blank" 
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Grid>
                      <Grid item marginLeft={-1}>
                        <IconButton href={item.explorer_url} 
                          target="_blank" 
                        >
                          <ArticleIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    
                    <Typography variant='body1' gutterBottom color={'text.primary'}
                      fontWeight={500}>
                      {item.loc} LOC
                    </Typography>
                  </Grid>

                  <Grid item 
                    sm={8}
                  >
                    <Typography
                      align='left' color={'text.primary'} fontSize='medium'
                    >
                      {item.description}
                    </Typography>
                  </Grid>
                </Grid>


              </AccordionSummary>
              <AccordionDetails 
                loading='lazy'
                sx={{
                  backgroundColor: theme.palette.alternate.main,
                  maxHeight:750,
                  // height:'100%',
                  overflow: 'scroll'
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