import 'antd/dist/antd.min.css'
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import store from "./redux/store";
import App from "./App";
import 'antd/dist/antd.min.css'

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);