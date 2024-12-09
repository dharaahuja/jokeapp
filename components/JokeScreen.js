import { View, Text, Button, ActivityIndicator, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomJoke } from './jokeSlice';
import FastImage from 'react-native-fast-image';
import CustomButton from './CustomButton';
import { addId } from './jokeSlice';
import { render } from '@testing-library/react';

export default JokeScreen = () => {

    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const { joke, loading , error, likeIds } = useSelector((state) => state.joke)

    const toggleLike = () => { 
        setLiked(!liked);
        dispatch(addId(joke.id));
     };

    useEffect(() => {
        dispatch(fetchRandomJoke());
    }, [dispatch]);

    if(loading) {
        return <ActivityIndicator size='large' />
    }

    const renderItem = ({ item }) => ( 
        <View style={styles.item}> 
            <Text style={styles.title}>{item}</Text> 
        </View> 
        );

    if (joke ){
        return(
        <ScrollView>
            <CustomButton style={styles.buttonLike} title='Like' onPress={toggleLike} />
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
            <FlatList 
                    data={likeIds}
                    renderItem={ renderItem } 
                    keyExtractor={item => item}/>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    buttonLike:{
        margin: 25,
        padding: 20,
        width: 300,
        height: 100,
        flexDirection: 'row-reverse',
        justifyContent:'flex-end',
    },
    outterContainer: { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
     },
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
    },
    item: { 
        backgroundColor: '#800001', 
        padding: 20, 
        marginVertical: 8, 
        marginHorizontal: 16, 
        borderRadius: 20,
    },
    title: { 
        fontSize: 10, 
        color: 'white',
    },
})