import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, SafetyOutlined, BarsOutlined } from '@ant-design/icons';
// Precisamos do useNavigate aqui para lidar com o clique do menu
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom'; 

// Importa os componentes de página para serem usados nas rotas
import FuncionarioPage from '../pages/FuncionarioPage.jsx';
import EpiPage from '../pages/EpiPage.jsx'; 
import EntregaPage from '../pages/EntregaPage.jsx'; 


const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
    { key: '/funcionarios', icon: <UserOutlined />, label: 'Funcionários' },
    { key: '/epis', icon: <SafetyOutlined />, label: 'EPIs' },
    { key: '/entregas', icon: <BarsOutlined />, label: 'Registrar Entrega' },
];

const SharedLayout = () => {
    const navigate = useNavigate(); // AGORA está dentro do Router e funciona!
    const location = useLocation(); // Hook para saber a rota atual (para manter o menu ativo)
    const [collapsed, setCollapsed] = useState(false); 
    
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    
    const handleMenuClick = ({ key }) => {
        navigate(key); // Navega para a nova rota
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            
            {/* -------------------- Sider (Barra Lateral) -------------------- */}
            <Sider 
                collapsible 
                collapsed={collapsed} 
                onCollapse={setCollapsed}
                theme="dark"
                style={{ overflow: 'auto', height: '100vh' }}
            >
                <div 
                    className="logo-vertical" 
                    style={{ /* ... estilos ... */ }}>
                    {collapsed ? 'EPI' : 'Controle de EPI'}
                </div>
                
                <Menu 
                    theme="dark" 
                    // Usa a rota atual para manter o item ativo
                    selectedKeys={[location.pathname]} 
                    mode="inline" 
                    items={menuItems} 
                    onClick={handleMenuClick} 
                    style={{ whiteSpace: 'nowrap' }} 
                />
            </Sider>

            <Layout>
                <Header style={{ /* ... estilos ... */ }}>
                    <span style={{ fontSize: '1.2em' }}>Dashboard de Controle</span>
                </Header>

                <Content style={{ margin: '16px' }}> 
                    <div
                        style={{
                            padding: 24,
                            minHeight: 'calc(100vh - 120px)',
                            background: colorBgContainer, 
                            borderRadius: borderRadiusLG,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                    >
                        {/* -------------------- Rotas Aninhadas -------------------- */}
                        <Routes>
                            {/* Define as rotas que serão renderizadas no Content */}
                            <Route path="/" element={<FuncionarioPage />} /> 
                            <Route path="/funcionarios" element={<FuncionarioPage />} />
                            <Route path="/epis" element={<EpiPage />} />
                            <Route path="/entregas" element={<EntregaPage />} />
                            <Route path="*" element={<h1>404 | Página Não Encontrada</h1>} />
                        </Routes>
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center', padding: '12px 50px' }}>
                    Desenvolvido por Samuel Resende ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default SharedLayout;