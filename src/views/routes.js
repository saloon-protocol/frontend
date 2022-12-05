import React from 'react';

import {
  // IndexView,
  Home as HomeView,

  About as AboutView,
 
  NotFoundCover as NotFoundCoverView,
  SaloonHome as SaloonHomeView,
  Bounties as BountiesView,
  Bounty as BountyView
} from 'views';

// import {About} from './SaloonHome/components/About/About';

const routes = [
  {
    path: '/bounty/:title',
    renderer: (params = {}) => <BountyView {...params} />,
  },
  {
    path: '/draft/:title',
    renderer: (params = {}) => <BountyView {...params} />,
  },

  {
    path: '/bounties',
    renderer: (params = {}) => <BountiesView {...params} />,
  },
  {
    path: '/saloonhome',
    renderer: (params = {}) => <SaloonHomeView {...params} />,
  },
  {
    path: '/',
    renderer: (params = {}) => <SaloonHomeView {...params} />,
  },
  {
    path: '/home',
    renderer: (params = {}) => <HomeView {...params} />,
  },
  
  {
    path: '/about',
    renderer: (params = {}) => <AboutView {...params} />,
  },
  
  {
    path: '/not-found-cover',
    renderer: (params = {}) => <NotFoundCoverView {...params} />,
  },
];

export default routes;
