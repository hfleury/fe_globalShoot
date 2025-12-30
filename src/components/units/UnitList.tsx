import { List, Datagrid, TextField, DateField, EditButton, DeleteButton, usePermissions, ReferenceField } from 'react-admin';

export const UnitList = () => {
    const { permissions } = usePermissions();
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="name" />
                <TextField source="type" />
                <ReferenceField source="site_id" reference="sites">
                    <TextField source="name" />
                </ReferenceField>
                <DateField source="created_at" />
                {permissions !== 'customer' && <EditButton />}
                {permissions !== 'customer' && <DeleteButton />}
            </Datagrid>
        </List>
    );
};
