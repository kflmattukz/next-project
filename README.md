First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Stacks

- Next js - Meta framework of React
- Antd Design - UI Framework for React
- React Query - Fetcing, State & Caching tools

### Project Strcuture

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/ (Folder base routing, will search for file name layout & page)
│   ├── components/
│   │   └── *.tsx (Put all your reusable components here)
│   ├── assets/
│   │   └── (more folder (icons, images, video etc...))
│   ├── api/
│   │   └── (axios instance and API)
│   ├── hooks/
│   │   └── (custom Hooks, put reusable hooks in parent folder & page hooks on their on page)
│   ├── utils/
│   │   └── (utility folders, for helpers function and Wrapper Providers like React Query, Redux)
│   └── pages/
│       └── index.astro
└── package.json
```

#### Icon set

[Xnix Circular Interface Icons Collection](https://www.svgrepo.com/collection/xnix-circular-interface-icons)

#### Login

```
username: just input any email
password: just input any password
```
