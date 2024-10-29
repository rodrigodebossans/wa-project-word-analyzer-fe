import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import WapTree from '.';

describe('WapTree Component', () => {
  it('should render the empty state if no words are registered in the tree', () => {
    render(<WapTree />);

    const emptyStateImageElement = screen.getByAltText('empty');

    const emptyStatePhraseElement = screen.getByText(
      'There are currently no words added. Click the button below to add your first word.',
    );

    const emptyStateButtonElement = screen.getByText('Create Your First Word');

    expect(emptyStateImageElement).toBeInTheDocument();
    expect(emptyStatePhraseElement).toBeInTheDocument();
    expect(emptyStateButtonElement).toBeInTheDocument();
  });

  it('should render the modal correctly when the "Create your first word" button is clicked', async () => {
    render(<WapTree />);

    const createButton = screen.getByText('Create Your First Word');
    await userEvent.click(createButton);

    const modalTitleElement = screen.getByText('Add a new word');
    const modalInputElement = screen.getByPlaceholderText('Type the word');

    expect(modalTitleElement).toBeInTheDocument();
    expect(modalInputElement).toBeInTheDocument();
  });

  it('should render the modal correctly when the "Create your first word" button is clicked and close when click "Cancel" button', async () => {
    render(<WapTree />);

    const createButton = screen.getByText('Create Your First Word');
    await userEvent.click(createButton);

    const modalTitleElement = screen.getByText('Add a new word');
    const modalInputElement = screen.getByPlaceholderText('Type the word');

    const cancelSpanElement = screen.getByText('Cancel');
    await userEvent.click(cancelSpanElement);

    expect(modalTitleElement).not.toBeInTheDocument();
    expect(modalInputElement).not.toBeInTheDocument();
  });

  it('should add a new word to the tree when the form is submitted', async () => {
    render(<WapTree />);

    const createButton = screen.getByText('Create Your First Word');
    await userEvent.click(createButton);

    const input = screen.getByPlaceholderText('Type the word');
    await userEvent.type(input, 'Test Word');

    const saveSpanElement = screen.getByText('Save');
    await userEvent.click(saveSpanElement);

    const newWordNode = screen.getByText('Test Word');
    expect(newWordNode).toBeInTheDocument();
  });

  it('should add a new word from a parent word', async () => {
    render(<WapTree />);

    const createButton = screen.getByText('Create Your First Word');
    await userEvent.click(createButton);

    const parentInput = screen.getByPlaceholderText('Type the word');
    await userEvent.type(parentInput, 'Parent Test Word');

    const parentSaveSpanElement = screen.getByText('Save');
    await userEvent.click(parentSaveSpanElement);

    const parentWordNode = screen.getByText('Parent Test Word');
    fireEvent.contextMenu(parentWordNode);

    const addOption = screen.getByText('Add');
    await userEvent.click(addOption);

    const childInput = screen.getByPlaceholderText('Type the word');
    await userEvent.type(childInput, 'Child Test Word');

    const childSaveSpanElement = screen.getByText('Save');
    await userEvent.click(childSaveSpanElement);

    const childWordNode = screen.getByText('Child Test Word');

    expect(parentWordNode).toBeInTheDocument();
    expect(childWordNode).toBeInTheDocument();
  });

  it('should open the options dropdown when right-clicking on a word tree node', async () => {
    render(<WapTree />);

    const createButton = screen.getByText('Create Your First Word');
    await userEvent.click(createButton);

    const input = screen.getByPlaceholderText('Type the word');
    await userEvent.type(input, 'Test Word');

    const saveSpanElement = screen.getByText('Save');
    await userEvent.click(saveSpanElement);

    const newWordNode = screen.getByText('Test Word');
    fireEvent.contextMenu(newWordNode);

    await waitFor(() => {
      const contextMenuElement = screen.getByRole('menu');
      expect(contextMenuElement).toBeInTheDocument();
    });
  });

  it('should render the add word modal when right-clicking on a word tree node and selecting the "Add" option', async () => {
    render(<WapTree />);

    const createButton = screen.getByText('Create Your First Word');
    await userEvent.click(createButton);

    const input = screen.getByPlaceholderText('Type the word');
    await userEvent.type(input, 'Test Word');

    const saveSpanElement = screen.getByText('Save');
    await userEvent.click(saveSpanElement);

    const newWordNode = screen.getByText('Test Word');
    fireEvent.contextMenu(newWordNode);

    const addOption = screen.getByText('Add');
    await userEvent.click(addOption);

    const modalTitleElement = screen.getByText('Add a new word');
    const modalInputElement = screen.getByPlaceholderText('Type the word');

    expect(modalTitleElement).toBeInTheDocument();
    expect(modalInputElement).toBeInTheDocument();
  });

  it('should render the download button when there is at least one node in the tree', async () => {
    render(<WapTree />);

    const createButton = screen.getByText('Create Your First Word');
    await userEvent.click(createButton);

    const input = screen.getByPlaceholderText('Type the word');
    await userEvent.type(input, 'Test Word');

    const saveButton = screen.getByText('Save');
    await userEvent.click(saveButton);

    const downloadButton = screen.getByTestId('download-button');

    expect(downloadButton).toBeInTheDocument();
  });

  it('should download the tree data when the download button is clicked', async () => {
    render(<WapTree />);

    const createButton = screen.getByText('Create Your First Word');
    await userEvent.click(createButton);

    const input = screen.getByPlaceholderText('Type the word');
    await userEvent.type(input, 'Test Word');

    const saveButton = screen.getByText('Save');
    await userEvent.click(saveButton);

    const downloadButton = screen.getByTestId('download-button');
    await userEvent.click(downloadButton);

    await waitFor(() => {
      expect(downloadButton).toBeInTheDocument();
    });
  });
});
