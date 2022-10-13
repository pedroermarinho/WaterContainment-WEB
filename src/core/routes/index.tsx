import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PagesRoutes from '../routes/routes';

const WaterContainmentRoutes: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <PagesRoutes/>
            </BrowserRouter>
        </>
    )
}

export default WaterContainmentRoutes;