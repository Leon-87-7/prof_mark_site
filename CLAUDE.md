# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript single-page application for Professor Mark's website, built with Vite (using rolldown-vite experimental bundler). The site features a multi-page navigation system implemented as a client-side router without external routing libraries.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (runs TypeScript compiler check first, then Vite build)
npm run build

# Lint all TypeScript/TSX files
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Navigation System

- **Custom client-side routing**: No react-router or external routing library used
- Navigation state managed in [App.tsx](src/App.tsx) via `currentPage` state
- Page types defined in [src/types/index.ts](src/types/index.ts) as `PageType` union type
- Page switching handled by `handlePageChange` function with smooth scroll to top
- Exhaustiveness checking ensures all page types are handled in the switch statement

### Component Structure

- **Layout components**: Header, Navigation, Footer (reused across all pages)
- **Page components**: Located in `src/components/pages/`
  - HomePage (home page)
  - ClinicsPage
  - ServicesPage
  - InnovationPage
  - GuidesPage
  - StudyPage
- **Modal components**: BookingModal (global overlay for booking functionality)
- **Co-located styles**: Each component has its own CSS file in the same directory

### State Management

- No external state management library (Redux, Zustand, etc.)
- Local component state using React hooks (useState)
- Props drilling for callbacks (onBookingClick, onPageChange)
- Centralized callback interfaces in [src/types/index.ts](src/types/index.ts)

### Type System

- Strict TypeScript configuration enabled in [tsconfig.app.json](tsconfig.app.json)
- All types centralized in `src/types/index.ts`
- Explicit return types used for functions (e.g., `ReactElement`, `void`)
- Union types for page navigation (`PageType`)

## Build Configuration

### Vite Setup

- Using experimental `rolldown-vite@7.1.14` (Rolldown bundler, Rust-based Rollup alternative)
- Overrides standard Vite package via npm overrides
- React plugin with Babel for Fast Refresh
- No custom build optimizations or path aliases configured

### TypeScript

- Project references pattern: separate configs for app code (`tsconfig.app.json`) and build tools (`tsconfig.node.json`)
- Bundler module resolution
- Strict mode with additional linting options (noUnusedLocals, noUnusedParameters)
- `erasableSyntaxOnly` and `noUncheckedSideEffectImports` enabled

### ESLint

- Flat config format ([eslint.config.js](eslint.config.js))
- Recommended configs for JavaScript, TypeScript, React Hooks
- React Refresh plugin configured for Vite HMR
- Targets browser environment globals

## Key Patterns

### Adding a New Page

1. Define page type in `PageType` union in [src/types/index.ts](src/types/index.ts)
2. Create component in `src/components/pages/` with corresponding CSS file
3. Add case to switch statement in [App.tsx](src/App.tsx) `renderPage()` function
4. Update Navigation component to include new page link
5. TypeScript exhaustiveness check will ensure completeness

### Callback Props Pattern

- Use defined interfaces from `src/types/index.ts`:
  - `BookingCallbacks` for components that can trigger booking modal
  - `PageChangeCallbacks` for components that can navigate
  - `PageWithBookingAndNavigation` for components needing both

### Styling Approach

- CSS modules not used (standard CSS imports)
- Component-specific CSS files co-located with components
- Global styles in `src/index.css` and `src/styles/App.css`
- Class names should be scoped manually to avoid conflicts
