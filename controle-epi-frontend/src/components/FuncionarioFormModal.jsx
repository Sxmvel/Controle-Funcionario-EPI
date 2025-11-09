import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, message } from 'antd';
import api from '../api'; // Importa o serviço de API
import dayjs from 'dayjs'; // Biblioteca para manipulação de datas

const { Option } = Select;

// Lista de funções (pode ser carregada dinamicamente, mas será fixa )
const funcoesMock = ['Operador de Máquinas', 'Técnico de Segurança', 'Gerente de Obra', 'Administrativo'];

const FuncionarioFormModal = ({ visible, onClose, onSave, editingFuncionario }) => {
    const [form] = Form.useForm();
    
    // Efeito para preenchero  formulário se estivermos em modo de edição
    useEffect(() => {
        if (visible && editingFuncionario) {
            // Mapeia os dados do objeto Funcionario para o formulário
            form.setFieldsValue({
                ...editingFuncionario,
                // O DatePicker requer um objeto dayjs, não uma string ISO
                dataContratacao: editingFuncionario.dataContratacao ? dayjs(editingFuncionario.dataContratacao) : null,
            });
        } else if (visible && !editingFuncionario) {
            // Se for um novo cadastro, limpa o formulário
            form.resetFields();
        }
    }, [visible, editingFuncionario, form]);

    // Lógica para salvar o formulário
    const handleOk = async () => {
        try {
            // Valida todos os campos do formulário
            const values = await form.validateFields();
            
            // Converte o objeto dayjs para o formato de string ISO que o backend Java espera
            const dataToSave = {
                ...values,
                dataContratacao: values.dataContratacao ? values.dataContratacao.format('YYYY-MM-DD') : null,
            };

            // Chama a função onSave passada pelo componente pai (FuncionarioPage)
            onSave(dataToSave);
            form.resetFields();
        } catch (errorInfo) {
            console.log('Falha na validação:', errorInfo);
            message.error('Por favor, preencha todos os campos obrigatórios corretamente.');
        }
    };
    return (
        <Modal
            title={editingFuncionario ? "Editar Funcionário" : "Novo Cadastro de Funcionário"}
            open={visible}
            onOk={handleOk}
            onCancel={onClose}
            okText={editingFuncionario ? "Salvar Alterações" : "Cadastrar"}
            cancelText="Cancelar"
            // Design: Botões arredondados no Modal
            styles={{ footer: { borderRadius: '12px' } }}
        >
            <Form
                form={form}
                layout="vertical"
                name="funcionario_form"
                initialValues={{ quantidade: 1 }} // Valor inicial
            >
                <Form.Item
                    name="nome"
                    label="Nome Completo"
                    rules={[{ required: true, message: 'O nome é obrigatório!' }]}
                >
                    <Input placeholder="Nome completo" />
                </Form.Item>
                
                <Form.Item
                    name="cpf"
                    label="CPF"
                    rules={[{ required: true, message: 'O CPF é obrigatório!' }]}
                >
                    <Input placeholder="999.999.999-99" />
                </Form.Item>

                <Form.Item
                    name="matricula"
                    label="Matrícula"
                    rules={[{ required: true, message: 'A matrícula é obrigatória!' }]}
                >
                    <Input placeholder="Ex: M1001" />
                </Form.Item>

                <Form.Item
                    name="funcao"
                    label="Função/Cargo"
                    rules={[{ required: true, message: 'A função é obrigatória!' }]}
                >
                    <Select placeholder="Selecione a função">
                        {funcoesMock.map(funcao => (
                            <Option key={funcao} value={funcao}>{funcao}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="dataContratacao"
                    label="Data de Contratação"
                    rules={[{ required: true, message: 'A data é obrigatória!' }]}
                >
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Selecione a data" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default FuncionarioFormModal;