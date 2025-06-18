import CollapsiblePanel from '../components/CollapsiblePanel/CollapsiblePanel';

const CollapsiblePage = () => { 
  return (
    <div className="collapsible-page">
      <h1>React Collapsible Panel Example</h1>
      <CollapsiblePanel title="Section 1" defaultOpen>
        <p>This is the first collapsible section.</p>
      </CollapsiblePanel>
      <CollapsiblePanel title="Section 2">
        <p>This is another collapsible section. Try clicking to expand!</p>
      </CollapsiblePanel>
    </div>
  );
};

export default CollapsiblePage;
