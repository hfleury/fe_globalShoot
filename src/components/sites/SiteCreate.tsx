import { Create, SimpleForm, TextInput, ReferenceInput, AutocompleteInput, required, usePermissions } from 'react-admin';

export const SiteCreate = () => {
    const { permissions } = usePermissions();
    return (
        <Create>
            <SimpleForm>
                <TextInput source="name" validate={[required()]} fullWidth />
                <TextInput source="address" fullWidth />
                <ReferenceInput source="company_id" reference="companies">
                    <AutocompleteInput optionText="name" validate={[required()]} fullWidth disabled={permissions === 'company'} />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
