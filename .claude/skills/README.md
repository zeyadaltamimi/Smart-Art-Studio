# Remotion Agent Skills

Vendored copy of the [Remotion Agent Skills](https://github.com/remotion-dev/skills),
which document Remotion best practices for coding agents (Claude Code, Codex, Cursor, …).

- Source: `remotion-dev/skills` @ `f546827` ("Update template")
- Skills version: `4.0.521`

The upstream installer (`npx skills add remotion-dev/skills`) is unavailable from this
environment's package registry, so the `skills/` directory of that repository was copied
here verbatim instead. Each subdirectory with a `SKILL.md` is picked up by Claude Code as
a skill of the same name.

| Skill | Purpose |
| --- | --- |
| `remotion-best-practices` | Router that points at every other skill; use it when unsure which one applies. |
| `remotion-create` | Scaffold a new Remotion project or composition. |
| `remotion-markup` | Writing Remotion React markup: compositions, animation, layout, typography, media, audio, fonts, timing. |
| `remotion-studio` | Launch Remotion Studio to preview a video. |
| `remotion-render` | Render a video or a still. |
| `remotion-maps` | Map animations: static maps, routes, markers, Mapbox/MapLibre/MapTiler, GeoJSON, CesiumJS flyovers. |
| `remotion-captions` | Captions and subtitles. |
| `remotion-saas` | Architecture for Remotion-powered apps and product integrations. |
| `remotion-interactivity` | Structure markup so elements stay selectable and editable in Studio. |
| `remotion-docs` | Search the Remotion documentation and fetch pages as Markdown. |
| `remotion-upgrade` | Upgrade Remotion, related packages, and the installed skills. |
| `remotion-multimedia` | Browser-based multimedia handling with Mediabunny. |

`remotion-best-practices` intentionally embeds a copy of the other skills under its own
directory — its `SKILL.md` links to them by relative path, so those nested copies must
stay in place.

## Updating

Re-run the upstream installer where the npm registry is reachable:

```bash
npx skills add remotion-dev/skills
```

Otherwise, re-clone the repository and copy its `skills/` directory over this one:

```bash
git clone --depth 1 https://github.com/remotion-dev/skills.git /tmp/remotion-skills
rm -rf .claude/skills/remotion-*
cp -R /tmp/remotion-skills/skills/. .claude/skills/
```
