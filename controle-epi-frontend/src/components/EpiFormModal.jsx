import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, message } from 'antd';
import dayjs from 'dayjs'; 
import api from '../api';

const EpiFormModal = ({ visible, onClose, onSave, editingEpi }) => {
    const [form] = Form.useForm();
    
    // preencher o formulário
    useEffect(() => {
        if (visible) {
            if (editingEpi) {
                // Edição ou Criação Específica: Mapeia os dados existentes
                form.setFieldsValue({
                    tipo_epi: editingEpi.tipoEpi, 
                    numero_ca: editingEpi.numeroCa,
                    codigo_referencia: editingEpi.codigoReferencia,
                    data_validade_ca: editingEpi.dataValidadeCa ? dayjs(editingEpi.dataValidadeCa) : null,
                });
            } else {
                // Novo Cadastro Geral:
                form.resetFields();
            }
        }
    }, [visible, editingEpi, form]);

    // Lógica para salvar o formulário
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            
            // Mapeamento de volta para o formato esperado pelo Spring Boot 
            const dataToSave = {
                tipoEpi: values.tipo_epi, 
                numeroCa: values.numero_ca,
                codigoReferencia: values.codigo_referencia,
                dataValidadeCa: values.data_validade_ca ? values.data_validade_ca.format('YYYY-MM-DD') : null,
            };
            
            onSave(dataToSave);

        } catch (errorInfo) {
            message.error('Por favor, verifique os campos do formulário.');
        }
    };

    // Verifica se estamos em modo de criação específica (tipo predefinido, sem ID)
    const isSpecificCreation = visible && !editingEpi?.id_epi && editingEpi?.tipoEpi;
    return (
        <Modal
            title={editingEpi?.id_epi ? "Editar EPI" : "Novo Cadastro de EPI"}
            open={visible}
            onOk={handleOk}
            onCancel={onClose}
            okText={editingEpi?.id_epi ? "Salvar Alterações" : "Cadastrar"}
            cancelText="Cancelar"
        >
            <Form
                form={form}
                layout="vertical"
                name="epi_form"
            >
                <Form.Item
                    name="tipo_epi" 
                    label="Tipo de EPI (Ex: Capacete, Luva)"
                    rules={[{ required: true, message: 'O tipo é obrigatório!' }]}
                >
                    <Input 
                        placeholder="Ex: Luva de Raspa, Óculos de Segurança"
                        // Desabilita o campo se o tipo já foi preenchido na criação específica
                        disabled={isSpecificCreation} 
                    />
                </Form.Item>
                
                <Form.Item
                    name="numero_ca"
                    label="Número do Certificado de Aprovação (CA)"
                    rules={[{ required: true, message: 'O número do CA é obrigatório!' }]}
                >
                    <Input placeholder="Ex: 12345" />
                </Form.Item>

                <Form.Item
                    name="codigo_referencia"
                    label="Código de Referência/Modelo (Opcional)"
                >
                    <Input placeholder="Ex: SKU-X100" />
                </Form.Item>

                <Form.Item
                    name="data_validade_ca" 
                    label="Data de Validade do CA"
                    rules={[{ required: true, message: 'A validade é obrigatória!' }]}
                >
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Selecione a data" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default EpiFormModal;