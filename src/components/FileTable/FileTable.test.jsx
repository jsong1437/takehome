import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileTable from '.';
import useSampleData from '../../hooks/useSampleData';
import { AVAILABLE, NONE_SELECTED } from './constants';

const mockAllDownloadAlert = ["\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe : Luigi", "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll : Peach"];
describe("FileTable with sample data", () => {

    let fileTableContainer;
    let selectAllCheckBox;
  
    beforeEach(() => {
      const {result} = renderHook(() => useSampleData());
      const {container} = render(<FileTable data={result.current}></FileTable>);
      
      fileTableContainer = container;
      selectAllCheckBox = container.getElementsByTagName('input').item(0)
    })
    test('should have 6 rows with sample data', async () => {
     
      const rows = fileTableContainer.getElementsByClassName('row-path')
      const selectedText = screen.getByText(NONE_SELECTED);
      
      expect(rows).toHaveLength(6);
      expect(selectedText).toBeInTheDocument();
    });
    
    test('should not select row, when user clicks disabled row', () => {
     
        const disabledCheckBox = fileTableContainer.getElementsByTagName('input').item(1)
    
      userEvent.click(disabledCheckBox);
    
      const selectedText = screen.getByText(NONE_SELECTED);
    
      expect(disabledCheckBox).toBeDisabled();
      expect(selectAllCheckBox.checked).toBe(false);
      expect(selectedText).toBeInTheDocument();
    });
    
    test('should select row, when user clicks available row', () => {
     
      const availableCheckBox = fileTableContainer.getElementsByTagName('input').item(2)
    
      userEvent.click(availableCheckBox);
      const selectedText = screen.getByText(/Selected 1/i);
    
      expect(availableCheckBox).toBeEnabled();
      expect(selectAllCheckBox.checked).toBe(false);
      expect(selectedText).toBeInTheDocument();
    });
    
    test('should select all rows and selectAll checkbox, when user clicks all available rows', () => {
     
      const availableCheckBox = fileTableContainer.getElementsByTagName('input').item(2)
      const availableCheckBox2 = fileTableContainer.getElementsByTagName('input').item(3)
    
      userEvent.click(availableCheckBox);
      userEvent.click(availableCheckBox2);
    
      const selectedText = screen.getByText(/Selected 2/i);
    
      expect(availableCheckBox).toBeEnabled();
      expect(selectAllCheckBox.checked).toBe(true);
      expect(selectedText).toBeInTheDocument();
    });
    
    test('should select all rows and selectAll checkbox, when user clicks selectAll checkbox', () => {
     
      const availableCheckBox = fileTableContainer.getElementsByTagName('input').item(2)
      const availableCheckBox2 = fileTableContainer.getElementsByTagName('input').item(3)
    
      userEvent.click(selectAllCheckBox);
    
      const selectedText = screen.getByText(/Selected 2/i);
    
      expect(selectAllCheckBox.checked).toBe(true);
      expect(availableCheckBox.checked).toBe(true);
      expect(availableCheckBox2.checked).toBe(true);
      
      expect(selectedText).toBeInTheDocument();
    });
    
    test('should unselect all rows and selectAll checkbox, when user clicks selectAll checkbox after selectAll clicked', () => {
     
      const availableCheckBox = fileTableContainer.getElementsByTagName('input').item(2)
      const availableCheckBox2 = fileTableContainer.getElementsByTagName('input').item(3)
    
      userEvent.click(selectAllCheckBox);
      userEvent.click(selectAllCheckBox);
    
      const selectedText = screen.getByText(NONE_SELECTED);
    
      expect(selectAllCheckBox.checked).toBe(false);
      expect(availableCheckBox.checked).toBe(false);
      expect(availableCheckBox2.checked).toBe(false);
    
      expect(selectedText).toBeInTheDocument();
    });

    test('should download alert message, when user clicks download', async () => {
     
        window.alert = jest.fn();
        userEvent.click(selectAllCheckBox);
      
        const downloadButton= screen.getByRole('button')
      
        expect(downloadButton).toBeInTheDocument();
        expect(downloadButton.id).toBe('download-button');

        userEvent.click(downloadButton)
        
        expect(window.alert).toBeCalledWith(mockAllDownloadAlert);
      });
  })

describe("FileTable with empty data", () => {

    test('should have 0 rows', async () => {
        
        const {container} = render(<FileTable data={[]}></FileTable>);
        const rows = container.getElementsByClassName('row-path');
        const selectedText = screen.getByText(NONE_SELECTED);

        expect(rows).toHaveLength(0);
        expect(selectedText).toBeInTheDocument();
    });
});