import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa elementos de roteamento
import SharedLayout from './components/SharedLayout.jsx'; 
// Importa todos os componentes de página para serem usados nas Rotas
import FuncionarioPage from './pages/FuncionarioPage.jsx'; 
import EpiPage from './pages/EpiPage.jsx'; 
import EntregaPage from './pages/EntregaPage.jsx'; 


const App = () => {
    return (
        // O BrowserRouter é o componente raiz do roteamento
        <BrowserRouter>
            {/* O SharedLayout é o ponto de entrada da navegação e renderiza a estrutura.
               Ele usa um padrão de rotas aninhadas, onde o <Routes> é renderizado dentro dele.
            */}
            <SharedLayout>
                 {/* Como o SharedLayout lida com o Header/Sider/Footer, 
                    colocamos as Rotas (páginas) dentro dele.
                 */}
                 <Routes>
                    <Route path="/" element={<FuncionarioPage />} /> 
                    <Route path="/funcionarios" element={<FuncionarioPage />} />
                    <Route path="/epis" element={<EpiPage />} />
                    <Route path="/entregas" element={<EntregaPage />} />
                    {/* Rota 404 */}
                    <Route path="*" element={<h1>404 | Página Não Encontrada</h1>} />
                </Routes>
            </SharedLayout>
        </BrowserRouter>
    );
};

export default App;