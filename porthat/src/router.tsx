import { createRouter, Link } from '@tanstack/react-router' // Added Link import

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Add this section below
    defaultNotFoundComponent: () => {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>404 - Page Not Found</h2>
          <p>The page you are looking for doesn't exist.</p>
          <Link to="/">Go back to Home</Link>
        </div>
      )
    },
  })

  return router
}