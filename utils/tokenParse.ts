import AsyncStorage from "@react-native-community/async-storage"

// RETRIEVE TOKEN TO GRANT PERMISSIONS
export async function tokenParse() : Promise<string | null>
{
    const item = await AsyncStorage.getItem('token');
   
    let token : string = '';
    if (item)
        token = JSON.parse(item).accessToken;
    console.log(token);
    return token;
}