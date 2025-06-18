import './App.css';
import CollapsiblePanel from './components/CollapsiblePanel';
import StringArrayTransformer from './components/StringArrayTransformer';

function App() {
  return (
    <div className="App">
      <h1>React Collapsible Panel Example</h1>
      <CollapsiblePanel title="Section 1" defaultOpen>
        <p>This is the first collapsible section.</p>
      </CollapsiblePanel>
      <CollapsiblePanel title="Section 2">
        <p>This is another collapsible section. Try clicking to expand!</p>
      </CollapsiblePanel>
      <StringArrayTransformer />
    </div>
  );
}

export default App;