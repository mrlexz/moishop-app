import { useMutation, useQuery } from "@apollo/client";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import {
  CaseFinish,
  CaseMaterial,
  CreateAppPaymentDocument,
  GetConfigurationDocument,
} from "../__generated__/graphql";
import { BASE_PRICE, MODELS, PRODUCT_PRICES } from "@/constants/CaseOptions";
import { Check, DotIcon } from "lucide-react-native";
import { formatPrice } from "../lib";
import CustomButton from "@/components/CustomButton";
import PhoneCase from "@/components/Phone";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import useToastMessage from "../hooks/useToastMessage";

const highlights = [
  "Wireless charging compatible, so you can charge your phone",
  "Easy access to all ports and buttons",
  "Protects your phone from scratches and drops",
  "5 years print waranty",
];

const materials = [
  "Hight quality silicone material that is soft to the touch",
  "Scratch-resistant coating",
];

function ReviewScreen() {
  const { configId } = useLocalSearchParams<{ configId?: string }>();
  const { data, loading } = useQuery(GetConfigurationDocument, {
    variables: {
      configurationId: configId as string,
    },
    fetchPolicy: "network-only",
  });

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const { showToast } = useToastMessage();

  const [createPaymentIntent, { loading: paymentIntentLoading }] = useMutation(
    CreateAppPaymentDocument
  );

  const totalPrice = useMemo(() => {
    let price = BASE_PRICE;
    if (data?.configuration?.caseFinish === CaseFinish.Textured) {
      price += PRODUCT_PRICES.finish.textured;
    }
    if (data?.configuration?.caseMaterial === CaseMaterial.Polycarbonate) {
      price += PRODUCT_PRICES.material.polycarbonate;
    }
    return price;
  }, [data]);

  const handlePayment = async () => {
    const paymentIntent = await createPaymentIntent({
      variables: {
        input: {
          amount: totalPrice,
          configurationId: configId!,
        },
      },
      fetchPolicy: "network-only",
    });

    console.log("🚀 ~ handlePayment ~ paymentIntent:", paymentIntent);
    if (!paymentIntent?.data?.createAppPayment?.paymentIntent) {
      showToast({
        desc: "Error from response create payment intent",
        title: "Something went wrong",
        type: "error",
      });
      return;
    }

    const initPaymentResponse = await initPaymentSheet({
      merchantDisplayName: "Custom Case With MoiShop",
      paymentIntentClientSecret:
        paymentIntent.data.createAppPayment.paymentIntent,
    });

    if (initPaymentResponse.error) {
      showToast({
        desc: "Error initializing payment sheet",
        title: "Something went wrong",
        type: "error",
      });
      console.error(
        "Error initializing payment sheet",
        initPaymentResponse.error
      );
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      if (paymentResponse.error.code !== PaymentSheetError.Canceled) {
        showToast({
          desc: "Error processing payment",
          title: "Something went wrong",
          type: "error",
        });
        console.error("Error processing payment", paymentResponse.error);
      }
      return;
    }

    router.push(
      `/configurations/thankyou?orderId=${paymentIntent.data?.createAppPayment?.orderId}`
    );

    // Handle the result of the payment
  };

  return (
    <SafeAreaView className="h-full bg-dark">
      <ScrollView>
        <View className="px-6 my-8">
          <View className="flex justify-center items-center p-4 border-dashed border border-primary rounded-xl bg-[#1E1E2D]">
            <View className=" h-[500px] w-[245px]">
              <PhoneCase imageUrl={data?.configuration?.imgUrl} />
            </View>
          </View>
          <Text className="text-white font-pextrabold text-3xl mt-8">
            Your{" "}
            {
              MODELS.options.find(
                (model) => model.value === data?.configuration?.phoneModel
              )?.label
            }{" "}
            Case
          </Text>
          <View className="flex flex-row items-center mt-2">
            <Check className="w-6 h-6 text-primary mr-2" />
            <Text className="text-white font-pregular text-base items-center">
              In stock and ready to ship
            </Text>
          </View>
          <View>
            <Text className="text-white font-pbold text-xl mt-4">
              Highlights:
            </Text>
            <View className="flex-wrap">
              {highlights.map((highlight, index) => (
                <View key={index} className="flex flex-row items-center mt-2">
                  <DotIcon className="w-6 h-6 text-primary mr-1" />
                  <Text className="text-white font-pregular text-sm flex-wrap flex-1">
                    {highlight}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View>
            <Text className="text-white font-pbold text-xl mt-4">
              Materials:
            </Text>
            <View className="flex-wrap">
              {materials.map((highlight, index) => (
                <View key={index} className="flex flex-row items-center mt-2">
                  <DotIcon className="w-6 h-6 text-primary mr-1" />
                  <Text className="text-white font-pregular text-sm flex-wrap flex-1">
                    {highlight}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View className="bg-[#1E1E2D] w-full p-6 rounded-xl mt-8 space-y-2">
            <View className="flex justify-between flex-row">
              <Text className="text-white font-pregular text-base">
                Base price
              </Text>
              <Text className="text-white font-pregular text-base">
                {formatPrice(BASE_PRICE)}
              </Text>
            </View>
            {data?.configuration?.caseMaterial ===
              CaseMaterial.Polycarbonate && (
              <View className="flex justify-between flex-row">
                <Text className="text-white font-pregular text-base">
                  Soft polycarbonate material
                </Text>
                <Text className="text-white font-pregular text-base">
                  {formatPrice(PRODUCT_PRICES.material.polycarbonate)}
                </Text>
              </View>
            )}
            {data?.configuration?.caseFinish === CaseFinish.Textured && (
              <View className="flex justify-between flex-row">
                <Text className="text-white font-pregular text-base">
                  Textured finish
                </Text>
                <Text className="text-white font-pregular text-base">
                  {formatPrice(PRODUCT_PRICES.finish.textured)}
                </Text>
              </View>
            )}
            <View className="flex justify-between flex-row">
              <Text className="text-primary font-pextrabold text-xl">
                Total price
              </Text>
              <Text className="text-primary font-pextrabold text-xl">
                {formatPrice(totalPrice)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="px-6 shadow">
        <CustomButton
          title="Checkout"
          disabled={loading}
          loading={loading}
          onPress={handlePayment}
        />
      </View>
    </SafeAreaView>
  );
}

export default ReviewScreen;
