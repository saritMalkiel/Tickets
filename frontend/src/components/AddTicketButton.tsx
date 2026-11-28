import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import AddUpdate from './AddTickets';

function AddTicketButton() {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const closeAddDialog = () => setIsAddOpen(false);

    return (
        <>
            <Button
                variant="contained"
                color="inherit"
                startIcon={<AddIcon />}
                onClick={() => setIsAddOpen(true)}
                sx={{ color: 'primary.main', bgcolor: 'common.white', '&:hover': { bgcolor: 'grey.100' } }}
            >
                Add New Ticket
            </Button>

            <Dialog open={isAddOpen} onClose={closeAddDialog} maxWidth="sm" fullWidth>
                <AddUpdate onCreated={closeAddDialog} onClose={closeAddDialog} />
            </Dialog>
        </>
    );
}

export default AddTicketButton;
