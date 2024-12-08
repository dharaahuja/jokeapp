import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomJoke } from './jokeSlice';
import FastImage from 'react-native-fast-image';
import CustomButton from './CustomButton';

export default JokeScreen = () => {

    const dispatch = useDispatch();
    const { joke, loading , error } = useSelector((state) => state.joke)

    useEffect(() => {
        dispatch(fetchRandomJoke());
    }, [dispatch]);

    if(loading) {
        return <ActivityIndicator size='large' />
    }

    if (joke ){
        return (
            <View style={styles.container}>
                    <View>
                        <FastImage 
                         source={{ uri: joke.icon_url, 
                         priority: FastImage.priority.high}} 
                         style={styles.icon} /> 
                         <Text style={styles.text}>{joke.value}</Text>
                    </View>
                <CustomButton style={styles.nextButton} title='Fetch Joke' onPress={() => dispatch(fetchRandomJoke())} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
       backgroundColor: 'red',
        padding: 16,
        margin: 25,
        alignContent: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    icon: {
        width: 120,
        height: 120,
        alignContent: 'center', 
        justifyContent: 'center',
        alignSelf: 'center'
        
    },
    nextButton:{
        padding: 10,
        borderWidth: 5,
        borderRadius: 20,
        borderColor: 'black',
        elevation: 5,
        backgroundColor: '#800000',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
        fontSize: 24,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        padding: 20,
    }
})