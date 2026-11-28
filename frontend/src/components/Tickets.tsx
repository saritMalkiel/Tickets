import { useTickets, useDeleteTicket, useUpdateTicket } from '../hook/tickets';
import { useState } from 'react';
import { TICKET_STATUSES, TICKET_URGENCIES } from '../model/ticket';
import type { TicketStatus, TicketUrgency } from '../model/ticket';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import DeleteTicket from './DeleteTicket';

const urgencyColor: Record<TicketUrgency, 'success' | 'warning' | 'error'> = {
    low: 'success',
    medium: 'warning',
    high: 'error',
};

const statusColor: Record<TicketStatus, 'info' | 'warning' | 'success'> = {
    open: 'info',
    inProgress: 'warning',
    closed: 'success',
};

function Tickets() {
    const [status, setStatus] = useState<TicketStatus | ''>('');
    const [urgency, setUrgency] = useState<TicketUrgency | ''>('');
    const [searchKey, setSearchKey] = useState<string | ''>('');
    const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);

    const { data, isLoading, isError } = useTickets(
        status || undefined,
        urgency || undefined
    );
    const { mutate: deleteTicket, isError: isDeleteError, isPending: isDeleting, variables: deletingId } = useDeleteTicket();
    const { mutate: updateStatus, isError: isUpdateError, isPending: isUpdatingStatus, variables: updatingStatusVars } = useUpdateTicket();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }
    if (isError) {
        return <Alert severity="error">Something went wrong. Please try again later.</Alert>;
    }
    const filteredTickets = data?.filter(ticket =>
        !searchKey || ticket.title.toLowerCase().includes(searchKey.toLowerCase())
    ) ?? [];
    return (
        <Box>
            <Stack spacing={2} sx={{ mb: 2 }}>
                {isDeleteError && <Alert severity="error">Failed to delete the ticket. Please try again.</Alert>}
                {isUpdateError && <Alert severity="error">Failed to update the status. Please try again.</Alert>}

                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'center' } }}>
                        <TextField
                            label="Search by title"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            size="small"
                            sx={{ minWidth: 220 }}
                        />                       
                        <TextField
                            select
                            label="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TicketStatus | '')}
                            size="small"
                            sx={{ minWidth: 160 }}
                        >
                            <MenuItem value="">All status</MenuItem>
                            {TICKET_STATUSES.map(item => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Urgency"
                            value={urgency}
                            onChange={(e) => setUrgency(e.target.value as TicketUrgency | '')}
                            size="small"
                            sx={{ minWidth: 160 }}
                        >
                            <MenuItem value="">All Urgencies</MenuItem>
                            {TICKET_URGENCIES.map(item => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            variant="outlined"
                            onClick={() => { setStatus(''); setUrgency(''); setSearchKey(''); }}
                        >
                            Clear Filters
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Urgency</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTickets.map(ticket => {
                            const isRowDeleting = isDeleting && deletingId === ticket.id;
                            const isRowUpdatingStatus = isUpdatingStatus && updatingStatusVars?.id === ticket.id;
                            return (
                            <TableRow key={ticket.id} hover>
                                <TableCell>{ticket.id}</TableCell>
                                <TableCell>{ticket.title}</TableCell>
                                <TableCell>{ticket.description}</TableCell>
                                <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip label={ticket.status} color={statusColor[ticket.status]} size="small" />
                                </TableCell>
                                <TableCell>
                                    <Chip label={ticket.urgency} color={urgencyColor[ticket.urgency]} size="small" />
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <TextField
                                            select
                                            size="small"
                                            value={ticket.status}
                                            onChange={(e) => updateStatus({ id: ticket.id, status: e.target.value as TicketStatus })}
                                            disabled={isRowUpdatingStatus}
                                            sx={{ minWidth: 120 }}
                                        >
                                            {TICKET_STATUSES.map(item => (
                                                <MenuItem key={item} value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <IconButton
                                            color="error"
                                            aria-label="delete"
                                            onClick={() => setTicketToDelete(ticket.id)}
                                            disabled={isRowDeleting}
                                        >
                                            {isRowDeleting ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {filteredTickets.length === 0 && (
                    <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                        No tickets to display.
                    </Typography>
                )}
            </TableContainer>
            <DeleteTicket
                open={ticketToDelete !== null}
                title="Delete ticket"
                message="Are you sure you want to delete this ticket? This action cannot be undone."
                confirmLabel="Delete"
                onCancel={() => setTicketToDelete(null)}
                onConfirm={() => {
                    if (ticketToDelete !== null) {
                        deleteTicket(ticketToDelete);
                        setTicketToDelete(null);
                    }
                }}
            />
        </Box>

    )
}

export default Tickets
