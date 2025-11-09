import React from 'react';
import { Typography, Card, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;


const EpiPage = () => {
 
    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            
            {/* Cabeçalho e Botão de Cadastro */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={2} style={{ margin: 0 }}>Gestão de EPIs</Title>
                <Button type="primary" icon={<PlusOutlined />}>
                    Novo EPI
                </Button>
            </div>
            
            {/* Área de Filtros e Listagem (Card) */}
            <Card title="Listagem de Equipamentos de Proteção" style={{ width: '100%' }}>
                {/* Aqui entra a busca/filtros e a tabela de EPIs */}
                <p>O CRUD de EPIs será implementado aqui. (Busca por N° CA, Nome, Validade).</p>
            </Card>

        </Space>
    );
};

export default EpiPage;