import { describe, it, expect } from 'vitest';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { themeConfig } from './config/index.ts';
import { RouterProvider } from 'react-router-dom';
import { routers } from './routes/index.tsx';
import { StyleSheetManager } from 'styled-components';

describe('Main Entry Point', () => {
  it('should render the component correctly', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    expect(() => {
      createRoot(root).render(
        <StrictMode>
          <ConfigProvider theme={themeConfig}>
            <StyleSheetManager>
              <RouterProvider router={routers} />
            </StyleSheetManager>
          </ConfigProvider>
        </StrictMode>,
      );
    }).not.toThrow();
  });
});