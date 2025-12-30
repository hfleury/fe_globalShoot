import { List, Datagrid, TextField, ReferenceField, EditButton, DeleteButton, SelectField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="email" />
            <SelectField source="role" choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'company', name: 'Company' },
                { id: 'customer', name: 'Customer' },
            ]} />
            <ReferenceField source="company_id" reference="companies" emptyText="-">
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
