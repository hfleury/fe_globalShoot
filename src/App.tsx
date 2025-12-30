import { Admin, Resource } from 'react-admin';
import { authProvider } from './components/auth/authProvider';
import { LoginPage } from './components/auth/LoginPage';

import { dataProvider } from './providers/dataProvider';

import { Dashboard } from './components/dashboard/Dashboard';
import { AppLayout } from './components/layout/AppLayout';
import { CompanyList } from './components/companies/CompanyList';
import { CompanyCreate } from './components/companies/CompanyCreate';
import { CompanyEdit } from './components/companies/CompanyEdit';
import { SiteList } from './components/sites/SiteList';
import { SiteCreate } from './components/sites/SiteCreate';
import { SiteEdit } from './components/sites/SiteEdit';
import { UnitList } from './components/units/UnitList';
import { UnitCreate } from './components/units/UnitCreate';
import { UnitEdit } from './components/units/UnitEdit';
import { RoomList } from './components/rooms/RoomList';
import { RoomCreate } from './components/rooms/RoomCreate';
import { RoomEdit } from './components/rooms/RoomEdit';
import { UserList } from './components/users/UserList';
import { UserCreate } from './components/users/UserCreate';
import { UserEdit } from './components/users/UserEdit';

const App = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
        dashboard={Dashboard}
        layout={AppLayout}
    >
        {(permissions) => {
            console.log('App permissions:', permissions);
            return (
                <>
                    {permissions === 'admin' ? (
                        <>
                            <Resource
                                name="companies"
                                list={CompanyList}
                                create={CompanyCreate}
                                edit={CompanyEdit}
                            />
                            <Resource
                                name="users"
                                list={UserList}
                                create={UserCreate}
                                edit={UserEdit}
                            />
                            <Resource
                                name="sites"
                                list={SiteList}
                                create={SiteCreate}
                                edit={SiteEdit}
                            />
                            <Resource
                                name="units"
                                list={UnitList}
                                create={UnitCreate}
                                edit={UnitEdit}
                            />
                            <Resource
                                name="rooms"
                                list={RoomList}
                                create={RoomCreate}
                                edit={RoomEdit}
                            />
                        </>
                    ) : null}
                    {permissions === 'company' ? (
                        <>
                            <Resource
                                name="companies"
                                list={CompanyList}
                                edit={CompanyEdit}
                            />
                            <Resource
                                name="sites"
                                list={SiteList}
                                create={SiteCreate}
                                edit={SiteEdit}
                            />
                            <Resource
                                name="units"
                                list={UnitList}
                                create={UnitCreate}
                                edit={UnitEdit}
                            />
                            <Resource
                                name="rooms"
                                list={RoomList}
                                create={RoomCreate}
                                edit={RoomEdit}
                            />
                        </>
                    ) : null}
                    {permissions === 'customer' ? (
                        <Resource
                            name="sites"
                            list={SiteList}
                        />
                    ) : null}
                </>
            );
        }}
    </Admin>
);

export default App;