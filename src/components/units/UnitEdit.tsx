import { Edit, TabbedForm, FormTab, TextInput, SelectInput, ReferenceInput, AutocompleteInput, required, ReferenceManyField, Datagrid, TextField, DateField, EditButton, DeleteButton, useRecordContext, TopToolbar, ListButton, Button } from 'react-admin';
import { RoomInlineCreate } from '../rooms/RoomInlineCreate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const UnitEditActions = () => {
    const record = useRecordContext();
    return (
        <TopToolbar>
            {record && record.site_id && (
                <Button
                    component={Link}
                    to={`/sites/${record.site_id}`}
                    label="Back to Construction"
                    startIcon={<ArrowBackIcon />}
                >
                </Button>
            )}
            <ListButton />
        </TopToolbar>
    );
};

const RoomsTabContent = () => {
    const record = useRecordContext();
    if (!record) return null;
    return (
        <>
            <RoomInlineCreate unitId={String(record.id)} />
            <ReferenceManyField reference="rooms" target="unit_id" label={false}>
                <Datagrid rowClick="edit">
                    <TextField source="name" />
                    <DateField source="created_at" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            </ReferenceManyField>
        </>
    );
};

export const UnitEdit = () => (
    <Edit actions={<UnitEditActions />}>
        <TabbedForm>
            <FormTab label="Details">
                <TextInput source="name" validate={[required()]} fullWidth />
                <SelectInput source="type" choices={[
                    { id: 'HOUSE', name: 'House' },
                    { id: 'FLAT', name: 'Flat' },
                ]} validate={[required()]} fullWidth />
                <ReferenceInput source="site_id" reference="sites">
                    <AutocompleteInput optionText="name" validate={[required()]} fullWidth />
                </ReferenceInput>
            </FormTab>
            <FormTab label="Rooms">
                <RoomsTabContent />
            </FormTab>
        </TabbedForm>
    </Edit>
);
