import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Input, Row, Col, List, Popconfirm, Alert, message } from 'antd';
import { SafetyOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import api from "../api"; 
import EpiFormModal from '../components/EpiFormModal';

const { Title, Text } = Typography;
const { Meta } = Card;

// Dados Falsos (Mock) para fallback
const mockEPIs = {
    'Capacete de Segurança': [
        { id_epi: 1, tipoEpi: 'Capacete de Segurança', codigoReferencia: 'CAP001', numeroCa: '33456', dataValidadeCa: '2027-12-31' },
    ],
    'Luva de Raspa': [
        { id_epi: 2, tipoEpi: 'Luva de Raspa', codigoReferencia: 'LUV002', numeroCa: '18005', dataValidadeCa: '2026-06-30' },
    ],
    'Óculos de Proteção': [
        { id_epi: 3, tipoEpi: 'Óculos de Proteção', codigoReferencia: 'OCU003', numeroCa: '10340', dataValidadeCa: '2028-01-10' },
    ]
};

const EpiPage = () => {
    const [epis, setEpis] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [isMockMode, setIsMockMode] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEpi, setEditingEpi] = useState(null); 
    
    // Controla qual Card de Categoria está aberto
    const [expandedCategory, setExpandedCategory] = useState(null); 

    const groupByTipo = (data) => {
        return data.reduce((acc, epi) => {
            const tipo = epi.tipoEpi || 'Outros'; 
            if (!acc[tipo]) {
                acc[tipo] = [];
            }
            acc[tipo].push({ ...epi, key: epi.id_epi }); 
            return acc;
        }, {});
    };

    const toggleCategory = (tipo) => {
        setExpandedCategory(expandedCategory === tipo ? null : tipo);
    };

    // -----------------------------------------------------------------
    // FUNÇÕES CRUD E CONEXÃO
    // -----------------------------------------------------------------
    const fetchEPIs = async () => {
        setLoading(true);
        try {
            const response = await api.get('/epis'); 
            const groupedEpis = groupByTipo(response.data);
            setEpis(groupedEpis);
            setIsMockMode(false);
        } catch (error) {
            console.error("Erro ao buscar EPIs:", error);
            setIsMockMode(true); 
            setEpis(mockEPIs);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSaveEPI = async (data) => {
        try {
            setLoading(true);
            
            if (editingEpi?.id_epi) { // Verifica se tem ID para UPDATE
                await api.put(`/epis/${editingEpi.id_epi}`, data);
                message.success('EPI atualizado com sucesso!');
            } else {
                await api.post('/epis', data);
                message.success('EPI cadastrado com sucesso!');
            }

            setIsModalVisible(false); 
            setEditingEpi(null);
            fetchEPIs(); 

        } catch (error) {
            console.error("Erro ao salvar EPI:", error);
            message.error('Falha ao salvar: Verifique o CA (Certificado de Aprovação) ou se já existe.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/epis/${id}`);
            message.success('EPI excluído com sucesso!');
            fetchEPIs(); 
        } catch (error) {
            console.error("Erro ao excluir EPI:", error);
            message.error('Falha ao excluir o EPI. Pode estar associado a uma entrega.');
        }
    };

    useEffect(() => {
        fetchEPIs();
    }, []);

    const handleEdit = (epi) => {
        setEditingEpi(epi);
        setIsModalVisible(true);
    };
    
    // NOVO: Função para abrir o modal de cadastro pré-preenchido
    const handleCreateSpecific = (tipoEpi) => {
        // Objeto temporário com o 'tipoEpi' preenchido, mas sem 'id_epi'
        setEditingEpi({ tipoEpi: tipoEpi }); 
        setIsModalVisible(true); 
    };

    // -----------------------------------------------------------------
    // ESTRUTURA VISUAL: CARDS POR CATEGORIA (CLICÁVEIS)
    // -----------------------------------------------------------------
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

            {/* Cabeçalho e Ação Principal (CREATE GERAL) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Title level={2} style={{ margin: 0 }}>Gestão de EPIs por Categoria</Title>
                <Button 
                    type="primary" 
                    size="large" 
                    icon={<PlusOutlined />} 
                    shape="round" 
                    onClick={() => { setEditingEpi(null); setIsModalVisible(true); }}
                >
                    Novo EPI (Geral)
                </Button>
            </div>
            
            {/* Área de Busca e Filtros */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} md={8} lg={6}> 
                    <Input placeholder="Buscar por CA ou Código" prefix={<SearchOutlined />} allowClear />
                </Col>
            </Row>

            {/* Listagem de Cards Clicáveis */}
            <Row gutter={[24, 24]} justify="start" style={{ width: '100%' }}>
                {loading ? (
                    <Text type="secondary">Carregando categorias...</Text>
                ) : (
                    Object.entries(epis).map(([tipo, listaEPIs]) => {
                        const isExpanded = expandedCategory === tipo;
                        return (
                            <Col key={tipo} xs={24} md={12} lg={8}>
                                <Card
                                    title={<Title level={4} style={{ margin: 0, color: '#1890FF', cursor: 'pointer' }} onClick={() => toggleCategory(tipo)}>{tipo} ({listaEPIs.length})</Title>}
                                    
                                    // NOVO ELEMENTO EXTRA: Botão de Cadastro E o ícone de expansão
                                    extra={
                                        <Space size="small">
                                            {/* Botão de Cadastro Específico */}
                                            <Button 
                                                icon={<PlusOutlined />} 
                                                shape="circle" 
                                                size="small"
                                                type="primary"
                                                onClick={(e) => { e.stopPropagation(); handleCreateSpecific(tipo); }} // Ação de Cadastro
                                                title={`Cadastrar novo ${tipo}`}
                                            />
                                            {/* Ícone de Expansão */}
                                            <Button 
                                                icon={isExpanded ? <UpOutlined /> : <DownOutlined />} 
                                                shape="circle"
                                                size="small"
                                                onClick={() => toggleCategory(tipo)}
                                                type="text"
                                            />
                                        </Space>
                                    }
                                    
                                    bodyStyle={{ padding: 0 }}
                                    style={{ borderColor: isExpanded ? '#1890FF' : '#f0f0f0', transition: 'border-color 0.3s' }}
                                >
                                    {/* CONTEÚDO EXPANSÍVEL (A Lista Aninhada) */}
                                    {isExpanded && (
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={listaEPIs}
                                            renderItem={(item) => (
                                                <List.Item
                                                    style={{ padding: '12px 24px', borderBottom: '1px solid #f0f0f0' }}
                                                    actions={[
                                                        // Botão EDITAR
                                                        <Button 
                                                            key="edit"
                                                            icon={<EditOutlined />} 
                                                            shape="circle"
                                                            onClick={(e) => { e.stopPropagation(); handleEdit(item); }} 
                                                            title="Editar"
                                                        />,
                                                        // Botão DELETAR
                                                        <Popconfirm
                                                            key="delete"
                                                            title="Excluir este EPI?"
                                                            onConfirm={() => handleDelete(item.id_epi)}
                                                            okText="Sim"
                                                            cancelText="Não"
                                                        >
                                                            <Button 
                                                                type="default" 
                                                                icon={<DeleteOutlined />} 
                                                                shape="circle"
                                                                danger 
                                                                onClick={(e) => e.stopPropagation()} 
                                                            />
                                                        </Popconfirm>
                                                    ]}
                                                >
                                                    <Meta 
                                                        title={<Text strong>{item.numeroCa}</Text>} 
                                                        description={
                                                            <Space direction="vertical" size={0}>
                                                                <Text type="secondary">Cód. Ref.: {item.codigoReferencia || 'N/A'}</Text>
                                                                <Text type="secondary" style={{ color: item.dataValidadeCa && new Date(item.dataValidadeCa) < new Date() ? 'red' : 'inherit' }}>
                                                                    Validade CA: {new Date(item.dataValidadeCa).toLocaleDateString('pt-BR')}
                                                                </Text>
                                                            </Space>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    )}
                                </Card>
                            </Col>
                        );
                    })
                )}
            </Row>

            {/* Modal de Criação e Edição */}
            <EpiFormModal
                visible={isModalVisible}
                onClose={() => {setIsModalVisible(false); setEditingEpi(null);}}
                onSave={handleSaveEPI}
                editingEpi={editingEpi}
            />
        </Space>
    );
};

export default EpiPage;