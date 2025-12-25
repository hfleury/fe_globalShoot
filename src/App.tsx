import { Admin, Resource } from 'react-admin';
import { authProvider } from './components/auth/authProvider';
import { LoginPage } from './components/auth/LoginPage';

import { dataProvider } from './providers/dataProvider';

import { Dashboard } from './components/dashboard/Dashboard';
import { AppLayout } from './components/layout/AppLayout';
import { CompanyList } from './components/companies/CompanyList';
import { CompanyCreate } from './components/companies/CompanyCreate';
import { CompanyEdit } from './components/companies/CompanyEdit';

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
                        <Resource
                            name="companies"
                            list={CompanyList}
                            create={CompanyCreate}
                            edit={CompanyEdit}
                        />
                    ) : null}
                    {permissions === 'company' ? (
                        <Resource
                            name="companies"
                            list={CompanyList}
                            edit={CompanyEdit}
                        />
                    ) : null}
                </>
            );
        }}
    </Admin>
);

export default App;