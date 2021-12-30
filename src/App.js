import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import {BrowserRouter} from "react-router-dom";
import Content from "./components/content/Content";
import {Provider} from "react-redux";
import store from "./components/store/store";


function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
