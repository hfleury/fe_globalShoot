import { Create, SimpleForm, TextInput, ReferenceInput, AutocompleteInput, SelectInput, required, email, minLength } from 'react-admin';

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="email" validate={[required(), email()]} fullWidth />
            <TextInput source="password" type="password" validate={[required(), minLength(6)]} fullWidth />
            <SelectInput source="role" choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'company', name: 'Company' },
                { id: 'customer', name: 'Customer' },
            ]} validate={[required()]} fullWidth />
            <ReferenceInput source="company_id" reference="companies">
                <AutocompleteInput optionText="name" fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
