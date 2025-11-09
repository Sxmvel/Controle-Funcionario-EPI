import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, SafetyOutlined, BarsOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom'; 

// Importa os componentes de página para serem usados nas rotas
import FuncionarioPage from '../pages/FuncionarioPage.jsx';
import EpiPage from '../pages/EpiPage.jsx'; 
import EntregaPage from '../pages/EntregaPage.jsx'; 


const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
    { key: '/funcionarios', icon: <UserOutlined />, label: 'Funcionários' },
    { key: '/epis', icon: '/epis', icon: <SafetyOutlined />, label: 'EPIs' },
    { key: '/entregas', icon: <BarsOutlined />, label: 'Registrar Entrega' },
];

const SharedLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false); 
    
    // Pega as cores do tema
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    
    const handleMenuClick = ({ key }) => {
        navigate(key); 
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
                    style={{ 
                        height: 32, 
                        margin: 16, 
                        color: 'white', 
                        textAlign: 'center', 
                        lineHeight: '32px',
                        fontSize: '18px',
                        overflow: 'hidden',
                        background: 'rgba(255, 255, 255, 0.2)'
                    }}>
                    {collapsed ? 'EPI' : 'Controle de EPI'}
                </div>
                
                <Menu 
                    theme="dark" 
                    selectedKeys={[location.pathname]} 
                    mode="inline" 
                    items={menuItems} 
                    onClick={handleMenuClick} 
                    style={{ whiteSpace: 'nowrap' }} 
                />
            </Sider>

            {/* -------------------- Layout Principal (Conteúdo) -------------------- */}
            <Layout>
                
                {/* CORREÇÃO DO HEADER: Centraliza e aumenta o contraste */}
                <Header 
                    style={{ 
                        padding: '0 24px', 
                        background: colorBgContainer, 
                        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
                        zIndex: 1, 
                        display: 'flex', // Habilita flexbox
                        alignItems: 'center', // Centraliza verticalmente
                        // CORREÇÃO: Alinhamento horizontal para destaque
                        justifyContent: 'center', 
                    }}
                >
                    <span 
                        style={{ 
                            fontSize: '1.5em', // Aumenta o tamanho
                            fontWeight: 'bold', // Deixa mais forte
                            color: '#333333' // Cor escura para alto contraste
                        }}>
                        DASHBOARD DE CONTROLE
                    </span>
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