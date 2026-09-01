import { useContext, useEffect, useState } from "react"
import { AppwriteContext } from "../appwrite/AppwriteContext"
import Loading from "../components/Loading"
import { NavigationContainer } from "@react-navigation/native"
import AppStack from "./AppStack"
import AuthStack from "./AuthStack"

const Router = () => {
    const [isLoading, setIsLoading] = useState(true)

    const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext)

    useEffect(() => {
        (
            async() => {
                try {
                    const res = await appwrite.getCurrentUser()

                    setIsLoading(false)
                    if(res) {
                        setIsLoggedIn(true)
                    }
                } catch (_) {
                    setIsLoading(false)
                    setIsLoggedIn(false)
                }
            }
        )()
    }, [appwrite, setIsLoggedIn])

    if (isLoading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            {
                isLoggedIn ? <AppStack /> : <AuthStack />
            }
        </NavigationContainer>
    )
}

export default Router