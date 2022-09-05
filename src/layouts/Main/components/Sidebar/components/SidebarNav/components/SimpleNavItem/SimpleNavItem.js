import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { alpha, useTheme } from '@mui/material/styles';
// import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

const SimpleNavItem = ({ title, id, items, colorInvert = false }) => {
  // const theme = useTheme();

  const [ setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.target);

  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [activeLink, setActiveLink] = useState('');
  useEffect(() => {
    setActiveLink(window && window.location ? window.location.pathname : '');
  }, []);

  const hasActiveLink = () => items.find((i) => i.href === activeLink);
  const linkColor = colorInvert ? 'common.white' : 'text.primary';
  
  return (
    <Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        aria-describedby={id}
        sx={{ cursor: 'pointer' }}
        onClick={(e) => handleClick(e, id)}
      >
        <Typography
          color={linkColor}
          sx={{ textTransform: 'uppercase' }}
        >
          <Link 
            color="inherit"
            underline="none"
            href={items.map((p) => (p.href))}
            fontWeight={hasActiveLink() ? 900 : 300}>
            {title}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

SimpleNavItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  colorInvert: PropTypes.bool,
};

export default SimpleNavItem;
