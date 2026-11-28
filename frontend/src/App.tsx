import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tickets from './components/Tickets';
import AddTicketButton from './components/AddTicketButton';

function App() {
  return (
    <>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Tickets Management
          </Typography>
          <AddTicketButton />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Tickets />
      </Container>
    </>
  )
}

export default App
