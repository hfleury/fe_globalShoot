import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useCreate, useNotify, useRefresh } from 'react-admin';
import AddIcon from '@mui/icons-material/Add';

interface RoomInlineCreateProps {
    unitId: string;
}

export const RoomInlineCreate = ({ unitId }: RoomInlineCreateProps) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [create, { isLoading }] = useCreate();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setName('');
    };

    const handleSubmit = (addAnother = false) => {
        create(
            'rooms',
            { data: { name, unit_id: unitId } },
            {
                onSuccess: () => {
                    notify('Room created successfully', { type: 'success' });
                    refresh();
                    if (!addAnother) {
                        handleClose();
                    } else {
                        setName('');
                    }
                },
                onError: (error: any) => {
                    notify(`Error creating room: ${error.message}`, { type: 'error' });
                }
            }
        );
    };

    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ marginBottom: 2 }}
            >
                Add Room
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add Room</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Room Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleSubmit(true)}
                        color="primary"
                        disabled={isLoading || !name}
                    >
                        Save & Add Another
                    </Button>
                    <Button
                        onClick={() => handleSubmit(false)}
                        color="primary"
                        variant="contained"
                        disabled={isLoading || !name}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
