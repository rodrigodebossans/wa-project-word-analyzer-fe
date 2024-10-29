import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Home from './';

describe('Home Component', () => {
  describe('First Panel', () => {
    it('should render Logo component', () => {
      render(<Home />);
      const logoElement = screen.getByAltText('Logo Wa Project');
      expect(logoElement).toBeInTheDocument();
    });

      it('should render Divider with correct text', () => {
        render(<Home />);
        const dividerElement = screen.getByText('Word Analyzer');
        expect(dividerElement).toBeInTheDocument();
      });

      it('should render Typography.Paragraph with correct text', () => {
        render(<Home />);
        const paragraphElement = screen.getByText(/Build your classification tree and analyze and visualize frequencies in the hierarchy of words in your documents/i);
        expect(paragraphElement).toBeInTheDocument();
      });
  });

  describe('Second Panel', () => {
      it('should render WapTree component', () => {
        render(<Home />);
        const wapTreeElement = screen.getByTestId('wap-tree');
        expect(wapTreeElement).toBeInTheDocument();
      });
  });
});
