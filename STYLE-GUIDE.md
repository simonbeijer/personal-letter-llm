# Personal Letter LLM Style Guide

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Components](#components)
5. [Layout & Spacing](#layout--spacing)
6. [Interactions & Animations](#interactions--animations)
7. [Code Standards](#code-standards)
8. [Accessibility](#accessibility)

---

## Brand Identity

### Project Purpose
Personal Letter LLM is an AI-powered application that generates personalized cover letters by analyzing CVs and job advertisements. The application serves job seekers and professionals who need compelling, tailored application materials.

### Brand Personality
- **Professional**: Clean, polished interface suitable for career-focused users
- **Intelligent**: Sophisticated AI capabilities presented in an approachable way
- **Trustworthy**: Reliable, secure handling of personal career information
- **Efficient**: Streamlined workflows that save users time and effort

### Tone & Voice
- **Helpful**: Guides users through the process with clear instructions
- **Confident**: Communicates AI capabilities without being overwhelming
- **Professional**: Maintains appropriate tone for career-related application
- **Approachable**: Friendly but not casual; supportive without being informal

---

## Color System

### Primary Colors

#### Light Mode
```css
--background: #F9FAFB        /* Light gray background */
--foreground: #111827        /* Dark gray text */
--primary-color: #2563EB     /* Professional blue */
--secondary-color: #10B981   /* Success green */
--surface: #FFFFFF           /* White cards/surfaces */
--border: #E5E7EB           /* Light gray borders */
```

#### Dark Mode
```css
--background: #111827        /* Dark gray background */
--foreground: #F9FAFB        /* Light gray text */
--primary-color: #2563EB     /* Consistent blue */
--secondary-color: #10B981   /* Consistent green */
--surface: #1F2937          /* Dark gray cards */
--border: #374151           /* Medium gray borders */
```

### Semantic Colors
```css
--error: #EF4444            /* Red for errors */
--success: #10B981          /* Green for success states */
--accent: #10B981           /* Green accent color */
--muted: #6B7280 (light) / #9CA3AF (dark)  /* Muted text */
--grey: #6B7280 (light) / #9CA3AF (dark)   /* Gray elements */
```

### Gradients
```css
--gradient-primary: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)
--gradient-secondary: linear-gradient(135deg, #059669 0%, #10B981 100%)
--gradient-accent: linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)
```

### Color Usage Guidelines
- **Primary Blue**: Main CTAs, links, focus states, primary actions
- **Secondary Green**: Success states, positive feedback, secondary actions
- **Gradients**: Premium features, main action buttons, hero elements
- **Error Red**: Form validation, error messages, destructive actions
- **Gray Scale**: Text hierarchy, borders, disabled states

---

## Typography

### Font Stack
```css
font-family: 'Geist Sans', 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
```

### Font Loading
- **Primary**: Geist Sans (modern, clean, AI-focused) - actively loaded via Next.js fonts
- **Monospace**: Geist Mono (technical elements, code) - loaded via Next.js fonts  
- **Fallback**: Inter with system font stack (legacy CSS declaration)

### Typography Scale

#### Headings
- **H1**: `text-4xl font-bold` (36px) - Page titles, hero headings
- **H2**: `text-3xl font-bold` (30px) - Section headings
- **H3**: `text-lg font-semibold` (18px) - Card titles, subsections
- **H4**: `text-base font-medium` (16px) - Form labels, small headings

#### Body Text
- **Large**: `text-lg` (18px) - Introductory text, descriptions
- **Base**: `text-base` (16px) - Primary body text
- **Small**: `text-sm` (14px) - Secondary text, metadata
- **Extra Small**: `text-xs` (12px) - Captions, fine print

### Typography Guidelines
- **Line Height**: 1.6 for optimal readability
- **Font Smoothing**: Antialiased for crisp rendering
- **Color**: Use semantic color variables for consistency
- **Hierarchy**: Clear visual hierarchy with size and weight differences

---

## Implementation Patterns

### Current Styling Approach

The application uses a **hybrid approach** with three distinct patterns based on component complexity and requirements:

#### Pattern 1: CSS Custom Properties (Core Interactive Components)
**When**: Complex interactive components with multiple variants and states  
**Examples**: Button, InputField, ThemeToggle, Header  
**Approach**: Full CSS custom property usage for theming

```javascript
// Example: Button component
const variants = {
  primary: "bg-gradient-primary text-foreground border border-primary/20 hover:shadow-sm"
};

// Example: Header component  
className="bg-surface border-b border-border shadow-sm"
className="text-foreground hover:text-primary transition-colors"
```

#### Pattern 2: Tailwind Dark Classes (Structural Components) 
**When**: Layout and container components with simpler theming needs  
**Examples**: Card, Modal  
**Approach**: Tailwind's `dark:` prefix for theme switching

```javascript
// Example: Card component  
className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
```

#### Pattern 3: Direct Tailwind (Simple Components)
**When**: Simple, single-purpose components without complex theming  
**Examples**: Spinner, simple layout elements  
**Approach**: Direct Tailwind classes

```javascript
// Example: Spinner
className="border-gray-800 border-t-white"
```

### Pattern Selection Guidelines

- **Use Pattern 1** for components with multiple variants, complex interactions, or branding requirements
- **Use Pattern 2** for containers, layouts, and components that need basic dark/light theming
- **Use Pattern 3** for simple utilities, temporary components, or rapid prototyping

---

## Components

### Button System

#### Variants
```javascript
// Primary Button - Main actions
variants: {
  primary: "bg-gradient-primary text-white border border-primary/20 
           hover:shadow-sm hover:border-primary/30 focus:ring-primary/30"
}

// Secondary Button - Alternative actions  
variants: {
  secondary: "bg-surface text-foreground border border-border 
             hover:bg-muted hover:border-border/80 focus:ring-grey/20"
}

// Outline Button - Tertiary actions
variants: {
  outline: "border border-primary text-primary hover:bg-primary 
           hover:text-white hover:border-primary focus:ring-primary/30"
}
```

#### Sizes
```javascript
sizes: {
  sm: "px-3 py-2 text-sm",      // Small buttons
  md: "px-4 py-2.5 text-base",  // Default buttons  
  lg: "px-6 py-3 text-lg"       // Large buttons
}
```

#### Button Guidelines
- Use `primary` for main actions (Generate Letter, Get Started)
- Use `secondary` for alternative actions (Cancel, Settings)
- Use `outline` for tertiary actions (View Details, Learn More)
- Include disabled states with reduced opacity and no hover effects
- Implement scale transforms for hover feedback (1.01 scale up)

### Card System

#### Structure
```javascript
<Card>           // Container with background and border
  <CardHeader>   // Top section with padding
    <CardTitle>    // Heading text
    <CardDescription> // Subtitle text
  </CardHeader>
  <CardContent>  // Main content area
</Card>
```

#### Styling
```javascript
// Card Implementation (Tailwind Dark Classes Pattern)
<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">

// Card Components
<CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
<CardDescription className="text-sm text-gray-600 dark:text-gray-300">
```

#### CSS Variables (Available but not used in current Card implementation)
```css
/* Available custom properties */
--card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--surface: #FFFFFF (light) / #1F2937 (dark);
--border: #E5E7EB (light) / #374151 (dark);
```

### Form Elements

#### Input Fields
```css
.input-field {
  padding: 0.625rem 0.75rem;
  background: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.input-field:focus {
  outline: none;
  ring: 1px var(--primary-color)/30;
  border-color: var(--primary-color);
}
```

#### Form Guidelines
- Always include labels with required indicators
- Use semantic colors for validation states
- Implement smooth transitions for focus states
- Provide clear error messaging below fields

### Modal System

#### Current Implementation
The Modal component uses Tailwind dark classes for theme switching:

```javascript
// Modal Container (Fixed overlay)
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  
// Modal Content (Tailwind Dark Classes Pattern)  
<div className="bg-white dark:bg-gray-900 p-6 rounded-lg min-width-[300px] shadow-xl relative">
  
// Close Button
<button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
```

#### Structure
```javascript
<Modal isOpen={boolean} onClose={function} showClose={boolean}>
  {children}
</Modal>
```

#### Styling Guidelines
- Dark overlay background (bg-black/50)
- Centered positioning with flexbox
- White/dark surface based on theme
- Optional close button in top-right
- Rounded corners and shadow for depth

### AI-Specific Components

#### AI Assistant Card
- Special green accent indicator (● Ready to help)
- Conversational messaging format
- Distinctive styling to indicate AI interaction
- Clear call-to-action integration

#### Sparkles Effect
- Used for AI/magic moments in the interface
- Animated hover states on primary actions
- Indicates intelligent/automated features

---

## Layout & Spacing

### Container System
```css
.container {
  max-width: 1280px;  /* 7xl */
  margin: 0 auto;
  padding: 1rem;      /* Base padding */
}

/* Responsive padding */
.responsive-container {
  padding: 1rem;           /* Mobile */
  padding: 1.5rem;         /* SM+ */
  padding: 2rem;           /* LG+ */
}
```

### Grid Systems
```css
/* Two-column layout */
.grid-two-col {
  display: grid;
  grid-template-columns: repeat(1, 1fr);  /* Mobile */
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .grid-two-col {
    grid-template-columns: repeat(2, 1fr);  /* Desktop */
  }
}
```

### Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

### Layout Guidelines
- Use consistent max-width containers (1280px)
- Implement responsive padding and margins
- Maintain proper spacing between sections
- Use CSS Grid for complex layouts, Flexbox for alignment

---

## Interactions & Animations

### Transition System
```css
/* Global transitions */
* {
  transition: border-color 0.3s ease, 
              background-color 0.3s ease, 
              color 0.3s ease;
}

/* Button hover effects */
.button:hover {
  transform: scale(1.01);
}

.button:active {
  transform: scale(0.99);
}
```

### Hover States
- **Buttons**: Scale transform (1.01) + color/shadow changes
- **Cards**: Subtle shadow increase or border color change
- **Links**: Color transition to primary/accent colors
- **Interactive elements**: Clear visual feedback

### Focus States
- **Ring-based focus**: Use `focus:ring-2 focus:ring-primary/30`
- **No outline removal**: Maintain accessibility compliance
- **Color coordination**: Match focus ring to element's primary color

### Loading States
- **Spinners**: Consistent styling across components
- **Progress indicators**: Use primary color for progress bars
- **Skeleton loading**: Match component structure and styling

### Animation Guidelines
- **Duration**: 0.3s for most transitions, 0.2s for quick feedback
- **Easing**: Use `ease` for natural feeling animations
- **Performance**: Prefer transform and opacity changes
- **Accessibility**: Respect `prefers-reduced-motion` settings

---

## Theme Token Usage Rules

### When to Use CSS Custom Properties vs Tailwind Classes

Based on current implementation patterns, follow these guidelines:

#### ✅ **Use CSS Custom Properties (Theme Tokens) When:**

1. **Component has multiple variants** (primary, secondary, outline)
2. **Complex color relationships** (backgrounds, borders, focus states)
3. **Brand-critical components** (buttons, forms, navigation)
4. **Dynamic theming required** (user preferences, seasonal themes)

```javascript
// ✅ Good: Complex interactive component
className="bg-surface text-foreground border border-border hover:bg-muted focus:ring-primary/30"
```

#### ✅ **Use Tailwind Dark Classes When:**

1. **Simple structural components** (cards, containers, modals)
2. **Layout components** with basic light/dark needs
3. **Rapid prototyping** or temporary components
4. **Third-party integration** where custom properties aren't available

```javascript
// ✅ Good: Simple structural component
className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
```

#### ✅ **Use Direct Tailwind When:**

1. **Simple utility components** (spinners, dividers, spacers)
2. **One-off styling** that doesn't need theming
3. **Performance-critical** components with minimal DOM
4. **Quick fixes** or temporary solutions

```javascript
// ✅ Good: Simple utility component
className="w-8 h-8 border-4 border-gray-800 border-t-white rounded-full animate-spin"
```

#### ❌ **Avoid Mixing Patterns:**

```javascript
// ❌ Bad: Mixed approach in same component
className="bg-surface border border-gray-200 dark:border-gray-700 text-foreground"
```

### Migration Strategy

**Current State**: Hybrid approach is intentional and functional  
**Future Direction**: Gradually migrate structural components to custom properties as they require updates  
**Priority**: Maintain consistency within each component, mixed approaches across components is acceptable

---

## Code Standards

### CSS Custom Properties
```css
/* Preferred approach - Use CSS custom properties */
.component {
  background: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--border);
}

/* Avoid mixing with Tailwind's built-in colors */
/* .component { @apply bg-white dark:bg-gray-800; } */
```

### Component Architecture
```javascript
// Standard component structure
export default function ComponentName({ 
  children, 
  className = "", 
  variant = "primary",
  size = "md",
  ...props 
}) {
  const baseClasses = "/* base styles */";
  const variants = { /* variant styles */ };
  const sizes = { /* size styles */ };
  
  return (
    <element 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </element>
  );
}
```

### File Organization
```
src/app/components/
├── button.js          # Reusable button component
├── card.js            # Card system components
├── inputField.js      # Form input component
├── modal.js           # Modal overlay component
├── themeToggle.js     # Theme switching component
└── [feature]/         # Feature-specific components
    ├── aiAssistant.js
    ├── letterPreview.js
    └── uploadArea.js
```

### Naming Conventions
- **Components**: PascalCase (`CustomButton`, `CardHeader`)
- **Props**: camelCase (`callBack`, `showClose`, `isOpen`)
- **CSS Classes**: kebab-case for custom, utilize existing Tailwind
- **Files**: camelCase for components (`themeToggle.js`)

### Import Guidelines
```javascript
// External libraries first
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Internal components
import CustomButton from "@/app/components/button";
import { Card, CardContent } from "@/app/components/card";

// Icons last
import { SparklesIcon } from "@heroicons/react/24/outline";
```

---

## Accessibility

### Color Contrast
- **Text on background**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI elements**: Ensure sufficient contrast for borders and interactive elements
- **Focus indicators**: High contrast focus rings for keyboard navigation

### Keyboard Navigation
- **Tab order**: Logical flow through interactive elements
- **Focus management**: Visible focus indicators on all interactive elements
- **Skip links**: Provide skip navigation for screen readers
- **Modal focus**: Trap focus within modal dialogs

### Screen Reader Support
```javascript
// Button with proper labeling
<button 
  aria-label="Generate cover letter"
  title="Create a personalized cover letter"
>
  Generate Letter
</button>

// Form fields with proper association
<label htmlFor="cv-upload">Upload your CV</label>
<input 
  id="cv-upload" 
  type="file" 
  aria-describedby="cv-help"
/>
<p id="cv-help">Select a PDF or Word document</p>
```

### Responsive Design
- **Mobile-first**: Design for mobile, enhance for desktop
- **Touch targets**: Minimum 44px for touch interfaces
- **Viewport**: Proper viewport meta tag configuration
- **Text scaling**: Support browser text zoom up to 200%

### Accessibility Guidelines
- Use semantic HTML elements when possible
- Provide alternative text for images and icons
- Ensure form validation is announced to screen readers
- Test with keyboard-only navigation
- Validate with accessibility tools (axe, WAVE)

---

## Implementation Notes

### Current Implementation Status

#### ✅ **Consistently Implemented**
1. **CSS Custom Properties System**: Comprehensive color system with automatic dark mode switching
2. **Typography**: Geist Sans properly loaded via Next.js fonts with appropriate fallbacks
3. **Hybrid Approach**: Each component consistently uses one of the three documented patterns
4. **Theme Variables**: All semantic colors (primary, secondary, error, etc.) properly defined

#### 📊 **Mixed by Design**
1. **Styling Patterns**: Intentional hybrid approach based on component complexity
   - **Pattern 1**: Button, InputField, ThemeToggle (CSS custom properties)
   - **Pattern 2**: Card, Modal (Tailwind dark classes)
   - **Pattern 3**: Spinner (Direct Tailwind)
2. **Component Architecture**: Different patterns for different use cases (documented above)

#### 🔧 **Areas for Future Enhancement**
1. **Pattern Migration**: Gradual migration of Pattern 2 components to Pattern 1 as they require updates
2. **Component Variants**: Expand variant systems for components currently using Pattern 2
3. **Documentation**: Consider Storybook or similar for component documentation

### Future Considerations
- **Design system documentation**: Consider tools like Storybook for component documentation
- **Component testing**: Implement visual regression testing for design consistency
- **Performance optimization**: Monitor CSS bundle size as design system grows
- **Design tokens**: Consider JSON-based design tokens for cross-platform consistency

---

*This style guide is a living document that should be updated as the Personal Letter LLM design system evolves.*