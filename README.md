# Auth

nextjs-auth
or in-house solution

## In-house

Wrap auth routes with `withAuthRoute` HOC (like AuthRouteGuard)
`withAuthRoute` - redirects to login (or elsewhere) if no auth

Store auth state (tokens) 

# Store

Redux is overly verbose, even with toolkit
We can use smaller state, e.g. Zustand + react-query

react-query allows to optionally prefetch to enable SSR
automatically refetches on page refocus
can configure periodic refreshing, etc
super convenient and easy to use

todo - test if prefetch components can be nested (they use <Hydrate> provider)

# Localization

`[lang]` slug
dictionaries/i18n (can reuse our jsons)
https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing


# Server - Client - Server - Client component nesting
https://app-router.vercel.app/context