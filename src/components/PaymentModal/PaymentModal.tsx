import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import sorryImage from '../../assets/sorry.png';

interface PaymentModalProps {
    open: boolean;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '80%', maxHeight: '80%', overflow: 'auto' }}>
                <IconButton sx={{ position: 'absolute', top: '8px', right: '8px' }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <img src={sorryImage} alt="Payment" style={{ width: '100%' }} />
            </Box>
        </Modal>
    );
};

export default PaymentModal;
