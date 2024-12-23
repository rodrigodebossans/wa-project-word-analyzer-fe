import { Layout } from 'antd';
import styled from 'styled-components';

export const WaHomeContainer = styled(Layout)`
  height: 100%;

  .ant-flex {
    height: 100%;
    padding: 20px;

    .slogan {
      text-align: center;
    }

    .ant-divider {
      width: 30vw;
      min-width: 30vw;
    }
  }

  .ant-float-btn {
    bottom: 2rem;
    right: 2rem;
  }

  .ant-splitter-panel:nth-child(3) {
    padding: 20px;
  }
`;
