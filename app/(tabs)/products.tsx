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
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

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

const product: Product[] = [
  {
    product_id: 253,
    product_name: "ZIESS1",
    description:
      "Luiorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas fermentum turpis, in finibus tellus aliquet eget. Vivamus vitae semper risus. Suspendisse porttitor sapien a lacinia ultrices. Quisque semper justo in augue viverra, ac congue felis bibendum. Maecenas porta molestie diam vel rhoncus. Aenean mollis non nisl quis sagittis. Maecenas quis risus egestas elit suscipit accumsan. Quisque eget mauris augue. Maecenas non erat egestas, sagittis lectus lacinia, lacinia nisl. Nam tempus mi cursus, interdum nisi eu, malesuada neque.\r\n\r\nVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse sed metus condimentum, interdum libero vel, mollis elit. Cras ut tincidunt massa. Integer id tellus ut diam scelerisque placerat. Vivamus varius sem vitae lectus pulvinar, quis placerat orci consectetur. Ut eget elit diam. In venenatis sapien faucibus mi tincidunt, vel vulputate ex porta. Nunc in posuere nibh. Vestibulum ullamcorper fringilla felis et placerat.",
    pic: "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
    is_ordrable: false,
    product_pics: [
      {
        pic_id: 20,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 253,
        main: 1,
      },
    ],
  },
  {
    product_id: 254,
    product_name: "Test",
    description:
      "Suspendisse pulvinar venenatis sem vel maximus. Vivamus quis odio et tellus aliquam vestibulum. Etiam id nulla id magna mollis mattis vel non libero. Pellentesque posuere efficitur massa, sit amet facilisis ex accumsan nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed egestas est quis dolor facilisis posuere. Vivamus vehicula dui non tortor tristique tristique. Donec ut sagittis mauris. Pellentesque tincidunt turpis vitae ipsum vestibulum condimentum. Phasellus faucibus felis ut nulla rutrum, vitae fermentum magna iaculis. Mauris risus metus, placerat sollicitudin massa non, faucibus auctor massa. Donec mauris quam, lobortis sed odio ut, eleifend tincidunt neque. Vestibulum quis tincidunt nulla. Vivamus a risus mi. Donec felis ante, euismod at diam ac, ultricies pulvinar magna.",
    pic: "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
    is_ordrable: false,
    product_pics: [
      {
        pic_id: 21,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 1,
      },
      {
        pic_id: 22,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 0,
      },
    ],
  },
  {
    product_id: 224,
    product_name: "Test1",
    description:
      "Suspendisse pulvinar venenatis sem vel maximus. Vivamus quis odio et tellus aliquam vestibulum. Etiam id nulla id magna mollis mattis vel non libero. Pellentesque posuere efficitur massa, sit amet facilisis ex accumsan nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed egestas est quis dolor facilisis posuere. Vivamus vehicula dui non tortor tristique tristique. Donec ut sagittis mauris. Pellentesque tincidunt turpis vitae ipsum vestibulum condimentum. Phasellus faucibus felis ut nulla rutrum, vitae fermentum magna iaculis. Mauris risus metus, placerat sollicitudin massa non, faucibus auctor massa. Donec mauris quam, lobortis sed odio ut, eleifend tincidunt neque. Vestibulum quis tincidunt nulla. Vivamus a risus mi. Donec felis ante, euismod at diam ac, ultricies pulvinar magna.",
    pic: "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
    is_ordrable: false,
    product_pics: [
      {
        pic_id: 21,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 1,
      },
      {
        pic_id: 22,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 0,
      },
    ],
  },
  {
    product_id: 255,
    product_name: "Test2",
    description:
      "Suspendisse pulvinar venenatis sem vel maximus. Vivamus quis odio et tellus aliquam vestibulum. Etiam id nulla id magna mollis mattis vel non libero. Pellentesque posuere efficitur massa, sit amet facilisis ex accumsan nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed egestas est quis dolor facilisis posuere. Vivamus vehicula dui non tortor tristique tristique. Donec ut sagittis mauris. Pellentesque tincidunt turpis vitae ipsum vestibulum condimentum. Phasellus faucibus felis ut nulla rutrum, vitae fermentum magna iaculis. Mauris risus metus, placerat sollicitudin massa non, faucibus auctor massa. Donec mauris quam, lobortis sed odio ut, eleifend tincidunt neque. Vestibulum quis tincidunt nulla. Vivamus a risus mi. Donec felis ante, euismod at diam ac, ultricies pulvinar magna.",
    pic: "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
    is_ordrable: false,
    product_pics: [
      {
        pic_id: 21,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 1,
      },
      {
        pic_id: 22,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 0,
      },
    ],
  },
  {
    product_id: 22215,
    product_name: "Test3",
    description:
      "Suspendisse pulvinar venenatis sem vel maximus. Vivamus quis odio et tellus aliquam vestibulum. Etiam id nulla id magna mollis mattis vel non libero. Pellentesque posuere efficitur massa, sit amet facilisis ex accumsan nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed egestas est quis dolor facilisis posuere. Vivamus vehicula dui non tortor tristique tristique. Donec ut sagittis mauris. Pellentesque tincidunt turpis vitae ipsum vestibulum condimentum. Phasellus faucibus felis ut nulla rutrum, vitae fermentum magna iaculis. Mauris risus metus, placerat sollicitudin massa non, faucibus auctor massa. Donec mauris quam, lobortis sed odio ut, eleifend tincidunt neque. Vestibulum quis tincidunt nulla. Vivamus a risus mi. Donec felis ante, euismod at diam ac, ultricies pulvinar magna.",
    pic: "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
    is_ordrable: false,
    product_pics: [
      {
        pic_id: 21,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 1,
      },
      {
        pic_id: 22,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 0,
      },
    ],
  },
  {
    product_id: 23155,
    product_name: "Test4",
    description:
      "Suspendisse pulvinar venenatis sem vel maximus. Vivamus quis odio et tellus aliquam vestibulum. Etiam id nulla id magna mollis mattis vel non libero. Pellentesque posuere efficitur massa, sit amet facilisis ex accumsan nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed egestas est quis dolor facilisis posuere. Vivamus vehicula dui non tortor tristique tristique. Donec ut sagittis mauris. Pellentesque tincidunt turpis vitae ipsum vestibulum condimentum. Phasellus faucibus felis ut nulla rutrum, vitae fermentum magna iaculis. Mauris risus metus, placerat sollicitudin massa non, faucibus auctor massa. Donec mauris quam, lobortis sed odio ut, eleifend tincidunt neque. Vestibulum quis tincidunt nulla. Vivamus a risus mi. Donec felis ante, euismod at diam ac, ultricies pulvinar magna.",
    pic: "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
    is_ordrable: false,
    product_pics: [
      {
        pic_id: 21,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 1,
      },
      {
        pic_id: 22,
        pic_path:
          "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        product_id: 254,
        main: 0,
      },
    ],
  },
];

