import DrawerComponent from "./components/DrawerComponent";
import Header from "./components/Header";
import Loading from "./components/Loading";
import RouterConfig from "./config/RouterConfig";

function App() {
  return (
    <div>
      <Header />
      <RouterConfig />

      {/* Diğer */}
      <Loading />
      <DrawerComponent />
    </div>
  );
}

export default App;
