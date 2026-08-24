## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project

Krea14 — Portfolio site for a graphic designer / UI/UX / frontend developer.

### Key files
- `src/translations.ts` — FR→EN translation dictionary (120+ entries)
- `public/data/portfolio.json` — All portfolio data (profile, case studies, services, legal)
- `src/pages/admin.astro` — Admin panel for managing content

### i18n system
- Toggle FR/EN in header saves to `localStorage`
- On load, `applyLang()` walks all text nodes and replaces FR with EN
- Dynamic content uses `data-fr`/`data-en` attributes
- `src/translations.ts` is the single source of truth
