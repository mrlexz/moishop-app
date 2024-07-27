import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  BottomSheetMethods,
  BottomSheetModalMethods,
} from "@gorhom/bottom-sheet/lib/typescript/types";
import { Picker } from "@react-native-picker/picker";
import React, { useCallback, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SelectBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  value: string;
};

function SelectBottomSheet({
  bottomSheetModalRef,
  label,
  options = [],
  onChange,
  value,
}: SelectBottomSheetProps) {
  const [selectedValue, setSelectedValue] = React.useState(options[0]?.value);

  const onSelected = useCallback(() => {
    onChange(selectedValue);
    bottomSheetModalRef.current?.close();
  }, [selectedValue, bottomSheetModalRef, onChange]);

  return (
    <View className="flex p6">
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={["25%", "35%", "50%"]}
      >
        <BottomSheetView style={styles.bsViewContainer}>
          <View className="flex flex-row justify-between items-center">
            <TouchableOpacity
              onPress={() => {
                bottomSheetModalRef.current?.close();
              }}
            >
              <Text className="text-red-400 text-base font-pregular">
                Cancel
              </Text>
            </TouchableOpacity>
            <Text className="text-dark text-lg font-psemibold">{label}</Text>

            <TouchableOpacity onPress={onSelected}>
              <Text className="text-dark text-base font-pregular">Select</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue as string);
              }}
            >
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

export default SelectBottomSheet;

const styles = StyleSheet.create({
  bsViewContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
  },
});