const Products = () => {
  const context = useAppContext();
  const [data, setData] = React.useState<Product>();
  // get the screen dimentions
  const screenDimensions = Dimensions.get("window");

  React.useEffect(() => {
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
          setData(res.data);
          return;
        }
        // console.log(JSON.stringify(res, null, 2)); //
      } catch (error: any) {
        if (error.message) console.log(error.message.split(".")[0]);
      }
    };
    if (context.accessToken) {
      getProducts();
    }
  }, [context.accessToken]);

  // [
  //   {
  //     "banner_id": 4,
  //     "banner_uuid": "82d01f88-b870-4c83-b916-348008134f5e",
  //     "pic_path": "SVtdQ8c8mi42GZktK8FAoZlc37ci36L0k02D1Wbu.png"
  //   },
  //   {
  //     "banner_id": 5,
  //     "banner_uuid": "ab607a88-8ded-4a3e-823e-26f98514fc9b",
  //     "pic_path": "1XcH6jPrZfI9BsYu4ooHK6jEfpl09894UEASeh2b.png"
  //   },
  //   {
  //     "banner_id": 6,
  //     "banner_uuid": "2c633cd3-66a8-475a-bd53-f394750e92d5",
  //     "pic_path": "AYo71LP9fdDQ6WTgQeS7iRAdHSGZ1zcNVgCTpIzw.jpg"
  //   }
  // ]

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
              throw new Error(
                `Error fetching banner: ${response.status} ${response.statusText}`
              );
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
        // source={{ uri: item.pic }}
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/007/451/786/large_2x/an-outline-isometric-icon-of-unknown-product-vector.jpg",
        }}
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
            <View style={{ width: screenDimensions.width, height: 220 }}>
              <Text>Loading...</Text>
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
          // data={data}
          data={product}
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
                      // className="shadow-2xl"
                    >
                      <Image
                        key={pic.pic_id}
                        source={{
                          uri: pic.pic_path,
                        }}
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
