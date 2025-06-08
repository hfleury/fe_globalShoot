import type { DataProvider, RaRecord } from 'react-admin';
import { Admin, Resource } from 'react-admin';
import { authProvider } from './components/auth/authProvider';
import { LoginPage } from './components/auth/LoginPage';
import { PostList } from './components/login/posts';

// Dummy data provider for testing
const dataProvider: DataProvider = {
    getList: () => Promise.resolve({ data: [], total: 0 }),
    getOne: <RecordType extends RaRecord = any>(resource: string, params: { id: RecordType['id'] }) =>
        Promise.resolve({ data: { id: params.id } as RecordType }),
    getMany: () => Promise.resolve({ data: [] }),
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    create: <RecordType extends Omit<RaRecord, 'id'> = any, ResultRecordType extends RaRecord = RecordType & { id: any }>(
        resource: string,
        params: { data: RecordType }
    ) =>
        Promise.resolve({
            data: { ...params.data, id: Date.now() } as unknown as ResultRecordType,
        }),
    update: <RecordType extends RaRecord = any>(
        resource: string,
        params: { id: RecordType['id']; data: Partial<RecordType> }
    ) =>
        Promise.resolve({
            data: { ...params.data, id: params.id } as RecordType,
        }),
    updateMany: () => Promise.resolve({ data: [] }),
    delete: <RecordType extends RaRecord = any>(
        resource: string,
        params: { id: RecordType['id']; previousData?: RecordType }
    ) =>
        Promise.resolve({
            data: (params.previousData ?? { id: params.id }) as RecordType,
        }),
    deleteMany: () => Promise.resolve({ data: [] }),
};

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
  >
    <Resource name="posts" list={PostList} />
  </Admin>
);

export default App;