import { createGlobalStyle } from 'styled-components';

/**
 * GlobalStyle is a styled-component that applies global CSS styles to the application.
 * 
 * - Resets margin and padding for all elements and sets box-sizing to border-box.
 * - Sets the width and height of the body and html elements to 100% and applies a background color.
 * - Ensures the #root element inherits the width and height of its parent.
 * - Provides a utility class `.full-height` to set the height to 100%.
 */
export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box; 
    }

    body,html{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;    
    }

    #root{
        width: inherit;
        height: inherit;
    }

    .full-height {
        height: 100%;
    }
`;
