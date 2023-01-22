import React, { useRef, useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-picker';
import HOST from '../GLOBAL';
import axios from 'axios';



Icon.loadFont();
AntDesign.loadFont();

const EditProfile = ({ route, navigation }) => {

    const refRBSheet = useRef();

    const [imageView, setImageView] = useState();

    const getPicture = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                // } else if (response.customButton) {
                //     console.log('User tapped custom button: ', response.customButton);
                // }
            }
            else {

                // console.log('User selected a file form camera or gallery', response);
                const data = new FormData();
                data.append('filename', {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                });
                data.append('id', value);
                const config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: data,
                };
                fetch(`${HOST}user/profilePicture`, config)
                    .then((res) =>res.json())
                    .then((result) =>setImageView(`${HOST}uploads/user-profiles/${result.data}`))
                    .catch((err) => { console.log(err) });
            }

        })
    }


    var { value } = route.params;
    const [token, setToken] = useState({});

    const [name, setName] = useState(token.name);
    const [email, setEmail] = useState(token.email);
    const [phone, setPhone] = useState(token.phone);

    const [userId, setUserId] = useState(value);


    useEffect(() => {
        async function getUserById() {
            const resp = await axios.post(`${HOST}user/getUserById`, {
                id: value
            });
            setToken(resp.data.data);
            setImageView(`${HOST}uploads/user-profiles/${resp.data.data.profilePicture}`)
        }
        getUserById();
    }, []);
    async function updateUser() {
        const res = await axios.post(`${HOST}user/updateProfile`, {
            userId: userId,
            name: name,
            email: email,
            contact: phone
        });
        if (res.status == 200) {
            navigation.navigate('profileScreen');
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 20, marginTop: 50, alignItems: 'center' }}>
                {
                    imageView ?
                        <Image
                            source={{ uri: imageView }}
                            style={{
                                width: 120, height: 120, borderRadius: 80,
                                position: 'relative'
                            }}
                            resizeMode='cover'
                        /> :
                        <Image
                            source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' }}
                            style={{
                                width: 120, height: 120, borderRadius: 80,
                                position: 'relative'
                            }}
                            resizeMode='cover'
                        />
                }
                <View style={{
                    position: 'absolute', bottom: 5, right: 90,
                    backgroundColor: Colors.primaryColor, padding: 10, borderRadius: 50
                }}>
                    <TouchableOpacity onPress={() => {
                        refRBSheet.current.open();
                    }}>
                        <Icon
                            name='camera'
                            color={Colors.whiteColor}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginBottom: 5 }}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        openDuration={250}
                        height={150}
                        customStyles={{
                            container: {
                                //  justifyContent: 'center',
                                //  alignItems: 'center'
                            }
                        }}
                    >
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            marginHorizontal: 20
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontFamily: 'Poppins-Bold'
                            }}>Profile Photo</Text>
                        </View>
                        <View style={{ margin: 10, marginHorizontal: 20 }}>
                            <TouchableOpacity onPress={() => {
                                getPicture();
                            }}>
                                <View style={{
                                    borderWidth: 2,
                                    borderColor: Colors.lightGrey,
                                    width: 60,
                                    height: 60,
                                    borderRadius: 60,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <AntDesign
                                        name='file-upload'
                                        color={Colors.primaryColor}
                                        size={25}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={{
                                fontFamily: 'Poppins-Regular',
                                textAlign: 'justify'
                            }}>Upload File</Text>
                        </View>
                    </RBSheet>
                </View>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                <TextInput
                    mode='outlined'
                    placeholder='Name'
                    keyboardType='default'
                    onChangeText={text => setName(text)}
                    defaultValue={token.name}
                />
                <TextInput
                    mode='outlined'
                    placeholder='Email Address'
                    keyboardType='email-address'
                    style={{ marginVertical: 30 }}
                    onChangeText={text => setEmail(text)}
                    defaultValue={token.email}
                />
                <TextInput
                    mode='outlined'
                    placeholder='Phone Number'
                    keyboardType='phone-pad'
                    onChangeText={text => setPhone(text)}
                    defaultValue={token.contact}
                />
                <Button
                    style={{ marginTop: 40 }}
                    mode='contained'
                    contentStyle={{ height: 55 }}
                    onPress={() => {
                        updateUser();
                    }}
                >
                    <Text style={{
                        fontFamily: 'Poppins-Regular',
                        color: Colors.whiteColor
                    }}>Save Changes</Text>
                </Button>
            </View>
        </View>
    )
}

export default EditProfile;