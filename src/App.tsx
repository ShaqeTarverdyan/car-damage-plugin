import CircleList from "./components/CircleList";
import { PluginOptions } from "./types";
import './App.css'

const App = ({ options }:{ options: PluginOptions }) => <CircleList options={options}/>

export default App;
