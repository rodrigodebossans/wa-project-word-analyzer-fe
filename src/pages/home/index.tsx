import { WaHomeContainer } from './styled';
import WapTree from '../../components/tree';
import { Component } from 'react';
import { Divider, Flex, FloatButton, Splitter, Tooltip, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Logo from '../../components/logo';

class Home extends Component {
  onDownload(): void {
    console.log('onDownload');
  }

  render() {
    return (
      <>
        <WaHomeContainer>
          <Splitter layout="vertical">
            <Splitter.Panel>
              <Flex align="center" justify="center" vertical>
                <Logo />
                <Divider>Word Analyzer</Divider>
                <Typography.Paragraph className='slogan'>
                  Build your classification tree and analyze and visualize frequencies in the <br /> hierarchy of words
                  in your documents.
                </Typography.Paragraph>
              </Flex>
            </Splitter.Panel>
            <Splitter.Panel min="50%">
                <WapTree />
            </Splitter.Panel>
          </Splitter>

          <Tooltip title="Salvar" placement="leftTop">
            <FloatButton type="primary" icon={<DownloadOutlined />} onClick={this.onDownload} />
          </Tooltip>
        </WaHomeContainer>
      </>
    );
  }
}

export default Home;
