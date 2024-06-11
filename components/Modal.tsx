import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
  } from "react-native";
  import React, { useEffect, useMemo, useRef, useState } from "react";
  import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import { router, useRouter } from "expo-router";
  import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
  import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
  import { BlurView } from "expo-blur";

  
const Modal = ({ bottomSheetRef, isSheetOpen, setIsSheetOpen }: any) => {
    const snapPoints = useMemo(() => ["50%", "60%"], []);
  
    const closeBottomSheet = () => {
      setIsSheetOpen(false);
      bottomSheetRef.current?.close();
    };
  
    useEffect(() => {
      closeBottomSheet();
    }, []);
  
    const screenHeight = Dimensions.get("window").height;
    const calculatedIconSize = screenHeight * (6 / 100);
    return (
      <>
        {isSheetOpen && (
          <>
            <BlurView
              intensity={10}
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(0,50,150,0.5)",
              }}
            />
            <BottomSheet
              ref={bottomSheetRef}
              // onClose={() => setIsSheetOpen(false)}
              snapPoints={snapPoints}
              index={0}
              style={{ zIndex: 20, elevation: 20 }}
              handleStyle={{
                display: "none",
              }}
            >
              <View className="flex-1">
                <View className="w-full h-[40%] bg-[#0C192F] rounded-t-xl items-center">
                  <View className="mt-[4%] items-center">
                    <Ionicons
                      name="checkmark-done-sharp"
                      size={calculatedIconSize}
                      color="white"
                    />
                    <View className="w-[70%] mt-[4%]">
                      <Text className="text-white text-xl text-center">
                        Nous avons bien reçu votre commande
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex-1 py-4 px-6 ">
                  <Text className="text-lg">Commande N°</Text>
                  <Text className="text-2xl font-semibold">234/77494</Text>
                  <View className="items-center">
                    <TouchableOpacity
                      onPress={closeBottomSheet}
                      className="w-[90%] mt-[7%] bg-[#0C192F] flex-row justify-center p-3 
                  rounded-full space-x-4 items-center"
                    >
                      <Text className="text-white text-center text-lg">
                        Nouvelle commande ?
                      </Text>
                      <SimpleLineIcons name="refresh" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        router.back();
                      }}
                      className="w-[90%] mt-[4%] border border-[#0C192F] flex-row p-[10px] 
                rounded-full space-x-4 items-center justify-center"
                    >
                      <Text className="text-[#0C192F] text-center text-lg">
                        Accéder à l’accueil
                      </Text>
                      <MaterialCommunityIcons
                        name="home"
                        size={26}
                        color="#0C192F"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </BottomSheet>
          </>
        )}
      </>
    );
  };

  export default Modal;