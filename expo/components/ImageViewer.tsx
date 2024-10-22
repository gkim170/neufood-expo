import { StyleSheet, Image, ImageSourcePropType } from 'react-native';


// Define the interface for props
interface ImageViewerProps {
  placeholderImageSource: ImageSourcePropType; // Type for image source (can be URI or local image)
  selectedImage: string | null; // Type for selectedImage, which can either be a string (URI) or null
}


const ImageViewer: React.FC<ImageViewerProps> = ({ placeholderImageSource, selectedImage }) => {
  // Determine the image source
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
};

export default ImageViewer;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 18,
  },
});