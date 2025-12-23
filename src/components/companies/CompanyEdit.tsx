import { Edit, SimpleForm, TextInput, required } from 'react-admin';

export const CompanyEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" validate={[required()]} fullWidth />
        </SimpleForm>
    </Edit>
);
