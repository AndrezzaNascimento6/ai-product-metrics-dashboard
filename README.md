# AI Product Metrics Dashboard

A React + TypeScript dashboard with fictional data, designed for landscape video recording.

## Run locally

```sh
npm ci --cache /tmp/product-signals-npm
npm run dev
```

`npm run build` checks TypeScript and generates the production build in `dist/`.

## Recording

The composition maintains a 16:9 aspect ratio and fits within the window without scrolling. The **Replay** button below the frame restarts the 10-second cinematic sequence. Capture only the frame to keep the control out of the video. Once the sequence ends, the scene stays in its final state.

- 0–2s: a mechanical silhouette emerges from darkness with red light, particles, and holographic data fragments.
- 2–4s: the camera moves through an abstract AI processing core.
- 4–6s: all seven metrics travel through a data tunnel at different apparent depths.
- 6–8s: the signals resolve into an open composition, with emphasis on Android.
- 8–10s: the investigation question appears and the frame settles. All motion stops by the end of the sequence.

The robot, AI core, particles, and tunnel are drawn with inline SVG and CSS. Framer Motion coordinates the camera movement, depth effects, and transitions. No external images, videos, or new runtime dependencies are required. Replay remounts the entire sequence, resetting its timers and counters. The visible interface remains in Portuguese.

The data lives in `src/data.ts`, in the `productMetrics` object. The chart series is illustrative and normalized (100 → 82); it does not represent an absolute conversion rate. All data is fictional; there is no backend, no AI API calls, and no credentials are required.
