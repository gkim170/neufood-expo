// Temporary data to be used for recipe pages
// Images are just stored in the directory for now because I am going to delete them eventually
import bologneseImage from './images/bolognese.png';
import alfredoImage from './images/alfredo.png';

export const mockRecipes = [
    {
      id: "1",
      label: "Spaghetti Bolognese",
      image: bologneseImage,
      ingredients: [
        "200g Spaghetti",
        "100g Ground Beef",
        "150g Tomato Sauce",
        "1 Onion, chopped",
        "2 Garlic cloves, minced"
      ],
      instructions: [
        "Boil spaghetti according to package instructions.",
        "In a separate pan, cook ground beef until browned.",
        "Add chopped onion and garlic, and sauté until softened.",
        "Pour in tomato sauce and simmer for 10 minutes.",
        "Serve sauce over spaghetti."
      ],
      calories: 500,
    },
    {
      id: "2",
      label: "Chicken Alfredo",
      image: alfredoImage,
      ingredients: [
        "200g Fettuccine",
        "150g Chicken Breast, sliced",
        "100ml Alfredo Sauce",
        "50g Parmesan Cheese"
      ],
      instructions: [
        "Cook fettuccine according to package instructions.",
        "Sauté chicken slices until cooked through.",
        "Add Alfredo sauce and simmer for a few minutes.",
        "Toss pasta with sauce and sprinkle with Parmesan cheese."
      ],
      calories: 600,
    },
  ];
  

export default mockRecipes;