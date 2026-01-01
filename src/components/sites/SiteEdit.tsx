import { Edit, TabbedForm, FormTab, TextInput, required, ReferenceManyField, Datagrid, TextField, DateField, EditButton, DeleteButton, useRecordContext } from 'react-admin';
import { UnitBatchCreate } from '../units/UnitBatchCreate';

const UnitsTabContent = () => {
    const record = useRecordContext();
    if (!record) return null;
    return (
        <>
            <UnitBatchCreate siteId={String(record.id)} />
            <ReferenceManyField reference="units" target="site_id" label={false}>
                <Datagrid rowClick="edit">
                    <TextField source="name" />
                    <TextField source="type" />
                    <DateField source="created_at" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            </ReferenceManyField>
        </>
    );
};

export const SiteEdit = () => (
    <Edit>
        <TabbedForm>
            <FormTab label="Details">
                <TextInput source="name" validate={[required()]} fullWidth />
                <TextInput source="address" fullWidth />
            </FormTab>
            <FormTab label="Units">
                <UnitsTabContent />
            </FormTab>
        </TabbedForm>
    </Edit>
);
