import { useCallback, useState } from "react";
// import reactLogo from './assets/react.svg'
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [nodeVersion, setNodeVersion] = useState<string | undefined>(undefined);

  const updateNodeVersion = useCallback(
    async () =>
      setNodeVersion(await backend.nodeVersion("Hello from App.tsx!")),
    []
  );

  const callTestSqlite = useCallback(
    async () => await backend.testSqlite("a message"),
    []
  );

  const getData = useCallback(
    async () => {
      const data = await backend.getData({});
      console.log("got data", data);
    },
    []
  );

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={updateNodeVersion}>Node version is {nodeVersion}</button>
      <button onClick={callTestSqlite}>Test Sqlite</button>
      <button onClick={getData}>Get Data</button>
    </>
  );
}

export default App;
