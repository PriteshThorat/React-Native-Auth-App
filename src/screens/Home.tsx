import { useContext, useEffect, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AppwriteContext } from "../appwrite/AppwriteContext"
import { Snackbar } from "react-native-snackbar"
import { FAB, Icon } from "@rneui/base"
import { LogOut } from "lucide-react-native"

interface userObj {
    name: string
    email: string
}

const Home = () => {
    const [userData, setUserData] = useState<userObj>({
        name: "",
        email: ""
    })

    const  { appwrite, setIsLoggedIn } = useContext(AppwriteContext)

    useEffect(() => {
        (
            async() => {
                try {
                    const res = await appwrite.getCurrentUser()

                    if (res) {
                        setUserData({
                            name: res.name,
                            email: res.email
                        })
                    }
                } catch (error) {
                    
                }
            }
        )()
    }, [])

    const handleLogout = async() => {
        try {
            await appwrite.logout()

            setIsLoggedIn(false)

            Snackbar.show({
                text: "Logout Successful",
                duration: Snackbar.LENGTH_SHORT
            })
        } catch (_) {
            
        }
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{
              uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
              width: 400,
              height: 300,
              cache: 'default',
            }}
            resizeMode="contain"
          />
          <Text style={styles.message}>
            Build Fast. Scale Big. All in One Place.
          </Text>
          {userData && (
            <View style={styles.userContainer}>
              <Text style={styles.userDetails}>Name: {userData.name}</Text>
              <Text style={styles.userDetails}>Email: {userData.email}</Text>
            </View>
          )}
        </View>
        <FAB
          placement="right"
          color="#f02e65"
          size="large"
          title="Logout"
          icon={<LogOut color="#FFFFFF" />}
          onPress={handleLogout}
        />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  }
})

export default Home