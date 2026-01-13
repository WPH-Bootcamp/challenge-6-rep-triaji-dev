# Codebase Optimization Resume

## 1. Performance Optimization
- [ ] **Component Memoization**:
    - Wrap `MovieCard` component with `React.memo` to prevent unnecessary re-renders when parent state (like "Trailer Modal" open state in `HomePage`) changes.
    - Ensure function props passed to `MovieCard` (like `onWatchTrailer`) are wrapped in `useCallback` in parent components.
- [ ] **Object Instantiation**:
    - **`src/components/ui/Button.tsx`**: Move `variantClasses` object outside the component definition to avoid recreation on every render.
    - **`src/components/container/MovieCard.tsx`**: Move `sizeClasses` object outside the component.
- [ ] **Image Optimization**:
    - Create a reusable `Image` component that handles:
        - Lazy loading (already partially implemented).
        - Fade-in effect on load.
        - Error/Fallback state (currently scattered logic).
    - Ensure `loading="lazy"` is applied to images in `DetailPage` and other views, not just `MovieCard`.

## 2. Code Quality & Refactoring
- [ ] **Code Duplication**:
    - **Trailer Logic**: The `VideoModal` and `useTrailer` pattern is repeated in `HomePage`, `SearchPage`, and `DetailPage`. Consider lifting this state to a global context or a "Layout" provider if the app grows, so the modal and logic exist in one place.
    - **`TrailerButton`**: Defined locally in `MovieCard.tsx`. Consider extracting to `src/components/ui` if used elsewhere or merging into the main `Button` component variations.
- [ ] **Magic Numbers/Strings**:
    - **`src/pages/DetailPage.tsx`**: `ageLimit = 13` is hardcoded. Move to a constants file.
    - Image sizes (e.g., `'w1280'`, `'original'`) are scattered. Centralize them in `src/api/endpoints.ts` or a constants file.

## 3. UI/UX Improvements
- [ ] **Error Boundaries**:
    - Implement a global Error Boundary to catch React rendering errors gracefully.
- [ ] **Loading States**:
    - `LoadingSpinner` is good, but consider "Skeleton" screens for `MovieCard` and `DetailPage` for a more perceived "fast" loading experience (Skeleton UI).
- [ ] **Accessibility (a11y)**:
    - Ensure all interactive elements (like the "Load More" div in `HomePage`) have proper `role="button"` and `onKeyDown` handlers for keyboard navigation.

## 4. Type Safety & Best Practices
- [ ] **Prop Drilling**:
    - `useFavoriteToggle` logic is passed down. For a larger app, Redux or Context API for "Favorites" state would be better to avoid passing callbacks deep into `MovieCard`.
- [ ] **Explicit Returns**:
    - Ensure all hooks and components have explicit return types for better type inference and documentation.
