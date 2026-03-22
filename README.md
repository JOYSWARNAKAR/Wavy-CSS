# Wavy CSS

A lightweight, utility-first CSS engine that transforms simple class names into CSS properties. Inspired by modern CSS frameworks but designed to be minimal and performant.

## Features

- **Utility-First**: Apply styles directly with class names like `chai-bg-red` or `chai-p-4`
- **Lightweight**: No dependencies, pure JavaScript implementation
- **Flexible**: Supports spacing, colors, typography, and layout utilities
- **Easy Integration**: Drop-in script that works with any HTML

## Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wavy-css-react.git
cd wavy-css-react
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

### Usage

Include the script in your HTML:

```html
<script src="src/main.js"></script>
```

Then use Wavy CSS classes in your HTML:

```html
<div class="chai-bg-blue chai-p-4 chai-rounded-lg">
  <h1 class="chai-text-white chai-text-2xl">Hello World!</h1>
  <p class="chai-text-gray chai-mt-2">Welcome to Wavy CSS</p>
</div>
```

## Available Utilities

### Spacing
- `chai-p-{size}` - Padding (all sides)
- `chai-m-{size}` - Margin (all sides)
- `chai-pt-{size}`, `chai-pr-{size}`, `chai-pb-{size}`, `chai-pl-{size}` - Padding (specific sides)
- `chai-mt-{size}`, `chai-mr-{size}`, `chai-mb-{size}`, `chai-ml-{size}` - Margin (specific sides)
- `chai-px-{size}`, `chai-py-{size}` - Padding (x-axis/y-axis)

### Colors
- `chai-bg-{color}` - Background color
- `chai-text-{color}` - Text color

### Typography
- `chai-text-{size}` - Font size (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl)
- `chai-text-{align}` - Text alignment (left, center, right, justify)

### Layout
- `chai-w-{size}` - Width
- `chai-h-{size}` - Height
- `chai-rounded` - Border radius
- `chai-rounded-{size}` - Specific border radius

## Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Browser Support

Works in all modern browsers that support ES6 modules.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


