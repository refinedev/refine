import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Admin, Resource, AuthProvider, JsonServer } from '../.';

import { PostCreate, PostList, PostEdit } from './post';
import { CategoryList, CategoryCreate } from './category';
import { UserList } from './user';
import { TagList, TagCreate, TagEdit } from './tag';
import { DashboardPage } from './dashboard';

const App = () => {
  const authProvider: AuthProvider = {
    login: (params: any) => {
      if (params.username === 'admin') {
        localStorage.setItem('username', params.username);
        return Promise.resolve();
      }

      return Promise.reject();
    },
    logout: () => {
      localStorage.removeItem('username');
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
      localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(['admin']),
    getUserIdentity: () =>
      Promise.resolve({
        id: 1,
        fullName: 'Jane Doe',
        avatar:
          'https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640'
      })
  };

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={JsonServer('https://readmin-fake-rest.pankod.com')}
      dashboard={<DashboardPage />}
    >
      <Resource
        name="posts"
        list={PostList}
        create={PostCreate}
        edit={PostEdit}
        canDelete
      />
      <Resource
        name="categories"
        list={CategoryList}
        create={CategoryCreate}
        canDelete
      />
      <Resource name="users" list={UserList} />
      <Resource
        name="tags"
        list={TagList}
        edit={TagEdit}
        create={TagCreate}
        canDelete
      />
    </Admin>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
