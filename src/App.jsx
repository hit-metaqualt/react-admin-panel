import { Provider } from "react-redux";
import store from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from "./Index";

function App() {

 
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;
