import React, { useState } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import { auth, db, storage } from '../../../config/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useUserContext } from '../../contexts/UserContext';
import { FormButton } from './FormButton';
import { useModalContext } from '../../contexts/ModalContext';
import { useSettingsContext } from '../../contexts/SettingsContext';

export const UploadMedia = () => {
  const { getUser } = useUserContext();
  const { toggleSettingsModal } = useModalContext();
  const { setCurrentlyShowing } = useSettingsContext();

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageFile(result);
    }
  };

  const handleUploadFile = async () => {
    setLoading(true);
    if (imageFile) {
      const { uri } = imageFile;
      const fileName = uri.split('/').pop();
      const response = await fetch(uri);
      const blobFile = await response.blob();

      const reference = ref(storage, `/images/${fileName}`);
      const result = await uploadBytes(reference, blobFile);
      const url = await getDownloadURL(result.ref);
      const userRef = doc(db, 'users', auth.currentUser.uid);

      await updateDoc(userRef, {
        displayImage: url,
      });
      await getUser();
      toggleSettingsModal(false);
      setCurrentlyShowing('settings');
      setLoading(false);
    } else {
      console.error('File not found');
    }
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#D77451" />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <View style={{ flexDirection: 'row' }}>
              <FormButton
                small={image ? true : false}
                title={image ? 'Save' : 'Choose Image'}
                onPress={image ? handleUploadFile : pickImage}
              />
              {image && (
                <FormButton small={true} title={'Change'} onPress={pickImage} />
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
