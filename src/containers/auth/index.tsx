import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Layout } from '@components';
import { AuthContext } from '@contexts/auth';
import { IAuthContext } from '@interfaces';

export const Auth: React.FC = ({ children }) => {
  const { checkAuth } = useContext<IAuthContext>(AuthContext);
  const history = useHistory();

  // const dispatch = useDispatch();

  // check auth
  checkAuth({}).catch(() => history.push('/login'));

  // set user identity
  // userIdentity &&
  //     userIdentity().then((data: any) => {
  //         dispatch(UserActions.setIdentity(data));
  //     });

  return <Layout>{children}</Layout>;
};
