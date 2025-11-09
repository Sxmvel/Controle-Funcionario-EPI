import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 

import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* CORREÇÃO: Envolvemos a aplicação com o ConfigProvider */}
    <ConfigProvider 
      locale={ptBR} // Define a localização (datas, textos, etc.)
      theme={{
        // Define o tema com a cor primária (Azul Corporativo) e botões arredondados
        token: {
          colorPrimary: '#1890FF', // Azul
          borderRadius: 8,         // Arredondamento padrão para elementos
        },
        components: {
            Button: {
                // Arredondamento extra para os botões conforme seu desejo (shape="round" no componente individual é melhor)
            },
            Card: {
                borderRadiusLG: 12, // Bordas suaves para os Cards
            }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);