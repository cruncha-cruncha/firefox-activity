import { useCallback, useEffect, useState } from "react";
import { subDays, format, add, parse, subHours } from "date-fns";
import { Row } from "../../electron/src/read-local/row";
import "./App.css";

function App() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [data, setData] = useState<Row[]>([]);
  const formatString = "yyyy-MM-dd'T'HH:mm";

  useEffect(() => {
    const now = new Date();
    setStartTime(format(now, formatString));
    setEndTime(format(subDays(now, 7), formatString));
  }, []);

  const getData = useCallback(async () => {
    const startUnix =
      parse(startTime, formatString, new Date()).getTime() * 1000;
    const endUnix = parse(endTime, formatString, new Date()).getTime() * 1000;
    const data = await backend.getData({
      endTime: startUnix,
      startTime: endUnix,
    });
    setData(data);
  }, [startTime, endTime]);

  const addToStartTime = useCallback(() => {
    setStartTime(
      format(
        add(parse(startTime, formatString, new Date()), { hours: 8 }),
        formatString,
      ),
    );
  }, [startTime]);

  const addToEndTime = useCallback(() => {
    setEndTime(
      format(
        subHours(parse(endTime, formatString, new Date()), 8),
        formatString,
      ),
    );
  }, [endTime]);

  const goToTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
id: number;
url: string;
title: string;
description: string;
last_visit_date: number;
visit_count: number;
title, url (collapsed by default), description, visit_count (collapsed by default), last_visit_date (collapsed by default)
  */

  return (
    <div id="first-child" className="relative flex flex-col">
      <div className="top-date-range flex justify-around">
        <input
          type="datetime-local"
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <button onClick={addToStartTime}>+ 8 hours</button>
      </div>
      <div className="results-list grow overflow-y-scroll">
        <button onClick={getData}>Get Data</button>
        <ul>
          {data.map((row) => (
            <ResultRow row={row} />
          ))}
        </ul>
      </div>
      <div className="bottom-date-range flex justify-around">
        <input
          type="datetime-local"
          id="end-time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button onClick={addToEndTime}>+ 8 hours</button>
        <button onClick={goToTop}>top</button>
      </div>
      {/* <div className="side-panel absolute right-0 h-full w-12 bg-black"></div> */}
    </div>
  );
}

export const ResultRow = ({ row }: { row: Row }) => {
  const domain = new URL(row.url).hostname;
  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <li key={row.url} className="results-row grid grid-cols-2 gap-1">
      <span className="title">{row.title}</span>
      <span
        className="domain cursor-pointer"
        onClick={() => copyToClipboard(row.url)}
      >
        {domain}
      </span>
      <span className="description hidden">{row.description}</span>
      <span className="visit_count hidden">{row.visit_count}</span>
      <span className="last_visit_date hidden">{row.last_visit_date}</span>
    </li>
  );
};

export default App;
