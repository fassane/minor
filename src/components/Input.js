import React, {useState} from 'react'
import { 
    View, 
    Text, 
    TextInput,
    StyleSheet,
    Dimensions,
    ToastAndroid } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'


const Input = ({isInputTitlePresent,
                amIWhantInputWithAllBorder,
                inputTitle, 
                iconSize,
                leftIconName, 
                leftIconColor, 
                rightIconName, 
                rightIconColor, 
                placeholder, 
                keyboardType,
                multiline,
                value,
                onChangeText,
                isThereLeftIcon,
                secureTextEntry,
                onEndEditing,
                onPressIn,
                onPressRightIcon,
                onSubmitEditing,
                placeholderTextColor,
                selection,
                selectionColor,
                showSoftInputOnFocus,
                textAlign,
                errorMessage,
                maxLength }) => {

  
  const ToastWithErrorMessage = () => {
    ToastAndroid.showWithGravityAndOffset(
        "C'est juste un test",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
    );
   };
                    

  return (
    <>
        {
            isInputTitlePresent ? 
            (
                <View style={styles.inputTitleContainer}>
                    <Text style={styles.inputTitle}> {inputTitle} </Text>
                </View>
            ) 
            : 
            null
        }
        <View style={ amIWhantInputWithAllBorder ? styles.containerWhitAllBorder : styles.container }>
            
            <FontAwesome 
                name={leftIconName}
                color={leftIconColor}
                size={iconSize}
                style={styles.leftIcon}
            />
            <TextInput
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                keyboardType={keyboardType}
                multiline={multiline}
                autoCapitalize='none'
                secureTextEntry={secureTextEntry}
                maxLength={maxLength}
                onEndEditing={onEndEditing}
                onPressIn={onPressIn}
                onSubmitEditing={onSubmitEditing}
                selection={selection}
                selectionColor={selectionColor}
                showSoftInputOnFocus={showSoftInputOnFocus}
                textAlign={textAlign}
                errorMessage={errorMessage}
                style={styles.textInput}
            />
            {
                isThereLeftIcon ? 
                <Feather 
                    name={rightIconName}
                    color={rightIconColor}
                    size={24}
                    style={styles.rightIcon}
                    onPress={onPressRightIcon}
                />
                :
                null
            }
            
            
        </View>
    </>
  )
}

const {width, height} = Dimensions.get('screen')

export default Input

const styles = StyleSheet.create({
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
    container: {
        padding: 5,
        borderBottomWidth: 2,
        borderRadius: 5,
        borderColor: '#848484',
        width: width * 0.9,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    containerWhitAllBorder: {
        padding: 5,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#848484',
        width: width * 0.9,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        padding: 10,
        width: width * 0.7,
        height: 40,
        fontFamily: 'Avenir Next'
    },
    leftIcon: {
        position: 'absolute',
        left: 10
    },
    rightIcon: {
        position: 'absolute',
        right: 10
    },
    
})