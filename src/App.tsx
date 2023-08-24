import { Form } from "./components/form";
import { Gallery } from "./components/gallery";

function App() {
  const apiUrl = "https://35.202.226.223";

  return (
    <div>
      <Form apiUrl={apiUrl} />
      <Gallery apiUrl={apiUrl} />
    </div>
  );
}

export default App;
