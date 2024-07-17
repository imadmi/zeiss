import { useAppContext } from "@/context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

type Product = {
  product_id: number;
  product_name: string;
  description: string;
  pic: string;
  is_ordrable: boolean;
  product_pics: {
    pic_id: number;
    pic_path: string;
    product_id: number;
    main: number;
  }[];
};

const Products = () => {
  const context = useAppContext();
  const [data, setData] = useState<Product>();
  const screenDimensions = Dimensions.get("window");
  useEffect(() => {
    const getProducts = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${context.accessToken}`,
        };

        const result = await fetch(
          `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/products`,
          {
            method: "GET",
            headers,
          }
        );

        const res = await result.json();
        if (res.data) {
          const products = res.data;

          // Fetch images for each product
          const productImagePromises = products.map(async (product: any) => {
            const imageResponse = await fetch(
              `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/product/images/${product.pic}`,
              {
                method: "GET",
                headers,
              }
            );

            if (imageResponse.ok) {
              const blob = await imageResponse.blob();
              const reader = new FileReader();

              return new Promise((resolve, reject) => {
                reader.onload = () => {
                  product.pic = reader.result;
                  resolve(product);
                };
                reader.onerror = () =>
                  reject("Failed to read blob as data URL.");
                reader.readAsDataURL(blob);
              });
            } else {
              console.error("Failed to fetch product image.");
              return product;
            }
          });

          const updatedProducts = await Promise.all(productImagePromises);
          // console.log(JSON.stringify(updatedProducts, null, 2));//

          setData(updatedProducts as any);
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error: any) {
        if (error.message) console.error(`Error: ${error.message}`);
      }
    };

    if (context.accessToken) {
      getProducts();
    }
  }, [context.accessToken]);

  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const getBanners = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${context.accessToken}`,
        };
        const bannersPromise = await fetch(
          `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/banners`,
          {
            method: "GET",
            headers,
          }
        );
        if (bannersPromise.ok) {
          const banners = await bannersPromise.json();
          const bannerPromises = banners.map(async (banner: any) => {
            const response = await fetch(
              `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/banner/${banner.pic_path}`,
              {
                method: "GET",
                headers,
              }
            );

            if (response.ok) {
              const blob = await response.blob();
              const reader = new FileReader();

              return new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = () =>
                  reject("Failed to read blob as data URL.");
                reader.readAsDataURL(blob);
              });
            } else {
              console.log("Failed to fetch banner image.");
            }
          });

          const urls = await Promise.all(bannerPromises);
          setUrls(urls as any);
        }
      } catch (error: any) {
        if (error.message) console.log(error.message.split(".")[0]);
      }
    };
    if (context.accessToken) {
      getBanners();
    }
  }, [context.accessToken]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [bannerIndex, setbannerIndex] = useState(0);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const bannerRef = React.useRef<ScrollView>(null);

  useEffect(() => {
    try {
      const fetchImages = async () => {
        if (selectedProduct) {
          const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${context.accessToken}`,
          };
          const promises = selectedProduct.product_pics.map(async (item) => {
            const response = await fetch(
              `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/product/images/${item.pic_path}`,
              {
                method: "GET",
                headers,
              }
            );
            if (response.ok) {
              const blob = await response.blob();
              const reader = new FileReader();
              return new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = () =>
                  reject("Failed to read blob as data URL.");
                reader.readAsDataURL(blob);
                return reader.result;
              });
            } else {
              console.error("Failed to fetch product image.");
            }
          });
          const productPics = await Promise.all(promises);
          if (productPics.length === selectedProduct.product_pics.length) {
            setSelectedProduct({
              ...selectedProduct,
              product_pics: selectedProduct.product_pics.map((pic, index) => ({
                ...pic,
                pic_path: productPics[index] as string,
              })),
            });
          }
        }
      };

      if (context.accessToken && modalVisible === true) fetchImages();
    } catch (error: any) {
      if (error.message) console.log(error.message.split(".")[0]);
    }
  }, [context.accessToken, modalVisible]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedProduct(item);
        setModalVisible(true);
        setCurrentPhotoIndex(0);
      }}
      className="w-[46%] h-64 bg-gray-200 rounded-xl m-2 mb-2"
    >
      <Image
        source={{ uri: item.pic }}
        // source={{
        //   uri: "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        // }}
        contentFit="cover"
        className="w-full h-44 rounded-t-lg"
      />
      <Text className="font-bold px-2 mt-2 ">{item.product_name}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" className="mt-1 px-2">
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const scrollToIndex = (index: number) => {
    setCurrentPhotoIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * screenDimensions.width,
      animated: true,
    });
  };

  const scrollToBannerIndex = (index: number) => {
    setCurrentPhotoIndex(index);
    bannerRef.current?.scrollTo({
      x: index * screenDimensions.width,
      animated: true,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setbannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % urls.length;
        if (bannerRef.current) {
          bannerRef.current.scrollTo({
            x: nextIndex * screenDimensions.width,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [urls]);

  return (
    <View className="">
      <StatusBar hidden={false} barStyle="light-content" />
      <View
        className="h-28 items-center justify-end"
        style={{ backgroundColor: "rgba(12, 25, 47, 1)" }}
      >
        <Text className="text-white font-semibold text-2xl pb-4">Products</Text>
      </View>
      <View style={{ width: screenDimensions.width, height: 220 }}>
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const contentOffsetX = e.nativeEvent.contentOffset.x;
            const index = Math.round(contentOffsetX / screenDimensions.width);
            setbannerIndex(index);
          }}
          scrollEventThrottle={16}
        >
          {urls.length > 0 ? (
            urls.map((url, index) => (
              <View
                key={index}
                style={{ width: screenDimensions.width, height: 220 }}
              >
                <Image
                  key={index}
                  source={{ uri: url }}
                  contentFit="fill"
                  style={{ width: screenDimensions.width, height: 220 }}
                />
              </View>
            ))
          ) : (
            <View
              style={{ width: screenDimensions.width, height: 220 }}
              className="items-center justify-center"
            >
              <LottieView
                autoPlay
                style={{
                  width: 60,
                  height: 40,
                }}
                source={require("../../assets/icons/loadingC.json")}
              />
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          onPress={() => scrollToBannerIndex(bannerIndex - 1)}
          disabled={bannerIndex === 0}
          className="absolute left-0 top-0 bottom-0 justify-center items-center w-10 bg-opacity-30"
        >
          <Ionicons name="chevron-back-outline" size={30} color="#D3D3D3" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => scrollToBannerIndex(bannerIndex + 1)}
          disabled={bannerIndex === urls.length - 1}
          className="absolute right-0 top-0 bottom-0 justify-center items-center w-10 bg-opacity-30"
        >
          <Ionicons name="chevron-forward-outline" size={30} color="#D3D3D3" />
        </TouchableOpacity>
      </View>

      <View className="items-center justify-center w-full h-[90%] pb-20">
        <FlatList
          data={data}
          // data={product}
          renderItem={renderItem}
          keyExtractor={(item) => item.product_id.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 2 }}
          style={{ margin: 10 }}
        />
      </View>
      {selectedProduct && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <ScrollView>
            <View className="flex-1 w-full min-h-screen items-center bg-white">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="absolute top-14 right-8 z-10"
              >
                <Ionicons
                  name="close-circle-outline"
                  size={35}
                  color="rgba(12, 25, 47, 1)"
                />
              </TouchableOpacity>
              <View className="w-full h-[45vh] top-0 flex-row ">
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={(e) => {
                    const contentOffsetX = e.nativeEvent.contentOffset.x;
                    const index = Math.round(
                      contentOffsetX / screenDimensions.width
                    );
                    setCurrentPhotoIndex(index);
                  }}
                  scrollEventThrottle={16}
                >
                  {selectedProduct.product_pics.map((pic) => (
                    <View
                      key={pic.pic_id}
                      style={{
                        width: screenDimensions.width,
                        height: screenDimensions.height * 0.45,
                      }}
                    >
                        <Image
                          key={pic.pic_id}
                          source={{
                            uri: pic.pic_path,
                          }}
                          // source={{
                          //   uri: "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
                          // }}
                          contentFit="contain"
                          className="w-full h-full"
                        />
                    </View>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  onPress={() => scrollToIndex(currentPhotoIndex - 1)}
                  disabled={currentPhotoIndex === 0}
                  className="absolute left-0 top-0 bottom-0 justify-center items-center w-10 bg-opacity-30"
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    color="gray"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => scrollToIndex(currentPhotoIndex + 1)}
                  disabled={
                    currentPhotoIndex ===
                    selectedProduct.product_pics.length - 1
                  }
                  className="absolute right-0 top-0 bottom-0 justify-center items-center w-10 bg-opacity-30"
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={30}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <View className="w-[90%] shadow-stone-500 shadow-inner">
                <Text className="font-bold text-xl mb-2">
                  {selectedProduct.product_name}
                </Text>
                <Text className="text-base mb-9">
                  {selectedProduct.description}
                </Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};

export default Products;
