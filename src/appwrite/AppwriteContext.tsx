import { createContext, FC, PropsWithChildren, useState } from 'react'
import Appwrite from './service'
import { View } from 'react-native'

interface AppContextType {
    appwrite: typeof Appwrite
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const AppwriteContext = createContext<AppContextType>({
    appwrite: Appwrite,
    isLoggedIn: false,
    setIsLoggedIn: () => {}
})

const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const defaultValue = {
        appwrite: Appwrite,
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <AppwriteContext.Provider value={defaultValue}>
            {children}
        </AppwriteContext.Provider>
    )
}

export default AppwriteProvider