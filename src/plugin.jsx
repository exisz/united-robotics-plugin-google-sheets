import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {sheetUrls} from "./sheet-url.mjs";
import styles from "./plugin.css";
export const windows=[{id:"sheets",title:"Google Sheets"}];
function Sheets({props}) {
  const sources=Array.isArray(props.sources)?props.sources:[];
  const [input,setInput]=useState(props.url||sources[0]?.url||"");
  const [mode,setMode]=useState(props.mode==="edit"?"edit":"preview");
  const [selected,setSelected]=useState(props.url||sources[0]?.url||"");
  const [revision,setRevision]=useState(0);
  const [error,setError]=useState("");
  let urls;try{if(selected)urls=sheetUrls(selected,mode);}catch(e){urls=null;}
  const open=value=>{try{sheetUrls(value,mode);setSelected(value);setInput(value);setRevision(r=>r+1);setError("");}catch(e){setError(e.message);}};
  return <section className="ur-sheets-embed">
    <form onSubmit={e=>{e.preventDefault();open(input);}} className="sheet-bar">
      {sources.length>0&&<select aria-label="选择表格" value={sources.some(s=>s.url===selected)?selected:""} onChange={e=>{if(e.target.value)open(e.target.value);}}><option value="">其他表格</option>{sources.map(s=><option key={s.url} value={s.url}>{s.title||"Google Sheet"}</option>)}</select>}
      <input aria-label="Google Sheet 链接" placeholder="粘贴 Google Sheet 链接" value={input} onChange={e=>setInput(e.target.value)}/>
      <button type="submit">打开</button>
      <select aria-label="显示模式" value={mode} onChange={e=>setMode(e.target.value)} disabled={urls?.published}><option value="preview">预览</option><option value="edit">Google 编辑器</option></select>
      {urls&&<><button type="button" onClick={()=>setRevision(r=>r+1)} aria-label="刷新表格">↻</button><a href={urls.original} target="_blank" rel="noopener noreferrer">原表 ↗</a></>}
    </form>
    {error&&<div role="alert">{error}</div>}
    {urls?<iframe key={urls.embed+revision} title={props.title||"Google Sheets"} src={urls.embed} referrerPolicy="no-referrer" allow="fullscreen" />:<div className="sheet-empty">粘贴 Google Sheets 链接，即可在此窗口打开。</div>}
    <footer>预览只显示；编辑器能否编辑由你的 Google 权限决定。若登录或嵌入受限，请点“原表”打开。</footer>
  </section>;
}
export function mount(root,{props={}}={}) {
  if(props.window&&props.window!=="sheets")throw new Error("Unknown Google Sheets window");
  const style=document.createElement("style");style.textContent=styles;
  const content=document.createElement("div");content.style.cssText="height:100%;min-height:0;";
  root.append(style,content);const react=createRoot(content);react.render(<Sheets props={props}/>);
  return()=>{react.unmount();content.remove();style.remove();};
}
