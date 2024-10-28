import { Tree } from 'antd';
import styled from 'styled-components';

export const WapTreeContainer = styled.div`
  background-color: white;
  padding: 20px;
  height: 100%;
  border-radius: 25px;

  position: relative;
  overflow: auto;
  scrollbar-width: 'thin';
  scrollbar-width: thin;
  scrollbar-gutter: stable;

  .ant-tree-treenode {
    padding: 7px 10px;
  }
`;

export const WapClassificationTree = styled(Tree.DirectoryTree)`
  margin-top: 20px;
`;
