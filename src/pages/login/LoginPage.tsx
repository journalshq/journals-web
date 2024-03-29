import React, { useEffect, useState } from 'react';
import { History } from 'history';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';
import { Button } from 'antd';
import { PassphraseInput } from '../../components/input/PassphraseInput';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useWallet } from '@lisk-react/use-lisk';
import * as qs from 'query-string';

interface ContainerProps {
  isValidAndSynced: boolean;
  history: History;
}

const LoginPage: React.FC<ContainerProps> = () => {
  const { isAuthenticated, authenticate, logout } = useWallet();
  const history = useHistory();
  const location = useLocation();
  const [showPassphrase, setShowPassphrase] = useState<boolean>(false);
  const [passphrase, setPassphrase] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      const params = qs.parse(location.search);
      let route = params?.prevRoute
        ? params?.prevRoute?.toString()
        : ROUTES.HOME;
      history.push(route);
    }
  }, [isAuthenticated, history]);

  async function login() {
    try {
      await authenticate(passphrase);
    } catch (e) {
      console.error(e);
      logout();
    }
  }

  return (
    <div className="grid-s m-auto">
      <div className="w100 mt125 mb50">
        <div className="mb50">
          <h1 className="fs-xl fw-700 p0 m0 mb10">
            Welcome to <span className="fc-primary">Journals</span>
          </h1>
          <p className="fs-m w60 fc-gray-500">
            Helping an investigation requires a Lisk login. You'll need to
            provide 12 secret words that you secured somewhere secret.
          </p>
        </div>
        <div className="mb25">
          <div className="flex-c flex-jc-sb w100">
            <h2 className="fs-m  fw-700 p0 m0">Sign in with a passphrase</h2>
            <div
              onClick={() => setShowPassphrase(!showPassphrase)}
              className="click">
              {showPassphrase ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              <span className="ml10">{showPassphrase ? 'Hide' : 'Show'}</span>
            </div>
          </div>
        </div>
        <PassphraseInput
          setValidPassphrase={setPassphrase}
          showPassphrase={showPassphrase}
        />
      </div>
      <div className="flex-c">
        <div className="ml-auto">
          <Link to={ROUTES.INITIALISE}>
            <Button className="w175--fixed h45--fixed mr15">
              Create account
            </Button>
          </Link>
          <Button
            disabled={!passphrase}
            type="primary"
            className="w175--fixed h45--fixed"
            onClick={login}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
