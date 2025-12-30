import { List, Datagrid, TextField, DateField, EditButton, DeleteButton, usePermissions, ReferenceField } from 'react-admin';

export const RoomList = () => {
    const { permissions } = usePermissions();
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="name" />
                <ReferenceField source="unit_id" reference="units">
                    <TextField source="name" />
                </ReferenceField>
                <DateField source="created_at" />
                {permissions !== 'customer' && <EditButton />}
                {permissions !== 'customer' && <DeleteButton />}
            </Datagrid>
        </List>
    );
};
