import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Form, Select, DatePicker, InputNumber, Alert, message, Divider, Table, Row, Col } from 'antd'; // Garantindo todos os componentes importados
import { SaveOutlined, BarcodeOutlined } from '@ant-design/icons';
import api from "../api";
import dayjs from 'dayjs'; // Importa a biblioteca dayjs

const { Title, Text } = Typography;
const { Option } = Select;

// Colunas para o Histórico de Entregas (visualização na mesma página)
const historyColumns = [
    { title: 'Funcionário', dataIndex: ['funcionario', 'nome'], key: 'nome', render: (nome) => <Text strong>{nome}</Text> },
    { title: 'EPI Entregue', dataIndex: ['epi', 'tipoEpi'], key: 'tipoEpi' },
    { title: 'Nº CA', dataIndex: ['epi', 'numeroCa'], key: 'numeroCa' },
    { title: 'Data Entrega', dataIndex: 'dataEntrega', key: 'dataEntrega', render: (text) => new Date(text).toLocaleDateString('pt-BR') },
    { title: 'Qtde', dataIndex: 'quantidade', key: 'quantidade', width: 60 },
];


const EntregaPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [funcionarios, setFuncionarios] = useState([]);
    const [epis, setEpis] = useState([]);
    const [historico, setHistorico] = useState([]);
    const [isFetching, setIsFetching] = useState(false); 

    // 1. Funções de Busca de Dados (Dropdowns)
    const fetchDropdownData = async () => {
        try {
            // Busca Funcionários
            const funcResponse = await api.get('/funcionarios');
            setFuncionarios(funcResponse.data);

            // Busca EPIs
            const epiResponse = await api.get('/epis');
            setEpis(epiResponse.data);
            
            // Busca Histórico de Entregas
            const historyResponse = await api.get('/entregas');
            setHistorico(historyResponse.data);
            
        } catch (error) {
            console.error("Erro ao carregar dados dos dropdowns ou histórico:", error);
            message.error('Erro ao carregar dados mestres (Funcionários/EPIs). Verifique se o Backend está ativo.');
        } finally {
            setLoading(false);
        }
    };
    

    // 2. Lógica de Submissão do Formulário (CREATE)

    const onFinish = async (values) => {
        setIsFetching(true);
        try {
            // Prepara o objeto de dados para o backend
            const dataToSave = {
                // O backend espera o ID como objeto aninhado
                funcionario: { id_funcionario: values.id_funcionario },
                epi: { id_epi: values.id_epi },
                dataEntrega: values.dataEntrega.format('YYYY-MM-DD'),
                quantidade: values.quantidade,
            };

            await api.post('/entregas', dataToSave);
            message.success('Entrega registrada com sucesso!');
            
            form.resetFields(); // Limpa o formulário
            // Define a data como a data atual novamente
            form.setFieldsValue({ dataEntrega: dayjs(), quantidade: 1 }); 
            
            fetchDropdownData(); // Atualiza o histórico
            
        } catch (error) {
            console.error("Falha ao registrar entrega:", error);
            message.error('Falha no registro: Verifique se o Funcionário/EPI existem e se o Backend está OK.');
        } finally {
            setIsFetching(false);
        }
    };

    // Efeito para carregar dados na montagem

    useEffect(() => {
        fetchDropdownData();
    }, []);

    // ESTRUTURA VISUAL DA PÁGINA
    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Title level={2}>Registro de Entregas de EPI</Title>
            
            {/* Card de Cadastro (Formulário) */}
            <Card title={<Text strong><BarcodeOutlined /> Nova Distribuição</Text>} style={{ width: '100%' }}>
                
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ quantidade: 1, dataEntrega: dayjs() }} // Data atual e Quantidade 1
                    disabled={loading || isFetching}
                >
                    <Row gutter={24}>
                        
                        {/* Campo 1: Funcionário */}
                        <Col xs={24} md={12} lg={8}>
                            <Form.Item
                                name="id_funcionario"
                                label="Selecionar Funcionário"
                                rules={[{ required: true, message: 'O funcionário é obrigatório.' }]}
                            >
                                <Select 
                                    placeholder="Selecione o colaborador"
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    loading={loading}
                                >
                                    {funcionarios.map(f => (
                                        <Option key={f.id_funcionario} value={f.id_funcionario}>
                                            {f.nome} ({f.matricula})
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        {/* Campo 2: EPI */}
                        <Col xs={24} md={12} lg={8}>
                            <Form.Item
                                name="id_epi"
                                label="Selecionar EPI"
                                rules={[{ required: true, message: 'O EPI é obrigatório.' }]}
                            >
                                <Select 
                                    placeholder="Selecione o equipamento"
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    loading={loading}
                                >
                                    {epis.map(e => (
                                        <Option key={e.id_epi} value={e.id_epi}>
                                            {e.tipoEpi} (CA: {e.numeroCa})
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        
                        {/* Campo 3: Data de Entrega */}
                        <Col xs={24} md={12} lg={4}>
                            <Form.Item
                                name="dataEntrega"
                                label="Data da Entrega"
                                rules={[{ required: true, message: 'A data é obrigatória.' }]}
                            >
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Data" />
                            </Form.Item>
                        </Col>

                        {/* Campo 4: Quantidade */}
                        <Col xs={24} md={12} lg={4}>
                            <Form.Item
                                name="quantidade"
                                label="Quantidade"
                                rules={[{ required: true, message: 'A quantidade é obrigatória.' }]}
                            >
                                <InputNumber min={1} style={{ width: '100%' }} placeholder="Qtde" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {/* Botão de Submissão */}
                    <Form.Item style={{ marginTop: 16 }}>
                        <Button type="primary" htmlType="submit" size="large" shape="round" icon={<SaveOutlined />} loading={isFetching}>
                            Registrar Entrega
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* Histórico de Entregas (Tabela) */}
            <Divider orientation="left">Histórico de Entregas Recentes ({historico.length})</Divider>
            <Table
                columns={historyColumns}
                dataSource={historico}
                rowKey="id_entrega"
                loading={loading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
                size="small"
                locale={{ emptyText: 'Nenhum registro de entrega encontrado.' }}
            />

        </Space>
    );
};

export default EntregaPage;