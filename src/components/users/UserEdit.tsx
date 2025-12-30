import { Edit, SimpleForm, TextInput, ReferenceInput, AutocompleteInput, SelectInput, required, email } from 'react-admin';

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled fullWidth />
            <TextInput source="email" validate={[required(), email()]} fullWidth />
            <SelectInput source="role" choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'company', name: 'Company' },
                { id: 'customer', name: 'Customer' },
            ]} validate={[required()]} fullWidth />
            <ReferenceInput source="company_id" reference="companies">
                <AutocompleteInput optionText="name" fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
