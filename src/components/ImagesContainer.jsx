import React, {useState} from 'react'
import { 
    View, 
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker';




const ImagesContainer = ({ navigation, inputTitle, isForProfileScreen, img, imgB64 }) => {

    const [image, setImage] = useState('../assets/images/person.png')
    const [imageBase64, setImageBase64] = useState("rien pour l'instant")
    
    //console.log(image.path)

    console.log('image: ',image)
    console.log('image b64:', imageBase64)

    // img={image}
    // imgB64={imageBase64}

    const takePhotoFromCamera = () => {
        console.log("prendre une photo")
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
          }).then(image => {
            console.log('image path: ',image.path);
            console.log('image data:', image.data);
            setImage(image.path)
            setImageBase64(image.data)
          });
    }

    
    

    const AddImageIcon = ({redirection}) => {
        return (
            <TouchableOpacity 
                style={ isForProfileScreen ? styles.addImageIconProfileScreen : styles.addImageIcon} 
                onPress={() => takePhotoFromCamera() } >
                <FontAwesome  
                    name='plus-circle'
                    size={30}
                    color='#ED7F10'
                />
            </TouchableOpacity>
        )
    }
    
    const RemoveImageIcon = () => {
        return (
            <TouchableOpacity 
                style={ isForProfileScreen ? styles.removeImageIconProfileScreen : styles.removeImageIcon}
                onPress={() => setImage('../assets/images/person.png')}
                >
                <FontAwesome  
                    name='close'
                    size={35}
                    color='red'
                />
            </TouchableOpacity>
        )
    }

    const OneImageContainer = ({isImageAlreadyChoose}) => {
        return (
            <TouchableOpacity 
                style={isForProfileScreen ? styles.oneImageContainerProfileScreen : styles.oneImageContainer}>
                {
                    image == '../assets/images/person.png' ? 
                    (
                    <>
                    <Image 
                        source={require('../assets/images/person.png')} 
                        style={isForProfileScreen ? styles.imageProfileScreen : styles.image} />
                    <AddImageIcon />
                    </>
                    ) 
                    : 
                    (
                    <>
                    <Image 
                        source={{ uri: image }} 
                        style={isForProfileScreen ? styles.imageProfileScreen : styles.image} />
                    <RemoveImageIcon />
                    </>
                    )
                }
                
                    
                
            </TouchableOpacity>
        )
    }

    const TwoImageContainer = () => {
        return (
            <View style={styles.twoImageContainer}>
                <OneImageContainer isImageAlreadyChoose={true} />
                <OneImageContainer isImageAlreadyChoose={true} />
            </View>
        )
    }



  return (
    <>
    <View style={styles.inputTitleContainer}>
        <Text style={styles.inputTitle}> {inputTitle} </Text>
    </View>

    <View style={styles.container}>

        <TwoImageContainer />
        
        
    </View>
    </>
  )
}

export default ImagesContainer

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputTitleContainer: {
        left: -width * 0.15,
        width: width * 0.93,
        height: 30,
        justifyContent: 'center',
        position: 'relative',
        left: 0,
        marginTop: 25
    },
    inputTitle: {
        fontSize: 16,
        fontFamily: 'Avenir Next Bold',
        color: '#303030'
    },
    addImageIcon: {
        position: 'absolute',
        bottom: 7,
        right: 1
    },
    addImageIconProfileScreen: {
        position: 'absolute',
        bottom: 2,
        right: 2
    },
    removeImageIconProfileScreen: {
        position: 'absolute',
        bottom: 2,
        right: 2
    },
    removeImageIcon: {
        position: 'absolute',
        bottom: 7,
        right: 1
    },
    twoImageContainer: {
        flexDirection: 'row',
        
    },
    oneImageContainer: {
        borderRadius: 20,
        width: width * 0.4,
        height: height * 0.25,
        marginTop: 10,
        marginRight: 4,
        marginLeft: 4
    },
    oneImageContainerProfileScreen: {
        borderRadius: 20,
        width: width * 0.24,
        height: height * 0.12,
        marginTop: 7,
        marginRight: width * 0.1
    },
    image: {
        width: width * 0.4,
        height: height * 0.24,
        borderWidth: 2,
        borderColor: '#848484',
        borderRadius: 20,
        
    },
    imageProfileScreen: {
        width: width * 0.24,
        height: height * 0.12,
        borderWidth: 2,
        borderColor: '#848484',
        borderRadius: 20,
    },

    panel: {
        width: width,
        height: height * 0.4,
        backgroundColor: '#ccc'
    },

    renderInnerComponent: {
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#eb5a6d'
    },
    textRenderInner: {
        color: '#fff'
    }
})