import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { SvgXml } from "react-native-svg";
//import { services } from "../../assets/icon";
//import Services from '../../assets/Images/Services.svg'
import Screenshot from "../../assets/Images/Screenshot.png";
import { primaryColor, backgroundColor } from "./../../assets/colors";
import Input from "./../../components/Input";
import TextArea from "./../../components/TextArea";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import { EvilIcons } from "@expo/vector-icons";
import Button from "./../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { CheckBox } from "./Pricing";
import { createOtherService } from "../../Class/service";
import { fileFromURL } from "../../action";
import { uploadFile } from "../../Class/upload";
import IconButton from "../../components/IconButton";

const Service = ({ navigation, route }) => {
  const [CenterName, setCenterName] = React.useState();
  const [CenterNameError, setCenterNameError] = React.useState();
  const [Speciality, setSpeciality] = React.useState();
  const [SpecialityError, setSpecialityError] = React.useState();
  const [Description, setDescription] = React.useState();
  const [DescriptionError, setDescriptionError] = React.useState();
  const [About, setAbout] = React.useState();
  const [AboutError, setAboutError] = React.useState();
  const [FirstImage, setFirstImage] = React.useState();
  const [SecondImage, setSecondImage] = React.useState();
  const [ThirdImage, setThirdImage] = React.useState();
  const [ForthImage, setForthImage] = React.useState();
  const [ImageError, setImageError] = React.useState();
  const businessForm = useSelector((state) => state.businessForm);
  const [Price, setPrice] = React.useState();
  const [PriceError, setPriceError] = React.useState();
  const [Facilities, setFacilities] = React.useState([
    {
      id: 1,
      title: "Home Delivery Available",
      checked: false,
    },
    {
      id: 2,
      title: "Home Service Available",
      checked: false,
    },
    {
      id: 3,
      title: "Online Support Available",
      checked: false,
    },
  ]);
  const [FacilitiesError, setFacilitiesError] = React.useState();
  const [FacilitiesCounter, setFacilitiesCounter] = React.useState(0);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const listData = useSelector((state) => state.listData);
  //referencial permissions
  const nameRef = React.useRef();
  const specialityRef = React.useRef();
  const descriptionRef = React.useRef();
  const aboutRef = React.useRef();
  const dispatch = useDispatch();
  const priceRef = React.useRef();
  //route params are
  const direct =
    route.params && route.params.direct ? route.params.direct : false;
  const [change, setChange] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  React.useEffect(() => {
    setFacilitiesCounter(0);
    Facilities.forEach((doc, i) => {
      if (doc.checked) {
        setFacilitiesCounter((d) => d + 1);
      }
    });
  }, [Facilities.length + change]);
  React.useEffect(() => {
    if (businessForm && businessForm.serviceTitle) {
      setCenterName(businessForm.serviceTitle);
    }
    if (businessForm && businessForm.speciality) {
      setSpeciality(businessForm.speciality);
    }
    if (businessForm && businessForm.description) {
      setDescription(businessForm.description);
    }
    if (businessForm && businessForm.about) {
      setAbout(businessForm.about);
    }
    if (businessForm && businessForm.firstImage) {
      setFirstImage(businessForm.firstImage);
    }
    if (businessForm && businessForm.secondImage) {
      setSecondImage(businessForm.secondImage);
    }
    if (businessForm && businessForm.thirdImage) {
      setThirdImage(businessForm.thirdImage);
    }
    if (businessForm && businessForm.forthImage) {
      setForthImage(businessForm.forthImage);
    }
  }, [businessForm]);

  const checkValidity = async () => {
    setCenterNameError(null);
    setSpecialityError(null);
    setDescriptionError(null);
    setAboutError(null);
    setImageError(null);

    if (!CenterName) {
      setCenterNameError("This field is required");
      return;
    }
    if (!Speciality && !direct) {
      setSpecialityError("This field is required");
      return;
    }
    if (!Description) {
      setDescriptionError("This field is required");
      return;
    }
    if (!About && !direct) {
      setAboutError("This field is required");
      return;
    }
    if (!FirstImage || !SecondImage || !ThirdImage || !ForthImage) {
      setImageError("*All picture must be upload");
      return;
    }
    if (!Price && direct) {
      setPriceError("Price field is required");
      return;
    }
    if (FacilitiesCounter == 0 && direct) {
      setFacilitiesError("Please select any facilities");
      return;
    }
    dispatch({ type: "SERVICE_TITLE", playload: CenterName });
    dispatch({ type: "SPECIALITY", playload: Speciality });
    dispatch({ type: "DESCRIPTION", playload: Description });
    dispatch({ type: "ABOUT", playload: About });
    dispatch({ type: "FIRST_IMAGE", playload: FirstImage });
    dispatch({ type: "SECOND_IMAGE", playload: SecondImage });
    dispatch({ type: "THIRD_IMAGE", playload: ThirdImage });
    dispatch({ type: "FOURTH_IMAGE", playload: ForthImage });
    if (direct) {
      dispatch({ type: "PRICE", playload: Price });
      dispatch({ type: "FACILITIES", playload: Facilities });
    }
    if (direct) {
      //ongoing function-------------
      setLoader(true);
      let blobImages = [];
      blobImages.push(fileFromURL(FirstImage));
      blobImages.push(fileFromURL(SecondImage));
      blobImages.push(fileFromURL(ThirdImage));
      blobImages.push(fileFromURL(ForthImage));
      const result = await uploadFile(blobImages, user.token);
      if (result) {
        createOtherService(
          user.token,
          businessForm,
          route.params.data ? route.params.data : listData,
          result,
          vendor.service.id,
          direct
        )
          .then((res) => {
            navigation.navigate("VendorProfile", { direct: businessForm });
            setLoader(false);
          })
          .catch((err) => {
            console.warn(err.response);
            setLoader(false);
          });
      }
      return;
    }
    navigation.navigate("Address");
  };
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
    >
      <ScrollView>
        <View
          style={{
            backgroundColor: primaryColor,
            paddingHorizontal: 20,
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
            }}
            source={Screenshot}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins-Medium",
              marginVertical: 20,
              color: "#707070",
            }}
          >
            Describe your services
          </Text>
          <Input
            value={CenterName}
            returnKeyType="next"
            level="Max 50 character"
            error={CenterNameError}
            onChange={(val) => {
              setCenterNameError(null);
              if (val.length <= 50) {
                setCenterName(val);
              } else {
                setCenterNameError("*Max is 50 character.");
              }
            }}
            onSubmitEditing={() => {
              if (specialityRef.current && !direct) {
                specialityRef.current.focus();
              } else if (descriptionRef.current && direct) {
                descriptionRef.current.focus();
              }
            }}
            style={{
              marginHorizontal: 0,
              borderWidth: 1,
            }}
            placeholder="Service title"
          />
          {!direct && <View style={{ height: 10 }} />}
          {!direct && (
            <Input
              value={Speciality}
              innerRef={specialityRef}
              returnKeyType="next"
              level="Max 100 character"
              error={SpecialityError}
              onChange={(val) => {
                setSpecialityError(null);
                if (val.length <= 100) {
                  setSpeciality(val);
                } else {
                  setSpecialityError("*Character must be between 100");
                }
              }}
              onSubmitEditing={() => {
                if (descriptionRef.current) {
                  descriptionRef.current.focus();
                }
              }}
              style={{
                marginHorizontal: 0,
                borderWidth: 1,
              }}
              placeholder="Speciality"
            />
          )}
          <View style={{ height: 10 }} />
          <TextArea
            value={Description}
            innerRef={descriptionRef}
            returnKeyType="next"
            level="Max 2000 characters"
            error={DescriptionError}
            onChange={(val) => {
              setDescriptionError(null);
              if (val.length <= 2000) {
                setDescription(val);
              } else {
                setDescriptionError("*Character must be between 2000");
              }
            }}
            onSubmitEditing={() => {
              if (aboutRef.current && !direct) {
                aboutRef.current.focus();
              } else if (priceRef && priceRef.current && direct) {
                priceRef.current.focus();
              }
            }}
            placeholder="Service Description"
          />
          <View style={{ height: 10 }} />
          {!direct && (
            <TextArea
              value={About}
              innerRef={aboutRef}
              returnKeyType="done"
              level="Max 2000 characters"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              error={AboutError}
              onChange={(val) => {
                setAboutError(null);
                if (val.length <= 2000) {
                  setAbout(val);
                } else {
                  setAboutError("Character should be between 2000");
                }
              }}
              placeholder="About Company"
            />
          )}
          {direct && (
            <Input
              innerRef={priceRef}
              value={Price}
              error={PriceError}
              onChange={(val) => {
                setPrice(val);
              }}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                marginLeft: 0,
                width: width - 40,
              }}
              placeholder="Price"
            />
          )}
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <ImageButton
              value={FirstImage}
              onChange={(value) => {
                setFirstImage(value);
              }}
              style={{ marginLeft: 5 }}
            />
            <ImageButton
              value={SecondImage}
              onChange={(value) => {
                setSecondImage(value);
              }}
              style={{ marginLeft: 10 }}
            />
            <ImageButton
              value={ThirdImage}
              onChange={(value) => {
                setThirdImage(value);
              }}
              style={{ marginLeft: 10 }}
            />
            <ImageButton
              value={ForthImage}
              onChange={(value) => {
                setForthImage(value);
              }}
              style={{ marginLeft: 10 }}
            />
          </View>
          {ImageError && (
            <Text
              style={{
                marginLeft: 2,
                fontSize: 12,
                fontFamily: "Poppins-Light",
                color: "red",
              }}
            >
              {ImageError}
            </Text>
          )}
          {direct && (
            <Text
              style={[
                {
                  marginTop: 10,
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                },
              ]}
            >
              Choose your facilities
            </Text>
          )}
          {Array.isArray(Facilities) &&
            direct &&
            Facilities.map((doc, i) => (
              <CheckBox
                key={i}
                style={{
                  marginTop: 10,
                }}
                value={doc.checked}
                title={doc.title}
                onChange={() => {
                  let arr = Facilities;
                  setFacilities(null);
                  arr[i] = {
                    title: doc.title,
                    checked: !doc.checked,
                    id: i + 1,
                  };
                  setFacilities(arr);
                  setChange(!change);
                  //console.log(arr);
                }}
              />
            ))}
          {FacilitiesError && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 2,
                fontFamily: "Poppins-Light",
                color: "red",
                marginTop: 3,
              }}
            >
              {FacilitiesError}
            </Text>
          )}
          <IconButton
            onPress={() => {
              checkValidity();
            }}
            style={{
              marginTop: 30,
              backgroundColor: backgroundColor,
              color: "white",
              borderWidth: 0,
              borderRadius: 5,
              height: 45,
              marginBottom: 30,
            }}
            title={direct ? "Create Service" : "Continue"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Service;

export const ImageButton = ({ style, onChange, value }) => {
  const [image, setImage] = React.useState(null);
  React.useEffect(() => {
    if (value) {
      setImage(value.uri);
    }
  }, [value]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      if (onChange) {
        onChange(result.assets[0]);
      }
    }
  };
  const styles = StyleSheet.create({
    view: {
      width: width / 4 - 20,
      height: width / 4 - 20,
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
      borderColor: "#e5e5e5",
    },
  });
  if (image) {
    return (
      <View
        style={{
          marginLeft: 7,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setImage(null);
          }}
          style={{
            position: "absolute",
            right: -5,
            top: -5,
            zIndex: 1,
            backgroundColor: "white",
            borderRadius: 20,
            height: 24,
            width: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EvilIcons name="close-o" size={24} color="red" />
        </TouchableOpacity>
        <Image style={styles.view} source={{ uri: image }} />
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        pickImage();
      }}
      style={[styles.view, style]}
    >
      <AntDesign name="plus" size={24} color="#707070" />
    </TouchableOpacity>
  );
};
