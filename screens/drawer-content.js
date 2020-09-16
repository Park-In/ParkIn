import React from 'react';
import { View, StyleSheet } from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage'

import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';


import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { color } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export function DrawerContent(props) {

    const {setItem, getItem} = useAsyncStorage();


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15, }}>
                            <Avatar.Image
                                source={require('../assets/logo.png')}
                                size={50}
                            />
                            <View style={{justifyContent:'center', marginTop:-6}}>
                                <Title style={{...styles.title, marginLeft:8}}>
                                    Muhammed Tommalieh
                                </Title>
                                <Caption style={{...styles.caption, marginLeft:8}}>
                                    ipsumlorem
                                </Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>
                                    4.93/5
                                </Paragraph>

                                <Caption style={styles.caption}>
                                    Stars
                                </Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>
                                    1503
                                </Paragraph>

                                <Caption style={styles.caption}>
                                    Points
                                </Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <Drawer.Item
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='home-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Home'
                            onPress={() => { props.navigation.navigate('Map') }}
                        />

                        <Drawer.Item
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='account-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Profile'
                            onPress={() => {props.navigation.navigate('Profile') }}
                        />

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <Drawer.Item
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons
                            name='exit-to-app'
                            color={color}
                            size={size}
                        />
                    )}
                    label='Sign Out'
                    onPress={() => { }}
                    labelStyle={{color:'white'}}
                    
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor:'#009387',
        height: '60%',
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color:'white'

    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color:'white'
    },
    row: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 5,
        
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#009387',
        borderBottomColor: '#009387',
        borderTopWidth: 16,
        borderBottomWidth: 16,
        // backgroundColor:'#009387',

    },

});