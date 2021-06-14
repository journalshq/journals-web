import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';

export const NotAuthenticated: React.FC = () => {
  return (
    <div className="grid-xl mt50 mb200">
      <h1 className="fw-800">Not Authenticated</h1>
      <p className="w40">
        Journals tries to ensure a pleasant experience by ensuring the right
        conditions for every page and it seems that you need to
      </p>
      <div className="mt25">
        <Link to={ROUTES.LOGIN}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};
