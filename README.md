# Project Template

This project serves as a base template for building React applications with modern libraries and tools. It incorporates the latest technologies such as Vite, TypeScript, Shadcn, Tailwind CSS, Zustand, and more, enabling rapid development and ease of customization.

## Key Features

- **Fast Development** with Vite for lightning-fast builds and hot module replacement.
- **TypeScript** for a statically typed experience, ensuring code reliability and scalability.
- **Shadcn** beautifully designed components that you can copy and paste into your apps.
- **React Query** for efficient data fetching, caching, and synchronization with your backend.
- **TanStack Table** for building highly customizable and flexible data tables.
- **Zustand** for state management that is small and efficient.
- **Form Handling** with `react-hook-form` for flexible form handling and validation.
- **ECharts** integration for visualizing data with interactive charts.
- **Routing** using React Router to manage navigation within the application.
- **Date Picking** with `react-multi-date-picker` for building intuitive calendar interfaces.

## Tech Stack

- **Vite**: Fast development server and build tool.
- **React**: Library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for better tooling and code correctness.
- **Shadcn**: This is NOT a component library. It's a collection of re-usable components that you can copy and paste into your apps.
- **Zustand**: Lightweight state management solution.
- **React Query**: Server-state management for fetching, caching, and updating data.
- **TanStack Table (React Table)**: Flexible table library for building data grids.
- **ECharts**: Powerful charting library for interactive data visualizations.
- **React Router**: Declarative routing for React apps.
- **react-hook-form**: Performant, flexible forms with easy integration.
- **Zod**: TypeScript-first schema validation library.
- **Axios**: Promise-based HTTP client for making API requests.

## Installation

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd <your-project-directory>
   ```

2. **Install the dependencies**:

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Build the project for production**:
   ```bash
   npm run build
   ```

## Folder Structure

```bash
.
├── public/             # Static files
├── src/
│   ├── assets/         # Assets (images, icons, etc.)
│   ├── components/     # Reusable components
│   ├── lib/
│   │   ├── constants/      # Constants files (url, routes, etc.)
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # Zustand state management
│   │   ├── services/       # API configs
│   │   ├── types/          # Typescript interface & Types
│   │   ├── utils/          # Utilities functions
│   ├── routes/         # Project routes config
│   ├── pages/          # Application routes components
│   ├── App.tsx
│   ├── index.css       # Main styles
│   ├── main.tsx        # Main application component
│   └── providers.tsx   # Provider wrappers
├── index.html          # Main HTML file
└── package.json        # Project configuration
```

## User Authentication

The project uses Zustand for state management, including user authentication. After login or registration, the user is authenticated and their session is managed using `authStore.ts`.

- **Authentication**: This setup handles the user authentication state using Zustand with persistence enabled. The authStore keeps track of whether the user is authenticated, their token, and user information. The store also provides a logout action to reset the authentication state.

- **Persistent Store**: The store is persisted using zustand/middleware, storing the user’s authentication details locally under the key livetse_crm_auth_store.

By utilizing this store, you can easily manage authentication throughout the application, including login, logout, and session persistence.

## API Service

The `api.service.ts` file is responsible for managing HTTP requests throughout the application using `Axios`. It provides utility functions to make GET, POST, PUT, PATCH, and DELETE requests, handling both public and protected API interactions.

### Key Features

1. **Axios Instance Setup**:

   - The file defines two Axios instances:
     - `defaultInstance` for public (unprotected) requests.
     - `protectedInstance` for requests that require authentication.
   - The `protectedInstance` automatically attaches a `Bearer` token from the `authStore` to the `Authorization` header if the user is authenticated.

2. **Request Functions**:

   - The `withAxiosInstance` function creates reusable methods (`get`, `post`, `put`, `patch`, `delete`) for making HTTP requests. These methods standardize how requests are handled and simplify interactions with APIs throughout the application.

3. **Protected Requests and Authentication**:
   - For protected routes, the `protectedInstance` uses an Axios request interceptor to attach the `Authorization` header with the user's token.
   - If the token is expired or the user is unauthorized, a response interceptor automatically logs the user out, clears the authentication store, and redirects them to the login page.

### Usage Example

Here’s an example of how to use the `api` object for making API requests:

```ts
import api from "@/lib/services/api.services";

// GET request (public)
api.get("/public-endpoint").then((response) => {
  console.log(response);
});

// POST request (protected)
api.protected
  .post("/protected-endpoint", {
    data: "example",
  })
  .then((response) => {
    console.log(response);
  });
```

### Token Expiration Handling

- **Automatic Logout**: If the token has expired or the server responds with a 401 Unauthorized error, the interceptor triggers a logout process. This includes:

  - Clearing the `authStore`.
  - Redirecting the user to the login page.
  - Showing a toast notification informing the user to log in again.

- **Forbidden Access (403)**: If a user attempts to access a resource they are not authorized to view, the server responds with a `403 Forbidden` error. The interceptor will log out the user and redirect them to the home page.

### Summary

- **Consistency**: The `api.service.ts` file provides a centralized way to manage all API requests.
- **Security**: The `protectedInstance` ensures that authentication tokens are automatically added to the `Authorization` header for protected routes.
- **Error Handling**: Automated logout on token expiration or unauthorized access improves security and user experience.

## Custom Hooks

### `useMe` - Check Token Expiration and Fetch User Data

The `useMe.ts` custom hook is responsible for fetching the user's profile information and checking the token's expiration. This hook uses `react-query` for data fetching and state management and handles token expiration by logging the user out if the token is no longer valid.

The user logout process and invalidation handle in the `api.services.ts` file.

#### Usage

```tsx
import { useMe } from "@/lib/hooks/useMe";

