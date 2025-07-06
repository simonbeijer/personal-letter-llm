"use client";
export default function Sidebar({ selectedWidget, setSelectedWidget }) {
  const widgetItems = ["Weather", "Stonks", "Cool shit"];

  const setWidgetItem = (index) => {
    let newItem = widgetItems[index];
    setSelectedWidget(newItem);
    console.log(selectedWidget);
  };

  return (
    <aside className="w-48 bg-white shadow p-4 text-black flex items-center justify-center">
      <ul className="w-32">
        {widgetItems.map((item, index) => (
          <li key={index} className="m-4">
            <button
              onClick={() => setWidgetItem(index)}
              className={` p-2 min-w-full rounded ${
                item === selectedWidget ? "font-bold bg-primary" : "bg-secondary"
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
