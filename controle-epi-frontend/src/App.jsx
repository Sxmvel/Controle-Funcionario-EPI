import React, { useState } from 'react';
import SharedLayout from './components/SharedLayout';
import FuncionarioPage from './pages/FuncionarioPage.jsx';
import EpiPage from './pages/EpiPage';
import EntregaPage from './pages/EntregaPage';

// Componentes vazios (para não dar erro)
const EpiPagePlaceholder = () => <h2>Gestão de EPIs (Em Construção)</h2>;
const EntregaPagePlaceholder = () => <h2>Registro de Entregas (Em Construção)</h2>;

const App = () => {
    const [selectedKey, setSelectedKey] = useState('funcionarios');

    // Função para renderizar o conteúdo com base no menu selecionado
    const renderContent = () => {
        switch (selectedKey) {
            case 'funcionarios':
                return <FuncionarioPage />;
            case 'epis':
                // Temporariamente, usamos um placeholder até implementarmos a lógica
                return <EpiPagePlaceholder />; 
            case 'entregas':
                return <EntregaPagePlaceholder />; 
            default:
                return <h2>Selecione uma opção no menu lateral</h2>;
        }
    };

    return (
        <SharedLayout onSelectKey={setSelectedKey}>
            {renderContent()}
        </SharedLayout>
    );
};

export default App;