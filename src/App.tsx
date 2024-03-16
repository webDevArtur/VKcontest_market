import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Header from './components/Header/Header';
import LeftColumn from './components/LeftColumn/LeftColumn';
import RightColumn from './components/RightColumn/RightColumn';
import { useStore } from './store/StoreContext';
import { Alert, AlertTitle } from '@mui/material';

function App() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const store = useStore();

    return (
        <>
            <Header />
            {store.error ? (
                <Alert severity="error" style={{ margin: '16px' }}>
                    <AlertTitle>Ошибка</AlertTitle>
                    {store.error}
                </Alert>
            ) : (
                <Grid container spacing={2}>
                    {isSmallScreen ? (
                        <>
                            <Grid item xs={12}>
                                <RightColumn />
                            </Grid>
                            <Grid item xs={12}>
                                <LeftColumn />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item md={9} lg={9}>
                                <LeftColumn />
                            </Grid>
                            <Grid item md={3} lg={3}>
                                <RightColumn />
                            </Grid>
                        </>
                    )}
                </Grid>
            )}
        </>
    );
}

export default App;
