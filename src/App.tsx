import { Form } from "./components/form";
import { Gallery } from "./components/gallery";

function App() {
  const apiUrl = "https://34.95.135.168";

  return (
    <div>
      <Form apiUrl={apiUrl} />
      <Gallery apiUrl={apiUrl} />
    </div>
  );
}

export default App;