function Profile() {
  const { data, isError, isLoading } = useMe();

  if (isLoading) return <div>Loading...</div>;
  // handle any error except token expiration, and forbidden errors here
  if (isError) return <div>Error loading profile</div>;

  return (
    <div>
      <h1>{data?.user.name}</h1>
      <p>{data?.user.email}</p>
    </div>
  );
}
```

## Development

### Dependencies

To add a dependency:

```bash
npm install <package-name>
```

To add a development dependency:

```bash
npm install <package-name> --save-dev
```

### Constants

The project includes several default constant files that centralize commonly used values throughout the application. This approach enhances maintainability and reduces the risk of errors from hard-coded values. The following constant files are included:

- **form-validation**: This file contains validation rules and messages used across various forms, ensuring a consistent validation approach throughout the application.

- **query-keys**: This file defines keys used with React Query for caching and invalidating data queries. By using constant query keys, you can avoid hard-coded strings and reduce the risk of typos.

- **router links**: This file holds the routes and links used in the application, allowing easy management and modification of navigation paths without searching through multiple components.

- **urls/endpoints**: This file centralizes the API endpoint URLs, making it easier to manage and update the URLs when necessary. This helps to maintain a clean structure and allows for quick changes in case of backend updates.

Using these constant files enhances the clarity and organization of the codebase, making it easier for developers to understand and collaborate on the project.

### Utility Functions

The project includes several default utility functions that provide common functionalities across the application. Define all your utility functions inside the `utils` folder with a `.utils.ts` file extension. This organization helps maintain clarity and structure in your codebase. Key utility functions include:

- **toEnglishDigits(str: string)**: This function converts Persian and Arabic Indic digits to English digits. It replaces Persian digits [۰۱۲۳۴۵۶۷۸۹] and Arabic Indic digits [٠١٢٣٤٥٦٧٨٩] in a given string with their corresponding English numeric values.

```tsx
<Input
  onKeyPress={acceptOnlyNumberOnKeyPress}
  value={inputFieldValue ? toEnglishDigits(inputFieldValue as string) : ""}
  onChange={(e) => setInputFieldValue(toEnglishDigits(e.target.value))}
/>
```

- **formatCurrency(value: number | string)**: This function formats a number or numeric string as a currency string in the "en-US" locale. If the input is a string that cannot be converted to a number, it logs a warning and returns 0.

- **normalizeCurrency(value: string)**: This function removes any commas from a currency string and converts it to a float, allowing for easier calculations with currency values.

- **acceptOnlyNumberOnKeyPress(e: KeyboardEvent<HTMLInputElement>)**: This function prevents non-numeric input from being entered into an input field like non-digits characters, Persian characters, and symbol characters. It allows only digits. This function can be useful when the `input` type is `text`.

- **required({ name, message })**: This is a Zod validation function that checks if a string is present and not empty. It provides a customizable error message indicating that the field cannot be empty.

- **isValidNationalCode(code: string)**: This function validates a national code by checking its length and ensuring it does not contain repeated digits. It performs calculations to verify the integrity of the national code based on specific algorithms.

These utility functions promote code reusability and improve the overall readability of the codebase, making it easier to handle common operations consistently across the application.

### Types & Interfaces

Define all your types and interfaces inside the `types` folder with a `.type.ts` file extension. This organization helps maintain clarity and structure in your codebase. 

Some default type files include:

- **`api.type.ts`**: Contains type definitions for API responses and errors, ensuring that your API interactions are strongly typed and predictable.
- **`global.type.ts`**: Houses types that are used throughout the application, providing a centralized location for common data structures and constants.
- **`store.type.ts`**: Defines types for state management, including Zustand stores, enabling type safety for your application's state.
- **`user.type.ts`**: Contains user-related type definitions, helping manage user data and ensuring that user objects conform to the expected structure.


## Configuration

### Environment Variables

Make sure to set up the required environment variables for different environments. Use `.env` files to manage environment-specific variables.

- `.env.development`: Development environment variables.

- `.env.production`: Production environment variables.

### TypeScript Configuration

The project uses TypeScript for static typing. You can adjust the `tsconfig.json` file according to your project needs.

### Tailwind CSS Configuration

Tailwind CSS is pre-configured. Modify `tailwind.config.js` to customize the theme, colors, spacing, etc.

## Contributing

Fork the repository.

1. Create your feature branch: git checkout -b feature/my-feature.

2. Commit your changes: git commit -m 'Add some feature'.

3. Push to the branch: git push origin feature/my-feature.

4. Open a pull request.

## License

This project is licensed under the MIT License.

```vbnet
This `README.md` is structured for general use and gives clear instructions on how to install, configure,
```
