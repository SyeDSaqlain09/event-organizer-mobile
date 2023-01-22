import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Card, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from  '../utils/colors';


Icon.loadFont();

const FavouriteScreen = ({ navigation }) => {

    const [heart, setHeart] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.favText}>Favourite Screen</Text>
            <TextInput
                placeholder='Search...'
                mode='outlined'
                left={<TextInput.Icon name={'search-web'} />}
                style={{ marginHorizontal: 20, marginTop: 20 }}
            />
            <View style={{marginHorizontal: 20,marginTop: 40}}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('listingDetails')}>
                    <View style={{ marginBottom: 30 }}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://picsum.photos/800' }} />
                            <Card.Title
                                title={'Hardware'}
                                subtitle={'Lahore'} />
                        </Card>
                        <Text style={{
                            position: 'absolute',
                            right: 10,
                            bottom: 5,
                            fontFamily: 'Poppins-Regular'
                        }}>{'5000 per day'}</Text>
                        <TouchableWithoutFeedback onPress={() => setHeart(!heart)}>
                            {
                                heart ?
                                    <Icon name='cards-heart' color='#FF0000'
                                        size={25} style={{
                                            position: 'absolute',
                                            top: 20, right: 20
                                        }} /> :
                                    <Icon name='cards-heart-outline' color={Colors.darkGrey}
                                        size={25} style={{
                                            position: 'absolute',
                                            top: 20, right: 20
                                        }} />
                            }
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    favText: {
        fontSize: 18,
        marginHorizontal: 20,
        marginTop: 30
    },
    searchBar: {
        marginTop: 20,
        marginHorizontal: 20,
        padding: 8,
        height: 55,
        width: '90%',
        justifyContent: 'center',
        elevation: 4,
        borderRadius: 10
    }
});
export default FavouriteScreen;