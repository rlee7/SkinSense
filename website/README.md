# website

serves as a frontend to the skin sense backend machine learning classification service.

## usage

be sure [yarn](https://yarnpkg.com/en) is installed

### frontend

#### development

at `localhost:8080`. automatically reloads browser on file changes

```sh
yarn serve
```

#### production

```sh
yarn build
```

### backend

#### development

at `localhost:3000`. automatically restarts server on file changes. note that you'll need files in `backend/public` (`cp frontend/dist/* backend/public`)

```sh
yarn dev
```

#### production

```sh
yarn start
```
