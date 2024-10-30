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

/**
 * WapTree component represents a tree structure for word classification.
 * It allows users to add words to the tree, right-click to open a context menu,
 * and download the tree structure as a JSON file.
 *
 * @component
 * @example
 * return (
 *   <WapTree />
 * )
 */
const WapTree = () => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeDataNode>();
  const [modalOptions, setModalOptions] = useState<Partial<WapTreeModalOptions>>({ visible: false });
  const [, isDropdownOpen] = useState(false);

  const [form] = Form.useForm();
  const wordFieldRules = [{ required: true, message: 'Please input the nome of word!' }];

  /**
   * Handles the addition of a new word.
   * Closes the dropdown and opens a modal with options to add a new word.
   */
  const onAddWord = () => {
    isDropdownOpen(false);
    setModalOptions({ title: 'Add a new word', operationType: WapTreeOptionTypes.ADD, visible: true });
  };

  /**
   * Dropdown options for the menu.
   *
   * @type {MenuProps['items']}
   *
   * @property {string} label - The label for the menu item.
   * @property {string} key - The unique key for the menu item, corresponding to WapTreeOptionTypes.ADD.
   * @property {function} onClick - The function to be called when the menu item is clicked, in this case, `onAddWord`.
   */
  const dropdownOptions: MenuProps['items'] = [
    {
      label: 'Add',
      key: WapTreeOptionTypes.ADD,
      onClick: onAddWord,
    },
  ];

  /**
   * Handles the right-click event on a tree option.
   *
   * @param event - The event object containing the node that was right-clicked.
   * @param event.node - The node that was right-clicked.
   * @returns void
   */
  const onRightClickTreeOption = (event: { node: SetStateAction<TreeDataNode | undefined> }): void => {
    setSelectedNode(event.node);
    isDropdownOpen(true);
  };

  /**
   * Custom render function for the title of a tree node.
   *
   * This function wraps the node title in a Dropdown component that is triggered by a context menu.
   * The dropdown options are provided by the `dropdownOptions` array.
   *
   * @param {TreeDataNode} node - The tree node data.
   * @returns {JSX.Element} The rendered title with a context menu dropdown.
   */
  const titleCustomRender = (node: TreeDataNode): JSX.Element => {
    return (
      <Dropdown menu={{ items: dropdownOptions }} trigger={['contextMenu']} destroyPopupOnHide>
        <span>{node.title as string}</span>
      </Dropdown>
    );
  };

  /**
   * Adds a new node to the tree data structure at the specified key.
   *
   * @param {TreeDataNode[]} treeData - The current tree data structure.
   * @param {string} key - The key of the node to which the new node will be added as a child.
   * @param {TreeDataNode} newNode - The new node to be added to the tree.
   * @returns {TreeDataNode[]} - The updated tree data structure with the new node added.
   */
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

  /**
   * Generates a unique key for a tree node.
   *
   * @param node - The tree data node for which the key is generated.
   * @returns A string representing the unique key for the node. If the node has children,
   * the key is a combination of the node's key and the number of children. If the node
   * has no children, the key is the node's key followed by '-0'.
   */
  const generateNodeKey = (node: TreeDataNode): string =>
    node.children?.length ? `${node.key}-${node.children.length}` : `${node.key}-0`;

  /**
   * Handles the form submission to add a new word node to the tree.
   *
   * @param value - The form value containing the word to be added.
   *
   * If a node is selected, a new word node is created with a key generated
   * based on the selected node and added to the tree data under the selected node.
   * If no node is selected, a new word node is created with a key of `0` and set as the root of the tree data.
   *
   * After adding the new word node, the modal is closed and the selected node is reset.
   */
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

  /**
   * Custom render function for a modal.
   *
   * This function wraps the provided ReactNode in a Form component with specific configurations.
   *
   * @param {ReactNode} dom - The ReactNode to be rendered inside the Form.
   * @returns {JSX.Element} The JSX element containing the Form with the provided ReactNode.
   */
  const modalCustomRender = (dom: ReactNode): JSX.Element => (
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

  /**
   * Downloads a JSON file with the given filename and tree model.
   *
   * This function converts the provided tree model into a JSON string,
   * creates a Blob from it, and triggers a download of the file with
   * the specified filename.
   *
   * @param filename - The name of the file to be downloaded.
   * @param treeModel - The tree model to be converted into JSON and downloaded.
   */
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

  /**
   * Converts tree data into an export model.
   *
   * This function takes an array of `TreeDataNode` objects and converts it into a `WapTreeNodeExportModel`.
   * It uses a `TreeModel` to parse the root node and recursively traverses the tree to build the export model.
   *
   * @param {TreeDataNode[]} treeData - The tree data to be converted.
   * @returns {WapTreeNodeExportModel} - The converted export model.
   */
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

  /**
   * Initiates the download of the classification tree data as a JSON file.
   *
   * The function converts the current tree data into an export model and triggers
   * the download of a file named 'classification-tree.json'.
   *
   * @returns {void} This function does not return a value.
   */
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
