import express from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';
import { RecipeModel } from '../models/Recipes.js';

const router = express.Router();

const recipesData = [
  {
    name: "Misal Pav",
    servings: 4,
    prepTime: 20,
    cookingTime: 40,
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "2 cups sprouted matki",
      "2 onions finely chopped",
      "2 tomatoes finely chopped",
      "2 tbsp misal masala",
      "1 tsp turmeric powder",
      "1 tsp red chili powder",
      "Salt to taste",
      "2 tbsp oil",
      "Farsan for topping",
      "8 pav"
    ],
    instructions: `Wash the sprouted matki thoroughly and pressure cook it with 2 cups water for about 15 minutes until soft.
Heat 2 tablespoons oil in a deep pan over medium flame.
Add finely chopped onions and sauté for 4–5 minutes until golden brown.
Add chopped tomatoes and cook for another 5 minutes until soft and mushy.
Add turmeric powder, red chili powder, misal masala, and salt. Mix well and cook for 2 minutes.
Add the boiled matki along with its cooking water and stir properly.
Add extra water if required and bring the mixture to a boil.
Cover and simmer for 15 minutes so all flavors blend together.
Toast pav lightly with butter on a hot pan.
Serve hot misal in a bowl topped with farsan, chopped onions, coriander, and lemon wedges along with pav.`
  },
  {
    name: "Vada Pav",
    servings: 4,
    prepTime: 15,
    cookingTime: 25,
    imageUrl: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "4 boiled potatoes",
      "1 tbsp ginger garlic paste",
      "1 tsp mustard seeds",
      "Curry leaves",
      "Gram flour batter",
      "Salt",
      "Oil for frying",
      "8 pav buns",
      "Green chutney and dry garlic chutney"
    ],
    instructions: `Peel and mash the boiled potatoes in a bowl.
Heat 1 tablespoon oil in a pan and add mustard seeds.
Once they crackle, add curry leaves and ginger garlic paste.
Sauté for 1 minute until fragrant.
Add mashed potatoes and salt. Mix thoroughly and cook for 2 minutes.
Allow the mixture to cool and divide it into small lemon-sized balls.
Prepare a thick gram flour batter by mixing besan, salt, turmeric, and water.
Heat oil in a deep frying pan.
Dip each potato ball into the batter and coat evenly.
Carefully drop into hot oil and fry until golden brown.
Remove and drain on tissue paper.
Slice pav buns from the center without cutting completely.
Spread green chutney and dry garlic chutney inside the pav.
Place one hot vada inside each pav and serve immediately.`
  },
  {
    name: "Puran Poli",
    servings: 6,
    prepTime: 30,
    cookingTime: 40,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2rJVuy70AyDopTK3LyJcul7SE1Ft3KTrwBAYRG8qolw&s=10",
    ingredients: [
      "2 cups chana dal",
      "2 cups jaggery",
      "Wheat flour",
      "1 tsp cardamom powder",
      "Ghee"
    ],
    instructions: `Wash chana dal thoroughly and pressure cook until soft.
Drain excess water and mash the dal smoothly.
Transfer the mashed dal to a pan and add jaggery.
Cook on low flame while stirring continuously until the mixture thickens.
Add cardamom powder and mix well.
Allow the filling (puran) to cool completely.
Prepare a soft dough using wheat flour, water, and a little oil.
Divide both dough and filling into equal portions.
Flatten one dough ball and place a portion of filling inside.
Seal the edges carefully and roll gently into a round poli.
Heat a tawa and place the poli on it.
Roast for 2–3 minutes on one side.
Flip and apply ghee on both sides.
Cook until golden spots appear.
Serve hot with ghee.`
  },
  {
    name: "Thalipeeth",
    servings: 4,
    prepTime: 20,
    cookingTime: 20,
    imageUrl: "https://neevnutrition.in/wp-content/uploads/2022/03/Studio-Project-2022-03-23T222831.989.png",
    ingredients: [
      "2 cups Bhajani flour (mixed roasted grains)",
      "1 onion finely chopped",
      "1/2 cup fresh coriander chopped",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1 tsp red chili powder",
      "Salt to taste",
      "Oil for roasting"
    ],
    instructions: `In a large mixing bowl, combine the Bhajani flour, finely chopped onion, and fresh coriander.
Add cumin powder, coriander powder, red chili powder, and salt. Mix all the dry ingredients well.
Gradually add water and knead the mixture into a soft, pliable dough.
Divide the dough into equal-sized portions.
Take a moist cotton cloth or a piece of parchment paper and wet it slightly.
Place a portion of the dough on it and pat it into a thin, round circle (thalipeeth) using wet fingers. Make a small hole in the center.
Heat a non-stick pan or tawa over medium heat and grease it lightly with oil.
Carefully lift the cloth and flip the thalipeeth onto the hot tawa. Remove the cloth gently.
Pour a few drops of oil into the center hole and around the edges.
Cover with a lid and cook for 2-3 minutes until the bottom is crisp and golden brown.
Flip and cook the other side uncovered until crispy.
Serve hot with fresh yogurt, white butter, or pickle.`
  },
  {
    name: "Sabudana Khichdi",
    servings: 3,
    prepTime: 15,
    cookingTime: 15,
    imageUrl: "https://shwetainthekitchen.com/wp-content/uploads/2021/09/Sabudana-Khichdi.jpg",
    ingredients: [
      "1 cup sabudana (tapioca pearls)",
      "1/2 cup roasted peanuts coarsely crushed",
      "2 potatoes boiled and cubed",
      "2 green chilies chopped",
      "1 tsp cumin seeds",
      "1 tbsp ghee or oil",
      "Salt (Sendha namak for fasting)",
      "Fresh coriander for garnish",
      "Lemon juice"
    ],
    instructions: `Wash the sabudana 2-3 times in running water. Soak it overnight (or for at least 4-5 hours) in just enough water to cover the pearls. They should be soft and fluffy.
In a pan, dry roast the peanuts until they are crunchy. Let them cool, then coarsely crush them.
Heat ghee or oil in a heavy-bottomed pan over medium heat.
Add cumin seeds and let them crackle.
Add chopped green chilies and sauté for a few seconds.
Add the boiled and cubed potatoes, tossing them in the ghee until they are slightly golden.
Drain any excess water from the sabudana and add it to the pan along with the crushed peanuts.
Add salt to taste and gently toss everything together. Ensure the sabudana pearls do not clump.
Cook on low heat for 5-7 minutes, stirring occasionally, until the sabudana pearls turn slightly translucent.
Turn off the heat. Drizzle freshly squeezed lemon juice over the top.
Garnish with fresh chopped coriander and serve hot.`
  },
  {
    name: "Kothimbir Vadi",
    servings: 5,
    prepTime: 20,
    cookingTime: 30,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_LV-OYSBeyEhmlddUTypro-OoRsQnV6Yc6XfzBK4zw&s=10",
    ingredients: [
      "2 cups fresh coriander leaves (kothimbir), tightly packed and chopped",
      "1 cup besan (gram flour)",
      "1/4 cup rice flour",
      "1 tbsp ginger-garlic-green chili paste",
      "1 tsp turmeric powder",
      "1 tsp cumin seeds",
      "1 tbsp sesame seeds",
      "Salt to taste",
      "Oil for frying"
    ],
    instructions: `Thoroughly wash and finely chop the fresh coriander leaves. Ensure they are dry before mixing.
In a large mixing bowl, combine the chopped coriander, besan, and rice flour.
Add the ginger-garlic-green chili paste, turmeric powder, cumin seeds, sesame seeds, and salt.
Mix well. The moisture from the coriander should be enough to bind it. If needed, sprinkle a few drops of water to form a firm dough.
Grease your palms with a little oil and shape the dough into a cylindrical roll.
Grease a steamer plate and place the roll on it. Steam for 15-20 minutes on medium heat.
To check if it's done, insert a knife into the roll; it should come out clean.
Remove from the steamer and allow it to cool completely.
Once cooled, slice the roll into 1/2-inch thick discs (vadis).
Heat oil in a pan over medium heat. Shallow fry or deep fry the sliced vadis until they are crisp and golden brown on both sides.
Serve hot with tomato ketchup or green chutney.`
  },
  {
    name: "Bharli Vangi",
    servings: 4,
    prepTime: 20,
    cookingTime: 30,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqCm0twegE3VnnJuH1zHWCr4ZNX6cWHWnTMGAa_lNri_IgSkEJh_e_Yn0j&s=10",
    ingredients: [
      "8-10 small tender eggplants (brinjals/vangi)",
      "1/2 cup roasted peanuts crushed",
      "1/4 cup desiccated coconut roasted",
      "1 onion finely chopped",
      "1 tbsp goda masala",
      "1 tsp red chili powder",
      "1/2 tsp turmeric powder",
      "1 tbsp jaggery",
      "1 tbsp tamarind pulp",
      "Salt to taste",
      "2 tbsp oil"
    ],
    instructions: `Wash the eggplants and slit them into a cross (+) from the bottom, keeping the stem intact. Do not cut them entirely. Soak them in salted water to prevent discoloration.
In a mixing bowl, combine the crushed peanuts, roasted coconut, chopped onion, goda masala, red chili powder, turmeric, jaggery, tamarind pulp, and salt. Mix well to create the stuffing.
Drain the eggplants and stuff the prepared spice mixture tightly into the slits of each eggplant. Keep any leftover stuffing aside.
Heat oil in a heavy-bottomed pan over medium heat.
Add a pinch of mustard seeds and let them splutter.
Carefully place the stuffed eggplants into the pan. Sauté gently for 2-3 minutes so the skins blister slightly.
Add the remaining leftover stuffing and mix gently.
Pour in about 1 cup of warm water, cover the pan with a lid, and let it simmer on low heat for 20-25 minutes.
Stir occasionally and gently to ensure the eggplants don't stick to the bottom. Add more water if the gravy becomes too thick.
Once the eggplants are tender and the oil separates from the masala, turn off the heat.
Garnish with fresh coriander and serve hot with bhakri or chapati.`
  },
  {
    name: "Zunka Bhakar",
    servings: 4,
    prepTime: 15,
    cookingTime: 20,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmkgTSrWjAm_5TfBTu8sQGTBMJUjZEPJkkk4p339ws6A&s=10",
    ingredients: [
      "1 cup besan (gram flour)",
      "1 large onion finely chopped",
      "3-4 green chilies chopped",
      "1 tbsp ginger garlic paste",
      "1 tsp mustard seeds",
      "1/2 tsp turmeric powder",
      "Fresh coriander",
      "Salt to taste",
      "3 tbsp oil",
      "Jowar or Bajra flour for bhakri"
    ],
    instructions: `Heat oil in a heavy pan. Add mustard seeds and let them splutter.
Add chopped green chilies, ginger-garlic paste, and finely chopped onion. Sauté until the onions turn translucent and slightly golden.
Add turmeric powder and salt, mixing well.
Gradually add the besan (gram flour) into the pan, stirring continuously to ensure no lumps are formed.
Roast the besan on low heat for about 5-7 minutes until it turns aromatic and slightly darkens in color.
Sprinkle small splashes of water over the mixture, cover with a lid, and let it steam for 2-3 minutes. The Zunka should be dry and crumbly, not pasty.
Garnish with a generous amount of freshly chopped coriander.
For the Bhakri: Boil 1 cup of water. In a wide bowl, add jowar or bajra flour and slowly mix in the hot water using a spoon.
Once cool enough to touch, knead it into a smooth dough.
Flatten a portion of dough into a round flatbread using your palms on a dusted surface.
Roast on a hot tawa, applying a little water on the top surface. Flip and cook until brown spots appear.
Serve the hot crumbly Zunka alongside the freshly roasted Bhakar and raw onions.`
  },
  {
    name: "Modak",
    servings: 4,
    prepTime: 30,
    cookingTime: 20,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiV-XQ-ijgFcfNX-qNt3ufX5w-dSg8mZbgKfJq4qd8pE6o5K4A2FTgtMFB&s=10",
    ingredients: [
      "1 cup rice flour",
      "1 cup freshly grated coconut",
      "1/2 cup jaggery",
      "1/2 tsp cardamom powder",
      "1 tsp ghee",
      "Pinch of salt"
    ],
    instructions: `For the sweet filling (Churma/Saran): Heat a pan on low flame and add the grated coconut and jaggery.
Mix well and cook until the jaggery melts and the mixture comes together. Do not overcook or the jaggery will harden.
Add the cardamom powder, mix well, and set aside to cool completely.
For the outer covering: Boil 1 cup of water in a pan. Add a pinch of salt and a teaspoon of ghee.
Turn the heat to low, slowly add the rice flour, and stir continuously to avoid lumps.
Turn off the heat, cover the pan with a lid, and let it rest for 5 minutes.
Transfer the warm rice flour mixture to a large plate and knead it well into a smooth, crack-free dough. Apply a little water or oil to your palms while kneading.
Take a lemon-sized ball of dough and flatten it into a small cup shape using your fingers, keeping the edges thin and the center slightly thick.
Place a spoonful of the sweet coconut filling into the center.
Pinch the edges together to form pleats, and bring all the pleats together at the top to seal the modak.
Grease a steamer plate, place the prepared modaks on it, and steam for 10-12 minutes on medium heat.
Serve warm, drizzled with a little pure ghee.`
  },
  {
    name: "Solkadhi",
    servings: 4,
    prepTime: 15,
    cookingTime: 0,
    imageUrl: "https://assets.cntraveller.in/photos/60ba27e21fa22668f025a7e4/16:9/w_2560%2Cc_limit/KHXC6M-1366x768.jpg",
    ingredients: [
      "6-8 dried kokum (aamsul)",
      "1 cup freshly grated coconut",
      "1-2 green chilies",
      "2-3 cloves of garlic",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    instructions: `Soak the dried kokum in half a cup of warm water for about 30 minutes. Squeeze the kokum well to extract maximum flavor and color, then discard the solids. Keep the pink kokum water aside.
In a blender, add the freshly grated coconut, green chilies, garlic cloves, and about half a cup of warm water.
Blend until a very smooth, fine paste is formed.
Place a fine sieve or muslin cloth over a bowl and pour the blended coconut mixture through it.
Press down firmly or squeeze the cloth to extract thick coconut milk. You can add a little more water to the blender and extract a second, thinner batch of milk.
Combine the extracted coconut milk with the prepared pink kokum water.
Add salt to taste and stir well. The mixture will turn into a beautiful, vibrant pink color.
Garnish with finely chopped fresh coriander.
Chill in the refrigerator for at least an hour before serving.
Serve cold as a refreshing digestive drink after a heavy Maharashtrian meal.`
  },
  {
    name: "Batata Bhaji",
    servings: 4,
    prepTime: 10,
    cookingTime: 15,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dAG1xKJ0IMdVbn0cKqNBWtBh5w9ec1rr0ar4avt9uA&s=10",
    ingredients: [
      "4 large potatoes boiled and peeled",
      "2 green chilies slit",
      "1 tsp mustard seeds",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric powder",
      "Curry leaves",
      "Salt to taste",
      "2 tbsp oil",
      "Fresh coriander"
    ],
    instructions: `Boil the potatoes until soft, peel them, and chop them into medium-sized cubes.
Heat oil in a kadhai or pan over medium flame.
Add mustard seeds. Once they start to crackle, add the cumin seeds.
Add the slit green chilies and a sprig of fresh curry leaves. Sauté for a few seconds until fragrant.
Add turmeric powder and mix quickly. Be careful not to burn the turmeric.
Immediately add the boiled potato cubes and salt to taste.
Toss the potatoes well so that they are evenly coated with the bright yellow turmeric oil.
Cover the pan and cook on low heat for 3-5 minutes, allowing the potatoes to absorb the flavors.
Turn off the heat and garnish generously with chopped fresh coriander.
Serve hot alongside puri, chapati, or as a side dish with dal and rice.`
  },
  {
    name: "Shrikhand",
    servings: 4,
    prepTime: 15,
    cookingTime: 0,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlzPatSEL8andiyRqzhJmJo5yOLbppaurFaxEaZ9Eqizkh4m9EMeMUA-Xs&s=10",
    ingredients: [
      "2 cups thick curd (yogurt) or Greek yogurt",
      "3/4 cup powdered sugar",
      "1/2 tsp cardamom powder",
      "A pinch of saffron strands soaked in 1 tbsp warm milk",
      "Chopped pistachios and almonds for garnish"
    ],
    instructions: `If using regular homemade curd, place a muslin cloth over a strainer, pour the curd in, and tie it tight. Hang it for 4-5 hours to drain all the whey (water), yielding thick hung curd (chakka). If using thick Greek yogurt, you can skip this step.
Transfer the thick hung curd into a large, clean mixing bowl.
Add the powdered sugar. (Adjust the sugar quantity based on the sourness of the yogurt and your preference).
Using a whisk or a spoon, beat the mixture vigorously until it becomes incredibly smooth, creamy, and lump-free.
Add the cardamom powder and the saffron-infused milk to the bowl.
Mix thoroughly until the Shrikhand turns a beautiful pale yellow color with streaks of saffron.
Garnish the top generously with slivered almonds and pistachios.
Place the bowl in the refrigerator and chill for at least 2 hours before serving.
Serve cold as a sweet dessert, or alongside hot, fluffy puris.`
  }
];

router.get('/run', async (req, res) => {
    try {
        console.log("Wiping existing data to reset recipes and users...");
        await UserModel.deleteMany({});
        await RecipeModel.deleteMany({});

        console.log("Creating Admin User...");
        const hashedPassword = await bcrypt.hash("123456789", 10);
        const adminUser = new UserModel({
            username: "Admin",
            password: hashedPassword,
            role: "admin",
            profilePicture: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=150&auto=format&fit=crop",
            bio: "Official Admin of Aapli Recipe"
        });
        await adminUser.save();

        console.log("Injecting 12 detailed Maharashtrian recipes...");
        const recipesToInsert = recipesData.map(recipe => ({
            ...recipe,
            userOwner: adminUser._id,
            difficulty: "Medium",
            status: "published"
        }));

        await RecipeModel.insertMany(recipesToInsert);

        res.status(200).json({ message: "SUCCESS! 12 Maharashtrian recipes and the Admin account have been deployed to your Cloud Database!" });
    } catch (error) {
        console.error("Error seeding cloud:", error);
        res.status(500).json({ error: "Failed to seed database" });
    }
});

export { router as seedRouter };
