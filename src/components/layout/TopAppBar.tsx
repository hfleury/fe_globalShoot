import { AppBar, TitlePortal } from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TopAppBar = () => (
    <AppBar>
        <TitlePortal />
        <Box flex="1">
            <Typography variant="h6" id="react-admin-title"></Typography>
        </Box>
    </AppBar>
);
