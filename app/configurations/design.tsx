import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  BASE_PRICE,
  COLORS,
  FINISH,
  getColors,
  MATERIAL,
  MODELS,
} from "@/constants/CaseOptions";
import CustomButton from "@/components/CustomButton";
import { formatPrice } from "../lib";
import SelectBottomSheet from "@/components/SelectBottomSheet";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ChevronsUpDown } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation } from "@apollo/client";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
  UpdateConfigurationDocument,
} from "../__generated__/graphql";
import useToastMessage from "../hooks/useToastMessage";

type FormValues = {
  color?: CaseColor;
  material?: CaseMaterial;
  finish?: CaseFinish;
  model?: PhoneModel;
};

function DesignScreen() {
  const { configId } = useLocalSearchParams<{ configId?: string }>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { showToast } = useToastMessage();
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      color: undefined,
      material: undefined,
      finish: undefined,
      model: MODELS.options[0].value,
    },
  });

  const [updateConfiguration, { loading }] = useMutation(
    UpdateConfigurationDocument
  );

  const onSubmit = (data: FormValues) => {
    try {
      if (!configId) {
        return;
      }
      if (!data.color || !data.material || !data.finish || !data.model) {
        return;
      }
      updateConfiguration({
        variables: {
          input: {
            id: configId,
            phoneModel: data.model,
            caseColor: data.color,
            caseMaterial: data.material,
            caseFinish: data.finish,
          },
        },
        onCompleted: (data) => {
          if (!data?.updateConfiguration?.id) {
            showToast({
              title: "Error",
              desc: "There was an error saving your configuration.",
              type: "error",
            });
            return;
          }
          showToast({
            title: "Success",
            desc: "Updated configuration",
            type: "success",
          });
          router.push(`/configurations/review?configId=${configId}`);
        },
      });
    } catch (error) {}
  };

  return (
    <>
      <SafeAreaView className="h-full bg-dark">
        <ScrollView>
          <View className="px-6 py-8">
            <Text className="text-white font-psemibold text-2xl text-center mb-8">
              Customize your case
            </Text>

            <View>
              <Text className="text-white font-pregular text-base mt-2">
                Choose the color of your case:
              </Text>

              <View className="flex flex-row mt-4 justify-around">
                <Controller
                  name="color"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      {COLORS.map((color) => (
                        <TouchableOpacity
                          key={color.value}
                          onPress={() => {
                            onChange(color.value);
                          }}
                        >
                          <View
                            key={color.value}
                            className={`w-20 h-10 border-[2px] rounded-lg mr-2 flex justify-center items-center`}
                            style={{
                              borderColor:
                                value === color.value
                                  ? getColors(color.tw).color
                                  : getColors(color.tw).background,
                              backgroundColor:
                                value !== color.value
                                  ? "#161622"
                                  : getColors(color.tw).background,
                            }}
                          >
                            <Text className="text-white text-center font-pregular">
                              {color.label}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                />
              </View>
            </View>

            <View>
              <Text className="text-white font-pregular text-base mt-4">
                Choose the model of your phone:
              </Text>

              <TouchableOpacity
                className="mt-4"
                onPress={() => {
                  bottomSheetModalRef.current?.present();
                }}
              >
                <View
                  className={` bg-dark border-[2px] border-gray-300/30 rounded-lg mr-2 flex flex-row justify-between items-start w-full px-5 py-3`}
                >
                  <View className="flex flex-row space-x-4">
                    <Text className="text-white text-start text-base font-pbold">
                      {
                        MODELS.options.find(
                          (val) => val.value === watch("model")
                        )?.label
                      }
                    </Text>
                    <ChevronsUpDown color={"#ea580b"} />
                  </View>
                </View>
              </TouchableOpacity>

              <Controller
                name="model"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectBottomSheet
                    bottomSheetModalRef={bottomSheetModalRef}
                    label="Models"
                    options={MODELS.options}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </View>

            <View>
              <Text className="text-white font-pregular text-base mt-8">
                Choose the material of your case:
              </Text>
              <View className="flex mt-4 justify-around space-y-4">
                <Controller
                  name="material"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      {MATERIAL.options.map((material) => (
                        <TouchableOpacity
                          key={material.value}
                          onPress={() => {
                            onChange(material.value);
                          }}
                        >
                          <View
                            className={` bg-dark border-[2px] ${
                              material.value === value
                                ? "border-primary"
                                : "border-gray-300/30"
                            } rounded-lg mr-2 flex flex-row justify-between items-start w-full px-5 py-3 my-2`}
                          >
                            <View>
                              <Text className="text-white text-start text-base font-pbold">
                                {material.label}
                              </Text>
                              {material.description && (
                                <Text className="text-white text-start text-sm font-pregular mt-1">
                                  {material.description}
                                </Text>
                              )}
                            </View>
                            <Text className="text-white text-center font-pregular">
                              {formatPrice(material.price)}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                />
              </View>
            </View>

            <View>
              <Text className="text-white font-pregular text-base mt-8">
                Choose the Finish of your case:
              </Text>
              <View className="flex mt-4 justify-around space-y-4">
                <Controller
                  name="finish"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      {FINISH.options.map((finish) => (
                        <TouchableOpacity
                          key={finish.value}
                          onPress={() => {
                            onChange(finish.value);
                          }}
                        >
                          <View
                            className={` bg-dark border-[2px] ${
                              finish.value === value
                                ? "border-primary"
                                : "border-gray-300/30"
                            } rounded-lg mr-2 flex flex-row justify-between items-start w-full px-5 py-3 my-2`}
                          >
                            <View>
                              <Text className="text-white text-start text-base font-pbold">
                                {finish.label}
                              </Text>
                              {finish.description && (
                                <Text className="text-white text-start text-sm font-pregular mt-1">
                                  {finish.description}
                                </Text>
                              )}
                            </View>
                            <Text className="text-white text-center font-pregular">
                              {formatPrice(finish.price)}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="px-6 shadow">
          <Text className="text-white font-psemibold text-xl text-start my-3">
            Total:{" "}
            {formatPrice(
              BASE_PRICE +
                (MATERIAL.options.find((val) => val.value === watch("material"))
                  ?.price ?? 0) +
                (FINISH.options.find((val) => val.value === watch("finish"))
                  ?.price ?? 0)
            )}
          </Text>
          <CustomButton
            title="Continue"
            disabled={loading}
            loading={loading}
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
          />
        </View>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
}

export default DesignScreen;
