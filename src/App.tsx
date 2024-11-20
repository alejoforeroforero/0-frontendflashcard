import { Outlet } from "react-router-dom";
import "./App.css";

export type Card ={
  id:number;
  front:string;
  back:string;
  active:boolean;
}

function App() {
  return <>
    <main><Outlet /></main>
  </>;
}

export default App;
