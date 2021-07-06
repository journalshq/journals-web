import React from 'react';
import { Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { getLoginRouteWithRedirect } from '../../shared/router/routes';

export const NotAuthenticated: React.FC = () => {
  const history = useHistory();
  return (
    <div className="grid-xl mt50 mb200">
      <h1 className="fw-800">Not Authenticated</h1>
      <p className="w40">
        Journals tries to ensure a pleasant experience by ensuring the right
        conditions for every page and it seems that you need to
      </p>
      <div className="mt25">
        <Link to={getLoginRouteWithRedirect(history.location.pathname)}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};
