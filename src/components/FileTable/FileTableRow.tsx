import { FileTableRowProps } from "./types";
import { titleCase } from "../../utilities"; 
import Dot from "../Dot";

const FileTableRow = ({ data, i, isAvailable, defaultSelect, onClickRowHandler }: FileTableRowProps): JSX.Element => {

  const {name, device, path, status} = data;
  const onSelect = () => {
    onClickRowHandler(i, !defaultSelect);
  }
  return (
    <tr className={defaultSelect ? 'Filetable-row-selected' : ''}>
      <td>
        <input type="checkbox" disabled={!isAvailable} checked={defaultSelect} onChange={() => onSelect()} />
      </td>
      <td>{name}</td>
      <td>{device}</td>
      <td>
        <div className='row-path'>{path}</div> {isAvailable && <Dot/>}</td>
      <td>{titleCase(status)}</td>
    </tr>
  )
}
  
  export default FileTableRow;