import { Provider } from "react-redux";
import "./App.css";
import { MainContainer } from "./components/MainContainer/MainContainer";
import {  runMiddleWare, store } from "./store/reducers/store";

runMiddleWare();
function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}

export default App;
