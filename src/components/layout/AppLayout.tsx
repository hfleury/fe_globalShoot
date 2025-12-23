import { Layout } from 'react-admin';
import { TopAppBar } from './TopAppBar';
import { SideMenu } from './SideMenu';

export const AppLayout = (props: any) => (
    <Layout {...props} appBar={TopAppBar} menu={SideMenu} />
);
