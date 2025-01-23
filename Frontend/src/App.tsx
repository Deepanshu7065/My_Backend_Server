import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./Login"
import User from "./User"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Todo from "./Todo"


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 60 * 5000,
      },
    },
  })
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* <Router > */}
            <Route path="/" element={<Todo />} />
            <Route path="/users" element={<User />} />
            {/* </Router> */}
          </Routes>
        </Router >
      </QueryClientProvider>
    </>
  )
}

export default App
