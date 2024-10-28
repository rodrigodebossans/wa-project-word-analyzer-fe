import { ReactNode, SetStateAction, useState } from 'react';
import { TreeDataNode, Dropdown, MenuProps, Modal, Form, Input } from 'antd';

import { BasicDataNode } from 'antd/es/tree';

import { WapClassificationTree, WapTreeContainer } from './styled';

enum WapTreeOptionTypes {
  ADD = 'add',
}

interface WapTreeModalOptions {
  visible: boolean;
  title: string;
  operationType: WapTreeOptionTypes;
  nodeToEdit: TreeDataNode;
}

interface WapTreeWordFormValue {
  word: string;
}

const WapTree = () => {
  const [, isDropdownOpen] = useState(false);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([{ key: '0', title: 'Classification Tree' }]);
  const [selectedNode, setSelectedNode] = useState<TreeDataNode>();
  const [modalOptions, setModalOptions] = useState<Partial<WapTreeModalOptions>>({ visible: false });

  const [form] = Form.useForm();
  const wordFieldRules = [{ required: true, message: 'Please input the nome of word!' }];

  const onAddWord = () => {
    if (!selectedNode) return;

    isDropdownOpen(false);
    setModalOptions({ title: 'Add a new word', operationType: WapTreeOptionTypes.ADD, visible: true });
  };

  const dropdownOptions: MenuProps['items'] = [
    {
      label: 'Add',
      key: WapTreeOptionTypes.ADD,
      onClick: onAddWord,
    },
  ];

  const onRightClickTreeOption = (event: { node: SetStateAction<TreeDataNode | undefined> }): void => {
    setSelectedNode(event.node);
    isDropdownOpen(true);
  };

  const titleCustomRender = (node: TreeDataNode) => {
    return (
      <Dropdown menu={{ items: dropdownOptions }} trigger={['contextMenu']} destroyPopupOnHide>
        <span>{node.title as string}</span>
      </Dropdown>
    );
  };

  const addNodeToTree = (treeData: TreeDataNode[], key: string, newNode: TreeDataNode): TreeDataNode[] => {
    const updatedNodes: TreeDataNode[] = [];

    for (const node of treeData) {
      if (node.key === key)
        updatedNodes.push({
          ...node,
          isLeaf: false,
          children: node.children?.length ? [...node.children, newNode] : [newNode],
        });
      else if (node.children) updatedNodes.push({ ...node, children: addNodeToTree(node.children, key, newNode) });
      else updatedNodes.push(node);
    }

    return updatedNodes;
  };

  const generateNodeKey = (node: TreeDataNode): string =>
    node.children?.length ? `${node.key}-${node.children.length + 1}` : `${node.key}-0`;

  const onSubmitForm = (value: WapTreeWordFormValue) => {
    if (!selectedNode) throw new Error('Node not selected');

    const newWordNode: TreeDataNode = { key: generateNodeKey(selectedNode), title: value.word, isLeaf: true };
    setTreeData(addNodeToTree(treeData, selectedNode.key as string, newWordNode));

    setModalOptions({ visible: false });
    setSelectedNode(undefined);
  };

  const modalCustomRender = (dom: ReactNode) => (
    <Form
      clearOnDestroy
      layout="vertical"
      form={form}
      name="word-form"
      initialValues={{ modifier: 'public' }}
      onFinish={values => onSubmitForm(values)}
    >
      {dom}
    </Form>
  );

  return (
    <>
      <WapTreeContainer>
        <WapClassificationTree
          multiple
          showLine
          defaultExpandAll
          showIcon={false}
          treeData={treeData}
          expandAction="doubleClick"
          titleRender={titleCustomRender as ((node: BasicDataNode | TreeDataNode) => React.ReactNode) | undefined}
          onRightClick={onRightClickTreeOption}
        />
      </WapTreeContainer>

      <Modal
        destroyOnClose
        title={modalOptions?.title}
        open={modalOptions?.visible}
        modalRender={modalCustomRender}
        okButtonProps={{ htmlType: 'submit' }}
        okText="Save"
        onCancel={() => setModalOptions({ visible: false })}
      >
        <Form.Item name="word" rules={wordFieldRules}>
          <Input id="word" placeholder="Type the word" />
        </Form.Item>
      </Modal>
    </>
  );
};

export default WapTree;
