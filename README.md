# Electron + React + Vite + Typescript

## Setup

- nvm use
3 terminal tabs:
- npm run dev (run React + Vite)
- npm run watch-ts (run electron typescript compiler)
- npm run build (run electron)

## Plans

- datetime picker at top and bottom, to select start and end ranges. Also include a +12 hours button on top and bottom. If end is before start, than change sort order and behaviour of buttons (to -12 or something like that)
- little tag icon in the upper right corner. Open panel from the left on click. Have more controls: export to CSV, filter to only include/exclude certain domain names, number of tags, button to apply tags
- tag icon should be circled red if domain name or number of tags is restricted
- program should still work if tagging process hangs
- tags are not strictly chronological, and apply a color to the list of results. There should be a little legend in the side panel once tagging is complete
- should be able to collapse columns in results table
- side panel should have a refresh button
- make google searches one result
- show domain name, but not url. Click url to copy full path

## Resources

https://medium.com/@selfint/build-an-electron-app-using-vite-typescript-and-react-e98f7fc1babd

https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way

https://www.npmjs.com/package/sqlite3?activeTab=dependencies

https://gist.github.com/Ephraim-Bryski/c218cdff6bbe3ca34a0aa67c1f87a715

https://stackoverflow.com/questions/72553650/how-to-get-node-sqlite3-working-on-mac-m1
npm install sqlite3 --build-from-source --target_arch=arm64 --fallback-to-build

