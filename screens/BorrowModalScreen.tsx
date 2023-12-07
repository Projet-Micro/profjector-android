import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Text, StyleSheet, Image,ActivityIndicator } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";
import useBLE from "../hooks/useBLE";
import { useSelector } from "react-redux";
import { GlobalState } from "../store/types";
import { ProjectorInfo } from "../shared/models";
import { connectDevice } from "../index";
type RootStackParamList = {
    BorrowModal: ProjectorInfo,
    Home : undefined
}
type Props = NativeStackScreenProps<RootStackParamList,'BorrowModal'>
export default function BorrowModalScreen({ route, navigation }: Props) {
    const devices = useSelector((state: GlobalState) => state.devices)
    const professor = useSelector((state: GlobalState) => state.professors.professor.professorInfo)
    const { connectToDevice,writePayload } = useBLE();
    const borrowProjector = async () => {
        connectDevice(devices.devices[0]);
        await connectToDevice(devices.devices[0]);
        if (professor) {
            writePayload(devices.devices[0],route.params.id,professor.id,professor.accessToken,navigation,route.params.rent)
        }
    }
    const returnProjector = async () => {
        connectDevice(devices.devices[0]);
        await connectToDevice(devices.devices[0]);
        if (professor) {
            writePayload(devices.devices[0],route.params.id,professor.id,professor.accessToken,navigation,route.params.rent)
        }
    }   
    return (
        <View style={styles.container}>
            <View style={styles.ellipseContainer}></View>
            <View style={[styles.dotContainer,styles.ellipse1]}></View>
            <View style={[styles.dotContainer,styles.ellipse2]}></View>
            <View style={[styles.dotContainer,styles.ellipse3]}></View>
            <View style={[styles.dotContainer,styles.ellipse4]}></View>
            <View style={[styles.dotContainer,styles.ellipse5]}></View> 
            <View style={styles.logoContainer}>
                <Image style={styles.imageLogo} source={route.params.rent === false ? require('../assets/images/vector-projector.png') : require('../assets/images/return-projector.png')}/>
            </View>
            <View style={styles.informationContainer}>
                <View>
                    <Text style={styles.title}>
                        {(route.params.rent === false
                            ? "Borrow the projector "
                            : "Return the projector ") + route.params.serialNumber}</Text>
                </View>
                <View>
                    <Text style={styles.description}>
                        {route.params.rent === false
                            ? "Find the perfect projector for your needs. Check availability and make your reservation. Borrowing a projector has never been easier!"
                            : "Easily return your projector with a simple process. Check availability, initiate the return, and enjoy the convenience of hassle-free projector returns!"
                        }
                    </Text>
                </View>
                <View style={styles.messageContainer}>
                    <Ionicons name="chatbubbles" size={25} color="#442FFF" />
                    <Text style={styles.commentMessage}>Comment</Text>
                </View>
                <View style={styles.commentMessageContainer}>
                    <Text style={styles.commentMessageText}>{route.params.comment} !</Text>
                </View>
                <View style={styles.divider} />
                    <View style={{width:'100%'}}>
                    {devices.devices.length > 0 && route.params.rent === false && devices.isBluetoothActivated ? <TouchableOpacity disabled={!devices.loading ? false : true} onPress={() => borrowProjector()} style={styles.touchableContainer}>
                        <View style={styles.borrowButton}>
                            {!devices.loading && <Ionicons name="logo-dropbox" size={20} color="#442FFF" />}<Text style={styles.borrowText}>{!devices.loading ? 'BORROW NOW' : <ActivityIndicator size="small" color="#442FFF" />}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    devices.devices.length > 0 && route.params.rent === true  && devices.isBluetoothActivated ? <TouchableOpacity disabled={!devices.loading ? false : true} onPress={() => returnProjector()} style={styles.touchableContainer}>
                        <View style={styles.borrowButton}>
                            {!devices.loading && <Ionicons name="cube" size={20} color="#442FFF" />}<Text style={styles.borrowText}>{!devices.loading ? 'RETURN NOW' : <ActivityIndicator size="small" color="#442FFF" />}</Text>
                        </View> 
                    </TouchableOpacity>
                    : null
                    }
            </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems:'center',
        height: '100%',
        width: '100%'
    },
    imageLogo: {
        width: '60%',
        height:'60%'
    },
    logoContainer: {
        height: '45%',
        borderBottomLeftRadius: 300,
        borderBottomRightRadius:300,
        width:'150%',
        backgroundColor: '#DFDCFF',
        justifyContent: 'center',
        alignItems:'center'
    },
    title: {
        marginTop: 20,
        fontSize: 23,
        fontFamily:'MarkProBold',
        color:'#442FFF'
    },
    description: {
        fontFamily: 'MarkProLightBit',
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
        marginTop:20
    },
    informationContainer: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
    },
    messageContainer: {
        marginTop: 20,
        flexDirection: 'row',
    },
    commentMessage: {
        fontFamily: 'MarkProBold',  
        color: '#442FFF',
        fontSize: 17,
        marginLeft:5
    },
    commentMessageContainer: {
        marginTop: 10,   
    },
    commentMessageText: {
        fontFamily:'MarkProLightBit'
    },
    divider: {
        marginTop: 35,
        borderBottomColor: '#442FFF',
        borderBottomWidth: 1,
        width:'90%',
    },
    borrowButton: {
        borderWidth: 1,
        borderColor: '#442FFF',
        marginTop: 35,
        padding: 15,
        borderRadius: 25,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
    borrowText: {
        color: '#442FFF',
        fontFamily: 'MarkProLightBit',
        marginLeft: 5,
    },
    touchableContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    ellipseContainer: {
        width: 75,
        height: 75,
        borderTopLeftRadius:100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#DFDCFF',
    },
    dotContainer: {
        backgroundColor: '#442FFF'
    },
    ellipse1: {
        width: 20,
        height: 20,
        position: 'absolute',
        bottom: 44,
        left: 30,
        borderRadius:50
    },
    ellipse2: {
        width: 15,
        height: 15,
        position: 'absolute',
        bottom: 33,
        left: 15,
        borderRadius: 50
    },
    ellipse3: {
        width: 15,
        height: 15,
        position: 'absolute',
        bottom: 25,
        left: 35,
        borderRadius: 50
    },
    ellipse4: {
        width: 10,
        height: 10,
        position: 'absolute',
        bottom: 20,
        left: 15,
        borderRadius: 50 
    },
    ellipse5: {
        width: 10,
        height: 10,
        position: 'absolute',
        bottom: 8,
        left: 25,
        borderRadius: 50 
    }
});