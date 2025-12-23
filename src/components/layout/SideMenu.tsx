import { Menu } from 'react-admin';
import BusinessIcon from '@mui/icons-material/Business';

export const SideMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.Item to="/companies" primaryText="Companies" leftIcon={<BusinessIcon />} />
    </Menu>
);
