import React from "react";
import { View, ScrollView, StyleSheet, Text,Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Color } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { convertDate, dateConverter } from "../../action";
import IconButton from "../../components/IconButton";
const {width,height}=Dimensions.get("window")

export default function SelectDate({onChange,navigation,route}) {
  const [Open, setOpen] = React.useState();
  const [Close, setClose] = React.useState();
  const [OpeningTime, setOpeningTime] = React.useState();
  const [ClosingTime, setClosingTime] = React.useState();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const [Error,setError]=React.useState()
  const data=route.params.data?route.params.data:null;
  const userId=route.params.userId;
  const params=route.params;
  const selectedPackage=params.selectedPackage;
  //console.log(userId)
  //console.log(data)
  

  return (
    <View
      style={{
        flex: 1,
        
      }}
    >
      <SvgXml
        style={{
          marginTop: "10%",
          alignSelf:"center"
        }}
        xml={svgIcon}
        height="30%"
      />
      <View>
      <Text style={{
        fontSize:16,
        color:textColor,
        marginHorizontal:20,
        marginVertical:20
      }}>Select delivery date</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems:"center",
          marginHorizontal:10
        }}
      >
        <TouchableOpacity onPress={()=>{
          setOpen(true)
        }} style={styles.box}>
          <DateTimePickerModal
            date={OpeningTime ? OpeningTime : new Date()}
            buttonTextColorIOS={backgroundColor}
            isVisible={Open}
            mode="date"
            onConfirm={(e) => {
              if (ClosingTime && ClosingTime < e) {
                setError(`Opening time can't be earlier from closing time.`);
                setOpen(false);
                setOpeningTime(null);
                return;
              }
              setError(null);
              setOpeningTime(e);
              setOpen(false);
              if (onChange) {
                onChange({
                  title: title,
                  openingTime: e,
                  closingTime: ClosingTime,
                });
              }
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Text style={styles.text}>{OpeningTime?dateConverter(OpeningTime):"yyyy-mm-dd"}</Text>
          <SvgXml xml={calender} height="24" width={"24"}/>
        </TouchableOpacity>
        <Text>to</Text>
        <TouchableOpacity onPress={()=>{
          setClose(true)
        }} style={styles.box}>
          <DateTimePickerModal
            date={ClosingTime ? ClosingTime : new Date()}
            buttonTextColorIOS={backgroundColor}
            isVisible={Close}
            mode="date"
            onConfirm={(e) => {
              if (OpeningTime && OpeningTime >= e) {
                setError(`Opening time can't be earlier from closing time.`);
                setClose(false);
                setClosingTime(null);
                return;
              }
              setError(null);
              setClosingTime(e);
              setClose(false);
              if (onChange) {
                onChange({
                  title: title,
                  openingTime: OpeningTime,
                  closingTime: e,
                });
              }
            }}
            onCancel={() => {
              setClose(false);
            }}
          />
          <Text style={styles.text}>{ClosingTime?convertDate(ClosingTime):"yyyy-mm-dd"}</Text>
        <SvgXml xml={calender} height="24" width={"24"}/>
        </TouchableOpacity>
      </View>
      {Error&&(
        <Text style={{
          color:"red",
          textAlign:"center",
          marginVertical:10,
          marginHorizontal:20
        }}>{Error}</Text>
      )}
      <IconButton onPress={()=>{
        if(!OpeningTime || !ClosingTime){
          setError("Please select date")
          return;
        }
        navigation.navigate("AcceptOrder", {
          facilities: data.facilites,
          id: data.id,
          data: data,
          vendor:true,
          from:dateConverter(OpeningTime),
          to:dateConverter(ClosingTime),
          userId:userId,
          selectedPackage:selectedPackage
        });
      }} style={{
        borderRadius:5,
        marginHorizontal:20,
        color:"white",
        backgroundColor:"#4ADE80",
        position:"absolute",
        bottom:10,
        width:width-40
      }} title={"Next"} />
    </View>
  );
}
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="114.5" height="145.37" viewBox="0 0 114.5 145.37">
<g id="istockphoto-1161813029-612x612" transform="translate(-199.255 -130.953)">
  <g id="_ffffffff" data-name="#ffffffff" transform="translate(200.599 132.329)">
    <path id="Path_20343" data-name="Path 20343" d="M202.749,145.86a11.485,11.485,0,0,1,10.892-11.308c16.544-.042,33.089-.015,49.633-.012a11.4,11.4,0,0,1,11.039,10.942q.058,10.844,0,21.692c-.839.158-1.27-.512-1.127-1.274.146-1.158-.962-1.962-.881-3.09-.012-5.475.054-10.95-.031-16.425-4.005-.377-8.041-.019-12.058-.162-13.089-.019-26.175.023-39.264-.008-5.363.023-10.727-.073-16.086.131-.085,35.232-.012,70.467-.038,105.7.035,2.628-.081,5.263.073,7.891,22.412.089,44.827.035,67.239.027.381-3.27.069-6.587.181-9.877.546-.042,1.1-.081,1.651-.119a29.9,29.9,0,0,1,.235-4.979c.239,6.841.1,13.689.119,20.534a11.38,11.38,0,0,1-6.622,10.6,13.8,13.8,0,0,1-6.368,1.062c-15.775-.023-31.553.019-47.324-.023a11.479,11.479,0,0,1-11.246-10.862q-.046-60.223-.015-120.45m28.672-6.775a2.574,2.574,0,0,0,.323,5.106c4.086.065,8.176-.012,12.262.035a4.853,4.853,0,0,0,2.647-.423,2.652,2.652,0,0,0,.2-4.228c-.92-.723-2.151-.516-3.236-.562-4.063.065-8.137-.085-12.2.073m1.247,125.132a4.418,4.418,0,0,0-3.113,5.806,4.581,4.581,0,0,0,4.44,2.863c2.7,0,5.4-.012,8.1,0,1.481-.031,3.155-.058,4.286-1.166a4.436,4.436,0,0,0,.154-6.387,4.843,4.843,0,0,0-3.682-1.231C239.458,264.2,236.053,263.975,232.667,264.217Z" transform="translate(-202.749 -134.529)" fill="#fff"/>
    <path id="Path_20344" data-name="Path 20344" d="M244.16,275.814q34.593.04,69.182.012a51.4,51.4,0,0,1,5.606.123c-.015,1.851-.008,3.7-.015,5.556a21.962,21.962,0,0,0-12.1,5.521,5.892,5.892,0,0,0-4.255-2.189,5.586,5.586,0,0,0-5.756,6.437,5.787,5.787,0,0,0,4.525,4.659c-.242.808-.177,1.935-1.2,2.162a5.523,5.523,0,0,0-3.247,6.291,5.657,5.657,0,0,0,4.767,4.413c.181.481.358.962.539,1.451a5.712,5.712,0,0,0-5.394,6.46,5.585,5.585,0,0,0,6.144,4.69,5.8,5.8,0,0,0,4.144-2.6c1.454.789,2.786,1.774,4.194,2.643a21.154,21.154,0,0,0,7.66,2.5,6.14,6.14,0,0,1-5.987,6.464c-20.923-.012-41.845.023-62.768-.019a6.018,6.018,0,0,1-6.064-6.033c.019-16.183-.031-32.361.027-48.544m15.113,9.215a5.55,5.55,0,1,0,7.014,5.444,5.509,5.509,0,0,0-7.014-5.444m13.832-.046a5.791,5.791,0,0,0-3.99,4.386,5.551,5.551,0,1,0,11.008,1.127c.3-3.6-3.6-6.548-7.018-5.513m13.863.046a5.552,5.552,0,1,0,7.026,5.51,5.522,5.522,0,0,0-7.026-5.51m-27.791,12.847a5.564,5.564,0,1,0,7.095,4.956,5.543,5.543,0,0,0-7.095-4.956m13.5.123a5.5,5.5,0,0,0-3.57,6.017,5.546,5.546,0,1,0,3.57-6.017m13.832-.008a5.566,5.566,0,1,0,7.483,5.186,5.561,5.561,0,0,0-7.483-5.186m-26.867,12.424a5.564,5.564,0,1,0,6.645,5.487,5.531,5.531,0,0,0-6.645-5.487m13.67.042a5.559,5.559,0,1,0,6.779,4.64,5.549,5.549,0,0,0-6.779-4.64m12.889.315a5.573,5.573,0,1,0,7.707,4.005A5.611,5.611,0,0,0,286.2,310.772Z" transform="translate(-228.208 -221.452)" fill="#fff"/>
    <path id="Path_20345" data-name="Path 20345" d="M404.214,316.624a15.486,15.486,0,0,1,12.57-12.458c.327,1.366,1.047,3.24,2.751,3.151,1.624-.123,2.12-1.958,2.609-3.216,6.156,1.2,11.593,6.291,12.358,12.639a3.748,3.748,0,0,0-3.255,2.709c.454,1.493,1.931,2.151,3.294,2.6a15.3,15.3,0,0,1-12.443,12.42c-.431-1.52-1.235-3.17-3.032-3.286a4.216,4.216,0,0,0-2.232,3.22c-6.333-.746-11.523-6.21-12.624-12.4a5.444,5.444,0,0,0,3.186-1.989c0-.362-.012-1.089-.015-1.454a5.812,5.812,0,0,0-3.167-1.935m12.839-5.8a51.584,51.584,0,0,0-.162,6.318c.065,1.377-.327,3.074.881,4.086,2.57,2.547,5.117,5.129,7.7,7.668a2.487,2.487,0,0,0,3.52-3.513c-2.247-2.4-4.694-4.6-6.937-7-.392-2.655.208-5.39-.385-8.034C420.527,308.775,417.676,308.817,417.053,310.825Z" transform="translate(-326.698 -238.857)" fill="#fff"/>
    <path id="Path_20346" data-name="Path 20346" d="M277.627,475.833a4.789,4.789,0,0,1,1.858-.223c3.1.031,6.194-.031,9.292.031a2.569,2.569,0,0,1,2.374,1.928,2.675,2.675,0,0,1-2.447,3.443q-4.969.046-9.942,0a2.64,2.64,0,0,1-2.674-2.97A2.675,2.675,0,0,1,277.627,475.833Z" transform="translate(-247.855 -344.379)" fill="#fff"/>
  </g>
  <g id="_266492ff" data-name="#266492ff" transform="translate(199.255 130.953)">
    <path id="Path_20347" data-name="Path 20347" d="M199.657,140.555a12.726,12.726,0,0,1,12.166-9.546c16.429-.131,32.858.012,49.286-.023a12.8,12.8,0,0,1,12.42,11.9c.046,7.329.023,14.659.012,21.988,3.155.031,6.31.012,9.469.012a13.537,13.537,0,0,1,4.848.442,7.57,7.57,0,0,1,5.044,7.176c-.019,6.606.015,13.216-.023,19.822a20.491,20.491,0,0,1,20.85,21.392,20.292,20.292,0,0,1-4.594,12.043,20.7,20.7,0,0,1-16.221,7.468c0,.569-.008,1.147-.012,1.72a7.616,7.616,0,0,1-3.724,6.856,8.325,8.325,0,0,1-4.8,1.073c-3.617-.015-7.233-.031-10.85,0,.031,1.647.031,3.3.023,4.948-.027,5.544.05,11.092-.035,16.637a12.761,12.761,0,0,1-12.4,11.854q-24.839-.006-49.679-.012a12.792,12.792,0,0,1-12.177-12.6q-.017-59.063,0-118.122a18.729,18.729,0,0,1,.4-5.033m.943,3.1q.017,60.223.015,120.45a11.479,11.479,0,0,0,11.246,10.862c15.771.042,31.549,0,47.324.023a13.8,13.8,0,0,0,6.368-1.062,11.38,11.38,0,0,0,6.622-10.6c-.023-6.845.119-13.693-.119-20.534-.627.031-1.254.058-1.878.089-.035,1.666-.031,3.34-.008,5.009-.112,3.29.2,6.606-.181,9.877-22.412.008-44.827.062-67.239-.027-.154-2.628-.038-5.263-.073-7.891.027-35.235-.046-70.471.038-105.7,5.36-.2,10.723-.108,16.086-.131,13.089.031,26.175-.012,39.264.008,4.017.142,8.053-.215,12.058.162.085,5.475.019,10.95.031,16.425-.081,1.127,1.027,1.931.881,3.09-.142.762.289,1.431,1.127,1.274q.058-10.844,0-21.692a11.4,11.4,0,0,0-11.038-10.942c-16.544,0-33.089-.031-49.633.012A11.485,11.485,0,0,0,200.6,143.66m3.409,1.751q.023,55.531.019,111.054c21.546.027,43.1-.069,64.642.05.408-3.994.042-8.026.189-12.031-.085-.543.223-1.27-.327-1.631q-22.952.035-45.908,0a7.755,7.755,0,0,1-6.329-3.2,8.875,8.875,0,0,1-1.416-5.587c.038-20.011-.031-40.026.035-60.036a11.273,11.273,0,0,1,.662-4.667,7.594,7.594,0,0,1,6.656-4.471c4.809-.092,9.623.081,14.428-.092.092-1.077.042-2.3.881-3.12a3.1,3.1,0,0,1,4.548-.15c1.016.808.881,2.212,1.031,3.37,7.214-.112,14.432.085,21.646-.108a4.306,4.306,0,0,1,1.035-3.347c.746-.85,1.947-.739,2.955-.943.192-5.025.042-10.069.065-15.105-21.6.035-43.207,0-64.811.015m35.255,16.8c-.365.423-.962.777-.927,1.416-.058,4,0,8-.027,12a8.477,8.477,0,0,0,.346,2.439,3.756,3.756,0,0,0,2.17.008c.739-.589.539-1.643.6-2.466-.077-4.209.1-8.426-.1-12.631-.265-.227-.535-.454-.8-.677-.419-.027-.843-.058-1.262-.085m27.2,1.162c-.127,4.467-.027,8.945-.05,13.412-.069.95.823,1.4,1.574,1.67.254-.1.762-.3,1.012-.4.7-1.073.469-2.382.5-3.594-.065-3.894.112-7.791-.1-11.681-.931-.727-2.643-.858-2.936.589m-49.948,9.157c-.008,4.209.012,8.418,0,12.628q37.409-.029,74.822-.012-.017-5.921,0-11.843a6.169,6.169,0,0,0-5.967-6.822c-4.732-.038-9.461.031-14.193-.035a63.9,63.9,0,0,0-.012,7.233c-.246,1.951.512,4.675-1.635,5.794-1.35,1.02-3,.173-4.221-.623a9.87,9.87,0,0,1-.5-4.371,73.31,73.31,0,0,0,.162-8.068l-.577.062c-7.133.008-14.267-.027-21.4.015.046,2.216-.142,4.452.081,6.66-.077,1.427.077,2.87-.142,4.29a3.262,3.262,0,0,1-2.99,2.539c-1.389.062-2.416-.989-3.286-1.92-.065-1.377.235-2.847-.377-4.132l.316-.319c.127-2.351.023-4.706.065-7.06-4.686-.165-9.376-.038-14.066-.069a6.046,6.046,0,0,0-6.087,6.052m.038,14.163c-.058,16.183-.008,32.361-.027,48.544a6.018,6.018,0,0,0,6.064,6.033c20.923.042,41.845.008,62.768.019a6.14,6.14,0,0,0,5.987-6.464c-.023-.558-.038-1.112-.05-1.67a21.059,21.059,0,0,1-11.235-4.756c-.192.423-.385.846-.569,1.277a5.8,5.8,0,0,1-4.144,2.6,5.585,5.585,0,0,1-6.144-4.69,5.712,5.712,0,0,1,5.394-6.46c-.181-.489-.358-.97-.539-1.451a5.657,5.657,0,0,1-4.767-4.413,5.523,5.523,0,0,1,3.247-6.291c1.023-.227.958-1.354,1.2-2.162a5.787,5.787,0,0,1-4.525-4.659,5.586,5.586,0,0,1,5.756-6.437,5.893,5.893,0,0,1,4.255,2.189,21.961,21.961,0,0,1,12.1-5.521c.008-1.854,0-3.705.015-5.556a51.394,51.394,0,0,0-5.606-.123q-34.593-.017-69.182-.012m73.864,7.464a18.87,18.87,0,0,0-12.87,8.341,18.463,18.463,0,0,0-2.97,12.358,18.838,18.838,0,1,0,28.287-18.329,19.082,19.082,0,0,0-12.447-2.37m-19.6,7.66a3.977,3.977,0,0,0,3.447,3.428,25.47,25.47,0,0,1,3.8-6.2,4.119,4.119,0,0,0-3.1-1.743,3.946,3.946,0,0,0-4.148,4.513m-.058,12.247c-.158,1.751,1.185,3.1,2.62,3.863a35.281,35.281,0,0,1-.481-7.395,4.028,4.028,0,0,0-2.139,3.532m.285,11.212a3.956,3.956,0,1,0,7.61,1.851c-1.424-1.293-2.3-3.028-3.547-4.463A4.488,4.488,0,0,0,271.048,225.274Z" transform="translate(-199.255 -130.953)" fill="#da1e37"/>
    <path id="Path_20348" data-name="Path 20348" d="M312.5,332.9a5.534,5.534,0,0,1,7.245,3.671,5.549,5.549,0,1,1-10.815,2.347,5.5,5.5,0,0,1,3.57-6.018m.739,1.431a3.973,3.973,0,0,0-1.47,6.71c2.174,2.224,6.483.608,6.556-2.535A3.946,3.946,0,0,0,313.236,334.333Z" transform="translate(-266.683 -254.979)" fill="#da1e37"/>
    <path id="Path_20349" data-name="Path 20349" d="M348.484,332.855a5.576,5.576,0,1,1-3.559,6.006,5.582,5.582,0,0,1,3.559-6.006m.4,1.574c-2.889,1.07-3.278,5.737-.4,7.06a3.93,3.93,0,0,0,5.894-3.4A3.987,3.987,0,0,0,348.884,334.429Z" transform="translate(-288.838 -254.941)" fill="#da1e37"/>
  </g>
  <g id="_276294ff" data-name="#276294ff" transform="translate(227.144 136.81)">
    <path id="Path_20350" data-name="Path 20350" d="M273.868,146.25c4.059-.158,8.134-.008,12.2-.073,1.085.046,2.316-.162,3.236.562a2.652,2.652,0,0,1-.2,4.228,4.853,4.853,0,0,1-2.647.423c-4.086-.046-8.176.031-12.262-.035a2.574,2.574,0,0,1-.323-5.106m.408,1.62c-.893-.023-.785.939-.908,1.554,1.62.512,3.332.242,5,.3,3.213-.042,6.433.088,9.642-.054a.942.942,0,0,0-.446-1.808C283.136,147.846,278.7,147.82,274.276,147.87Z" transform="translate(-271.74 -146.175)" fill="#276294"/>
  </g>
  <g id="_fffffdff" data-name="#fffffdff" transform="translate(228.771 138.475)">
    <path id="Path_20351" data-name="Path 20351" d="M276.878,150.533c4.425-.05,8.861-.023,13.289-.012a.942.942,0,0,1,.446,1.808c-3.209.142-6.429.012-9.642.054-1.67-.054-3.382.215-5-.3C276.093,151.472,275.985,150.51,276.878,150.533Z" transform="translate(-275.97 -150.504)" fill="#fffffd"/>
  </g>
  <g id="_b9e2f8ff" data-name="#b9e2f8ff" transform="translate(204.007 145.396)">
    <path id="Path_20352" data-name="Path 20352" d="M211.608,168.505c21.6-.015,43.207.019,64.811-.015-.023,5.036.127,10.08-.065,15.105-1.008.2-2.208.092-2.955.943a4.306,4.306,0,0,0-1.035,3.347c-7.214.192-14.432,0-21.646.108-.15-1.158-.015-2.562-1.031-3.37a3.1,3.1,0,0,0-4.548.15c-.839.816-.789,2.043-.881,3.12-4.806.173-9.619,0-14.428.092a7.594,7.594,0,0,0-6.656,4.471,11.273,11.273,0,0,0-.662,4.667,12.844,12.844,0,0,0-3.5,3.443,6.361,6.361,0,0,0-.65,3.132q.046,28.285.019,56.566c0,2.339-.631,4.9.627,7.041a12.062,12.062,0,0,0,3.013,3.047,10.064,10.064,0,0,0,3.974.581c11.669-.031,23.339-.008,35.008-.015,5.009.077,10.027-.165,15.032.123.265,2.851-.065,5.717.231,8.568-21.546-.119-43.1-.023-64.642-.05Q211.564,224.034,211.608,168.505Z" transform="translate(-211.606 -168.49)" fill="#4ade80"/>
    <path id="Path_20353" data-name="Path 20353" d="M244.1,229.283a6.046,6.046,0,0,1,6.087-6.052c4.69.031,9.38-.1,14.066.069-.042,2.355.062,4.709-.065,7.06l-.315.319a4.978,4.978,0,0,0-.331,5.244A4.644,4.644,0,0,0,269.9,237.4a4.335,4.335,0,0,0,2.012-4.679,18.008,18.008,0,0,0-1.243-2.816c-.223-2.208-.035-4.444-.081-6.66,7.129-.042,14.263-.008,21.4-.015-.008,1.754.015,3.513.031,5.267.085,1.966-.789,3.794-.962,5.729a5.285,5.285,0,0,0,1.27,2.57,4.743,4.743,0,0,0,6.7-.231,4.555,4.555,0,0,0-.269-6.129,63.9,63.9,0,0,1,.012-7.233c4.732.065,9.461,0,14.193.035a6.169,6.169,0,0,1,5.967,6.822q-.012,5.921,0,11.843-37.409.017-74.822.012C244.114,237.7,244.095,233.492,244.1,229.283Z" transform="translate(-231.597 -202.15)" fill="#4ade80"/>
    <path id="Path_20354" data-name="Path 20354" d="M316.259,303.4c2.947-.754,5.717,2.747,4.378,5.456a3.964,3.964,0,1,1-4.378-5.456Z" transform="translate(-274.028 -251.432)" fill="#4ade80"/>
    <path id="Path_20355" data-name="Path 20355" d="M315.831,336.9a3.946,3.946,0,0,1,5.086,4.175c-.073,3.143-4.382,4.759-6.556,2.535A3.973,3.973,0,0,1,315.831,336.9Z" transform="translate(-274.03 -271.984)" fill="#4ade80"/>
    <path id="Path_20356" data-name="Path 20356" d="M351.525,337.041a3.987,3.987,0,0,1,5.49,3.663,3.93,3.93,0,0,1-5.894,3.4C348.246,342.778,348.635,338.111,351.525,337.041Z" transform="translate(-296.231 -271.996)" fill="#4ade80"/>
    <path id="Path_20357" data-name="Path 20357" d="M315.781,369.811a3.958,3.958,0,1,1-2.763,3.455A4.083,4.083,0,0,1,315.781,369.811Z" transform="translate(-273.988 -292.242)" fill="#4ade80"/>
    <path id="Path_20358" data-name="Path 20358" d="M351.859,369.8a3.959,3.959,0,1,1-.289,7.468,3.964,3.964,0,0,1,.289-7.468Z" transform="translate(-296.196 -292.224)" fill="#4ade80"/>
  </g>
  <g id="_fffdfaff" data-name="#fffdfaff" transform="translate(238.303 162.209)">
    <path id="Path_20359" data-name="Path 20359" d="M301.7,212.19c.419.027.843.058,1.262.085.265.223.535.45.8.677.2,4.205.023,8.422.1,12.631-.062.823.139,1.878-.6,2.466a3.756,3.756,0,0,1-2.17-.008,8.476,8.476,0,0,1-.346-2.439c.031-4-.031-8,.027-12C300.743,212.967,301.339,212.613,301.7,212.19Z" transform="translate(-300.745 -212.19)" fill="#fffdfa"/>
  </g>
  <g id="_fefffdff" data-name="#fefffdff" transform="translate(266.396 162.252)">
    <path id="Path_20360" data-name="Path 20360" d="M373.825,213.421c.292-1.447,2-1.316,2.936-.589.215,3.89.039,7.787.1,11.681-.035,1.212.2,2.52-.5,3.594-.25.1-.758.3-1.012.4-.75-.273-1.643-.719-1.574-1.67C373.8,222.367,373.7,217.888,373.825,213.421Z" transform="translate(-373.759 -212.302)" fill="#fefffd"/>
  </g>
  <g id="_6c9ab4ff" data-name="#6c9ab4ff" transform="translate(263.464 166.411)">
    <path id="Path_20361" data-name="Path 20361" d="M367.071,223.172l.577-.062a73.3,73.3,0,0,1-.162,8.068,9.87,9.87,0,0,0,.5,4.371c-.639-.435-1.227-.931-1.847-1.381.173-1.935,1.047-3.763.962-5.729C367.086,226.684,367.063,224.926,367.071,223.172Z" transform="translate(-366.14 -223.11)" fill="#6c9ab4"/>
  </g>
  <g id="_7aafd2ff" data-name="#7aafd2ff" transform="translate(235.368 173.148)">
    <path id="Path_20362" data-name="Path 20362" d="M300.828,240.62a18,18,0,0,1,1.243,2.816,4.335,4.335,0,0,1-2.012,4.679,4.644,4.644,0,0,1-6.356-1.474,4.978,4.978,0,0,1,.331-5.244c.612,1.285.312,2.755.377,4.132.87.931,1.9,1.981,3.286,1.92a3.262,3.262,0,0,0,2.99-2.539C300.905,243.49,300.751,242.047,300.828,240.62Z" transform="translate(-293.116 -240.62)" fill="#7aafd2"/>
  </g>
  <g id="_a7cfe8ff" data-name="#a7cfe8ff" transform="translate(210.624 174.029)">
    <path id="Path_20363" data-name="Path 20363" d="M229.6,246.354a12.843,12.843,0,0,1,3.5-3.444c-.065,20.011,0,40.026-.035,60.036a8.875,8.875,0,0,0,1.416,5.587,7.755,7.755,0,0,0,6.329,3.2q22.952.029,45.908,0c.55.362.242,1.089.327,1.631-.146,4.005.219,8.037-.189,12.031-.3-2.851.035-5.717-.231-8.568-5.006-.289-10.023-.046-15.032-.123-11.669.008-23.339-.015-35.008.015a10.063,10.063,0,0,1-3.974-.581,12.062,12.062,0,0,1-3.013-3.047c-1.258-2.143-.631-4.7-.627-7.041q-.017-28.285-.019-56.566A6.361,6.361,0,0,1,229.6,246.354Z" transform="translate(-228.805 -242.91)" fill="#4ade80"/>
  </g>
  <g id="_79afd3ff" data-name="#79afd3ff" transform="translate(263.464 173.679)">
    <path id="Path_20364" data-name="Path 20364" d="M373.843,242a4.555,4.555,0,0,1,.269,6.129,4.743,4.743,0,0,1-6.7.231,5.285,5.285,0,0,1-1.27-2.57c.619.45,1.208.946,1.847,1.381,1.216.8,2.87,1.643,4.221.623C374.354,246.675,373.6,243.951,373.843,242Z" transform="translate(-366.14 -242)" fill="#79afd3"/>
  </g>
  <g id="_b4dcf5ff" data-name="#b4dcf5ff" transform="translate(274.454 193.94)">
    <path id="Path_20365" data-name="Path 20365" d="M410.665,294.876a18.8,18.8,0,0,1,21.1,13.813,18.84,18.84,0,1,1-36.94,6.887,18.462,18.462,0,0,1,2.97-12.358,18.871,18.871,0,0,1,12.87-8.341m-8.945,6.437a17.036,17.036,0,0,0-5.129,10.908c1.147.273,2.855.135,3.405,1.4-.893.92-2.228,1-3.42,1.147a17.323,17.323,0,0,0,4.144,9.865,16.946,16.946,0,0,0,11.554,5.837,11.764,11.764,0,0,1,.82-3.22c.227,0,.677,0,.9-.008a12.855,12.855,0,0,1,.923,3.27,17.909,17.909,0,0,0,8.118-2.909,17.023,17.023,0,0,0,7.5-12.862,6.1,6.1,0,0,1-3.594-1.131,5.106,5.106,0,0,1,3.574-1.374,16.606,16.606,0,0,0-3.9-9.584,17.145,17.145,0,0,0-11.808-6.129,8.493,8.493,0,0,1-.827,3.186l-.912-.012a13.187,13.187,0,0,1-.812-3.22A17.883,17.883,0,0,0,401.72,301.313Z" transform="translate(-394.703 -294.661)" fill="#4ade80"/>
  </g>
  <g id="_226696ff" data-name="#226696ff" transform="translate(227.548 195.677)">
    <path id="Path_20366" data-name="Path 20366" d="M276.908,299.4a5.544,5.544,0,1,1-4.067,4.706,5.556,5.556,0,0,1,4.067-4.706m.385,1.539a3.963,3.963,0,0,0-2.385,5.767c1.416,2.866,6.321,2.493,7.2-.616C283.337,303.213,280.236,299.947,277.292,300.943Z" transform="translate(-272.791 -299.176)" fill="#226696"/>
  </g>
  <g id="_256493ff" data-name="#256493ff" transform="translate(241.402 195.65)">
    <path id="Path_20367" data-name="Path 20367" d="M312.894,299.315c3.42-1.035,7.314,1.916,7.018,5.513A5.551,5.551,0,1,1,308.9,303.7a5.791,5.791,0,0,1,3.99-4.386m.743,1.508a3.964,3.964,0,1,0,4.378,5.456C319.353,303.57,316.583,300.069,313.636,300.823Z" transform="translate(-308.8 -299.105)" fill="#256493"/>
  </g>
  <g id="_276593ff" data-name="#276593ff" transform="translate(255.263 195.665)">
    <path id="Path_20368" data-name="Path 20368" d="M348.921,299.386a5.551,5.551,0,1,1-4.044,4.706,5.555,5.555,0,0,1,4.044-4.706m-.1,1.728a3.978,3.978,0,0,0-.569,6.926c2.27,1.608,5.914.012,6.068-2.836A3.951,3.951,0,0,0,348.824,301.113Z" transform="translate(-344.825 -299.146)" fill="#276593"/>
  </g>
  <g id="_256492ff" data-name="#256492ff" transform="translate(276.326 195.759)">
    <path id="Path_20369" data-name="Path 20369" d="M404.714,304.222a17.883,17.883,0,0,1,10.542-4.832,13.185,13.185,0,0,0,.812,3.22l.912.012a8.493,8.493,0,0,0,.827-3.186,17.145,17.145,0,0,1,11.808,6.129,16.606,16.606,0,0,1,3.9,9.584,5.106,5.106,0,0,0-3.574,1.374,6.1,6.1,0,0,0,3.594,1.131,17.023,17.023,0,0,1-7.5,12.862,17.909,17.909,0,0,1-8.118,2.909,12.86,12.86,0,0,0-.923-3.27c-.227,0-.677,0-.9.008a11.763,11.763,0,0,0-.82,3.22,16.946,16.946,0,0,1-11.554-5.837,17.323,17.323,0,0,1-4.144-9.865c1.193-.15,2.528-.227,3.42-1.147-.55-1.27-2.258-1.131-3.405-1.4a17.036,17.036,0,0,1,5.129-10.908m-3.355,9.5a5.812,5.812,0,0,1,3.167,1.935c0,.366.011,1.093.015,1.454a5.443,5.443,0,0,1-3.186,1.989c1.1,6.187,6.291,11.65,12.624,12.4a4.216,4.216,0,0,1,2.232-3.22c1.8.115,2.6,1.766,3.032,3.286a15.3,15.3,0,0,0,12.443-12.42c-1.362-.446-2.839-1.1-3.293-2.6a3.748,3.748,0,0,1,3.255-2.709c-.766-6.348-6.2-11.442-12.358-12.639-.489,1.258-.985,3.093-2.609,3.216-1.7.089-2.424-1.785-2.751-3.151A15.486,15.486,0,0,0,401.359,313.726Z" transform="translate(-399.57 -299.39)" fill="#da1e37"/>
  </g>
  <g id="_e69695ff" data-name="#e69695ff" transform="translate(229.129 197.262)">
    <path id="Path_20370" data-name="Path 20370" d="M279.82,303.477c2.943-1,6.044,2.27,4.817,5.152-.881,3.109-5.787,3.482-7.2.616A3.963,3.963,0,0,1,279.82,303.477Z" transform="translate(-276.9 -303.295)" fill="#e69695"/>
    <path id="Path_20371" data-name="Path 20371" d="M280.626,337.064a3.752,3.752,0,0,1,4.34,3.782c.239,3.043-3.759,5.2-6.144,3.282C275.793,342.462,277,336.918,280.626,337.064Z" transform="translate(-277.025 -324.038)" fill="#e69695"/>
    <path id="Path_20372" data-name="Path 20372" d="M279.861,369.767a3.921,3.921,0,0,1,5.1,3.824c.208,2.951-3.517,5.029-5.948,3.374C276.113,375.449,276.667,370.567,279.861,369.767Z" transform="translate(-277.037 -344.063)" fill="#e69695"/>
  </g>
  <g id="_b9e2f7ff" data-name="#b9e2f7ff" transform="translate(256.929 197.265)">
    <path id="Path_20373" data-name="Path 20373" d="M385.148,307.885a3.946,3.946,0,0,1,4.148-4.513,4.119,4.119,0,0,1,3.1,1.743,25.471,25.471,0,0,0-3.8,6.2A3.977,3.977,0,0,1,385.148,307.885Z" transform="translate(-371.257 -303.334)" fill="#b9e2f7"/>
    <path id="Path_20374" data-name="Path 20374" d="M351.488,303.671a3.951,3.951,0,0,1,5.5,4.09c-.154,2.847-3.8,4.444-6.068,2.836A3.978,3.978,0,0,1,351.488,303.671Z" transform="translate(-349.155 -303.303)" fill="#b9e2f7"/>
    <path id="Path_20375" data-name="Path 20375" d="M385.342,371.922a4.488,4.488,0,0,1,4.063-2.612c1.25,1.435,2.124,3.17,3.547,4.463a3.956,3.956,0,1,1-7.61-1.851Z" transform="translate(-371.223 -343.914)" fill="#b9e2f7"/>
  </g>
  <g id="_246493ff" data-name="#246493ff" transform="translate(290.772 202.709)">
    <path id="Path_20376" data-name="Path 20376" d="M437.3,319.04c.623-2.008,3.474-2.051,4.617-.473.592,2.643-.008,5.379.385,8.034,2.243,2.4,4.69,4.6,6.937,7a2.487,2.487,0,0,1-3.52,3.513c-2.582-2.539-5.129-5.121-7.7-7.668-1.208-1.012-.816-2.709-.881-4.086a51.591,51.591,0,0,1,.162-6.318m1.52.423a68.1,68.1,0,0,0,.019,8.591c2.686,2.5,5.2,5.186,7.849,7.734.477.519,1.6.373,1.666-.435a7.706,7.706,0,0,0-1.931-2.347c-1.958-1.831-3.705-3.882-5.744-5.625-.1-2.524-.146-5.052,0-7.572C440.373,319.048,439.319,318.64,438.819,319.463Z" transform="translate(-437.117 -317.452)" fill="#246493"/>
  </g>
  <g id="_b7dbf3ff" data-name="#b7dbf3ff" transform="translate(292.347 204.267)">
    <path id="Path_20377" data-name="Path 20377" d="M441.336,321.955c.5-.823,1.554-.416,1.855.346-.142,2.52-.092,5.048,0,7.572,2.039,1.743,3.786,3.794,5.744,5.625a7.707,7.707,0,0,1,1.931,2.347c-.062.808-1.189.954-1.666.435-2.647-2.547-5.163-5.229-7.849-7.733A68.109,68.109,0,0,1,441.336,321.955Z" transform="translate(-441.209 -321.501)" fill="#b7dbf3"/>
  </g>
  <g id="_266494ff" data-name="#266494ff" transform="translate(227.546 208.501)">
    <path id="Path_20378" data-name="Path 20378" d="M276.809,332.759a5.567,5.567,0,1,1-3.951,6.144,5.585,5.585,0,0,1,3.951-6.144m1.162,1.535c-3.628-.146-4.832,5.4-1.8,7.064,2.385,1.916,6.383-.239,6.144-3.282A3.752,3.752,0,0,0,277.971,334.294Z" transform="translate(-272.787 -332.508)" fill="#266494"/>
  </g>
  <g id="_b8e1f5ff" data-name="#b8e1f5ff" transform="translate(270.75 210.53)">
    <path id="Path_20379" data-name="Path 20379" d="M385.09,341.312a4.028,4.028,0,0,1,2.139-3.532,35.279,35.279,0,0,0,.481,7.395C386.275,344.413,384.932,343.063,385.09,341.312Z" transform="translate(-385.077 -337.78)" fill="#b8e1f5"/>
  </g>
  <g id="_256392ff" data-name="#256392ff" transform="translate(227.542 221.157)">
    <path id="Path_20380" data-name="Path 20380" d="M277.266,365.535a5.567,5.567,0,1,1-4.359,4.355,5.564,5.564,0,0,1,4.359-4.355m-.081,1.674c-3.193.8-3.747,5.683-.846,7.2,2.432,1.654,6.156-.423,5.948-3.374A3.921,3.921,0,0,0,277.186,367.208Z" transform="translate(-272.774 -365.4)" fill="#256392"/>
  </g>
  <g id="_276392ff" data-name="#276392ff" transform="translate(241.413 221.161)">
    <path id="Path_20381" data-name="Path 20381" d="M313.118,365.583a5.558,5.558,0,1,1-4.29,5.437,5.608,5.608,0,0,1,4.29-5.437m.1,1.631a4.083,4.083,0,0,0-2.762,3.455,3.954,3.954,0,1,0,2.762-3.455Z" transform="translate(-308.827 -365.411)" fill="#276392"/>
  </g>
  <g id="_276492ff" data-name="#276492ff" transform="translate(255.266 221.16)">
    <path id="Path_20382" data-name="Path 20382" d="M348.159,365.9a5.574,5.574,0,1,1-3.182,6.295,5.583,5.583,0,0,1,3.182-6.295m1.077,1.324a3.964,3.964,0,0,0-.289,7.468,3.959,3.959,0,1,0,.289-7.468Z" transform="translate(-344.832 -365.409)" fill="#276492"/>
  </g>
  <g id="_dcdee6ff" data-name="#dcdee6ff" transform="translate(292.901 225.762)">
    <path id="Path_20383" data-name="Path 20383" d="M442.662,384.838a20.7,20.7,0,0,0,16.221-7.468c.027.239.081.712.108.95a20.066,20.066,0,0,1-16.34,8.238C442.654,385.985,442.658,385.407,442.662,384.838Z" transform="translate(-442.65 -377.37)" fill="#dcdee6"/>
  </g>
  <g id="_e0dee7ff" data-name="#e0dee7ff" transform="translate(279.489 228.398)">
    <path id="Path_20384" data-name="Path 20384" d="M408.359,384.22a21.06,21.06,0,0,0,11.235,4.755c.012.558.027,1.112.05,1.67a21.154,21.154,0,0,1-7.66-2.5c-1.408-.87-2.739-1.854-4.194-2.643C407.975,385.066,408.167,384.643,408.359,384.22Z" transform="translate(-407.79 -384.22)" fill="#e0dee7"/>
  </g>
  <g id="_e8e8e7ff" data-name="#e8e8e7ff" transform="translate(270.153 242.795)">
    <path id="Path_20385" data-name="Path 20385" d="M383.549,421.729c.623-.031,1.25-.058,1.878-.089a29.9,29.9,0,0,0-.235,4.979c-.554.038-1.1.077-1.651.119C383.518,425.068,383.515,423.394,383.549,421.729Z" transform="translate(-383.524 -421.64)" fill="#e8e8e7"/>
  </g>
  <g id="_e5e8efff" data-name="#e5e8efff" transform="translate(273.529 242.862)">
    <path id="Path_20386" data-name="Path 20386" d="M392.3,421.832c3.617-.031,7.233-.015,10.85,0a6.456,6.456,0,0,1-6.325,4.852c-1.5.027-3,0-4.5.1C392.331,425.129,392.331,423.478,392.3,421.832Z" transform="translate(-392.3 -421.814)" fill="#e5e8ef"/>
  </g>
  <g id="_256594ff" data-name="#256594ff" transform="translate(227.119 261.894)">
    <path id="Path_20387" data-name="Path 20387" d="M275.074,471.4c3.386-.242,6.791-.019,10.184-.112a4.843,4.843,0,0,1,3.682,1.231,4.436,4.436,0,0,1-.154,6.387c-1.131,1.108-2.8,1.135-4.286,1.166-2.7-.015-5.4,0-8.1,0a4.581,4.581,0,0,1-4.44-2.863,4.418,4.418,0,0,1,3.113-5.806m-.146,1.766a2.675,2.675,0,0,0-1.539,2.208,2.64,2.64,0,0,0,2.674,2.97q4.969.046,9.942,0a2.675,2.675,0,0,0,2.447-3.444,2.569,2.569,0,0,0-2.374-1.928c-3.1-.062-6.194,0-9.292-.031A4.789,4.789,0,0,0,274.928,473.169Z" transform="translate(-271.675 -471.28)" fill="#256594"/>
  </g>
