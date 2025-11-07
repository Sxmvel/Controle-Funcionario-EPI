import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const FuncionarioPage = () => {
    return (
        <div>
            <Title level={2}>Gestão de Funcionários</Title>
            <p>Aqui será o CRUD de Funcionários.</p>
        </div>
    );
};

// LINHA CRUCIAL: Deve ser 'export default'
export default FuncionarioPage;