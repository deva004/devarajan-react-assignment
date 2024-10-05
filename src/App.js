import React, { useState } from "react";
import { data } from './utils/sample'
import { FolderPen, Database, RefreshCw, Trash2, FileText, ChartLine, Logs, Save, Plus, Minus } from 'lucide-react';

function App() {
  const [selected, setSelected] = useState([])
  const printJson = (json) => {
    if (!json) return <div>Invalid Data</div>;
    return Object.entries(json).map(([key, value], index) => (
      <div key={index}>
        <strong>{key}:</strong> {typeof value === 'object' && value !== null ? printJson(value) : JSON.stringify(value)}
      </div>
    ));
  };
  return (<div className="w-full h-[100dvh] max-h-[100dvh] p-2 flex bg-[rgb(204,204,235,0.15)] relative">
    <div className="w-[75%] p-4 rounded-lg h-full relative flex flex-col">
      <div className="w-full flex justify-between ">
        <div className="flex gap-4 bg-white my-4 rounded-sm">
          <p className="p-2 flex gap-1 bg-purple-950 text-white"><span><FileText className="p-1" /></span>Data</p>
          <p className="p-2 flex gap-1"><span><ChartLine className="p-1" /></span>Summary</p>
          <p className="p-2 flex gap-1"><span><Logs className="p-1" /></span>Logs</p>
        </div>
        <p className="p-2  flex gap-1 "><span><Save className="p-1" /></span>Download</p>
      </div>
      <div className="w-full bg-white h-full flex-grow  border-[1px] rounded-lg border-[rgb(0,0,0,0.2)]">
        <div className="w-full border-b-[1px] p-4 border-[rgb(0,0,0,0.2)] flex justify-between items-center  text-sm ">
          <div className="w-[80%] flex justify-between items-center  ">
            <div className="flex">
              <p className=" flex bg-[rgb(204,204,235,0.6)] rounded-lg  items-center text-[rgb(117,117,224)] font-semibold">
                <span><FolderPen className="p-1" /></span>Project Name:
              </p>
              <p className="p-1">{data.project_name}</p></div>
            <div className="flex">  <p className=" flex bg-[rgb(204,204,235,0.6)] items-center rounded-lg text-[rgb(117,117,224)] font-semibold">
              <span><Database className="p-1" /></span>Output Database Name:
            </p><p className="p-1">{data.output_name}</p></div>
            <div className="flex"> <p className=" flex bg-[rgb(204,204,235,0.6)] items-center  rounded-lg text-[rgb(117,117,224)] font-semibold">
              <span><RefreshCw className="p-1" /></span>Last Run:</p> <p className="p-1">{data.last_run}</p></div>
          </div>
          <p className="font-semibold">Rows:{data.row_count}</p>
        </div>
        <div className="flex-1 max-w-full max-h-full overflow-scroll m-6">
          <table>
            <tr >
              {data?.table_headers.map((header, index) => (
                <th className=" p-2  bg-[rgb(204,204,235,0.6)] " key={index}><p className="flex justify-between gap-2">{header.name}<span><Trash2 className="p-1 hover:cursor-pointer text-[rgb(134,134,223)]" /></span></p></th>
              ))}
            </tr>
            <tr className="">
              {data?.table_headers.map((header, index) => (
                <td key={index} className="p-2 text-center  bg-[rgb(204,204,235,0.6)]">
                  <select className=" border-[1px] border-[#b2b1b1] p-1 px-2 rounded-lg">
                    <option>{header.type}</option>
                  </select>
                </td>
              ))}
            </tr>
            {data?.table_data.map((data, index) => (
              <tr key={index} className="text-center">
                {data.map((val, i) => (
                  <td className=" p-2 px-4" key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
    <div className="flex-1 border-[1px] border-[rgb(0,0,0,0.2)] m-4 rounded-lg overflow-scroll">
      <p className="p-4 border-b-[1px] border-[rgb(0,0,0,0.2)] font-semibold">Workflow</p>
      <div>
        {data.workflow_steps.map((data, index) => (
          <div
            key={index}
            className="p-2 px-4 hover:cursor-pointer flex flex-col gap-2 justify-center items-start">
            <div className="flex gap-2 items-center w-full" onClick={() => {
              setSelected((prev) =>
                prev.includes(data.id)
                  ? prev.filter((id) => id !== data.id)
                  : [...prev, data.id]
              );
            }}>
              <span>{selected.includes(data.id) ? <Minus className="p-1" /> : <Plus className="p-1" />}</span>
              <p className={`w-full p-2 border-[1px] border-[rgb(0,0,0,0.2)] rounded-tl-lg rounded-tr-lg ${selected.includes(data.id) ? 'bg-[rgb(204,204,235)]' : ''}`}>
                {data.name_title}
              </p>
            </div>
            {selected.includes(data.id) && (
              <div className="ml-8 w-[90%] px-4 -mt-2  border-[1px] border-t-0 border-[rgb(0,0,0,0.2)]" >
                {printJson(data.params_extra)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>)
}
export default App;