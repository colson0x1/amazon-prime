# Amazon Prime Microfrontend Application

## Intro 🚀

Sup! You've discovered the epitome of modern frontend engineering. This application showcases a state-of-the-art microfrontend architecture, utilizing Webpack's Module Federation plugin to seamlessly integrate multiple independently developed and deployed microfrontends into a unified application. 😆

### Highlights:

- **Microfrontend Architecture**: Modular, scalable, and maintainable codebases with independently developed and deployable microfrontends.
- **Webpack Module Federation**: Cutting-edge module bundling with dynamic runtime loading, optimizing performance and build efficiency.
- **Isolated Development**: Develop microfrontends in isolation, ensuring minimal dependencies and streamlined team workflows.
- **Shared Dependencies Management**: Efficiently share dependencies to reduce redundancy and boost performance.
- **Independent Deployment**: Deploy microfrontends independently for rapid iteration and minimal deployment risk.

Dive in and explore how I've pushed the boundaries of frontend development with this advanced microfrontend architecture! 🔥

## Table of Contents

- [App Structure](#app-structure)
- [Microfrontends Overview](#microfrontends-overview)
  - [Container](#container)
  - [Cart](#cart)
  - [Products](#products)
- [Application Architecture](#application-architecture)
  - [Key Concepts](#key-concepts)
  - [Component Communication](#component-communication)
- [Setup and Running the Application](#setup-and-running-the-application)
  - [Prerequisites](#prerequisites)
  - [Steps to Run](#steps-to-run)
- [Detailed Configuration](#detailed-configuration)
  - [Webpack Configuration](#webpack-configuration)
    - [Container's Webpack Config](#containers-webpack-config)
    - [Cart's Webpack Config](#carts-webpack-config)
    - [Products' Webpack Config](#products-webpack-config)
  - [Package.json Files](#packagejson-files)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

![amazon prime microfrontend](https://i.imgur.com/irn7oDP.png)

![amazon prime microfrontend](https://i.imgur.com/FWYZluv.png)

![amazon prime microfrontend](https://i.imgur.com/1eCFVM0.png)

## App Structure

```
amazon-prime/
├── Cart/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── bootstrap.js
│   │   └── index.js
│   └── webpack.config.js
├── Products/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── bootstrap.js
│   │   └── index.js
│   └── webpack.config.js
├── Container/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── bootstrap.js
│   │   └── index.js
│   └── webpack.config.js
└── README.md
```

## Microfrontends Overview ✨

### Container

The Container is the main application that loads and integrates the other microfrontends (Cart and Products). It orchestrates the microfrontends and provides a unified user experience.

### Cart

The Cart microfrontend manages the shopping cart functionality. It is independently developed and deployed, allowing it to be modified and scaled without affecting other parts of the application.

### Products

The Products microfrontend manages the product listing functionality. It is also independently developed and deployed, facilitating independent updates and scalability.

## Application Architecture ⚡

This project utilizes a microfrontend architecture, allowing for modular development, deployment, and scaling of individual parts of the application. The architecture leverages Webpack's Module Federation plugin to enable the sharing and loading of code between different microfrontends.

### Key Concepts

- **Module Federation**: This Webpack plugin allows each microfrontend to expose its modules and consume modules from other microfrontends, enabling seamless integration.
- **Isolation**: Each microfrontend can be developed and run in isolation, ensuring decoupled development and independent deployment.
- **Shared Dependencies**: Shared dependencies are configured to avoid loading duplicate instances of the same library across different microfrontends.

### Component Communication

Communication between microfrontends is a crucial aspect of microfrontend architecture. In this project, communication is achieved through the following means:

1. **Props and Callbacks**: When a microfrontend exposes a component, it can accept props and callbacks for interaction.
2. **Global State Management**: Shared state management tools like Redux or Context API can be used if microfrontends need to share a global state.
3. **Custom Events**: Microfrontends can dispatch and listen to custom events for communication.

## Setup and Running the Application 📦🚀

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

### Steps to Run

1. **Install Dependencies**

   Navigate to each microfrontend's directory and install dependencies:

   ```bash
   cd amazon-prime/Container
   npm install
   cd ../Cart
   npm install
   cd ../Products
   npm install
   ```

2. **Start the Microfrontends**

   Each microfrontend runs on a different port. Start them in separate terminal sessions:

   ```bash
   # Start Container
   cd amazon-prime/Container
   npm start

   # Start Cart
   cd ../Cart
   npm start

   # Start Products
   cd ../Products
   npm start
   ```

3. **Access the Application**

   Open your browser and navigate to `http://localhost:8080`. The Container application will load the Cart and Products microfrontends.

## Detailed Configuration 🛠️

### Webpack Configuration

Each microfrontend has its own Webpack configuration file, defining how it should be built and served.

#### Container's Webpack Config

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        products: 'products@http://localhost:8081/remoteEntry.js',
        cart: 'cart@http://localhost:8082/remoteEntry.js',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

- **ModuleFederationPlugin Configuration**: The `name` property identifies the container, and the `remotes` property maps the remote microfrontends to their respective URLs.

#### Cart's Webpack Config

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8082,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './CartShow': './src/bootstrap',
      },
      shared: ['faker'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

- **ModuleFederationPlugin Configuration**: The `name` property identifies the microfrontend, the `filename` property specifies the entry file, and the `exposes` property lists the modules to be exposed. Shared dependencies are configured to avoid duplication.

#### Products' Webpack Config

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8081,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsIndex': './src/bootstrap',
      },
      shared: ['faker'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

- **ModuleFederationPlugin Configuration**: Similar to Cart, this configuration defines the name, entry file, exposed modules, and shared dependencies for the Products microfrontend.

### Package.json Files

Each microfrontend's `package.json` specifies its dependencies, scripts, and other metadata.

#### Example: Cart's package.json

```json
{
  "name": "cart",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve"
  },
  "dependencies": {
    "faker": "^4.1.0",
    "html-webpack-plugin": "5.5.0",
    "webpack": "5.88.0",
    "webpack-cli": "4.10.0",
    "webpack-dev-server": "4.7.4"
  }
}
```

- **Scripts**: The `start` script uses `webpack serve` to start the development server.
- **Dependencies**: Lists the necessary dependencies for the microfrontend to run, including Webpack and Faker.

#### Example: Products' package.json

```json
{
  "name": "products",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve"
  },
  "dependencies": {
    "faker": "5.1.0",
    "html-webpack-plugin": "5.5.0",
    "webpack": "5.88.0",
    "webpack-cli": "4.10.0",
    "webpack-dev-server": "4.7.4"
  }
}
```

#### Example: Container's package.json

```json
{
  "name": "container",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve"
  },
  "dependencies": {
    "html-webpack-plugin": "5.5.0",
    "nodemon": "3.1.1",
    "webpack": "5.88.0",
    "webpack-cli": "4.10.0",
    "webpack-dev-server": "4.7.4"
  }
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Screenshots 📷

![amazon prime microfrontend](https://i.imgur.com/UkVhN8W.png)

![amazon prime microfrontend](https://i.imgur.com/AAZCxwL.png)

![amazon prime microfrontend](https://i.imgur.com/8sCkbCf.png)

![amazon prime microfrontend](https://i.imgur.com/Sq31zpS.png)

![amazon prime microfrontend](https://i.imgur.com/JymUR3l.png)

![amazon prime microfrontend](https://i.imgur.com/oJyUqwh.png)

![amazon prime microfrontend](https://i.imgur.com/SHdvhhv.png)

![amazon prime microfrontend](https://i.imgur.com/23iDcAf.png)

![amazon prime microfrontend](https://i.imgur.com/AVepKGk.png)

![amazon prime microfrontend](https://i.imgur.com/veICA8N.png)

![amazon prime microfrontend](https://i.imgur.com/Il3XhFf.png)

![amazon prime microfrontend](https://i.imgur.com/nwsPAGH.png)

![amazon prime microfrontend](https://i.imgur.com/xiH0o2b.png)

![amazon prime microfrontend](https://i.imgur.com/3JPCLl8.png)

![amazon prime microfrontend](https://i.imgur.com/WlxG7zS.png)

![amazon prime microfrontend](https://i.imgur.com/zmJMXzF.png)

![amazon prime microfrontend](https://i.imgur.com/RKsmqFi.png)

![amazon prime microfrontend](https://i.imgur.com/irn7oDP.png)

![amazon prime microfrontend](https://i.imgur.com/FWYZluv.png)

![amazon prime microfrontend](https://i.imgur.com/1eCFVM0.png)
