export function sheetUrls(input, mode="preview") {
  const raw=String(input||"").trim();
  let u;
  if(/^[\w-]{20,100}$/.test(raw))u=new URL("https://docs.google.com/spreadsheets/d/"+raw+"/edit");
  else {try{u=new URL(raw);}catch{throw new Error("请输入 Google Sheets 链接。");}}
  if(u.protocol!=="https:"||u.hostname!=="docs.google.com"||u.username||u.password)throw new Error("仅支持 docs.google.com 的 Google Sheets 链接。");
  const published=u.pathname.match(/^\/spreadsheets\/d\/e\/([\w-]+)\/pubhtml\/?$/);
  if(published) {
    const out=new URL("https://docs.google.com/spreadsheets/d/e/"+published[1]+"/pubhtml");
    for(const key of ["gid","single","headers"])if(u.searchParams.has(key))out.searchParams.set(key,u.searchParams.get(key));
    out.searchParams.set("widget","true");
    return {embed:out.href,original:out.href,published:true};
  }
  const match=u.pathname.match(/^\/spreadsheets\/d\/([\w-]{20,100})(?:\/|$)/);
  if(!match)throw new Error("链接不是 Google Sheets 表格。");
  const gid=u.searchParams.get("gid")||new URLSearchParams(u.hash.slice(1)).get("gid");
  const base="https://docs.google.com/spreadsheets/d/"+match[1];
  const embed=new URL(base+(mode==="edit"?"/edit":"/preview"));
  if(mode==="edit")embed.searchParams.set("rm","minimal");
  if(gid&&/^\d+$/.test(gid))embed.hash="gid="+gid;
  return {embed:embed.href,original:base+"/edit"+(embed.hash||""),published:false};
}
