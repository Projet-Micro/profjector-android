import { Animated,View,Text, Button } from "react-native";
import { useEffect,useRef } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../store/types";
import { deleteMessage } from "../store/actions";
function Message({ id, text, status }) { 
    const opacity = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.delay(2000),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start(() =>
        {
            dispatch(deleteMessage(id))
        }) 
    },[])
    return (
    <Animated.View
            style={{
            opacity,
            transform: [
                {
                    translateY: opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange:[-20,0]
                    })
                }
            ],
            margin: 10,
            padding: 10,
            borderRadius: 8,
            borderLeftWidth: 3,borderLeftColor:
                status === "success" ?
                "#22c55e":
                status === "danger" ?
                    "#ef4444" :
                    status === "info" ?
                        "#0ea5e9"
                            : "white",
            backgroundColor: status === "success"
                ? "#ecfcf8"
                : status === "danger"
                    ? "#ffecec"
                    : status === "info"
                        ? "#e8ecfc" : "lightgray"
    }}>
        <View style={{display:'flex',flexDirection:'row'}}>
        <Ionicons name={status === "success" ?
                "checkmark-circle-outline" :
                status === "danger" ?
                    "close-circle-outline" :
                    status === "info" ?
                        "information-circle-outline"
                        : "help-circle-outline"} style={{ fontSize:20 , color:status === "success" ?
                "#22c55e":
                status === "danger" ?
                    "#ef4444" :
                    status === "info" ?
                        "#0ea5e9"
                            : "white"}}>
        </Ionicons>
            <Text style={{
                color:status === "success" ?
                "#22c55e":
                status === "danger" ?
                    "#ef4444" :
                    status === "info" ?
                        "#0ea5e9"
                            : "white"}
            }>{text}</Text>
        </View>    
    </Animated.View>
    )
}
export default function Toast() {
    const messages = useSelector((state: GlobalState) => state.messages.messages);
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
            }}>
            {
                messages.map((message, id) => <Message key={id}
                    id={message.id}
                    status={message.status}
                    text={message.text}

                    ></Message>)
            }
        </View>
    )
}