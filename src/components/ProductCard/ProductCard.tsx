import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useStore } from '../../store/StoreContext';
import { CartItem } from '../../store/types';

interface ProductCardProps {
    product: CartItem;
}

const ProductCard: React.FC<ProductCardProps> = observer(({ product }) => {
    const store = useStore();
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = () => {
        store.removeFromCart(product.id);
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = Math.min(product.quantity + 1, 10);
        store.changeQuantity(product.id, newQuantity);
    };

    const handleDecreaseQuantity = () => {
        const newQuantity = Math.max(product.quantity - 1, 1);
        store.changeQuantity(product.id, newQuantity);
    };

    return (
        <Card
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s',
                boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '15px' }}>{product.title}</Typography>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                    width: '100%',
                    height: '200px',
                }}>
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <Typography sx={{ marginBottom: '8px' }}>{product.description}</Typography>
                <Typography sx={{ marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>Количество:</span>
                    <IconButton onClick={handleDecreaseQuantity}>
                        <RemoveIcon />
                    </IconButton>
                    {product.quantity}
                    <IconButton onClick={handleIncreaseQuantity}>
                        <AddIcon />
                    </IconButton>
                </Typography>
                <Typography sx={{ marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>Стоимость:</span> {product.price} руб.
                </Typography>
            </CardContent>
            <IconButton sx={{ marginTop: 'auto', alignSelf: 'flex-end', marginRight: '8px', marginBottom: '8px' }} onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </Card>
    );
});

export default ProductCard;
