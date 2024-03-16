import { Typography, Paper } from '@mui/material';

const headerStyles = {
    backgroundColor: '#5181b8',
    color: '#fff',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '8px'
};

const badgeStyles = {
    backgroundColor: '#fff',
    color: '#5181b8',
    padding: '4px 8px',
    borderRadius: '5px',
    marginRight: '8px'
};

function Header() {
    return (
        <Paper style={headerStyles}>
            <Typography variant="h5" style={{ margin: '0', fontWeight: 'bold' }}>
                <span style={badgeStyles}>В</span>
                Контакте
            </Typography>
        </Paper>
    );
}

export default Header;
