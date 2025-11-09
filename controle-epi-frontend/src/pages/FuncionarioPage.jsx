import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Input, Row, Col, Alert, Popconfirm, message } from 'antd';
import { UserAddOutlined, InfoCircleOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import api from "../api"; // Importa o serviço de API
import FuncionarioDetailsDrawer from '../components/FuncionarioDetailsDrawer';
import FuncionarioFormModal from '../components/FuncionarioFormModal';

const { Title, Text } = Typography;
const { Meta } = Card;

const mockFuncionarios = [
    { key: 1, id_funcionario: 1, nome: 'João da Silva', matricula: 'M1001', funcao: 'Operador de Máquinas', dataContratacao: '2023-01-15' },
    { key: 2, id_funcionario: 2, nome: 'Maria Oliveira', matricula: 'M1002', funcao: 'Técnico de Segurança', dataContratacao: '2022-05-20' },
    { key: 3, id_funcionario: 3, nome: 'Pedro Alvares', matricula: 'M1003', funcao: 'Gerente de Obra', dataContratacao: '2024-05-10' },
];

const FuncionarioPage = () => {
    // Estados principais
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMockMode, setIsMockMode] = useState(false);
    
    // Estados do Modal e Drawer
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedFuncionarioId, setSelectedFuncionarioId] = useState(null);
    const [editingFuncionario, setEditingFuncionario] = useState(null); 

    // FUNÇÕES CRUD E CONEXÃO
    
    // READ ALL (Função que busca todos os funcionários)
    const fetchFuncionarios = async () => {
        setLoading(true);
        try {
            const response = await api.get('/funcionarios'); 
            const dataWithKey = response.data.map(item => ({
                ...item,
                key: item.id_funcionario,
            }));
            setFuncionarios(dataWithKey);
            setIsMockMode(false);
        } catch (error) {
            console.error("Erro ao buscar funcionários na API:", error);
            setIsMockMode(true); 
            setFuncionarios(mockFuncionarios);
        } finally {
            setLoading(false);
        }
    };

    // CREATE/UPDATE (Salvar o Formulário)
    const handleSaveFuncionario = async (data) => {
        try {
            setLoading(true);
            
            if (editingFuncionario) {
                // UPDATE (PUT)
                await api.put(`/funcionarios/${editingFuncionario.id_funcionario}`, data);
                message.success('Funcionário atualizado com sucesso!');
            } else {
                // CREATE (POST)
                await api.post('/funcionarios', data);
                message.success('Funcionário cadastrado com sucesso!');
            }

            setIsModalVisible(false);
            setEditingFuncionario(null);
            fetchFuncionarios(); // Recarrega a lista

        } catch (error) {
            console.error("Erro ao salvar funcionário:", error);
            message.error('Falha ao salvar: Verifique os dados (Ex: CPF/Matrícula já cadastrados).');
        } finally {
            setLoading(false);
        }
    };

    // DELETE (Excluir funcionário)
    const handleDelete = async (id) => {
        try {
            await api.delete(`/funcionarios/${id}`);
            message.success('Funcionário excluído com sucesso!');
            fetchFuncionarios(); 
        } catch (error) {
            console.error("Erro ao excluir funcionário:", error);
            message.error('Falha ao excluir o funcionário.');
        }
    };
    
    // Funções de Gerenciamento do Modal e Drawer
    const handleEdit = (funcionario) => {
        setEditingFuncionario(funcionario);
        setIsModalVisible(true);
    };

    const handleCreate = () => {
        setEditingFuncionario(null);
        setIsModalVisible(true);
    };

    const handleInspect = (id) => {
        setSelectedFuncionarioId(id);
        setDrawerVisible(true);
    };

    // Efeito para carregar os dados na montagem
    useEffect(() => {
        fetchFuncionarios();
    }, []);

    // ESTRUTURA VISUAL: CARDS E BOTÕES ARREDONDADOS
    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            
            {/* Aviso de Modo Mock */}
            {isMockMode && (
                <Alert 
                    message="Modo de Visualização (Offline)"
                    description="Os dados exibidos são de demonstração. A conexão com a API está inativa."
                    type="warning"
                    showIcon
                />
            )}

            {/* Cabeçalho e Ação Principal (CREATE) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Title level={2} style={{ margin: 0 }}>Gestão de Colaboradores</Title>
                <Button 
                    type="primary" 
                    size="large" 
                    icon={<UserAddOutlined />} 
                    shape="round" 
                    onClick={handleCreate}
                >
                    Novo Funcionário (CREATE)
                </Button>
            </div>
            
            {/* Área de Busca e Filtros */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} md={8} lg={6}> 
                    <Input placeholder="Buscar por Nome ou Matrícula" prefix={<SearchOutlined />} allowClear />
                </Col>
            </Row>

            {/* Listagem de Cards (Grid Responsivo) */}
            <Row gutter={[24, 24]} justify="start" style={{ width: '100%' }}>
                {loading ? (
                    <Text type="secondary">Carregando...</Text>
                ) : (
                    funcionarios.map(func => (
                        <Col key={func.key} xs={24} md={12} lg={8}>
                            <Card
                                title={<Text strong style={{ color: '#1890FF' }}>{func.nome}</Text>}
                                actions={[
                                    // Botão INSPECIONAR (READ Detalhado)
                                    <Button 
                                        key="inspect"
                                        type="primary"
                                        icon={<InfoCircleOutlined />}
                                        shape="round"
                                        onClick={() => handleInspect(func.id_funcionario)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Inspecionar
                                    </Button>,
                                    // Botão DELETAR
                                    <Popconfirm
                                        key="delete"
                                        title="Tem certeza que deseja excluir?"
                                        onConfirm={() => handleDelete(func.id_funcionario)}
                                        okText="Sim"
                                        cancelText="Não"
                                    >
                                        <Button 
                                            type="default" 
                                            icon={<DeleteOutlined />} 
                                            shape="round"
                                            danger 
                                        >
                                            Deletar
                                        </Button>
                                    </Popconfirm>,
                                    // Botão EDITAR
                                    <Button 
                                        key="edit"
                                        icon={<EditOutlined />} 
                                        shape="circle"
                                        onClick={() => handleEdit(func)}
                                        title="Editar"
                                    />
                                ]}
                            >
                                <Meta 
                                    description={<Text type="secondary">Matrícula: {func.matricula} | Função: {func.funcao}</Text>}
                                />
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
            
            {/* Modals e Drawers */}
            <FuncionarioDetailsDrawer 
                visible={drawerVisible} 
                onClose={() => setDrawerVisible(false)} 
                funcionarioId={selectedFuncionarioId}
            />
            
            <FuncionarioFormModal
                visible={isModalVisible}
                onClose={() => {setIsModalVisible(false); setEditingFuncionario(null);}}
                onSave={handleSaveFuncionario}
                editingFuncionario={editingFuncionario}
            />

        </Space>
    );
};
export default FuncionarioPage;