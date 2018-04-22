import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  CameraRoll
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import AuthActions from '../store/action/auth';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob'

class Camera extends Component {

  constructor(props){
    super(props);
    // this.props.loadImages(this.props.currentUser);
  }
  signOut = () => {
    firebase.auth().signOut()
      .then(user => {
        console.log(user);

        this.reset('Auth');
      })
      .catch(error => {
        alert(error.message);
      })
  }

  reset = (route, data) => {
    return this.props
      .navigation
      .dispatch(NavigationActions.reset(
        {
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: `${route}` }, data)
          ]
        }));
  }
  getSelectedImages = (currentImage) => {

    const image = currentImage;

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob


    let uploadBlob = null
    const imageRef = firebase.storage().ref('posts').child("test.jpg")
    let mime = 'image/jpg'
    fs.readFile(image, 'base64')
      .then((data) => {
        console.log("1")
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        console.log("2")
        uploadBlob = blob
        return imageRef.put(blob._ref, { contentType: mime })
      })
      .then(() => {
        console.log("3")
        uploadBlob.close()
        
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        // URL of the image uploaded on Firebase storage
        // console.log("4")
        console.log('uploading')
        firebase.database().ref(`/cameraWork/${this.props.currentUser.uid}`).push({url});
        
        console.log(url);

      })
      .catch((error) => {
        console.log(error);

      })

  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <Button title='signOut' onPress={this.signOut} />
        </View>
      </View>
    );
  }

  takePicture = async function () {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      CameraRoll.saveToCameraRoll(data.uri)
        .then(data1 => {
          this.getSelectedImages(data1);
          // console.log(data1)
          // RNFetchBlob.fs.readFile(data1, 'base64')
          //   .then((data) => {
          //     console.log(data)
          //   })
        })
        .catch(error => {
          alert(error);
        })
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});


function mapStateToProps(state) {
  console.log(state)
  return {
    currentUser: state.authReducer.currentUser
  }
}
function mapDispatchToProps(dispatch) {
  return {
    signOut: (navigate) => dispatch(AuthActions.signOut(navigate)),
    loadImages: (currentUser) => dispatch(AuthActions.loadImages(currentUser)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Camera);