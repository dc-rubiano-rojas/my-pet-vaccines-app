import { COLORS } from '@/constants';
import styles from '@/styles/vaccine.style';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

const VaccineCard = ({ vaccine, index, loading }: any) => {
    console.log('====================================');
    console.log('VaccineCard');
    console.log(vaccine);
    
    console.log('====================================');
    return (
        <View>
            <>
                <View key={index} style={styles.page} >

                </View>
            </>
        </View>
    );
}


export default VaccineCard;
