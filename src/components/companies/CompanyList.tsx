import { List, Datagrid, TextField, DateField, DeleteButton } from 'react-admin';

export const CompanyList = () => (
    <List exporter={false}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DeleteButton />
        </Datagrid>
    </List>
);
