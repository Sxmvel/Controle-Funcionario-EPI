import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Mantenha o CSS padrão
// Mantenha o App.css que criamos (importado via App.jsx ou index.js)

// --- NOVO: Importações do Ant Design ---
import { ConfigProvider } from 'antd';
// Importa as configurações de localização (Português)
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