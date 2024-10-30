import { WaHomeContainer } from './styled';
import WapTree from '../../components/tree';
import { Divider, Flex, Splitter, Typography } from 'antd';
import Logo from '../../components/logo';

/**
 * Home component that serves as the main page for the Word Analyzer application.
 *
 * This component includes:
 * - A logo and a slogan describing the application's purpose.
 * - A vertical splitter layout with two panels:
 *   - The first panel contains the logo, a divider with the text "Word Analyzer", and a paragraph with the application's slogan.
 *   - The second panel contains the `WapTree` component, which is used for building and visualizing the classification tree.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
const Home = () => (
  <>
    <WaHomeContainer>
      <Splitter layout="vertical">
        <Splitter.Panel>
          <Flex align="center" justify="center" vertical>
            <Logo />
            <Divider>Word Analyzer</Divider>
            <Typography.Paragraph className="slogan">
              Build your classification tree and analyze and visualize frequencies in the <br /> hierarchy of words in
              your documents.
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

export default Home;
