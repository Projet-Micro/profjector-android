import { View,StyleSheet,Text, Animated } from "react-native"
import { useSelector } from "react-redux"
import { GlobalState } from "../store/types"
import Suspense from "./Suspense";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState,useRef } from 'react';
import DayBubble from "./DayBubble";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getDay, getDayOfTheWeek } from "../utils/date";
import useBLE from "../hooks/useBLE";
import LinearGradient from 'react-native-linear-gradient'
import { swapRentedToFirst } from "../utils/swapRentedToFirst";
type ProjectorType = {
    id: number,
    serialNumber: number,
    comment: string,
    rent: boolean,
}
type RootStackParamList = {
    BorrowModal:  ProjectorType,
    Home: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, "Home">
function ProjectorCard({ id, brand, comment, serialNumber, nbrCables, status, rent, selectProjector, isSelected }) {
    const projectors = useSelector((state: GlobalState) => state.projectors.projectors);
    return (
        <LinearGradient
            colors={rent === true ?
            ['rgba(60,54,230,1)','rgba(67,105,254,1)']
            : ['#FAFAFA', '#FAFAFA']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}> 
        <View style={styles.cardContainer}>

                <View style={styles.titleContainer}>
                    <View>
                        <Text style={[styles.titleText, rent === true ? { color: '#FAFAFA' } : {}]}>Projector {serialNumber}</Text>
                    </View>
                {(rent === false && !!projectors.find(projector => projector.rent === true) === false) ? <View>
                        <TouchableOpacity onPress={() => selectProjector(id,serialNumber,comment)}>
                            <View style={styles.radio}>{(isSelected.id === id) && <Ionicons name="checkmark" size={20} color="white" />}</View>
                        </TouchableOpacity>
                    </View>
                        :
                    <View>
                        <TouchableOpacity onPress={() => selectProjector(id,serialNumber,comment,rent)}>
                            <View style={[styles.radio,{backgroundColor : "white"}]}>{(isSelected.id === id) && <Ionicons name="checkmark" size={20} color="#3536e6" />}</View>
                        </TouchableOpacity>
                    </View>
                    }
                </View>
                <View style={styles.tagsContainer}>
                    <View style={[styles.tagStyling, rent === true ? { backgroundColor: 'white' } : {}]}>
                        <Text style={[styles.tagText,rent === true ? { color: '#3536e6' } : {}]}>{brand}</Text>
                    </View>
                    <View style={[styles.tagStyling, rent === true ? { backgroundColor: 'white' } : {}]}>
                        <Text style={[styles.tagText,rent === true ? { color: '#3536e6' } : {}]}>{nbrCables} Cable{nbrCables > 1 ? 's' : ''}</Text>
                    </View>
                    <View style={styles.availabilityStatus}>
                        {rent === false ? <Text style={status === 0 ?
                            styles.projectorAvailable
                            :
                            status == 1 ?
                                styles.projectorUnavailable
                                :
                                styles.projectorBroken
                        }>
                            {status == 0
                                ? 'Available'
                                : status === 1
                                    ? 'Unavailable'
                                    : 'Broken'
                            }
                        </Text>
                        :
                            <View style={styles.returnButton}>
                                <Text style={styles.returnText}>Borrowed by you</Text>
                            </View>        
                        }
                </View>
            </View>
            </View>
        </LinearGradient>
   ) 
}
export default function ProjectorCards ({ navigation } : Props) {
    const projectors = useSelector((state: GlobalState) => state.projectors);
    const { requestPermissions, scanForPeripherals } = useBLE();
    const scanForDevices = async () => {
        const isPermissionsEnabled = await requestPermissions();
        if (isPermissionsEnabled) {
        scanForPeripherals();
        }
  };
    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [isSelected, setIsSelected] = useState<ProjectorType>({
        id: -1,
        serialNumber: -1,
        comment: '',
        rent: false,
    });
    const slideUpValue = useRef(new Animated.Value(0)).current;
      const slideUpAnimation = {
    transform: [
      {
        translateY: slideUpValue.interpolate({
          inputRange: [0, 1],
          outputRange: [125,-15],
        }), 
      },
    ],
    };
    const confirmSelectProjector = () => {

        Animated.timing(slideUpValue, {
        toValue: 0,
        duration: 200, 
        useNativeDriver: true,
        }).start(async() => {
            await scanForDevices();
            console.log(projectors);
            navigation.navigate('BorrowModal', isSelected )
            setIsSelected({
        id: -1,
        serialNumber: -1,
        comment : '',
        rent: false,
    });
        });

    }
    const selectProjector = (id: number, serialNumber: number, comment: string,rent: boolean) => {
        if (isSelected.id === id) {
            setIsSelected({
                id: -1,
                serialNumber: -1,
                comment: "",
                rent: false,
            })
            Animated.timing(slideUpValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start()
        }
        else {
            setIsSelected({ id, serialNumber, comment, rent })
            Animated.timing(slideUpValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }
    return (
        <View style={{ height : '100%'}}>
        
        {
                isSelected ? 
                    <Animated.View style={[styles.selectButtonAnimationContainer, slideUpAnimation]}>
                    <View style={styles.selectButtonContainer}>
                        <View style={styles.alignCenter}>
                            <Text style={styles.selectedMessage}>Are you sure you want to select this projector ?</Text>
                        </View>
                        <TouchableOpacity style={styles.alignCenter} onPress={() => confirmSelectProjector()}>
                            <View style={styles.selectButton}>
                                <Text style={styles.selectButtonText}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                :
                null
            }
            <View style={{paddingLeft:5}}>
            <FlatList
                data={DAYS}
                horizontal={true}
                    renderItem={({ item }) => <DayBubble  margin={10} day={item} num={(getDay() + DAYS.indexOf(item) - getDayOfTheWeek() + 1).toString()} />}
                    keyExtractor={item => item}  
            
                />
            </View>

        
                <Text style={{fontSize:25,fontFamily:'MarkProBold',marginBottom:10,marginTop:25,marginLeft:10}}>All Projectors</Text>
        
        {
            projectors.loading ? 
            <View style={styles.loaderContainer}>
                <Suspense/>
                <Suspense/>
                <Suspense/>
            </View>    
            :
                <FlatList
                    data={swapRentedToFirst(projectors.projectors)}
                            renderItem={({ item }) => <ProjectorCard {...item} selectProjector={selectProjector} isSelected={isSelected} />} 
                            keyExtractor={item => item.id.toString()}
                        />
                     
        }

    </View>
)
}
const styles = StyleSheet.create({
    loaderContainer: {
        flexDirection: 'column',
        paddingLeft: 25,
        paddingRight:25,
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 5,
        fontSize: 25
    },
    titleContainer: {
        width: '100%',
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize : 17,
        fontFamily:'MarkProBold'
    },
    tagsContainer: {
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    descriptionContainer: {
        width:'100%',
        borderRadius:10,
    },
    tagStyling: {
        padding: 8,
        borderRadius: 15,
        backgroundColor: '#3536E6',
    },
    tagText: {
        textTransform: 'uppercase',
        color: '#FAFAFA',
        fontFamily:'MarkProBold',
        fontSize : 10,
    },
    projectorUnavailable: {
        color: 'red',
    },
    projectorAvailable: {
        color : 'green'
    },
    projectorBroken: {
        color : 'gray'    
    },
    cardContainer: {
        paddingTop: 20,
        paddingBottom:20,
        paddingLeft: 10,
        paddingRight:10,
        borderBottomWidth: 1,
        borderColor: 'lightgray' 
    },

    radio: {
        backgroundColor: '#3536E6',
        color: '#FAFAFA',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 25
    },
    availabilityStatus: {
        flexGrow: 1,
        flexDirection: 'row-reverse'
    },
    selectButtonAnimationContainer: {
        position: 'absolute',
        bottom: -40,
        left: '5%',
        right:'5%',
        width: '90%',
        zIndex: 500,
      
    },
    selectButton: {
        backgroundColor: '#3536E6',
        padding: 10,
        borderRadius: 15,
        width: '90%',
        marginTop: 10,
        alignItems:'center'
    },
    selectButtonContainer: {
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
        padding: 25,
        borderRadius: 15,
    },
    selectButtonText: {
        color: '#FAFAFA',
        fontFamily: 'MarkProBold',
        textTransform: 'uppercase'
    },
    alignCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedMessage: {
        fontFamily: 'MarkPro',
        lineHeight: 25,
        fontSize:13
    },
    returnButton: {
    },
    returnText: {

        fontFamily: 'MarkProBold',
        color: '#FAFAFA',
    }
});