import React, { SetStateAction, useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import ImageEditor from "@/components/ImageEditor";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

type Album = {
  id: string;
  title: string;
  assetCount: number;
  coverImage?: string;
};

type Tab = "recent" | "gallery";

export default function GalleryModal() {
  const { user } = useAuth();
  const [mediaAssets, setMediaAssets] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [after, setAfter] = useState<MediaLibrary.AssetRef | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedAsset, setSelectedAsset] = useState<MediaLibrary.Asset | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("recent");
  const [imageManipulation, setImageManipulation] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const { assets, endCursor, hasNextPage } = await MediaLibrary.getAssetsAsync({
        mediaType: ["photo"],
        sortBy: [MediaLibrary.SortBy.creationTime],
        first: 50,
      });
      setMediaAssets(assets);
      setAfter(endCursor);
      setHasMore(hasNextPage);

      const fetchedAlbums = await MediaLibrary.getAlbumsAsync();
      const albumsWithCover = await Promise.all(
        fetchedAlbums.map(async (album) => {
          const { assets } = await MediaLibrary.getAssetsAsync({
            album: album.id,
            mediaType: ["photo"],
          });
          return {
            id: album.id,
            title: album.title,
            assetCount: album.assetCount,
            coverImage: assets[0]?.uri,
          };
        })
      );
      setAlbums(albumsWithCover);
    } catch (error) {
      console.error("Error loading media:", error);
    }
    setLoading(false);
  };

  const loadMorePhotos = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const { assets, endCursor, hasNextPage } = await MediaLibrary.getAssetsAsync({
        mediaType: ["photo"],
        first: 50,
        after,
        sortBy: [MediaLibrary.SortBy.creationTime],
      });
      setMediaAssets((prevAssets) => [...prevAssets, ...assets]);
      setAfter(endCursor);
      setHasMore(hasNextPage);
    } catch (error) {
      console.error("Error loading more media:", error);
    }
    setLoadingMore(false);
  };

  const loadAlbumPhotos = async (albumId: string) => {
    setLoading(true);
    setHasMore(true);
    try {
      const { assets, endCursor, hasNextPage } = await MediaLibrary.getAssetsAsync({
        mediaType: ["photo"],
        album: albumId,
        first: 50,
        sortBy: [MediaLibrary.SortBy.creationTime],
      });
      setMediaAssets(assets);
      setAfter(endCursor);
      setHasMore(hasNextPage);
    } catch (error) {
      console.error("Error loading album photos:", error);
    }
    setLoading(false);
  };

  const handleSelect = (asset: MediaLibrary.Asset) => {
    setSelectedAsset(asset);
  };

  const handleConfirmSelection = () => {
    if (selectedAsset) {
      setImageManipulation(true);
    }
  };

  const renderPhotoItem = ({ item }: { item: MediaLibrary.Asset }) => (
    <TouchableOpacity
      onPress={() => handleSelect(item)}
      className="relative m-0.5 rounded-xl"
    >
      <Image
        source={{ uri: item.uri }}
        className="w-32 h-32 rounded-xl"
      />
      {selectedAsset?.id === item.id && (
        <View className="absolute inset-0 items-center justify-center bg-black/30 rounded-xl">
          <View className="items-center justify-center w-6 h-6 rounded-full bg-primary-500">
            <Text className="text-white">✓</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedAlbum(item);
        loadAlbumPhotos(item.id);
      }}
      className="flex-row items-center p-4 border-b border-secondary-500"
    >
      {item.coverImage ? (
        <Image
          source={{ uri: item.coverImage }}
          className="w-16 h-16 rounded-xl"
        />
      ) : (
        <View className="w-16 h-16 rounded-xl bg-secondary-500" />
      )}
      <View className="ml-4">
        <Text className="text-foregroundText font-[Manrope-SemiBold]">{item.title}</Text>
        <Text className="text-secondary-300">{item.assetCount} photos</Text>
      </View>
    </TouchableOpacity>
  );

  const saveImage = async (uri: string) => {
    try {
      // await user?.setProfileImage({ file: uri });
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };
  const { mutate: saveImageMutation, isPending } = useMutation({
    mutationFn: saveImage,
    onSuccess: () => {
      router.back();
    },
  });
  return (
    <SafeAreaView className="flex-1 bg-background">
      {imageManipulation ? (
        <ImageEditor
          loading={isPending}
          uri={selectedAsset?.uri as string}
          onSaveEditedImage={saveImageMutation}
        />
      ) : (
        <>
          <View className="flex-row items-center justify-between p-4 border-b border-secondary-500">
            <TouchableOpacity
              onPress={() => {
                if (selectedAlbum && activeTab === "gallery") {
                  setSelectedAlbum(null);
                  setMediaAssets([]);
                  loadInitialData();
                  return;
                }
                router.back();
              }}
            >
              <Text className="text-primary-500">{selectedAlbum ? "Back" : "Cancel"}</Text>
            </TouchableOpacity>
            <Text className="text-lg font-[Manrope-SemiBold] text-foregroundText">{selectedAlbum ? selectedAlbum.title : "Choose Photo"}</Text>
            <TouchableOpacity
              onPress={handleConfirmSelection}
              disabled={!selectedAsset}
            >
              <Text className={`${selectedAsset ? "text-primary-500" : "text-secondary-300"}`}>Choose</Text>
            </TouchableOpacity>
          </View>
          {!selectedAlbum && (
            <View className="flex-row h-12 border-b border-secondary-500">
              <TouchableOpacity
                onPress={() => setActiveTab("recent")}
                className={`flex-1 justify-center items-center ${activeTab === "recent" ? "border-b-2 border-primary-500" : ""}`}
              >
                <Text className={activeTab === "recent" ? "text-primary-500" : "text-secondary-300"}>Terbaru</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab("gallery")}
                className={`flex-1 justify-center items-center ${activeTab === "gallery" ? "border-b-2 border-primary-500" : ""}`}
              >
                <Text className={activeTab === "gallery" ? "text-primary-500" : "text-secondary-300"}>Galeri</Text>
              </TouchableOpacity>
            </View>
          )}
          {loading ? (
            <View className="items-center justify-center flex-1">
              <ActivityIndicator
                size="large"
                color={Colors.primary[500]}
              />
            </View>
          ) : (
            <>
              {activeTab === "recent" && !selectedAlbum && (
                <FlatList
                  data={mediaAssets}
                  renderItem={renderPhotoItem}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  numColumns={3}
                  contentContainerStyle={{ padding: 2 }}
                  onEndReached={loadMorePhotos}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={
                    loadingMore ? (
                      <ActivityIndicator
                        size="small"
                        color={Colors.primary[500]}
                      />
                    ) : null
                  } // Loading indicator
                />
              )}
              {activeTab === "gallery" && !selectedAlbum && (
                <FlatList
                  data={albums}
                  renderItem={renderAlbumItem}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                />
              )}
              {selectedAlbum && (
                <FlatList
                  data={mediaAssets}
                  renderItem={renderPhotoItem}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  numColumns={3}
                  contentContainerStyle={{ padding: 2 }}
                  onEndReached={loadMorePhotos}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={
                    loadingMore ? (
                      <ActivityIndicator
                        size="small"
                        color={Colors.primary[500]}
                      />
                    ) : null
                  }
                />
              )}
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
