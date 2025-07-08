"use client"
export default function InputField({type, name, value, onChange, placeholder, error, label, required = false}) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="text-foreground text-sm font-medium mb-2">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-3 py-2.5 bg-surface text-foreground border rounded-lg 
          focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary 
          transition-all duration-200
          ${error ? 'border-error focus:ring-error/30 focus:border-error' : 'border-border'} 
          disabled:bg-muted disabled:text-grey/50 disabled:cursor-not-allowed`}
        required={required}
      />
      {error && (
        <p className="text-error text-sm mt-1">
          This field is required
        </p>
      )}
    </div>
  );
}