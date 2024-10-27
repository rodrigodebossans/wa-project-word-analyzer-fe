import { createGlobalStyle } from 'styled-components';

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
