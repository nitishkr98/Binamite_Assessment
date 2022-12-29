import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Profile from '../containers/profile';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/profile', element: <Profile /> },
  ]);
}

const LandingPage = Loadable(lazy(() => import('../containers/landingPage')));
