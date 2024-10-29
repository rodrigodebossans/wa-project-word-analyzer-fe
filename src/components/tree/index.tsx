import { ReactNode, SetStateAction, useState } from 'react';
import {
  TreeDataNode,
  Dropdown,
  MenuProps,
  Modal,
  Form,
  Input,
  Empty,
  Typography,
  Button,
  Flex,
  Tooltip,
  FloatButton,
} from 'antd';

import { BasicDataNode } from 'antd/es/tree';

import { WapClassificationTree, WapTreeContainer } from './styled';
import { DownloadOutlined } from '@ant-design/icons';
import TreeModel from 'tree-model';

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

type WapTreeNodeExportModel = TreeModel.Node<TreeDataNode>;

const WapTree = () => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeDataNode>();
  const [modalOptions, setModalOptions] = useState<Partial<WapTreeModalOptions>>({ visible: false });
  const [, isDropdownOpen] = useState(false);

  const [form] = Form.useForm();
  const wordFieldRules = [{ required: true, message: 'Please input the nome of word!' }];

  const onAddWord = () => {
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
    node.children?.length ? `${node.key}-${node.children.length}` : `${node.key}-0`;

  const onSubmitForm = (value: WapTreeWordFormValue) => {
    if (selectedNode) {
      const newWordNode: TreeDataNode = { key: generateNodeKey(selectedNode), title: value.word, isLeaf: true };
      setTreeData(addNodeToTree(treeData, selectedNode.key as string, newWordNode));
    } else {
      const newWordNode: TreeDataNode = { key: `0`, title: value.word, isLeaf: true };
      setTreeData([newWordNode]);
    }

    setModalOptions({ visible: false });
    setSelectedNode(undefined);
  };

  const modalCustomRender = (dom: ReactNode) => (
    <Form
      clearOnDestroy
      layout="vertical"
      form={form}
      initialValues={{ modifier: 'public' }}
      onFinish={values => onSubmitForm(values)}
    >
      {dom}
    </Form>
  );

  const downloadJsonFile = (filename: string, treeModel: WapTreeNodeExportModel): void => {
    const emptyJson = JSON.stringify(treeModel.model);
    const blob = new Blob([emptyJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const convertTreeDataToExportModel = (treeData: TreeDataNode[]): WapTreeNodeExportModel => {
    const treeModel = new TreeModel();
    const rootNode = treeModel.parse(treeData[0]);

    const traverse = (node: TreeModel.Node<TreeDataNode>): WapTreeNodeExportModel => {
      const { key: id, title: name, children } = node.model;

      const newNode = treeModel.parse({ id, name });
      if (children) children.forEach((child: TreeDataNode) => newNode.addChild(traverse(treeModel.parse(child))));

      return newNode;
    };

    return traverse(rootNode);
  };

  const onDownload = (): void => {
    downloadJsonFile('classification-tree.json', convertTreeDataToExportModel(treeData));
  };

  return (
    <>
      <WapTreeContainer data-testid="wap-tree">
        {treeData.length > 0 && (
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
        )}

        {treeData.length === 0 && (
          <Flex align="center" justify="center" vertical>
            <Empty
              image="tree/empty.svg"
              description={
                <Typography.Text>
                  There are currently no words added. Click the button below to add your first word.
                </Typography.Text>
              }
            >
              <Button type="primary" onClick={onAddWord}>
                Create Your First Word
              </Button>
            </Empty>
          </Flex>
        )}
      </WapTreeContainer>

      <Modal
        destroyOnClose
        focusTriggerAfterClose
        title={modalOptions?.title}
        open={modalOptions?.visible}
        modalRender={modalCustomRender}
        okButtonProps={{ htmlType: 'submit' }}
        okText="Save"
        onCancel={() => setModalOptions({ visible: false })}
        zIndex={1201}
      >
        <Form.Item name="word" rules={wordFieldRules}>
          <Input autoFocus id="word" placeholder="Type the word" />
        </Form.Item>
      </Modal>

      {treeData.length > 0 && (
        <Tooltip title="Download Classification Tree" placement="leftTop" trigger="hover">
          <FloatButton data-testid="download-button" type="primary" icon={<DownloadOutlined />} onClick={onDownload} />
        </Tooltip>
      )}
    </>
  );
};

export default WapTree;
