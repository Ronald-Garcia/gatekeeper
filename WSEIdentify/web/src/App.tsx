import './App.css'
import Body from '@/components/body';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

function App() {

  return (
    <div className="flex flex-col w-full h-screen">
      <Header></Header>
      <Body></Body>
      <Toaster></Toaster>
    </div>
  )
}

export default App
