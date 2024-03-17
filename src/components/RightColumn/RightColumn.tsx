import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Paper, Typography, Button } from '@mui/material';
import PaymentModal from '../PaymentModal/PaymentModal.tsx';
import { useStore } from '../../store/StoreContext';

const RightColumn = observer(() => {
    const store = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'white' }}>
            <Paper sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'  }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}>Ваша корзина</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Количество товаров: {store.totalItemsCount}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Итого: {store.totalAmount.toFixed(2)} ₽</Typography>
                <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2, mb: 2 }}>Оплатить</Button>
            </Paper>
            <PaymentModal open={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
});

export default RightColumn;
