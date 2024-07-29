import { openSettings } from "expo-linking";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";
import { useImageUploader, useUploadThing } from "@/app/utils/uploadthing";
import { router } from "expo-router";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { UploadIcon } from "lucide-react-native";
import FastImage from "react-native-fast-image";

export default function Home() {
  const [configId, setConfigId] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isLoadingImg, setLoadingImg] = useState(true);

  const [progress, setProgress] = useState(0);

  const { openImagePicker, isUploading } = useImageUploader("videoAndImage", {
    onClientUploadComplete: ([data]) => {
      setConfigId(data?.serverData?.configId);
      setImageUrl(data?.url);
    },
    onUploadError: (error) => Alert.alert("Upload Error", error.message),
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });

  function onLoadStart() {
    setLoadingImg(true);
  }

  function onLoadEnd() {
    setLoadingImg(false);
  }

  // const { startUpload } = useUploadThing("videoAndImage", {
  //   onClientUploadComplete: (data) => {
  //     console.log("🚀 ~ Home ~ data:", data);
  //   },
  //   onUploadError: (error) => Alert.alert("Upload Error", error.message),
  // });

  return (
    <SafeAreaView className="bg-dark h-full">
      <ScrollView>
        <View className="px-6">
          <View className="bg-[#1E1E2D] w-full py-6 rounded-xl flex justify-center items-center">
            <Pressable
              disabled={isUploading}
              onPress={async () => {
                try {
                  const { status } =
                    await ImagePicker.requestCameraPermissionsAsync();

                  if (status !== ImagePicker.PermissionStatus.GRANTED) {
                    return;
                  }

                  openImagePicker({
                    input: {
                      configId: undefined,
                    }, // Matches the input schema from the FileRouter endpoint
                    source: "library", // or "camera"
                    onInsufficientPermissions: () => {
                      Alert.alert(
                        "No Permissions",
                        "You need to grant permission to your Photos to use this",
                        [
                          { text: "Dismiss" },
                          { text: "Open Settings", onPress: openSettings },
                        ]
                      );
                    },
                  });

                  // let result = await ImagePicker.launchImageLibraryAsync({
                  //   mediaTypes: ImagePicker.MediaTypeOptions.All,
                  //   allowsEditing: false,
                  //   aspect: [4, 3],
                  // });

                  // if (result?.assets?.[0]?.uri) {
                  //   const fileContent = await FileSystem.readAsStringAsync(
                  //     result?.assets?.[0]?.uri,
                  //     {
                  //       encoding: FileSystem.EncodingType.Base64,
                  //     }
                  //   );

                  //   // Convert the base64 string to a Blob
                  //   const blob = new Blob([fileContent], { type: "image/jpeg" }); // Change the MIME type as needed

                  //   // Create a File object
                  //   const file = new File([blob], "filename.jpg", {
                  //     type: "image/jpeg",
                  //   });

                  //   startUpload([file], {
                  //     configId: undefined,
                  //   });

                  // Read the file content as a base64 string
                } catch (error) {
                  console.error("Error reading file:", error);
                }
              }}
            >
              <View
                className={`px-4 py-2 border border-dashed border-primary rounded-xl flex items-center ${
                  isUploading ? "opacity-50" : ""
                }`}
              >
                {isUploading ? (
                  <ActivityIndicator color="#ea580b"></ActivityIndicator>
                ) : (
                  <UploadIcon color="#ea580b" />
                )}
                <Text className="text-primary text-base font-psemibold">
                  Upload Image
                </Text>
              </View>
            </Pressable>
            <View className="mt-4">
              {isUploading ? (
                <Progress.Bar
                  width={250}
                  color="#ea580b"
                  indeterminate={isUploading}
                />
              ) : null}
            </View>
          </View>
        </View>

        <View className="px-6 w-full mt-8 justify-start items-center rounded-xl overflow-hidden relative">
          {imageUrl && (
            <>
              <FastImage
                fallback={true}
                onLoadEnd={onLoadEnd}
                onLoadStart={onLoadStart}
                style={{
                  width: 300,
                  height: 400,
                  borderRadius: 14,
                  opacity: isLoadingImg ? 0.3 : 1,
                }}
                source={{
                  uri: imageUrl,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
              {isLoadingImg && (
                <View className="absolute top-0 left-6 w-full h-full rounded-xl items-center justify-center">
                  <ActivityIndicator color="#ea580b" size={"large"} />
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
      <View className="px-6">
        <CustomButton
          title="Continue"
          disabled={!imageUrl || isUploading || !configId || isLoadingImg}
          onPress={() => {
            router.push(`/configurations/design?configId=${configId}`);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
