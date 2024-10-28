import { WaHomeContainer } from './styled';
import WapTree from '../../components/tree';
import { Component } from 'react';
import { Divider, Flex, Splitter, Typography } from 'antd';
import Logo from '../../components/logo';

class Home extends Component {
  render() {
    return (
      <>
        <WaHomeContainer>
          <Splitter layout="vertical">
            <Splitter.Panel>
              <Flex align="center" justify="center" vertical>
                <Logo />
                <Divider>Word Analyzer</Divider>
                <Typography.Paragraph className="slogan">
                  Build your classification tree and analyze and visualize frequencies in the <br /> hierarchy of words
                  in your documents.
                </Typography.Paragraph>
              </Flex>
            </Splitter.Panel>
            <Splitter.Panel min="50%">
              <WapTree />
            </Splitter.Panel>
          </Splitter>
        </WaHomeContainer>
      </>
    );
  }
}

export default Home;
