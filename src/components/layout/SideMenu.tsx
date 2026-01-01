import { Menu } from 'react-admin';

export const SideMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.ResourceItem name="companies" />
        <Menu.ResourceItem name="users" />
        <Menu.ResourceItem name="sites" />
    </Menu>
);
