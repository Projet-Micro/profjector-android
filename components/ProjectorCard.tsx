import { View,StyleSheet,Text, Animated } from "react-native"
import { useSelector } from "react-redux"
import { GlobalState } from "../store/types"
import Suspense from "./Suspense";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useState,useRef } from 'react';
import DayBubble from "./DayBubble";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getDay, getDayOfTheWeek } from "../utils/date";
type ProjectorType = {
    id: number,
    serialNumber: number,
    comment: string,
}
type RootStackParamList = {
    BorrowModal: ProjectorType,
    Home: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
function ProjectorCard({ id, brand, comment, serialNumber, nbrCables,status,selectProjector,isSelected}) {
    return (
        <View style={styles.cardContainer}>
                <View style={styles.titleContainer}>
                    <View>
                        <Text style={styles.titleText}>Projector {serialNumber}</Text>
                    </View>
                    {status === 1 && <View>
                        <TouchableOpacity onPress={() => selectProjector(id,serialNumber,comment)}>
                            <View style={styles.radio}>{(isSelected.id === id) && <Ionicons name="checkmark" size={20} color="white" />}</View>
                        </TouchableOpacity>
                    </View>
                    }
                </View>
                <View style={styles.tagsContainer}>
                    <View style={styles.tagStyling}>
                        <Text style={styles.tagText}>{brand}</Text>
                    </View>
                    <View style={styles.tagStyling}>
                        <Text style={styles.tagText}>{nbrCables} Cable{nbrCables > 1 ? 's' : ''}</Text>
                    </View>
                    <View style={styles.availabilityStatus}>
                    <Text style={status === 1 ?
                        styles.projectorAvailable
                       : 
                       styles.projectorUnavailable
                       }>
                        {status === 1
                            ? 'Available'
                            : 'Unavailable' 
                        }
                    </Text>
                </View>
            </View>
        </View>
   ) 
}
export default function ProjectorCards ({ navigation } : Props) {
    const projectors = useSelector((state: GlobalState) => state.projectors);
    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [isSelected, setIsSelected] = useState<ProjectorType>({
        id: -1,
        serialNumber: -1,
        comment : '',
    });
    const slideUpValue = useRef(new Animated.Value(0)).current;
      const slideUpAnimation = {
    transform: [
      {
        translateY: slideUpValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100,-15], // Adjust the range for the desired slide-up distance
        }), 
      },
    ],
    };
    const confirmSelectProjector = () => {

        Animated.timing(slideUpValue, {
        toValue: 0,
        duration: 200, // Adjust the duration as needed
        useNativeDriver: true,
        }).start(() => {
            navigation.navigate('BorrowModal',isSelected)
            setIsSelected({
        id: -1,
        serialNumber: -1,
        comment : '',
    });
        });

    }
    const selectProjector = useCallback((id: number, serialNumber: number, comment:string) => {
        setIsSelected({id,serialNumber,comment})
        Animated.timing(slideUpValue, {
            toValue: 1,
            duration: 200, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    }, [])
    return (
    <View style={{height: '100%'}}>
        
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
        <View>
            <FlatList
                data={DAYS}
                horizontal={true}
                    renderItem={({ item }) => <DayBubble  margin={10} day={item} num={(getDay() + DAYS.indexOf(item) - getDayOfTheWeek() + 1).toString()} />}
                keyExtractor={item => item}  
        />
        </View>
        
                <Text style={{fontSize:25,fontFamily:'MarkProBold',marginBottom:10,marginTop:35}}>All Projectors</Text>
        
        {
            projectors.loading ? 
            <View style={styles.loaderContainer}>
                <Suspense/>
                <Suspense/>
                <Suspense/>
            </View>    
            :
            <View>
                <FlatList
                    data={projectors.projectors}
                            renderItem={({ item }) => <ProjectorCard {...item} selectProjector={selectProjector} isSelected={isSelected} />} 
                    keyExtractor={item => item.id.toString()}
                        />
                    
            </View>    
        }

    </View>
)
}
const styles = StyleSheet.create({
    loaderContainer: {
        flexDirection: 'column',
    },

    container: {
        flexDirection: 'row',
        marginBottom:5
    },
    textContainer: {
        flexDirection: 'column',
        flexGrow: 1,
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
        color: 'white',
        fontFamily:'MarkProBold',
        fontSize : 10,
    },
    projectorUnavailable: {
        color: 'red',
    },
    projectorAvailable: {
        color : 'green'
    },
    cardContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgray' 
    },
    radio: {
        backgroundColor: '#3536E6',
        color: 'white',
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
        bottom: -50,
        left: 0,
        width: '100%',
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
        color: 'white',
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
    }
});