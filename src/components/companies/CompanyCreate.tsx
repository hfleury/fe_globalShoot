import { Create, SimpleForm, TextInput, required, email } from 'react-admin';

export const CompanyCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth />
            <TextInput source="email" validate={[required(), email()]} fullWidth />
            <TextInput source="password" type="password" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
);
