// Display-only plugin: Google renders the sheet in the viewer's browser.
// No Google credentials, API proxy, or sheet data is handled by World.
process.stdin.resume();
process.stdin.on("end",()=>{process.stdout.write(JSON.stringify({version:1,ok:false,error:{code:"method_not_allowed",message:"Google Sheets is an embedded browser view; no backend methods are exposed."}})+"\n");process.exitCode=1;});
