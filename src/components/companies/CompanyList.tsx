import { List, Datagrid, TextField, DateField, DeleteButton, usePermissions } from 'react-admin';

export const CompanyList = () => {
    const { permissions } = usePermissions();
    return (
        <List exporter={false}>
            <Datagrid rowClick="edit" bulkActionButtons={false}>
                <TextField source="id" />
                <TextField source="name" />
                <DateField source="created_at" />
                {permissions === 'admin' && <DeleteButton />}
            </Datagrid>
        </List>
    );
};
