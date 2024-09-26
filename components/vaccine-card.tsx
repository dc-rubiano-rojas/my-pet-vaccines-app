import { COLORS } from '@/constants';
import styles from '@/styles/vaccine.style';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';

const VaccineCard = ({ vaccine, index, loading }: any) => {
    return (
        <View>
            <>
                <View key={index} style={styles.page} >
                    <TouchableOpacity
                        style={styles.imageContainer}
                    >
                        <Image source={{ uri: vaccine.img }}
                            resizeMode='cover'
                            style={{
                                height: '100%',
                                width: '100%',
                                borderTopLeftRadius: 45,
                                borderBottomRightRadius: 50,
                                borderBottomLeftRadius: 45,
                            }}
                        />
                    </TouchableOpacity>

                    <View style={styles.pageInfo} >
                        <View style={styles.pageTitle}>
                            <FontAwesome6 name='virus' color={COLORS.primary} size={30} style={styles.virusIcon} />
                            <Text style={styles.textTitle}>{vaccine.name}</Text>

                        </View>

                    </View>


                </View>
            </>
        </View>
    );
}


export default VaccineCard;
