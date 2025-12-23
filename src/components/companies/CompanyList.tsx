import { List, Datagrid, TextField, DateField, DeleteButton } from 'react-admin';

export const CompanyList = () => (
    <List exporter={false} bulkActionButtons={false}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            <DeleteButton />
        </Datagrid>
    </List>
);
