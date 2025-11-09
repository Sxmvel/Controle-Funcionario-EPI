import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Typography, Spin, Table, Alert, Divider, message, Card, Space } from 'antd'; 
import api from '../api';

const { Title, Text } = Typography;

// Colunas para a tabela de EPIs dentro do Drawer
const epiColumns = [
    { title: 'EPI', dataIndex: ['epi', 'tipoEpi'], key: 'tipoEpi' },
    { title: 'Nº CA', dataIndex: ['epi', 'numeroCa'], key: 'numeroCa' },
    { title: 'Data Entrega', dataIndex: 'dataEntrega', key: 'dataEntrega', render: (text) => new Date(text).toLocaleDateString('pt-BR') },
    { title: 'Quantidade', dataIndex: 'quantidade', key: 'quantidade' },
    { title: 'Vencimento Item', dataIndex: 'dataVencimentoEpi', key: 'dataVencimentoEpi', render: (text) => text ? new Date(text).toLocaleDateString('pt-BR') : 'N/A' },
];


const FuncionarioDetailsDrawer = ({ visible, onClose, funcionarioId }) => {
    const [funcionario, setFuncionario] = useState(null);
    const [historicoEPIs, setHistoricoEPIs] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Estado para capturar erros

    // Efeito para buscar os detalhes do funcionário e o histórico de EPIs
    useEffect(() => {
        if (funcionarioId) {
            setLoading(true);
            setError(null);

            // 1. Buscar Detalhes do Funcionário 
            const fetchDetalhes = api.get(`/funcionarios/${funcionarioId}`);

            // 2. Buscar Histórico de EPIs (Usamos .catch para que falhas de 404 não parem o Promise.all)
            const fetchHistorico = api.get(`/entregas/historico/funcionario/${funcionarioId}`).catch(err => {
                // Se for um erro 404, apenas retorna um array vazio (sem registros de entrega)
                if (err.response && err.response.status === 404) {
                    return { data: [] }; 
                }
                // Se for outro erro, lança para o Promise.all capturar
                throw err;
            }); 

            Promise.all([fetchDetalhes, fetchHistorico])
                .then(([detalhesResp, historicoResp]) => {
                    if (detalhesResp.data) {
                        setFuncionario(detalhesResp.data);
                        setHistoricoEPIs(historicoResp.data || []); 
                    } else {
                        // Se a resposta vier vazia (mas status 200), ainda é um problema
                        setError("Detalhes do funcionário não foram encontrados.");
                        setFuncionario(null);
                    }
                })
                .catch(err => {
                    // Trata qualquer erro fatal (rede, 500, etc.)
                    console.error("Erro fatal ao carregar dados do Drawer:", err);
                    setError("Não foi possível carregar os dados. Verifique o console do Backend.");
                    setFuncionario(null);
                })
                .finally(() => setLoading(false));
        } else {
            setFuncionario(null);
            setHistoricoEPIs([]);
            setError(null);
        }
    }, [funcionarioId]); 

    return (
        <Drawer
            title={`Detalhes de ${funcionario?.nome || 'Funcionário'}`}
            width={720}
            onClose={onClose}
            open={visible} 
            placement="right"
        >
            <Spin spinning={loading}>
                {error ? ( // Se houver erro, mostra o alerta
                    <Alert message="Erro de Carregamento" description={error} type="error" showIcon />
                ) : funcionario ? ( // Se não houver erro E houver funcionário
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        
                        {/* Informações Pessoais (Design Limpo) */}
                        <Card title={<Text strong>Dados Pessoais</Text>} size="small">
                            <Descriptions bordered column={1} size="small">
                                {/* Usando o operador de encadeamento opcional (?) para evitar falhas se a data for nula */}
                                <Descriptions.Item label="Matrícula"><Text copyable>{funcionario.matricula}</Text></Descriptions.Item>
                                <Descriptions.Item label="CPF"><Text copyable>{funcionario.cpf}</Text></Descriptions.Item>
                                <Descriptions.Item label="Função">{funcionario.funcao}</Descriptions.Item>
                                <Descriptions.Item label="Data Contratação">{funcionario.dataContratacao ? new Date(funcionario.dataContratacao).toLocaleDateString('pt-BR') : 'N/A'}</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        {/* Histórico de EPIs */}
                        <Divider orientation="left">Histórico de EPIs Recebidos ({historicoEPIs.length} Registros)</Divider>
                        
                        <Table
                            dataSource={historicoEPIs} 
                            columns={epiColumns}
                            pagination={false}
                            rowKey="id_entrega"
                            size="small"
                            locale={{ emptyText: 'Nenhum registro de entrega encontrado para este colaborador.' }}
                        />

                    </Space>
                ) : (
                    // Se não estiver carregando, mostra a mensagem de seleção
                    !loading && <Alert message="Selecione um funcionário." type="info" showIcon />
                )}
            </Spin>
        </Drawer>
    );
};

export default FuncionarioDetailsDrawer;