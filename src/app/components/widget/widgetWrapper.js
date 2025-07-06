"use client"

export default function WidgetWrapper({children}) {
    return (
        <div className="bg-white shadow rounded p-4 text-black">{children}</div>
    );
};