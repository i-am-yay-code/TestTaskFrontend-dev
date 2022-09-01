import './App.css';
import FirstScreen from './components/FirstScreen';
import { GetPart } from './components/GetPart';
import Header from './components/HeaderComponent';
import { PostPart } from './components/PostPart';

function App() {
  return (
    <div className='body'>
      <Header />
      <FirstScreen />
      <GetPart />
      <PostPart />
    </div>

  )
}

export default App;
