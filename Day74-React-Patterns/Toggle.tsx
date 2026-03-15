// === Compound Components ===
// Instead of passing 20 different props to a single "Mega-Component", we break it down into small pieces that work together.
//
// === COntext-Driven UI ===
// 1. The Problem: A standard <Tabs /> component often looks like <Tabs data={items} activeTab={1} onChange={...} />. This is hard to customize (e.g., if you want an icon only on one tab).
// 2. The Solution: Use React Context inside the parent to manage state. The children (Tab, List, Panel) consume that context to know if they are "active".
// 3. The Result: A clean, declarative API:
//    <Tabs>
//      <Tabs.List>
//        <Tabs.Trigger value="one">Accounts</Tabs.Trigger>
//        <Tabs.Trigger value="two">Security</Tabs.Trigger>
//      </Tabs.List>
//      <Tabs.Content value="one">Manage your profile...</Tabs.Content>
//    </Tabs>


// MICROLAB
// Build a "Toggle" compound component that manages its "On/Off" state internally and provides a clean sub-component API.
import React, { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

// 1. Parent Component
export function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

// 2. Child Components (Static properties)
Toggle.On = ({ children }) => {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
};

Toggle.Off = ({ children }) => {
  const { on } = useContext(ToggleContext);
  return on ? null : children;
};

Toggle.Button = ({ children }) => {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle} {...props} />;
};