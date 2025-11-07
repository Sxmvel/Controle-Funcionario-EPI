import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, SafetyOutlined, BarsOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom'; // Usaremos isso se implementarmos roteamento mais tarde, por agora é apenas um placeholder

const { Header, Content, Footer, Sider } = Layout;

// Dados de Navegação
const menuItems = [
    {
        key: 'funcionarios',
        icon: <UserOutlined />,
        label: 'Funcionários',
    },
    {
        key: 'epis',
        icon: <SafetyOutlined />,
        label: 'EPIs',
    },
    {
        key: 'entregas',
        icon: <BarsOutlined />,
        label: 'Registrar Entrega',
    },
];

const SharedLayout = ({ children, onSelectKey }) => {
    // Definimos o estado para controlar se a barra lateral está colapsada
    const [collapsed, setCollapsed] = useState(false); 
    
    // Tema do Ant Design para cores
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            
            {/* -------------------- Barra Lateral (Sider) - Responsiva -------------------- */}
            <Sider 
                collapsible 
                collapsed={collapsed} 
                onCollapse={(value) => setCollapsed(value)}
                breakpoint="lg" // Colapsa automaticamente em telas grandes (Ex: 992px)
                theme="dark"
                // Responsividade: A barra lateral se torna um Drawer em telas pequenas
                style={{
                    overflow: 'auto', 
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div 
                    className="logo-vertical" 
                    style={{ 
                        height: 32, 
                        margin: 16, 
                        color: 'white', 
                        textAlign: 'center', 
                        lineHeight: '32px',
                        fontSize: collapsed ? '14px' : '18px',
                        transition: 'all 0.2s',
                    }}>
                    {collapsed ? 'EPI' : 'Controle de EPI'}
                </div>
                
                <Menu 
                    theme="dark" 
                    defaultSelectedKeys={['funcionarios']} 
                    mode="inline" 
                    items={menuItems} 
                    onClick={({ key }) => onSelectKey(key)} // Passa a seleção para o componente pai
                />
            </Sider>

            {/* -------------------- Conteúdo Principal e Header -------------------- */}
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
                
                <Header 
                    style={{ 
                        padding: '0 24px', 
                        background: colorBgContainer, 
                        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
                        zIndex: 1, // Garante que o cabeçalho fique sobre o conteúdo
                    }}
                >
                    {/* Aqui podemos adicionar um componente de Notificações ou Perfil futuramente */}
                    <span style={{ fontSize: '1.2em' }}>Bem-vindo ao Dashboard</span>
                </Header>

                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 'calc(100vh - 160px)', // Ocupa a altura restante
                            background: colorBgContainer, 
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', // Sutil elevação
                        }}
                    >
                        {children}
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Desenvolvimento Web ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default SharedLayout;