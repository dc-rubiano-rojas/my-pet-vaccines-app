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

    const { id: pId } = useLocalSearchParams()

    /*     useEffect(() => {
    
            const petVaccines = vaccines.filter(v => v.pid === pId)
            console.log('====================================');
            console.log('VACCINES: ', vaccines.length);
            console.log('petVaccines: ', petVaccines.length);
            console.log('====================================');
        }, [vaccines]);
     */

    const renderFlatList = () => {
        return (
            <FlatList
                data={vaccines}
                renderItem={({ item, index }: any) => <VaccineCard
                    vaccine={item}
                    index={index}
                    loading={!vaccines ? true : false}
                />}
                showsVerticalScrollIndicator={true}
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                pagingEnabled={false}
                style={styles.flatListContainer}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View style={styles.container}>
                <ScreenHeader title={'Vaccines'} />

                <TouchableOpacity style={styles.viewWithoutPets} onPress={() => router.push(`/vaccines/form/${pId}`)}>
                    <Ionicons name='add-circle-outline' color={COLORS.primary} size={40} />
                </TouchableOpacity>
                <View style={styles.flatListContainer}>

                    {vaccines.length > 0 && renderFlatList()}
                </View>




            </View>

        </SafeAreaView>
    );
}


export default ModalVaccines;
