# React Component Library

A collection of reusable React components including collapsible panels, array transformers, and API data viewers — built with modern React (React 18), Jest, and Storybook.

## 🧩 Components Included

| Component | Description |
|----------|-------------|
| `CollapsiblePanel` | A simple expandable/collapsible panel |
| `StringArrayTransformer` | Parses, transforms, sorts, and manipulates arrays of strings |
| `DataDisplayComponent` | Fetches and displays data from an external API |
| `Navbar` | Navigation bar with route support |
| `HomePage` | Landing page showcasing all components |

## 🚀 Features

- Built with React 18
- Uses React Router v6
- Includes Jest unit tests
- Storybook integration for visual development
- Responsive and accessible design
- Fully self-contained components

## 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)  (v16 or higher)
- npm or yarn

## 🛠️ Installation

Clone the repo:

```bash
git clone https://github.com/yourusername/js-component-lib.git 
cd js-component-lib
```

Install dependencies:
```bash
npm install
# or
yarn install
```

## ▶️ Running the App
Start the development server:
```bash
npm start
# or
yarn start
```
Open http://localhost:3000 in your browser.

## 📖 View Components in Storybook
```bash
npm run storybook
# or
yarn storybook
```
Visit http://localhost:6006 to explore stories for each component.

## 🧪 Run Unit Tests
Run Jest tests:
```bash
npm test
# or
yarn test
```

To run tests in watch mode:
```bash
npm run test:watch
# or
yarn test --watch
```

## 📁 Folder Structure
```bash
js-component-lib/
├── public/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # Page-level components (e.g., HomePage)
│   ├── App.jsx            # Main routing & layout
│   └── main.jsx           # Entry point
├── __tests__/             # Jest test files
├── stories/               # Storybook stories
├── package.json
├── jest.config.js         # Jest configuration
└── README.md
```

## 🧰 Available Scripts
| Script | Description |
|--------|-------------|
| `npm start` | Starts the development server |
| `npm run build` | Builds the production version |
| `npm test` | Runs Jest unit tests |
| `npm run test:watch` | Runs tests in watch mode |
| `npm run storybook` | Starts Storybook UI |
| `npm run build-storybook` | Builds static Storybook site | 

## 📌 Notes

- The `DataDisplayComponent` fetches data from an external API and displays it. Make sure the API is running when you test this component.
- All components are designed to be reusable and should work in different React projects.
- The `StringArrayTransformer` component includes multiple transformation options (sort, filter, etc.) and can be used in various data processing scenarios.
- The `Navbar` component includes route support and should be used as the main navigation for the application.
- The `HomePage` component showcases all the available components and serves as a demonstration of how they can be used together.
- All components are written in modern React (React 18) and use functional components with hooks.
- The project includes Storybook for visual testing and component documentation.
- The project includes Jest unit tests for each component to ensure reliability.

## 📌 To-Do

- Add more complex data transformation options to `StringArrayTransformer`
- Implement additional API endpoints for `DataDisplayComponent`
- Add more components to the library
- Improve accessibility features
- Add more test coverage

## 📌 License

This project is licensed under the GPL License - see the [LICENSE](LICENSE) file for details.
