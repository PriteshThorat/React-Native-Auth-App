import { Account, Client, ID } from "react-native-appwrite"
import Config from "react-native-config"
import { Snackbar } from "react-native-snackbar"

const appwriteClient = new Client()

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!

const account = new Account(
    appwriteClient
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
)

interface CreateUserAccount {
    name: string
    email: string
    password: string
}

const createUserAccount = async({ name, email, password }: CreateUserAccount) => {
    try {
        const createRes = await account.create({
            userId: ID.unique(), 
            name, 
            email, 
            password
        })

        if (createRes) {
            const loginRes = await loginUserAccount({ email, password })

            return loginRes
        }
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
        })

        console.log("Error at create user account, ", error)
    }
}

interface LoginUserAccount {
    email: string
    password: string
}

const loginUserAccount = async({ email, password }: LoginUserAccount) => {
    try {
        const res = await account.createEmailPasswordSession({ email, password })

        return res
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
        })

        console.log("Error at login user account, ", error)
    }
}

const getCurrentUser = async() => {
    try {
        const res = await account.get()

        return res
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
        })

        console.log("Error at get current user, ", error)
    }
}

const logout = async() => {
    try {
        await account.deleteSession({sessionId: 'current'})
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
        })

        console.log("Error at get current user, ", error)
    }
}

export default {
    createUserAccount,
    loginUserAccount,
    getCurrentUser,
    logout
}