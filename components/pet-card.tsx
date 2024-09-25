import {
    ActivityIndicator,
    TouchableOpacity,
    View,
    Image,
    Text
} from 'react-native';

import React, { useEffect, useState } from 'react'

import styles from '@/styles/MyPet.style'
import { COLORS, images } from '../constants'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import usePetStore from '../services/state/zustand/pet-store';
import { FontAwesome6 } from '@expo/vector-icons';
import CustomButton from '@/components/common/buttons/CustomButton';
import { Link, router } from 'expo-router';
interface RouterProps {
    navigation: NavigationProp<any, any>;
    pet: any,
    index: any,
    loading: any
}

const PetCard = ({ pet, index, loading }: any) => {
    const navigation = useNavigation();
    const {
        addPet: addPetStore,
        addPetToEdit,
    } = usePetStore()


    const handleEditButton = async () => {
        console.log('====================================');
        console.log('click EditButton');
        console.log('====================================');
        addPetToEdit(pet)
        //navigation.setOptions({ pet } as any)
        //navigation.setParams(pet)
        navigation.navigate('Pet Edit' as never)
    }
    /*     console.log('====================================');
        console.log('PetCard');
        console.log(pet);
        console.log('===================================='); */

    useEffect(() => {
        console.log('====================================');
        console.log('PET CARD USEEFFECT');
        console.log(pet.image);
        console.log('====================================');
    }, [])

    return (
        <View>
            <>

                <View key={index} style={styles.page} >
                    <View style={styles.pageTitle}>
                        <FontAwesome6 name='bone' color={COLORS.primary} size={40} />
                        <Text style={styles.textTitle}>{pet.name}</Text>
                        <FontAwesome6 name='bone' color={COLORS.primary} size={40} />
                    </View>

                    {/*                     <SkeletonContent
                        containerStyle={{
                            flex: 1,
                            marginTop: 20,
                        }}
                        isLoading={loading}
                        duration={2000}
                    > */}

                    <TouchableOpacity
                        style={styles.imageContainer}
                        onPress={() => navigation.navigate('Vaccines' as never)}>
                        <Image source={{ uri: pet.image }}
                            resizeMode='cover'
                            style={{
                                height: '100%',
                                width: '100%',
                                borderBottomLeftRadius: 75,
                                borderTopRightRadius: 75,
                            }}
                        />
                    </TouchableOpacity>
                    {/*                     </SkeletonContent>
 */}
                    <View style={styles.petInfoContainer}>
                        <View style={styles.dogInfoContainer}>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Age: </Text>{pet.age} Years</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Weight: </Text>{pet.weight} Kg</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Color: </Text>{pet.color}</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Gender: </Text>{pet.gender}</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Breed: </Text>{pet.breed}</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Height: </Text>20cm</Text>
                        </View>

                        <CustomButton
                            handleOnPress={() => handleEditButton()}
                            title={'Edit'}
                        />

                        <CustomButton
                            handleOnPress={() => router.push(`/vaccines/${pet.pid}`)}
                            title={'Vaccines'}
                        />
                    </View>
                </View>

            </>


        </View >
    )
}

export default PetCard