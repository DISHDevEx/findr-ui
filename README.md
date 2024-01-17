

<h1 align="center">Findr UI</h1>
<p align="center">
Based on React Material Admin which is a free and open-source admin application including many real-world examples. It is built on React and Material-UI.
</p>


## Getting Started

```
#To develop and interact with locally: 
1. Clone repo, navigate to root and run:
rm -rf node_modules
rm -rf package-lock.json
yarn config set "strict-ssl" false -g
yarn install
export NODE_OPTIONS=--openssl-legacy-provider
yarn run start

```

This will automatically open [http://localhost:7001](http://localhost:7001).

```
If the UI has been deployed with terraform on an EKS cluster, you may access the UI by using the node IP provided to you 
OR you can port-forward the UI by using the command:
kubectl port-forward <ui pod name>  -n ui 7001:7001
```

## Features

```
- Admin
  - Home
  - Dashboard
  - Connect
  - Manage
  - FAQ
  - Help Center
  - Documentation
  - Profile Activity
  - Profile Information
  - Profile Password
- Auth
  - Forgot Password
  - Forgot Password Submit
  - Login
  - Register
- Core
  - Forbidden
  - Not Found
  - Under Construction
- Landing
```

## Technologies

| Package               | Description                                    | Docs                                                                            |
| --------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| Analytics             | Google Analytics                               | [Docs](https://analytics.google.com/analytics/web/react-ga)                     |
| Bundle Size Analyzer  | Source map explorer                            | [Docs](https://create-react-app.dev/docs/analyzing-the-bundle-size)             |
| Charts                | Recharts                                       | [Docs](https://recharts.org/)                                                   |
| CI                    | Github CI                                      | [Docs]()                                                                        |
| Code Splitting        | Route-based code splitting (included in React) | [Docs](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting) |
| Components            | Material-UI                                    | [Docs](https://material-ui.com/)                                                |
| Data Fetching         | React Query Toolkit                            | [Docs](https://react-query.tanstack.com/)                                       |
| Deployment            | Github Pages                                   | [Docs](https://create-react-app.dev/docs/deployment#github-pages)               |
| Environment Variables | Dotenv (included in Create React App)          | [Docs](https://create-react-app.dev/docs/adding-custom-environment-variables)   |
| Error Monitoring      | Sentry                                         | [Docs](https://docs.sentry.io/platforms/javascript/guides/react/)               |
| Form                  | Formik                                         | [Docs](https://formik.org/)                                                     |
| I18N                  | react-i18next                                  | [Docs](https://react.i18next.com/)                                              |
| Routing               | React Router                                   | [Docs](https://reactrouter.com/)                                                |
| Theming (+ dark mode) | Material-UI                                    | [Docs](https://material-ui.com/customization/theming/)                          |
| Toolchain             | Create React App                               | [Docs](https://create-react-app.dev/)                                           |
| TypeScript            | TypeScript                                     | [Docs](https://create-react-app.dev/docs/adding-typescript/)                    |
| Validation            | Yup                                            | [Docs](https://github.com/jquense/yup)                                          |


