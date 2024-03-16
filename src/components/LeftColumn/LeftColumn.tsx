import React from 'react';
import { observer } from 'mobx-react-lite';
import { List, ListItem, Divider, Typography } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import { useStore } from '../../store/StoreContext';

const LeftColumn: React.FC = observer(() => {
    const store = useStore();

    return (
        <List sx={{ width: '100%' }}>
            {store.cartItems.length === 0 ? (
                <Typography variant="body1" align="center" sx={{ py: 2 }}>
                    Корзина пуста
                </Typography>
            ) : (
                store.cartItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <ListItem>
                            <ProductCard product={item} />
                        </ListItem>
                        {index < store.cartItems.length - 1 && <Divider />}
                    </React.Fragment>
                ))
            )}
        </List>
    );
});

export default LeftColumn;
