Here you go — **clean, copy-pasteable Markdown** with the **Overlay Orchestration Pattern** and **TanStack Table–specific examples** baked in.

You can save this as `overlay-orchestration-pattern.md` or paste directly into Medium / Dev.to / GitHub.

---

```md
# Overlay Orchestration Pattern: Scaling Actions in Large Lists

Large lists are easy—until you add actions.

A table with a few rows and a dropdown per row feels harmless.  
A table with **thousands of rows**, each with menus, popovers, or tooltips, quickly becomes a performance and maintenance nightmare.

This is where the **Overlay Orchestration Pattern** shines.

---

## The Real Problem with Per-Row Overlays

In a naïve implementation, each row owns its own overlay:

- Each row renders its own menu component
- Each menu manages its own state
- Each menu often creates its own portal

With hundreds or thousands of rows, this leads to:

- ❌ Excessive memory usage  
- ❌ Slower renders and reconciliation  
- ❌ Z-index and overflow bugs  
- ❌ Complex state scattered across rows  

Even if only **one overlay is ever open**, the cost is paid upfront.

---

## Introducing the Overlay Orchestration Pattern

> **Overlay Orchestration Pattern**  
> A UI architecture pattern where contextual overlays are rendered through a single, centralized overlay layer that is orchestrated by shared state, while list items act only as interaction triggers.

In simple terms:

- Rows **do not render overlays**
- Rows **emit intent**
- A central orchestrator decides what to render and where

---

## Orchestrator vs Trigger: The Mental Model

| Role | Responsibility |
|----|----|
| **Trigger (Row)** | Emits intent and context |
| **Overlay Orchestrator** | Controls state, positioning, lifecycle |
| **Overlay UI** | Pure presentation |

> **Rows never render overlays. They request them.**

---

## Architecture Overview

```

User clicks row action
↓
Row emits intent + context
↓
Overlay Orchestrator updates state
↓
Single Overlay renders via portal

````

There is **exactly one overlay instance** in the entire application.

---

## Overlay Orchestration with TanStack Table

TanStack Table is headless, fast, and highly composable—but that also means **you own all interaction patterns**.

If you render per-row action menus inside table cells, you’ll quickly run into:

- Excessive renders per cell
- Broken overlays when rows unmount
- Menus disappearing during virtualization
- Complicated column definitions

Overlay orchestration cleanly sidesteps all of this.

---

## Column Definition: Rows as Triggers (TanStack Table)

Instead of rendering a menu, the column only renders a **trigger**.

```tsx
const columns = [
  {
    id: 'actions',
    header: '',
    size: 40,
    cell: ({ row }) => {
      const openOverlay = useOverlayActions();

      return (
        <button
          onClick={(e) =>
            openOverlay({
              data: row.original,
              position: {
                x: e.clientX,
                y: e.clientY,
              },
            })
          }
        >
          ⋮
        </button>
      );
    },
  },
];
````

**Key points:**

* No menu components inside the cell
* No portals per row
* Cheap and predictable cell renders

---

## Why This Matters for Virtualized Tables

When TanStack Table is used with:

* `@tanstack/react-virtual`
* Large datasets
* Dynamic column visibility

Rows and cells mount and unmount aggressively.

With overlay orchestration:

* The overlay remains mounted
* Scrolling does not close menus
* Column resizing does not reset state

This avoids the classic *“menu disappeared while scrolling”* bug.

---

## The Global Overlay (Table-Agnostic)

The overlay lives **outside** the table entirely.

```tsx
function TableActionOverlay() {
  const { state, close } = useOverlayStore();

  if (!state.isOpen) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: state.position.y,
        left: state.position.x,
      }}
    >
      <ActionMenu
        row={state.data}
        onClose={close}
      />
    </div>,
    document.body
  );
}
```

**Notice:**

* No TanStack imports
* No dependency on table lifecycle
* Driven entirely by orchestrated state

---

## Supporting Column Visibility, Pinning, and Reordering

TanStack Table supports:

* Column hiding
* Column pinning
* Column reordering

If the menu lives inside the column:

* Hiding the column kills the menu
* Pinning causes clipping
* Reordering triggers remounts

With overlay orchestration:

* Column changes do not affect overlays
* Z-index issues disappear
* Overlay behavior stays consistent

---

## Handling Row Identity Safely

Always pass **`row.original`**, never the row index.

```ts
openOverlay({
  data: row.original,
});
```

Why this matters:

* Sorting changes row order
* Filtering changes indices
* Virtualization reuses row slots

Overlay orchestration relies on **stable data identity**.

---

## Keyboard & Accessibility Benefits

Because there is only one overlay:

* Keyboard handling is centralized
* Escape behavior is consistent
* Focus management is simpler

```ts
useEffect(() => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeOverlay();
  };

  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}, []);
```

---

## Performance Characteristics in Practice

In a TanStack Table with:

* 5,000 rows
* Virtualized rendering
* Action column enabled

**Per-row overlays**

* Hundreds of mounted menu components
* Reconciliation spikes during scroll

**Overlay Orchestration**

* One overlay component
* Flat memory usage
* Smooth scrolling

The difference is immediately noticeable.

---

## Common Mistakes to Avoid

* ❌ Rendering overlays inside rows
* ❌ Tying overlay lifecycle to table lifecycle
* ❌ Passing JSX instead of data to the orchestrator
* ❌ Creating multiple overlay portals

If you see more than one portal for row actions, something’s wrong.

---

## When Not to Use This Pattern

Overlay Orchestration may be overkill if:

* Multiple overlays must be open simultaneously
* Overlays are deeply nested and independent
* The list is very small and static

This is a **scaling pattern**, not a default rule.

---

## Final Thoughts

The **Overlay Orchestration Pattern** is not just a performance optimization—it’s an architectural upgrade.

It:

* Simplifies mental models
* Reduces bugs
* Scales cleanly with data size
* Aligns perfectly with TanStack Table’s headless philosophy

Treat overlays as **infrastructure**, not table content.

```

---

If you want next:
- A **complete runnable example** (TanStack Table + Virtual + Overlay)
- A **Zustand-based orchestrator implementation**
- A **diagram-only version for docs**
- A **design-system guideline version**

Just tell me where this doc is going next 👍
```
