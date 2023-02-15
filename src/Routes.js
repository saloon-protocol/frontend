import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
// import viewsRoutes from 'views/routes';
// import docsRoutes from 'docs/routes';
// import blocksRoutes from 'blocks/routes';
// import demosRoutes from 'demos/routes';
// eslint-disable-next-line
import {
  About, SaloonHome, Bounties, Bounty, Draft, MyStakes
} from 'views';


const Routes = () => {
  return (
    <ReactRoutes>
      {/* {viewsRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      {docsRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      {blocksRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      {demosRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      <Route path="*" element={<Navigate replace to="/not-found-cover" />} />
      <Route path="*" element={<Navigate replace to="/" />} /> */}

      <Route path="/" element={<SaloonHome />} />
      <Route path="/bounties" element={<Bounties />} title="Bounties" />
      <Route path="/bounty/:title" element={<Bounty />} />
      <Route path="/draft/:title" element={<Draft />} />
      <Route path="/about" element={<About />} />
      <Route path="/bounty" element={<Bounty />} />
      <Route path="/mystakes" element={<MyStakes />} />




    </ReactRoutes>
  );
};

export default Routes;
