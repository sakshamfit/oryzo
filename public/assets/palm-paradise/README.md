# Palm Paradise — assets

Every image here is **generated placeholder art** (see `scripts/generate-placeholders.mjs`
at the repository root). The site is built to work with these and then to light up the
moment you replace them. No code changes required.

## Dropping in the real footage

1. Convert your Palm Paradise film to 30 stills (EZGIF, ffmpeg, …).
2. Name them `frame-001.jpg` … `frame-030.jpg`.
3. Overwrite the files in `sequence/` — done. The hero uses them on the next load.

### Optional portrait set

Add the same 30 names to `mobile/` and phones will automatically use them.
Remove the folder to fall back to the landscape set.

## Folders

| Folder        | Contents                                                        |
| ------------- | --------------------------------------------------------------- |
| `sequence/`   | 30 hero frames, landscape (`frame-001.jpg` … `frame-030.jpg`)    |
| `mobile/`     | optional portrait variant of the same 30 frames                 |
| `architecture/` | `hero.jpg`, `detail-01/02.jpg`, `architecture-01/02/03.jpg`    |
| `residences/` | `residence-01/02/03.jpg`                                         |
| `lifestyle/`  | `lifestyle-01/02/03/04.jpg`                                      |
| `gallery/`    | `gallery-01…06.jpg`                                              |
| `location/`   | `map.jpg`                                                        |
| `branding/`   | `logo.svg`, `monogram.svg`                                       |

If you change the frame **count**, update `totalFrames` in `src/config/palmSequence.ts`.
If you rename anything, update the matching path in `src/config/projectData.ts` — that
file is the single registry of asset URLs.
