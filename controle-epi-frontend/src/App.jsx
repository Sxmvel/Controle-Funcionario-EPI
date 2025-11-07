import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, SafetyOutlined, BarsOutlined } from '@ant-design/icons';
// Importamos o componente de página
import FuncionarioPage from "./pages/FuncionarioPage.jsx";
// Importamos o CSS global (vamos criar este arquivo também)
import './App.css'; 
import FuncionarioPage from "./pages/FuncionarioPage.jsx";


const { Header, Content, Footer, Sider } = Layout;

// Componentes temporários (serão substituídos)
const EpiPage = () => <h2>Gestão de EPIs (CRUD)</h2>;
const EntregaPage = () => <h2>Registro de Entregas</h2>;

// Definindo os itens do menu
const menuItems = [
    { key: 'funcionarios', icon: <UserOutlined />, label: 'Funcionários' },
    { key: 'epis', icon: <SafetyOutlined />, label: 'EPIs' },
    { key: 'entregas', icon: <BarsOutlined />, label: 'Registrar Entrega' },
];

const App = () => {
    const [selectedKey, setSelectedKey] = useState('funcionarios');
    const [collapsed, setCollapsed] = useState(false); // Adicionamos controle de colapso

    // Função para renderizar o conteúdo com base no menu selecionado
    const renderContent = () => {
        switch (selectedKey) {
            case 'funcionarios':
                // Nota: Usaremos o FuncionarioPage real
                return <FuncionarioPage />; 
            case 'epis':
                return <EpiPage />;
            case 'entregas':
                return <EntregaPage />;
            default:
                return <h2>Bem-vindo ao Sistema de Controle de EPI</h2>;
        }
    };
    
    // Obter o tema e cores do Ant Design
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        // Ocupa 100% da altura da viewport
        <Layout style={{ minHeight: '100vh' }}> 
            
            {/* -------------------- Barra Lateral (Sider) - Tema Escuro -------------------- */}
            <Sider 
                collapsible 
                collapsed={collapsed} 
                onCollapse={(value) => setCollapsed(value)}
                theme="dark" // Define o tema escuro para a barra lateral
            >
                <div className="logo" /> {/* Espaço para o Logo */}
                <Menu 
                    theme="dark" 
                    defaultSelectedKeys={[selectedKey]} 
                    mode="inline" 
                    items={menuItems} 
                    onClick={({ key }) => setSelectedKey(key)}
                />
            </Sider>

            <Layout>
                {/* -------------------- Cabeçalho - Tema Claro -------------------- */}
                <Header 
                    style={{ 
                        padding: 0, 
                        background: colorBgContainer, 
                        color: 'black', 
                        fontSize: '18px',
                        paddingLeft: 20
                    }}
                >
                    Controle de Funcionários e EPIs
                </Header>

                {/* -------------------- Conteúdo Principal -------------------- */}
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer, // Fundo claro do conteúdo
                        }}
                    >
                        {renderContent()}
                    </div>
                </Content>

                {/* -------------------- Rodapé -------------------- */}
                <Footer style={{ textAlign: 'center' }}>
                    Criado por Samuel Resende | Parceiro de Programação ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;