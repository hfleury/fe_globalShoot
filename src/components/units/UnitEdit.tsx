import { Edit, SimpleForm, TextInput, SelectInput, ReferenceInput, AutocompleteInput, required } from 'react-admin';

export const UnitEdit = () => (
    <Edit>
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
    </Edit>
);
