import { openSettings } from "expo-linking";
import {
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

import { useImageUploader, useUploadThing } from "@/app/utils/uploadthing";
import { router } from "expo-router";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

export default function Home() {
  const [configId, setConfigId] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { openImagePicker, isUploading } = useImageUploader("videoAndImage", {
    onClientUploadComplete: ([data]) => {
      setConfigId(data?.serverData?.configId);
      setImageUrl(data?.url);
    },

    onUploadError: (error) => Alert.alert("Upload Error", error.message),
  });

  // const { startUpload } = useUploadThing("videoAndImage", {
  //   onClientUploadComplete: (data) => {
  //     console.log("🚀 ~ Home ~ data:", data);
  //   },
  //   onUploadError: (error) => Alert.alert("Upload Error", error.message),
  // });

  return (
    <SafeAreaView className="bg-dark h-full">
      <ScrollView>
        <Pressable
          // style={styles.button}
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
          <Text>Select Image</Text>
        </Pressable>

        <View>
          {imageUrl && (
            <Image
              source={{
                uri: imageUrl,
              }}
              style={{ width: 300, height: 300 }}
              resizeMode="cover"
            />
          )}
        </View>
      </ScrollView>
      <View className="px-6">
        <CustomButton
          title="Continue"
          disabled={!imageUrl || isUploading || !configId}
          onPress={() => {
            router.push(`/configurations/design?configId=${configId}`);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
