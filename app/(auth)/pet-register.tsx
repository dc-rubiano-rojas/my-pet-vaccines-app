import { COLORS } from '@/constants';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams } from 'expo-router';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Text,
    ActivityIndicator
} from 'react-native';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Formik } from 'formik';
import * as Yup from 'yup';

import ScreenHeader from '@/components/common/header/ScreeanHeader'
import styles from '@/styles/pet-register.style';
import { Entypo } from '@expo/vector-icons';
import { FIREBASE_STORAGE } from '@/firebaseConfig';
import CustomButton from '@/components/common/buttons/CustomButton';
import useUserStore from '@/services/state/zustand/user-store';
import usePetStore from '@/services/state/zustand/pet-store';
import { addPetService } from '@/services/api/pet-service';
import { updateUserService } from '@/services/api/user-service';
import { Pet } from '@/utils/types';

const PetRegister = () => {
    const [loading, setLoading] = useState(false);
    const [petToEdit, setPetToEdit] = useState<Pet | null>(null);
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
        image: petImage,
        pets,
        addPet: addPetStore
    } = usePetStore()
    const [image, setImage] = useState('')

/*     const { id: pId } = useLocalSearchParams()
 */
 /*    useEffect(() => {
        console.log('====================================');
        console.log('PET USE EFFECT REGISTER', pId);
        console.log('====================================');
        if (!pId) setPetToEdit(null)
        setPetToEdit(pets.filter(p => p.pid === pId.toString())[0])
        console.log('====================================');
        console.log(petToEdit);
        console.log('====================================');
    }, [pId]); */

    const ResgisterPetSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Name is required'),
    });

    const uploadImage = async (fileType = 'image', data: any) => {
        try {
            const response = await fetch(image)
            const blob = await response.blob()

            const storageRef = ref(FIREBASE_STORAGE, 'Pets/' + new Date().getTime())
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
                            await petRegister(data, downloadURL)
                            console.log('downloadURL: ', downloadURL);
                        })
                }
            )

        } catch (error: any) {
            console.log('====================================');
            console.log('uploadImage - ', error.message);
            console.log('====================================');
        }
    }

    const petRegister = async (data: Pet, downloadURL: any) => {
        data.image = downloadURL
        data.vid = []
        // NOTE: Add Pet in Firestore
        const petId = await addPetService(data, uid)
        data.pid = petId

        // TODO: Update user in Firestore
        updateUserService({
            name,
            email,
            contactNumber,
            lastname,
            uid,
            petsId: [...petsId, data.pid],
        })

        // FIXME: Add Pet and Update User in Store Managment
        addPetStore(data as Pet)
        //pid.push(petId)
        updateUserStore({
            uid,
            name,
            lastname,
            email,
            contactNumber,
            petsId: [...petsId, data.pid],
        })
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

                <ScreenHeader title={'Pet Register'} />


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
                                name: petToEdit?.name,
                                age: '',
                                gender: '',
                                weight: '',
                                breed: '',
                                color: '',
                            }}
                            validationSchema={ResgisterPetSchema}
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
                                        <Text style={styles.errorText}>{errors?.name}</Text>
                                    ) : null}

                                    <TextInput placeholder='Age' style={styles.input} value={values.age}
                                        onChangeText={handleChange('age')}
                                        onBlur={() => setFieldTouched('age')}
                                        autoCapitalize={"none"}
                                    />

                                    <TextInput placeholder='Gender' style={styles.input} value={values.gender}
                                        onChangeText={handleChange('gender')}
                                        onBlur={() => setFieldTouched('gender')}
                                        autoCapitalize={"none"}
                                    />

                                    <TextInput placeholder='Weight' style={styles.input} value={values.weight}
                                        onChangeText={handleChange('weight')}
                                        onBlur={() => setFieldTouched('weight')}
                                        autoCapitalize={"none"}
                                    />

                                    <TextInput placeholder='Breed' style={styles.input} value={values.breed}
                                        onChangeText={handleChange('breed')}
                                        onBlur={() => setFieldTouched('breed')}
                                        autoCapitalize={"none"}
                                    />

                                    <TextInput placeholder='Color' style={styles.input} value={values.color}
                                        onChangeText={handleChange('color')}
                                        onBlur={() => setFieldTouched('color')}
                                        autoCapitalize={"none"}
                                    />

                                    {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                                        <>
                                            <CustomButton
                                                handleOnPress={handleSubmit}
                                            //title={route.name === 'Pet Register' ? 'Create' : 'Edit'}
                                            />
                                        </>
                                    }
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}


export default PetRegister;
