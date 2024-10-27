import { Tree } from 'antd';
import styled from 'styled-components';
const { DirectoryTree } = Tree;

export const WapDirectoryTree = styled(DirectoryTree)`
  width: 90%;
  height: 50%;
  padding: 3rem;
  box-shadow: rgba(0, 0, 0, 0.16) 20px 20px 30px;

  .ant-tree-treenode {
   /* border-radius: 25px; */
  }
`;
