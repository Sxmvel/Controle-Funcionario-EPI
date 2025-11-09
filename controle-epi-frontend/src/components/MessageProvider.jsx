import React from 'react';
import { App as AntdApp } from 'antd';

const MessageProvider = ({ children }) => {
    
    return <AntdApp>{children}</AntdApp>;
};

export default MessageProvider;