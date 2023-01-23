import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { auth, db, storage } from '../../../config/firebaseConfig';
import { useModalContext } from '../../contexts/ModalContext';
import { useSettingsContext } from '../../contexts/SettingsContext';
import { useUserContext } from '../../contexts/UserContext';
import { FormButton } from './FormButton';

type Props = {
  mode: 'register' | 'change';
};

export const UploadMedia = ({ mode }: Props) => {
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
    });
    if (!result.assets[0].canceled) {
      // VAMONOS
      const resizedImage = await manipulateAsync(
        result.uri,
        [{ resize: { width: 300, height: 300 } }],
        { format: SaveFormat.JPEG, compress: 0.8 }
      );
      console.log('URI ' + resizedImage.uri);
      setImage(resizedImage.uri);
      setImageFile(resizedImage);
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
        profilePicture: url,
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
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#D77451" />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mode === 'change' && image && (
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
  );
};
