import FileTable from './components/FileTable';
import { File } from './components/FileTable/types';
import useSampleData from './hooks/useSampleData';

const App = () => {

  const sampleData: File[] = useSampleData();

  return (
    <div className="App">
      <FileTable data={sampleData}></FileTable>
    </div>
  );
}

export default App;
