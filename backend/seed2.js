import mongoose from 'mongoose';
import { RecipeModel } from './models/Recipes.js';
import { UserModel } from './models/Users.js';
import dotenv from 'dotenv';

dotenv.config();

const newRecipes = [
  {
    name: '1. Misal Pav',
    ingredients: [
      '2 cups sprouted matki', '2 onions finely chopped', '2 tomatoes finely chopped',
      '2 tbsp misal masala', '1 tsp turmeric powder', '1 tsp red chili powder',
      'Salt to taste', '2 tbsp oil', 'Farsan for topping', '8 pav'
    ],
    instructions: `1. Wash the sprouted matki thoroughly and pressure cook it with 2 cups water for about 15 minutes until soft.
2. Heat 2 tablespoons oil in a deep pan over medium flame.
3. Add finely chopped onions and sauté for 4–5 minutes until golden brown.
4. Add chopped tomatoes and cook for another 5 minutes until soft and mushy.
5. Add turmeric powder, red chili powder, misal masala, and salt. Mix well and cook for 2 minutes.
6. Add the boiled matki along with its cooking water and stir properly.
7. Add extra water if required and bring the mixture to a boil.
8. Cover and simmer for 15 minutes so all flavors blend together.
9. Toast pav lightly with butter on a hot pan.
10. Serve hot misal in a bowl topped with farsan, chopped onions, coriander, and lemon wedges along with pav.`,
    imageUrl: '/images/misal-pav.jpg',
    prepTime: 20,
    cookingTime: 40,
    servings: 4
  },
  {
    name: '2. Vada Pav',
    ingredients: [
      '4 boiled potatoes', '1 tbsp ginger garlic paste', '1 tsp mustard seeds',
      'Curry leaves', 'Gram flour batter', 'Salt', 'Oil for frying', '8 pav buns',
      'Green chutney and dry garlic chutney'
    ],
    instructions: `1. Peel and mash the boiled potatoes in a bowl.
2. Heat 1 tablespoon oil in a pan and add mustard seeds.
3. Once they crackle, add curry leaves and ginger garlic paste.
4. Sauté for 1 minute until fragrant.
5. Add mashed potatoes and salt. Mix thoroughly and cook for 2 minutes.
6. Allow the mixture to cool and divide it into small lemon-sized balls.
7. Prepare a thick gram flour batter by mixing besan, salt, turmeric, and water.
8. Heat oil in a deep frying pan.
9. Dip each potato ball into the batter and coat evenly.
10. Carefully drop into hot oil and fry until golden brown.
11. Remove and drain on tissue paper.
12. Slice pav buns from the center without cutting completely.
13. Spread green chutney and dry garlic chutney inside the pav.
14. Place one hot vada inside each pav and serve immediately.`,
    imageUrl: '/images/vada-pav.jpg',
    prepTime: 15,
    cookingTime: 25,
    servings: 4
  },
  {
    name: '3. Puran Poli',
    ingredients: [
      '2 cups chana dal', '2 cups jaggery', 'Wheat flour', '1 tsp cardamom powder', 'Ghee'
    ],
    instructions: `1. Wash chana dal thoroughly and pressure cook until soft.
2. Drain excess water and mash the dal smoothly.
3. Transfer the mashed dal to a pan and add jaggery.
4. Cook on low flame while stirring continuously until the mixture thickens.
5. Add cardamom powder and mix well.
6. Allow the filling (puran) to cool completely.
7. Prepare a soft dough using wheat flour, water, and a little oil.
8. Divide both dough and filling into equal portions.
9. Flatten one dough ball and place a portion of filling inside.
10. Seal the edges carefully and roll gently into a round poli.
11. Heat a tawa and place the poli on it.
12. Roast for 2–3 minutes on one side.
13. Flip and apply ghee on both sides.
14. Cook until golden spots appear.
15. Serve hot with ghee.`,
    imageUrl: '/images/puran-poli.jpg',
    prepTime: 30,
    cookingTime: 40,
    servings: 6
  },
  {
    name: '4. Thalipeeth',
    ingredients: [
      '2 cups bhajani flour', '1 onion finely chopped', '2 tbsp coriander leaves chopped',
      '1 tsp red chili powder', '1 tsp cumin seeds', 'Salt to taste', 'Water as required', 'Oil for cooking'
    ],
    instructions: `1. Take bhajani flour in a large mixing bowl.
2. Add chopped onion, coriander leaves, cumin seeds, chili powder, and salt.
3. Mix all ingredients thoroughly.
4. Add water little by little and prepare a soft dough.
5. Divide the dough into equal portions.
6. Place a portion on a greased plastic sheet or banana leaf.
7. Flatten it gently using wet fingers into a round shape.
8. Make small holes in the center and around the edges.
9. Heat a tawa and carefully place the thalipeeth on it.
10. Add a few drops of oil around the edges and in the holes.
11. Cook for 4–5 minutes on medium flame.
12. Flip and cook the other side until golden brown.
13. Serve hot with white butter, curd, or pickle.`,
    imageUrl: '/images/thalipeeth.jpg',
    prepTime: 15,
    cookingTime: 20,
    servings: 4
  },
  {
    name: '5. Sabudana Khichdi',
    ingredients: [
      '2 cups sabudana', '1 medium potato diced', '½ cup roasted peanut powder',
      '2 green chilies finely chopped', '1 tsp cumin seeds', '2 tbsp ghee', 'Salt to taste',
      'Coriander leaves', 'Lemon wedges'
    ],
    instructions: `1. Wash sabudana thoroughly 2–3 times.
2. Soak it overnight or for 6–8 hours.
3. Drain excess water and keep aside.
4. Roast peanuts and grind them into coarse powder.
5. Heat ghee in a pan.
6. Add cumin seeds and allow them to crackle.
7. Add chopped green chilies and sauté for 1 minute.
8. Add diced potatoes and cook for 5 minutes until soft.
9. Add soaked sabudana and mix gently.
10. Add peanut powder and salt.
11. Stir carefully to avoid breaking the pearls.
12. Cook for 7–8 minutes until sabudana becomes transparent.
13. Garnish with coriander leaves.
14. Serve hot with lemon wedges.`,
    imageUrl: '/images/sabudana-khichdi.jpg',
    prepTime: 480, // Overnight, put 8 hours = 480 min
    cookingTime: 20,
    servings: 3
  },
  {
    name: '6. Kothimbir Vadi',
    ingredients: [
      '2 cups finely chopped coriander leaves', '1 cup besan', '1 tbsp sesame seeds',
      '1 tsp ginger garlic paste', '1 tsp turmeric powder', '1 tsp red chili powder',
      'Salt to taste', 'Water as required', 'Oil for shallow frying'
    ],
    instructions: `1. Wash and finely chop fresh coriander leaves.
2. Take coriander in a large bowl.
3. Add besan, sesame seeds, ginger garlic paste, turmeric, chili powder, and salt.
4. Mix everything thoroughly.
5. Add little water and prepare a thick batter.
6. Grease a steaming plate.
7. Spread the mixture evenly on the plate.
8. Steam for 15 minutes until firm.
9. Remove and allow it to cool completely.
10. Cut into square or diamond-shaped pieces.
11. Heat oil in a pan.
12. Shallow fry the pieces until crispy and golden.
13. Remove onto tissue paper.
14. Serve hot with green chutney.`,
    imageUrl: '/images/kothimbir-vadi.jpg',
    prepTime: 20,
    cookingTime: 25,
    servings: 4
  },
  {
    name: '7. Bharli Vangi',
    ingredients: [
      '8 small brinjals', '½ cup peanut powder', '¼ cup grated coconut', '2 tsp goda masala',
      '1 tsp red chili powder', 'Salt to taste', '2 tbsp oil', 'Coriander leaves'
    ],
    instructions: `1. Wash the brinjals thoroughly.
2. Make cross-shaped slits without cutting completely.
3. In a bowl, mix peanut powder, coconut, goda masala, chili powder, and salt.
4. Stuff this mixture carefully inside each brinjal.
5. Heat oil in a deep pan.
6. Arrange the stuffed brinjals gently in the pan.
7. Add remaining stuffing and a little water.
8. Cover with a lid.
9. Cook on low flame for 25 minutes.
10. Turn the brinjals occasionally for even cooking.
11. Cook until the brinjals become soft.
12. Garnish with coriander leaves.
13. Serve hot with chapati or bhakri.`,
    imageUrl: '/images/bharli-vangi.jpg',
    prepTime: 20,
    cookingTime: 35,
    servings: 4
  },
  {
    name: '8. Zunka Bhakar',
    ingredients: [
      '1 cup besan', '1 onion finely chopped', '2 green chilies chopped', 'Salt to taste',
      '1 tsp mustard seeds', 'Curry leaves', 'Water', 'Jowar flour for bhakri'
    ],
    instructions: `1. Heat oil in a pan.
2. Add mustard seeds and allow them to crackle.
3. Add curry leaves and chopped green chilies.
4. Add onions and sauté for 5 minutes.
5. In a separate bowl mix besan with water to form a smooth mixture.
6. Pour the mixture into the pan.
7. Add salt and stir continuously.
8. Cook on medium flame for 8–10 minutes.
9. Continue stirring until the mixture becomes crumbly.
10. Prepare jowar bhakri separately on a hot tawa.
11. Cook bhakri from both sides.
12. Serve hot zunka with bhakri, onion, and green chili.`,
    imageUrl: '/images/zunka-bhakar.jpg',
    prepTime: 15,
    cookingTime: 20,
    servings: 4
  },
  {
    name: '9. Modak',
    ingredients: [
      '2 cups rice flour', '1 cup grated coconut', '1 cup jaggery', '1 tsp cardamom powder', '1 tsp ghee'
    ],
    instructions: `1. Heat a pan and add coconut and jaggery.
2. Cook for 5–7 minutes until jaggery melts.
3. Add cardamom powder and mix well.
4. Allow the stuffing to cool.
5. Boil water with a little ghee.
6. Add rice flour and mix well.
7. Cover and let it rest for 5 minutes.
8. Knead into a smooth dough.
9. Take a small portion and shape into a cup.
10. Fill with coconut-jaggery mixture.
11. Create pleats and seal the top.
12. Arrange modaks in a steamer.
13. Steam for 15 minutes.
14. Serve hot with ghee.`,
    imageUrl: '/images/modak.jpg',
    prepTime: 30,
    cookingTime: 20,
    servings: 12
  },
  {
    name: '10. Solkadhi',
    ingredients: [
      '2 cups coconut milk', '8–10 kokum pieces', '2 garlic cloves', '2 green chilies (optional)',
      '2 tbsp coriander leaves chopped', 'Salt to taste', '1 cup warm water'
    ],
    instructions: `1. Wash the kokum pieces and soak them in warm water for 20–30 minutes.
2. Once softened, squeeze the kokum to extract its color and flavor into the water.
3. Peel the garlic cloves and crush them into a fine paste.
4. Add the crushed garlic to the kokum water.
5. Pour fresh coconut milk into a large bowl.
6. Add the kokum extract and mix thoroughly.
7. Add salt according to taste.
8. Mix gently until everything is well combined.
9. Add chopped coriander leaves for freshness.
10. Refrigerate for at least 30 minutes.
11. Serve chilled as a refreshing digestive drink after meals.`,
    imageUrl: '/images/solkadhi.jpg',
    prepTime: 10,
    cookingTime: 0,
    servings: 4
  },
  {
    name: '11. Batata Bhaji',
    ingredients: [
      '4 medium potatoes', '1 tsp mustard seeds', '1 tsp cumin seeds', '8–10 curry leaves',
      '2 green chilies chopped', '½ tsp turmeric powder', 'Salt to taste', '2 tbsp oil',
      '2 tbsp coriander leaves chopped'
    ],
    instructions: `1. Wash and pressure cook the potatoes until soft.
2. Allow them to cool, then peel and cut into medium-sized cubes.
3. Heat oil in a pan over medium flame.
4. Add mustard seeds and cumin seeds.
5. Once they start crackling, add curry leaves and chopped green chilies.
6. Sauté for 1 minute until aromatic.
7. Add turmeric powder and stir quickly.
8. Add the boiled potato cubes and salt.
9. Mix gently so the potatoes don't break too much.
10. Cook for 8–10 minutes while stirring occasionally.
11. Garnish with chopped coriander leaves.
12. Serve hot with puri, chapati, or as part of a Maharashtrian meal.`,
    imageUrl: '/images/batata-bhaji.jpg',
    prepTime: 10,
    cookingTime: 20,
    servings: 4
  },
  {
    name: '12. Shrikhand',
    ingredients: [
      '500 g hung curd', '½ cup powdered sugar', '¼ tsp cardamom powder', 'A few saffron strands',
      '1 tbsp warm milk', '2 tbsp chopped pistachios', '2 tbsp chopped almonds'
    ],
    instructions: `1. Take fresh curd and place it in a muslin cloth.
2. Hang the cloth for 6–8 hours to remove excess water completely.
3. Transfer the thick hung curd to a mixing bowl.
4. Add powdered sugar and whisk until smooth and creamy.
5. Soak saffron strands in warm milk for 5 minutes.
6. Add saffron milk and cardamom powder to the curd mixture.
7. Mix thoroughly until the color becomes uniform.
8. Chill the mixture in the refrigerator for 1–2 hours.
9. Garnish with chopped pistachios and almonds before serving.
10. Serve chilled as a traditional Maharashtrian dessert.`,
    imageUrl: '/images/shrikhand.jpg',
    prepTime: 480, // 8 hours = 480 mins
    cookingTime: 10,
    servings: 5
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe_db');
    console.log('Connected to DB');

    // Find or create user swapnil
    let user = await UserModel.findOne({ username: 'swapnil' });
    if (!user) {
      console.log('User "swapnil" not found, creating one...');
      user = new UserModel({ username: 'swapnil', password: 'password123' });
      await user.save();
    }
    
    // Wipe old recipes
    await RecipeModel.deleteMany({});
    console.log('Cleared existing recipes.');

    // Clear savedRecipes to prevent dead references
    await UserModel.updateMany({}, { $set: { savedRecipes: [] } });
    console.log('Cleared saved recipes for all users.');

    // Assign recipes to user
    const recipesWithUser = newRecipes.map(r => ({ ...r, userOwner: user._id }));

    // Insert recipes
    const inserted = await RecipeModel.insertMany(recipesWithUser);
    console.log(`Successfully inserted ${inserted.length} recipes for user ${user.username}.`);
    
  } catch (error) {
    console.error('Error seeding DB:', error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
