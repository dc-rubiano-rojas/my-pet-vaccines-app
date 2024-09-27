import { COLORS } from '@/constants';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Text,
    ActivityIndicator,
    Pressable
} from 'react-native';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";
import { FIREBASE_STORAGE } from '@/firebaseConfig';

import ScreenHeader from '@/components/common/header/ScreeanHeader'
import styles from '@/styles/vaccine-register.style';
import CustomButton from '@/components/common/buttons/CustomButton';
import useUserStore from '@/services/state/zustand/user-store';
import usePetStore from '@/services/state/zustand/pet-store';
import { addPetService, getPetService, updatePetService } from '@/services/api/pet-service';
import { updateUserService } from '@/services/api/user-service';
import { Pet, Vaccine } from '@/utils/types';
import useVaccineStore from '@/services/state/zustand/vaccine-store';
import { addVaccineService } from '@/services/api/vaccine.service';

const VaccineRegister = () => {
    const { addVaccine, startAt, endAt } = useVaccineStore()
    const {
        pets,
    } = usePetStore()
    const { id: pId } = useLocalSearchParams()

    const [loading, setLoading] = useState(false);
    const [showPickerStartedAt, setshowPickerStartedAt] = useState(false);
    const [startedAt, setStartedAt] = useState(new Date());
    const [showPickerEndAt, setShowPickerEndAt] = useState(false);
    const [endsAt, setEndsAt] = useState(new Date());

    const {
        name,
        email,
        contactNumber,
        lastname,
        uid,
        petsId,
        updateUser: updateUserStore
    } = useUserStore()


    const {
        addPet: addPetStore,
        name: petName,
        age,
        gender,
        weight,
        breed,
        color,
        image: petImage
    } = usePetStore()

    const [image, setImage] = useState(petImage ? petImage : '')

    const ResgisterVaccineSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Name is required'),
    });

    const toggleDatePicker = () => setshowPickerStartedAt(!showPickerStartedAt)
    const toggleDatePickerEndsAt = () => setShowPickerEndAt(!showPickerEndAt)

    const onChange = ({ type }: any, selectedDate: any) => {
        if (type == 'set') {
            const currentDate = selectedDate
            setStartedAt(currentDate)
        } else {
            toggleDatePicker()
        }
    }
    const onChangeEndsAt = ({ type }: any, selectedDate: any) => {
        if (type == 'set') {
            const currentDate = selectedDate
            setEndsAt(currentDate)
        } else {
            toggleDatePickerEndsAt()
        }
    }

    const uploadImage = async (fileType = 'image', data: any) => {
        try {
            const response = await fetch(image)
            const blob = await response.blob()

            const storageRef = ref(FIREBASE_STORAGE, 'Vaccines/' + new Date().getTime())
            const uploadTask = uploadBytesResumable(storageRef, blob)
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes)
                    console.log('====================================');
                    console.log('progress');
                    console.log(progress);
                    console.log('====================================');
                    if (progress === 1) {
                        setImage('')
                        setLoading(false)
                        //showToast(ToastType.success, 'Pet has been created', 'Succesfully!')
                        return
                    }
                },
                (error) => {
                    // Handle error
                },
                () => {
                    // Finally
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (downloadURL) => {
                            //await petRegister(data, downloadURL)
                            await vaccineRegister(data, downloadURL)
                            console.log('downloadURL: ', downloadURL);
                        })
                }
            )

        } catch (error: any) {
            console.log('====================================');
            console.log('uploadImage - ', error.message);
            console.log('====================================');
            setLoading(false)

        }
    }

    const vaccineRegister = async (data: any, downloadURL: any) => {
        data.image = downloadURL
        data.startAt = startedAt.toString()
        data.endAt = endsAt.toString()
        const vaccineId = await addVaccineService(data, pId.toString())
        data.vid = vaccineId.toString()

        //const pet: any = await getPetService(pId.toString()) || []
        const pet: any = pets.find(p => p.pid === pId)
        pet.vid.push(vaccineId.toString()) 

        console.log('pet ', pet);
        console.log('pet.id ', pId);
        console.log('====================================');
        console.log('====================================');

        await updatePetService(pet, pId.toString())
        addVaccine(data as Vaccine)
    }

    const handleUploadImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        })
        if (!result.canceled) {
            console.log('====================================');
            console.log('IMAGE');
            console.log(result.assets);
            console.log('====================================');
            setImage(result.assets[0].uri)
        }
    }

    const handleSubmitButton = async (data: any, { resetForm }: any) => {
        console.log('====================================');
        console.log('PRESS PET REGISTER');
        console.log('===================================');
        try {
            setLoading(true)

            // Note: sube la imagen y crea la data
            await uploadImage('image', data)

        } catch (error: any) {
            setLoading(false)
            //showToast(ToastType.error, 'There is an error', 'Contact client service!')
        } finally {
            resetForm()
            setImage('')
        }
        return
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View style={styles.container}>

                <ScreenHeader title={'Vaccine Register'} />

                <TouchableOpacity
                    style={styles.loginText}
                    onPress={() => handleUploadImage()}
                >
                    {image ? <Image source={{ uri: image }} style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                        borderRadius: 10
                    }} /> : <Entypo name='upload-to-cloud' color={COLORS.primary} size={80} />}

                </TouchableOpacity>

                <View style={styles.formProfileContainer}>
                    <View style={styles.inputsContainer}>
                        <Formik
                            initialValues={{
                                name: '',
                                startAt: '',
                                endAt: '',
                            }}
                            validationSchema={ResgisterVaccineSchema}
                            onSubmit={handleSubmitButton}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleSubmit,
                                handleChange,
                                setFieldTouched,
                                isValid,
                                resetForm
                            }): any => (
                                <>
                                    <TextInput placeholder='Name' style={styles.input} value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={() => setFieldTouched('name')}
                                        autoCapitalize={"none"} />
                                    {errors.name ? (
                                        <Text style={styles.errorText}>Hubo un error en el name</Text>
                                    ) : null}

                                    {showPickerStartedAt && (
                                        <DateTimePicker
                                            mode='date'
                                            display='spinner'
                                            value={startedAt}
                                            onChange={onChange}
                                        />
                                    )}
                                    {showPickerEndAt && (
                                        <DateTimePicker
                                            mode='date'
                                            display='spinner'
                                            value={endsAt}
                                            onChange={onChangeEndsAt}
                                        />
                                    )}
                                    <Pressable onPress={toggleDatePicker} style={styles.input}>
                                        {showPickerStartedAt && <FontAwesome size={24} name="window-close" color={color} />}
                                        <TextInput
                                            placeholder='startAt'
                                            value={`${!showPickerStartedAt ? 'starAt: ' : ''} ${!showPickerStartedAt ? startedAt.toDateString() : ''}`}
                                            onChangeText={handleChange('startAt')}
                                            onBlur={() => setFieldTouched('startAt')}
                                            autoCapitalize={"none"}
                                            editable={false}
                                        />
                                    </Pressable>

                                    <Pressable onPress={toggleDatePickerEndsAt} style={styles.input}>
                                        {showPickerEndAt && <FontAwesome size={24} name="window-close" color={color} />}
                                        <TextInput
                                            placeholder='endAt'
                                            value={`${!showPickerEndAt ? 'endAt: ' : ''} ${!showPickerEndAt ? endsAt.toDateString() : ''}`}
                                            onChangeText={handleChange('endAt')}
                                            onBlur={() => setFieldTouched('endAt')}
                                            autoCapitalize={"none"}
                                            editable={false}
                                        />
                                    </Pressable>

                                    {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                                        <>
                                            <CustomButton
                                                handleOnPress={handleSubmit}
                                                title={'Add'}
                                            />
                                        </>
                                    }
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    );
}


export default VaccineRegister;
