import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { useNotify, useRefresh } from 'react-admin';
import { httpClient } from '../../utils/httpClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/v1';

interface UnitBatchCreateProps {
    siteId: string;
}

export const UnitBatchCreate = ({ siteId }: UnitBatchCreateProps) => {
    const [open, setOpen] = useState(false);
    const [numFloors, setNumFloors] = useState(1);
    const [unitsPerFloor, setUnitsPerFloor] = useState(1);
    const [startFloor, setStartFloor] = useState(1);
    const [baseName, setBaseName] = useState('Floor {floor} Unit {unit}');
    const [unitType, setUnitType] = useState('FLAT');

    const notify = useNotify();
    const refresh = useRefresh();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        const units = [];
        for (let f = 0; f < numFloors; f++) {
            const floorNum = startFloor + f;
            for (let u = 0; u < unitsPerFloor; u++) {
                const unitNum = u + 1;
                // Simple template replacement
                const name = baseName
                    .replace('{floor}', floorNum.toString())
                    .replace('{unit}', unitNum.toString());

                units.push({
                    name,
                    type: unitType,
                    site_id: siteId,
                    client_id: null
                });
            }
        }

        try {
            await httpClient(`${API_URL}/units/batch`, {
                method: 'POST',
                body: JSON.stringify(units),
            });
            notify('Units created successfully', { type: 'success' });
            refresh();
            handleClose();
        } catch (error) {
            notify('Error creating units', { type: 'error' });
            console.error(error);
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginBottom: 2 }}>
                Generate Units
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Batch Create Units</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Number of Floors"
                        type="number"
                        fullWidth
                        value={numFloors}
                        onChange={(e) => setNumFloors(parseInt(e.target.value))}
                    />
                    <TextField
                        margin="dense"
                        label="Units Per Floor"
                        type="number"
                        fullWidth
                        value={unitsPerFloor}
                        onChange={(e) => setUnitsPerFloor(parseInt(e.target.value))}
                    />
                    <TextField
                        margin="dense"
                        label="Starting Floor Number"
                        type="number"
                        fullWidth
                        value={startFloor}
                        onChange={(e) => setStartFloor(parseInt(e.target.value))}
                    />
                    <TextField
                        margin="dense"
                        label="Name Template (use {floor} and {unit})"
                        fullWidth
                        value={baseName}
                        onChange={(e) => setBaseName(e.target.value)}
                        helperText="Example: Floor {floor} - Unit {unit}"
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Unit Type"
                        fullWidth
                        value={unitType}
                        onChange={(e) => setUnitType(e.target.value)}
                    >
                        <MenuItem value="FLAT">Flat</MenuItem>
                        <MenuItem value="HOUSE">House</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Generate {numFloors * unitsPerFloor} Units
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
