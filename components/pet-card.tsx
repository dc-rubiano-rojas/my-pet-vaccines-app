import {
    ActivityIndicator,
    TouchableOpacity,
    View,
    Image,
    Text
} from 'react-native';

import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router';

import styles from '@/styles/MyPet.style'
import { COLORS, images } from '../constants'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import usePetStore from '../services/state/zustand/pet-store';
import { FontAwesome6 } from '@expo/vector-icons';
import CustomButton from '@/components/common/buttons/CustomButton';
import useVaccineStore from '@/services/state/zustand/vaccine-store';
import { getVaccineService } from '@/services/api/vaccine.service';
interface RouterProps {
    navigation: NavigationProp<any, any>;
    pet: any,
    index: any,
    loading: any
}

const PetCard = ({ pet, index, loading }: any) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const navigation = useNavigation();
    const {
        addPet: addPetStore,
        addPetToEdit,
        deletePetToEdit,
        pets
    } = usePetStore()
    const {
        addVaccine,
        reduceVaccines,
    } = useVaccineStore()

    const handleEditButton = async () => {
        //deletePetToEdit()
        //addPetToEdit(pet)
        //router.setParams({ id: pet.pid })
        console.log('====================================');
        console.log('handleEditButton');
        console.log('====================================');
        const petToEditconst =  pets.filter(p => p.pid === pet.pid.toString())[0]

        addPetToEdit(petToEditconst)
        router.push(`/(auth)/pet-edit/${pet.pid}`)
    }

    const loadVaccines = async () => {
        reduceVaccines()
        for await (const vid of pet.vid) {
            const vaccine: any = await getVaccineService(vid) || []
            addVaccine({
                ...vaccine.data(),
                vid: vid.toString(),
                img: vaccine.data().image
            })
        }

    }

    const routeToVaccines = async () => {
        try {
            setShowSpinner(true)
            await loadVaccines()
            router.push(`/vaccines/${pet.pid}`)
        } catch (error) {
            console.log('====================================');
            console.log('PetCard - routeToVaccines: ', error);
        } finally {
            console.log('====================================');
            setShowSpinner(false)
        }
    }

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
                        onPress={routeToVaccines}>
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

                        {showSpinner ?
                            <ActivityIndicator size='large' color='#0000ff' /> :
                            <CustomButton
                                handleOnPress={routeToVaccines}
                                title={'Vaccines'}
                            />
                        }


                    </View>
                </View>

            </>
        </View >
    )
}

export default PetCard