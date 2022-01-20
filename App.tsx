import 'react-native-gesture-handler';
import {StyleSheet, Image, Dimensions} from 'react-native';
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

const { width: SIZE } = Dimensions.get('window')

export default function App() {
    const scale = useSharedValue(1)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const pinchGesture = Gesture.Pinch()
        .onBegin(e => {
            // runOnJS(props.onPinchImage)(props.postActivityId)
        })
        .onUpdate((e) => {
            scale.value = e.scale
        })
        .onEnd(() => {
            scale.value = withTiming(1)
        })

    const panGesture = Gesture.Pan()
    panGesture.enableTrackpadTwoFingerGesture(true)
    panGesture.minPointers(2)

    panGesture
        .onUpdate(e => {
            'worklet'
            translateX.value = e.translationX
            translateY.value = e.translationY
        })

    panGesture
        .onEnd(e => {
            'worklet'
            translateX.value = withTiming(0)
            translateY.value = withTiming(0)
        })

    const composed = Gesture.Simultaneous(pinchGesture, panGesture)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            zIndex: 50,
            transform: [
                { scale: scale.value },
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        }
    })

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={composed}>
                <Animated.View style={animatedStyle}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1642627829578-b738daad34d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80' }}
                        style={{ width: SIZE, height: SIZE }}
                    />
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
