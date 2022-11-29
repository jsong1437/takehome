import './index.css';
import { useRef, useState } from 'react';
import { File, FileTableProps, SelectedFiles } from "./types";
import FileTableRow from './FileTableRow';
import { AVAILABLE, NONE_SELECTED } from './constants';

const getAllSelectedFiles = (data: File[], toFalse?: boolean) => {
  const newFiles: SelectedFiles = {};
  for (let i=0; i<data.length; i++) {
      if (toFalse) {
          newFiles[i] = false;
      } else if(data[i].status === AVAILABLE){
          newFiles[i] = true;
      }
  }
  return newFiles;
}
const FileTable = ({data} : FileTableProps): JSX.Element => {

  const [isAllSelected, setAllSelected] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const availableCount = useRef(data.filter(item => item.status === AVAILABLE).length);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>({});

  const onClickRowHandler = (i: number, isSelected: boolean) => {
    
    const changeCountBy = isSelected ? 1 : -1;
    const newSelectedCount = selectedCount + changeCountBy;
    
    setSelectedCount(newSelectedCount);
    setSelectedFiles(prevState => ({...prevState, [i]: isSelected}));

    if (newSelectedCount === availableCount.current) setAllSelected(true);
    else setAllSelected(false);
  } 

  const onClickSelectAll = () => {
    setAllSelected(!isAllSelected)
    if (isAllSelected && selectedCount === availableCount.current) {

      setSelectedCount(0);
      setSelectedFiles({...getAllSelectedFiles(data, true)});
    } else if (!isAllSelected) {

      setSelectedCount(availableCount.current);
      setSelectedFiles({...getAllSelectedFiles(data)});
    }
  } 

  const onClickDownload = () => {
    const selectedFilesData = [];

    for (let index in selectedFiles) {
      if (!selectedFiles[index]) continue;
      const file: File = data[index];
      selectedFilesData.push(file.path + ' : ' + file.device);
    }
    alert(selectedFilesData);
  } 
  
  return (
    <div className='Filetable-container'>
      <div className='Filetable-header'>
        <div id="selected-text">
          <input checked={isAllSelected} type="checkbox" onChange={() => onClickSelectAll()}/>
          {selectedCount ? `Selected ${selectedCount}` : NONE_SELECTED}
        </div>
        <button id='download-button' onClick={() => onClickDownload()}>
          <img alt="" src={process.env.PUBLIC_URL + "/download.png"} className="icon"></img>
          <div aria-label='download-files-button'>
            Download Selected
          </div>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((file, i) => <FileTableRow key={file.name} data={file} i={i} isAvailable={file.status === AVAILABLE} defaultSelect={selectedFiles[i] || false} onClickRowHandler={(i: number, isSelected: boolean) => onClickRowHandler(i, isSelected)}></FileTableRow>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default FileTable;