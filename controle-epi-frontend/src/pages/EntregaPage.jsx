import React from 'react';
import { Typography, Card } from 'antd';

const { Title } = Typography;

const EntregaPage = () => {
    return (
        <Card>
            <Title level={2}>Registro e Histórico de Entregas de EPI</Title>
            <p>Aqui você poderá registrar novas entregas de EPIs a funcionários e visualizar o histórico.</p>
        </Card>
    );
};


export default EntregaPage;