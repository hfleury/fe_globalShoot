import { Create, SimpleForm, TextInput, ReferenceInput, AutocompleteInput, SelectInput, required, BooleanInput, FormDataConsumer, useDataProvider, useNotify, useRedirect } from 'react-admin';

export const UnitCreate = () => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = async (data: any, variables: any) => {
        if (variables.create_room && variables.room_name) {
            try {
                await dataProvider.create('rooms', { data: { name: variables.room_name, unit_id: data.id } });
                notify('Unit and Room created successfully');
            } catch (e) {
                notify('Unit created, but Room creation failed', { type: 'warning' });
                console.error(e);
            }
        } else {
            notify('Unit created successfully');
        }
        redirect('edit', 'sites', data.site_id);
    };

    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
                <TextInput source="name" validate={[required()]} fullWidth />
                <SelectInput source="type" choices={[
                    { id: 'HOUSE', name: 'House' },
                    { id: 'FLAT', name: 'Flat' },
                ]} validate={[required()]} fullWidth />
                <ReferenceInput source="site_id" reference="sites">
                    <AutocompleteInput optionText="name" validate={[required()]} fullWidth />
                </ReferenceInput>

                <BooleanInput source="create_room" label="Create a Room" />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.create_room &&
                        <TextInput source="room_name" label="Room Name" fullWidth {...rest} />
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    );
};
