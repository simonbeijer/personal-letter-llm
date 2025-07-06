"use client"
export default function InputField({type, name, value, onChange, placeholder, error, label, required = false}) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="text-foreground text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-3 py-2 bg-surface text-foreground border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
          transition-colors duration-200 
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-border'} 
          disabled:bg-gray-50 disabled:text-gray-500`}
        required={required}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          This field is required
        </p>
      )}
    </div>
  );
}