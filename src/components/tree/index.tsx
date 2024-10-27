import { Component } from 'react';
import Search from 'antd/es/input/Search'; 
import { CarryOutOutlined } from '@ant-design/icons';
import { GetProps, Tree, TreeDataNode } from 'antd';

import { WapClassificationTree, WapTreeContainer } from './styled';

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

class WapTree extends Component {
  treeData: TreeDataNode[] = [
    {
      key: '0',
      title: 'Animais',
      icon: <CarryOutOutlined />,
      children: [
        { title: 'Mamíferos', key: '0-1', isLeaf: true },
        { title: 'Aves', key: '0-2', isLeaf: true },
      ],
    },
  ];

  onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  onChangeSearch(): void {
    console.log('onChangeSearch');
  }

  render() {
    return (
      <>
        <WapTreeContainer>
          <Search placeholder="Search" onChange={this.onChangeSearch} />
          <WapClassificationTree
            multiple
            showLine
            defaultExpandAll
            showIcon={false}
            onSelect={this.onSelect}
            onExpand={this.onExpand}
            treeData={this.treeData}
          />
        </WapTreeContainer>
      </>
    );
  }
}

export default WapTree;
