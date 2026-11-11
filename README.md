# United Robotics Google Sheets plugin

Generic Google Sheets iframe panel. No API credentials or backend data replication.
Google enforces each viewer's existing file permissions and login. Preview is the
default; the optional Google editor uses the viewer's Google permissions. Published
pubhtml URLs are supported only when supplied; the plugin never publishes a file.

Configuration: `props.url`, `props.sources: [{title,url}]`, `props.mode`
(`preview` or `edit`), `props.window: "sheets"`.
Each mounted panel selects its own document. Worksheet selection is supplied by
Google inside the embedded document; gid links can select a specific worksheet.

Private embeds depend on Google and browser iframe/cookie policy. An original-file
link remains available; iframe onload is not treated as proof of authorized content.

Architecture: exisz/united-robotics-world-wiki, dev-plans/google-sheets-plugin.md.

Build: npm ci && npm run check. Immutable artifacts are under dist/, without maps.
