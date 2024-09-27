import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import ScreenHeader from '@/components/common/header/ScreeanHeader'
import { COLORS } from '@/constants';
import styles from '@/styles/home.style';
import useUserStore from '@/services/state/zustand/user-store';
import usePetStore from '@/services/state/zustand/pet-store';
import { router } from 'expo-router';
import PetCard from '../../components/pet-card';
import { getPetService } from '@/services/api/pet-service';
import { getVaccineService } from '@/services/api/vaccine.service';
import useVaccineStore from '@/services/state/zustand/vaccine-store';

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [showAddRegister, setShowAddRegister] = useState(false)

    const {
        name,
        email,
        contactNumber,
        lastname,
        uid,
        deleteUser,
        petsId } = useUserStore()

    const {
        pets,
        addPet: addPetStore,
        reducePets: reducePetsStore,
        deletePetToEdit
    } = usePetStore()

    const { addVaccine, reduceVaccines } = useVaccineStore()

    useEffect(() => {
        loadData()
    }, []);

    useEffect(() => {
        if (pets.length <= 0) setShowAddRegister(true)
        if (pets.length > 0) setShowAddRegister(false)
    }, [pets])

    const updatePetsData = async () => {

    }

    const loadData = async () => {
        reducePetsStore()
        reduceVaccines()
        console.log('====================================');
        console.log('===========HOME======================');
        console.log('===========LOADDATA======================');
        for await (const petId of petsId) {
            const pet: any = await getPetService(petId) || []
            addPetStore({
                pid: petId.toString(),
                name: pet.data().name || '',
                age: pet.data().age || '',
                gender: pet.data().gender || '',
                weight: pet.data().weight || '',
                breed: pet.data().breed || '',
                color: pet.data().color || '',
                uid: pet.data().uid || '',
                image: pet.data().image || '',
                vid: pet.data().vid || []
            })
        }
    }


    const onRefresh = async () => {
        setRefreshing(true);
        await loadData()
        setRefreshing(false);
    }

    const navigatePetRegister = () => {
        router.push('/(auth)/pet-register')
    }


    const renderFlatList = () => {
        return (
            <FlatList
                data={pets}
                renderItem={({ item, index }: any) =>
                    <PetCard
                        pet={item}
                        index={index}
                        loading={!pets ? true : false}
                    />}
                horizontal={false}
                showsHorizontalScrollIndicator={true}
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                pagingEnabled={true}
                style={styles.flatListContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>

            <View style={styles.container}>

                <ScreenHeader title={'Home'} />

                {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                    <>
                        {showAddRegister && (
                            <TouchableOpacity style={styles.viewWithoutPets} onPress={navigatePetRegister}>
                                <Ionicons name='add-circle-outline' color={COLORS.primary} size={40} style={styles.textViewWithoutPets} />
                            </TouchableOpacity>
                        )}

                        <View style={styles.flatListContainer}>
                            {pets.length > 0 && renderFlatList()}
                        </View>
                    </>
                }

            </View >
        </SafeAreaView>
    );
}


export default Page;
