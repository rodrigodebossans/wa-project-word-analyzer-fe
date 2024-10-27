import { GetProps, Tree, TreeDataNode } from 'antd';

import { useState } from 'react';

import { WapDirectoryTree } from './styled';
import { Component } from 'react';
type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

class WapTree extends Component {
  treeData: TreeDataNode[] = [
    {
      key: '0',
      title: 'Animais',
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

  render() {
    return (
      <>
        <WapDirectoryTree
          multiple
          defaultExpandAll
          onSelect={this.onSelect}
          onExpand={this.onExpand}
          treeData={this.treeData}
        />
      </>
    );
  }
}

export default WapTree;
