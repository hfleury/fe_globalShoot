import { Create, SimpleForm, TextInput, ReferenceInput, AutocompleteInput, required } from 'react-admin';

export const RoomCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth />
            <ReferenceInput source="unit_id" reference="units">
                <AutocompleteInput optionText="name" validate={[required()]} fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
