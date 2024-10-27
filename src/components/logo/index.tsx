import { Image } from 'antd';
import { Component } from 'react';

class Logo extends Component {
  render() {
    return (
      <>
        <Image preview={false} src="/logo.svg" alt='Logo Wa Project'/>
      </>
    );
  }
}

export default Logo;
