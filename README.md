# Nexus

A web application publication environment

## Principles

- Client-side technics do improve the user experience, nevertheless they should not damage the developer experience.
- Generic client-side features should not be bundled in any new web app, they should be provided by a generic and reusable runtime.
- Bundling is not scalable, adding a new page to an existing app should not involve to re-deploy the entire thing.

## Description

Nexus is a web application publication environment. It provides the essential services any web application need in a generic, simple, and light JavaScript runtime.

We could consider Nexus is actually extending the web browsers native capabilities, so they are not restricted anymore to static HTML pages publication. With Nexus, they can run client-side dynamic applications.

When using Nexus, we can focus on the app "content" and forget about routing, navigation, authentication, state management, backend connectivity, etc., because all of that is provided by Nexus.

The "content" we are talking about here can be very various things:

- It can be static or server-side rendered HTML if that's good enough for us.
- It can be JSON we get from a REST API or a GraphQL endpoint. In that case, we will have to provide some templates so the JSON content can be rendered properly.
- It can be advanced components (created with Svelte, React, Angular, VueJS, etc.)

## Do we need to learn a new technology?

Not really. It's just templates and configuration.

We can keep on developping our components with React, Vue, Angular, etc.

## Simple things must be simple

## Complex things must be possible

## Anything must scale

## Usage

All files located in `./pages` (and its sub-folders) are routable.

Nexus can also publish remote contents.

```json
{
  "remotes": {
    "/news": {
      "endpoint": "http://my-backend/api"
    }
  },
  "templates": {
    "article": "./templates/articleView",
    "category": "./templates/category"
  }
}
```

It means that any path starting with `/news` (`/news/strategy/annoucements` for example) will produce a call to the specified backend (`http://my-backend/api/strategy/annoucements` in our case), and depending on the type of the returned object, it will be rendered using the matching template (article template or category template in our example).

Note: we should provide a way to get the object type according its attribute values.
