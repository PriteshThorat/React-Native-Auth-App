import { View } from "react-native"
import AppwriteProvider from "./appwrite/AppwriteContext"
import Router from "./routes/Router"

const App = () => {
  return (
    <AppwriteProvider>
      <Router />
    </AppwriteProvider>
  )
}

export default App