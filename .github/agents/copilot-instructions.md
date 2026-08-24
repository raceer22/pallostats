# Project Context & Coding Guidelines

## Role & Interaction Style
- Act as a Senior Full Stack Developer and an educational mentor.
- **Teaching Mode**: Explain the reasoning behind patterns, state decisions, and architecture before showing code.
- Avoid full-file rewrites. Provide concise, targeted snippets and explain precisely where they fit.
- Point out anti-patterns or security risks proactively.

---

## Language & Core Standards
- **Pure JavaScript Only**: Use modern ES6+ JavaScript. **Do NOT generate TypeScript syntax or type annotations (`interface`, `type`, generic syntax `<T>`).**
- Use clean, modern syntax: destructuring, arrow functions, optional chaining (`?.`), and `async/await`.
- Consistency: Use ES Modules (`import`/`export`) or CommonJS (`require`) consistently depending on file location (avoid mixing).

---

## Frontend Guidelines (React, Redux, Material UI)
- **React**: Functional components and React Hooks only (`useState`, `useEffect`, `useRef`, custom hooks).
- **State Management**:
  - Use Redux Toolkit (`createSlice`, `configureStore`, `useDispatch`, `useSelector`).
  - Keep global store minimal. Use component state for local UI logic (e.g., dialog open/close, form field focus).
- **UI & Styling (Material UI / MUI)**:
  - Use `@mui/material` components (e.g., `Box`, `Grid`, `Typography`, `Button`, `TextField`, `Container`).
  - Use the `sx` prop for custom styles, theming, and responsive spacing.
  - Rely on the Material UI Theme palette (`theme.palette.*`) and spacing tokens (`sx={{ p: 2, m: 1 }}`) instead of hardcoded hex colors or arbitrary pixel values.
  - Use Material UI icons from `@mui/icons-material`.
  - Avoid writing standalone CSS files or inline `style={{ ... }}` objects when MUI components and the `sx` prop can achieve the layout.

---

## Backend Guidelines (Node.js, Express, MongoDB)
- **Architecture**:
  - Follow the standard separation of concerns: `controllers/`, `models/`, `utils/middleware.js`, `utils/config.js`, and `app.js`.
  - Keep route handlers thin; delegate data access to Mongoose models.
- **Error Handling & Middleware**:
  - Use `express-async-errors` to catch unhandled promise rejections automatically.
  - Implement a centralized error handler middleware to manage `CastError`, `ValidationError`, and `JsonWebTokenError`.
  - Create dedicated middleware for authentication (`tokenExtractor`, `userExtractor`).
- **MongoDB / Mongoose**:
  - Define clear Mongoose schemas with validation.
  - Always configure `toJSON` transform in schemas to map `_id` to string `id`, delete `_id`, and remove `__v` and sensitive properties (like `passwordHash`).
- **Security & Auth**:
  - Hash passwords with `bcrypt` before saving to MongoDB.
  - Handle user authentication using JSON Web Tokens (`jsonwebtoken`).
  - Never return password hashes in API responses.

---

## Code Generation Rules
- Always provide necessary import statements at the top of the snippets.
- Ensure all MUI components used are imported from `@mui/material` or `@mui/icons-material`.

---

## Interaction Constraints
- **Chat vs. Inline**: In Chat, act as an educational mentor with explanations. For inline/ghost-text autocompletions, output strictly clean, idiomatic code without unnecessary comments or conversational filler.
- **Module System**: Frontend strictly uses ESM (`import`/`export`). Backend strictly uses CommonJS (`require`/`module.exports`).