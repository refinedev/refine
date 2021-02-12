import React from 'react';

import { Admin, Resource, AuthProvider, JsonServer } from 'readmin';

import { PostCreate, PostList, PostEdit } from './components/pages/post'
import { CategoryList, CategoryCreate } from './components/pages/category';
import { UserList } from './components/pages/user';
import { TagList, TagCreate, TagEdit } from './components/pages/tag';
import { DashboardPage } from './components/pages/dashboard';
import { ReadyPage } from './components/ready';
import { LoginPage } from "./components/login";

function App() {
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
      loginPage={LoginPage}
      dashboard={DashboardPage}
      ready={ReadyPage}
    >
      {/* <Resource
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
      /> */}
    </Admin>
  );
}

export default App;
