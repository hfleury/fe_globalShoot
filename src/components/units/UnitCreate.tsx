import { Create, SimpleForm, TextInput, ReferenceInput, AutocompleteInput, SelectInput, required } from 'react-admin';

export const UnitCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth />
            <SelectInput source="type" choices={[
                { id: 'HOUSE', name: 'House' },
                { id: 'FLAT', name: 'Flat' },
            ]} validate={[required()]} fullWidth />
            <ReferenceInput source="site_id" reference="sites">
                <AutocompleteInput optionText="name" validate={[required()]} fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
