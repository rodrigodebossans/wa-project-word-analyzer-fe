
import { Image } from 'antd';


/**
 * Logo component that displays the project's logo.
 *
 * This component uses the `Image` component from `antd` to render the logo image.
 * The image is sourced from "logo.svg" and has an alt text of "Logo Wa Project".
 * The preview feature of the `Image` component is disabled.
 *
 * @component
 * @example
 * return (
 *   <Logo />
 * )
 */
const Logo = () => (
  <>
    <Image id='logo' preview={false} src="logo.svg" alt="Logo Wa Project" />
  </>
);

export default Logo;
