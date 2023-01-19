import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { TopBar } from '../src/components/TopBar';
import { useUserContext } from '../src/contexts/UserContext';
import { TextH2 } from '../src/utils/styles/FontStyles';

export const Profile = () => {
  const { currentUser } = useUserContext();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          position: 'absolute',
          top: 500,
        }}
        source={require('../assets/images/Wave.png')}
      />
      <View style={{ marginHorizontal: 10 }}>
        <TopBar settings />
      </View>
      <View
        style={{
          marginTop: 40,
          marginHorizontal: 10,
          height: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          style={{ width: 180, height: 180, borderRadius: 10 }}
          source={
            currentUser.displayImage.length > 2
              ? { uri: currentUser.displayImage }
              : require('../assets/images/placeholder-profile.jpg')
          }
        />
        <View style={{ height: 20 }} />
        <TextH2 color="black">{currentUser.displayName}</TextH2>
        <TextH2 color="black">{currentUser.email}</TextH2>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
