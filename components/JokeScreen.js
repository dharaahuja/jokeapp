import { View, Text, Button, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomJoke } from './jokeSlice';

export default JokeScreen = () => {

    const dispatch = useDispatch();
    const { joke, loading , error } = useSelector((state) => state.joke)

    useEffect(() => {
        dispatch(fetchRandomJoke());
    }, [dispatch]);

    if(loading) {
        return <ActivityIndicator size='large' />
    }

    return (
        <View>
            <Button title='Fetch Joke' onPress={() => dispatch(fetchRandomJoke())} />

            <Text>{JSON.stringify(joke)}</Text>
        </View>
    )
}