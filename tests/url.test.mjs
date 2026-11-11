import test from "node:test";
import assert from "node:assert/strict";
import {sheetUrls} from "../src/sheet-url.mjs";
const id="abcdefghijklmnopqrstuvwxyz0123456789";
test("preview preserves worksheet without granting edit access",()=>{
 const r=sheetUrls("https://docs.google.com/spreadsheets/d/"+id+"/edit?usp=sharing#gid=123");
 assert.equal(r.embed,"https://docs.google.com/spreadsheets/d/"+id+"/preview#gid=123");
 assert(!r.embed.includes("usp"));assert(!r.published);
});
test("editor and published embed preserve their distinct permissions",()=>{
 assert(sheetUrls(id,"edit").embed.includes("/edit?rm=minimal"));
 const p=sheetUrls("https://docs.google.com/spreadsheets/d/e/2PACX-abc/pubhtml?gid=42&single=true");
 assert(p.published);assert(p.embed.includes("gid=42"));assert(p.embed.includes("widget=true"));
});
test("reject non-Google and credential-bearing URLs",()=>{
 for(const url of ["javascript:alert(1)","https://docs.google.com.evil.test/spreadsheets/d/"+id,"https://user:pass@docs.google.com/spreadsheets/d/"+id,"https://docs.google.com/document/d/"+id,"http://docs.google.com/spreadsheets/d/"+id])assert.throws(()=>sheetUrls(url));
});
