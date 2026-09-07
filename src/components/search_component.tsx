import { Fragment } from "react/jsx-runtime";
import { useState } from "react";

export function SearchComponent() {
	// 1. Mock data to search through
  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Pineapple",
    "Mango",
    "Strawberry",
    "Grape"
  ];

  // 2. Track the search query state
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Filter data dynamically based on the input
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
	<Fragment>
	  <h2>React Search Bar</h2>
      
      {/* 4. Controlled input field */}
      <input
        type="text"
        placeholder="Search fruits..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "20px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />

      {/* 5. Render the filtered results */}
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No results found</li>
        )}
      </ul>
	</Fragment>
  )
}
