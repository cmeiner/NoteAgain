import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import { storage } from '../../../config/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export const UploadMedia = () => {
  //   const [imageFile, setImageFile] = useState<File>();
  const [imageName, setImageName] = useState('');
  const [downloadURL, setDownloadURL] = useState('');
  const [image, setImage] = useState(null);
  //const updateField = async (url: string) => {}; // code to update field in database with the downloadURL

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const name = result.uri.split('/').pop();

      setImageName(name);
      await handleUploadFile(result);
    }
  };

  const handleUploadFile = async (imageFile: any) => {
    if (imageFile) {
      const { uri } = imageFile;
      const fileName = uri.split('/').pop();
      const response = await fetch(uri);
      const blobFile = await response.blob();

      const reference = ref(storage, `/images/${fileName}`);
      const result = await uploadBytes(reference, blobFile);
      const url = await getDownloadURL(result.ref);
      // const url = await getDownloadURL(uploadSnapshot.ref);
      // console.log(url);
      // await setDownloadURL(url);
    } else {
      console.error('File not found');
    }
  };

  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </View>
  );
};
