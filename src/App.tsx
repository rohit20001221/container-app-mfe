import { useEffect, useState, createElement } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [components, setComponents] = useState<Record<string, any>[]>([]);

  const [val, setValue] = useState("");
  const [compVal, setCompVal] = useState("");

  useEffect(() => {
    if (url !== "") {
      (async () => {
        // @ts-ignore
        const container = await import(url);
        const factory = await container.get("./Lib");
        const module = factory();

        module["bootstrapWebComponents"]();
      })();
    }
  }, [url]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setUrl(val);
          setComponents(JSON.parse(compVal));
        }}
      >
        <div>
          <input value={val} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div>
          <textarea
            value={compVal}
            onChange={(e) => setCompVal(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">fetch</button>
      </form>
      <div>
        {components.map((elem, index) => {
          return <div key={index}>{createElement(elem["name"])}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
