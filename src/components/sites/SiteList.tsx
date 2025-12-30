import { List, Datagrid, TextField, DateField, EditButton, DeleteButton, usePermissions } from 'react-admin';

export const SiteList = () => {
    const { permissions } = usePermissions();
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="name" />
                <TextField source="address" />
                <DateField source="created_at" />
                {permissions !== 'customer' && <EditButton />}
                {permissions !== 'customer' && <DeleteButton />}
            </Datagrid>
        </List>
    );
};
