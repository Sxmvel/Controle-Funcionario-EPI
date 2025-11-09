import React from 'react';
// Importamos APENAS o BrowserRouter
import { BrowserRouter } from 'react-router-dom'; 
import SharedLayout from './components/SharedLayout.jsx'; 

const App = () => {
    return (
        // CORREÇÃO CRUCIAL: O BrowserRouter deve ser o componente mais externo para a navegação funcionar
        <BrowserRouter>
            {/* SharedLayout é o ponto de entrada da navegação e vai renderizar o Header/Menu */}
            <SharedLayout />
        </BrowserRouter>
    );
};

export default App;