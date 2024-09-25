import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { FIRESTORE_DB } from "@/firebaseConfig";
import { Pet, Vaccine } from "@/utils/types";

export async function addVaccineService(vaccine: Vaccine, pid: string) {
    const data = await addDoc(collection(FIRESTORE_DB, 'vaccines'), { ...vaccine, pid: pid })
    return data.id
}

export async function saveImageVaccineService(pet: Pet, uid: string) {

}


export async function getVaccineService(vid: string) {
    try {

        const ref = doc(FIRESTORE_DB, `vaccines/${vid}`)
        const data = await getDoc(ref);

        return data
    } catch (error) {
        console.log('====================================');
        console.log('error - getVaccineService');
        console.log(error);
        console.log('====================================');
    }
}
export function getPet(id: string) {

}
export async function updateVaccineService(vaccine: Vaccine) {
    try {
        const ref = doc(FIRESTORE_DB, `vaccine/${vaccine.vid}`)
        await updateDoc(ref, { ...vaccine })
    } catch (error) {
        console.log('====================================');
        console.log('error - updateVaccineService');
        console.log(error);
        console.log('====================================');
    }
}
export function deletePet(id: string) {

}