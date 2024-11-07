import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

const FavoriteButton = () => {
	// set isFavorited state to false on default
	const [isFavorited, setIsFavorited] = useState(false);

	const toggleFavorite = () => {
		// Set isFavorited to whatever it is not currently
		setIsFavorited(!isFavorited);
	};

	return (
		// Heart that toggles between an empty heart and a filled heart when pressed
		<TouchableOpacity 
			onPress={toggleFavorite} 
			className={`mt-2`}
		>
			<View>
				<FontAwesome
					name={isFavorited ? "heart" : "heart-o"}
					size={28}
					color={isFavorited ? "#D46474" : "#000000"}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default FavoriteButton;
