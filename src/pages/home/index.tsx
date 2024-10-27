import { Container } from './styled';
import WapTree from '../../components/tree';
import { Component } from 'react';
import { FloatButton } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

class Home extends Component {
  onDownload(): void {
    console.log('Download');
  }

  render() {
    return (
      <>
        <Container>
          <WapTree />
          <FloatButton type="primary" icon={<DownloadOutlined />} onClick={this.onDownload} />
        </Container>
      </>
    );
  }
}

export default Home;
