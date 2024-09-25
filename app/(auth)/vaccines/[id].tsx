import {
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { COLORS } from '@/constants';
import ScreenHeader from '@/components/common/header/ScreeanHeader'
import { Ionicons } from '@expo/vector-icons';
import useVaccineStore from '@/services/state/zustand/vaccine-store';
import VaccineCard from '@/components/vaccine-card';
import styles from '@/styles/vaccine-register.style';

const ModalVaccines = () => {
    const [loading, setLoading] = useState(false);
    const {
        vaccines,
    } = useVaccineStore()

    const { id } = useLocalSearchParams()

    useEffect(() => {
        
        console.log('====================================');
        console.log('id: ', id);
        console.log('====================================');
    }, []);

    const navigatePetEdit = () => router.navigate("./pet-register")

    const renderFlatList = () => {
        return (
            <FlatList
                data={vaccines}
                renderItem={({ item, index }: any) => <VaccineCard
                    pet={item}
                    index={index}
                    loading={!vaccines ? true : false}
                    navigatePetEdit={navigatePetEdit} />}
                horizontal={false}
                showsHorizontalScrollIndicator={true}
                alwaysBounceHorizontal={false}
                pagingEnabled={true}
                style={styles.flatListContainer}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View style={styles.container}>
                <ScreenHeader title={'Vaccines Register'} />

                <View style={styles.flatListContainer}>

                    {vaccines.length > 0 && renderFlatList()}
                </View>



                <TouchableOpacity style={styles.viewWithoutPets} onPress={() => router.push(`/vaccines/form/${id}`)}>
                    <Ionicons name='add-circle-outline' color={COLORS.primary} size={40} />
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}


export default ModalVaccines;
