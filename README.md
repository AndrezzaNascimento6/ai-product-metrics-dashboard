# Product Signals

A React + TypeScript dashboard with fictional data, designed for landscape video recording.

## Run locally

```sh
npm ci --cache /tmp/product-signals-npm
npm run dev
```

`npm run build` checks TypeScript and generates the production build in `dist/`.

## Recording

The composition maintains a 16:9 aspect ratio and fits within the window without scrolling. The **Replay** button below the frame restarts the approximately 7-second sequence. Capture only the frame to keep the control out of the video. Once the sequence ends, the scene stays in its final state.

- 0–2s: initialization, number counters, and chart drawing.
- 2–4s: the title and composition settle into place.
- 4–7s: a closer view, emphasis on Android signals, and the final question.

The data lives in `src/data.ts`, in the `productMetrics` object. The chart series is illustrative and normalized (100 → 82); it does not represent an absolute conversion rate. All data is fictional; there is no backend, no AI API calls, and no credentials are required.
