import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Logo from '.';

describe('Logo Component', () => {
  it('should render the component correctly', () => {
    render(<Logo />);

    const logoElement = screen.getByAltText('Logo Wa Project');

    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', 'logo.svg');
    expect(logoElement).toHaveAttribute('alt', 'Logo Wa Project');
  });
});
