import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Logo from '.';

describe('Logo', () => {
  it('should render the component correctly', () => {
    render(<Logo />);

    const element = screen.getByAltText('Logo Wa Project');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('src', 'logo.svg');
    expect(element).toHaveAttribute('alt', 'Logo Wa Project');
  });
});