</g>
</svg>
`;
const calender=`<svg xmlns="http://www.w3.org/2000/svg" width="12.33" height="12.275" viewBox="0 0 12.33 12.275">
<g id="Group_10006" data-name="Group 10006" transform="translate(-29.234 -142.572)">
  <rect id="Rectangle_7218" data-name="Rectangle 7218" width="12.063" height="10.301" rx="4" transform="translate(29.331 144.062)" fill="#666"/>
  <path id="Path_19748" data-name="Path 19748" d="M9.83,6.959A.43.43,0,0,1,10.621,7a5.666,5.666,0,0,1,.022.813q1.825,0,3.651,0A5.728,5.728,0,0,1,14.316,7a.428.428,0,0,1,.8-.031,5.053,5.053,0,0,1,.026.837c.506.012,1.011-.023,1.516.019a2.13,2.13,0,0,1,1.837,1.757,15.465,15.465,0,0,1,.018,2.108c0,1.683.007,3.367,0,5.051a2.116,2.116,0,0,1-2.138,2.044q-3.9,0-7.8,0a2.131,2.131,0,0,1-2.141-2.24c0-1.583,0-3.167,0-4.751,0-.708-.067-1.418,0-2.125A2.117,2.117,0,0,1,7.77,7.959,6.368,6.368,0,0,1,9.8,7.809a4.675,4.675,0,0,1,.029-.85M7.643,9.077c-.431.406-.35,1.031-.347,1.565H17.641c0-.535.081-1.161-.349-1.566-.558-.586-1.44-.314-2.154-.377a3.157,3.157,0,0,1-.05.87.423.423,0,0,1-.763-.031,4.286,4.286,0,0,1-.032-.839q-1.825,0-3.651,0a4.216,4.216,0,0,1-.033.84.426.426,0,0,1-.764.033A3.313,3.313,0,0,1,9.8,8.7c-.714.064-1.6-.21-2.156.378m1.272,3.7a.56.56,0,1,0,.718.7.564.564,0,0,0-.718-.7m2.214.013a.561.561,0,1,0,.774.585.565.565,0,0,0-.774-.585m2.223.009a.561.561,0,1,0,.8.472.566.566,0,0,0-.8-.472m2.3-.021a.56.56,0,1,0,.719.7.563.563,0,0,0-.719-.7M8.937,15.022a.56.56,0,1,0,.7.681.564.564,0,0,0-.7-.681m6.741,0a.56.56,0,1,0,.7.677.563.563,0,0,0-.7-.677m-4.641.07a.56.56,0,1,0,.864.4.564.564,0,0,0-.864-.4m2.292-.027a.56.56,0,1,0,.82.429A.564.564,0,0,0,13.329,15.065Z" transform="translate(22.93 135.957)" fill="#fff" stroke="#707070" stroke-width="0.2"/>
</g>
</svg>
`
const styles = StyleSheet.create({
  box: {
    width: 150,
    borderWidth: 1,
    borderColor: "#F1EFEF",
    height: 45,
    marginHorizontal: 10,
    borderRadius: 5,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    fontFamily:"Poppins-Medium",
    fontSize:14,
    marginHorizontal:10
  }
});
