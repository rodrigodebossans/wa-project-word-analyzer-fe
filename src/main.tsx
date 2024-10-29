import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { themeConfig } from './config/index.ts';
import { RouterProvider } from 'react-router-dom';
import { routers } from './routes/index.tsx';
import { StyleSheetManager } from 'styled-components';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      <StyleSheetManager>
        <RouterProvider router={routers} />
      </StyleSheetManager>
    </ConfigProvider>
  </StrictMode>,
);
