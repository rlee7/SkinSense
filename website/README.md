# website

serves as a frontend to the skin sense backend machine learning classification service.

## usage

be sure [yarn](https://yarnpkg.com/en) is installed

### frontend

#### development

at `localhost:8080`. rollup and plugins automatically reload browser on file changes. `rollup-plugin-serve-proxy` is somewhat buggy, so you will not be able to proxy requests from the rollup development server to the backend server (which means sending images will error out). for now, you will have to copy `frontend/src/main.js` to `backend/public/bundle.js`.

```sh
yarn serve
```

#### production

```sh
yarn build
```

### backend

#### development

at `localhost:3000`. nodemon automatically restarts server on file changes. note that you'll need files in `backend/public` (`cp frontend/dist/* backend/public`)

```sh
yarn dev
```

#### production

```sh
yarn start
```
