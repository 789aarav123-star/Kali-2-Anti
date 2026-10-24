const restaurantData = {
  name: "Kali Hotel & Restaurant",
  tagline: "A Taste of Heritage & Modern Hospitality in Janakpur Dham",
  phone: "+977 9854025213",
  phoneRaw: "+9779854025213",
  whatsappNumber: "9779854025213",
  address: "PWRG+3JF, Ring Rd, Janakpur, Madhesh Province 45600",
  shortAddress: "Ring Rd, Janakpur Dham, Nepal",
  facebookUrl: "https://www.facebook.com/kalihotelandrestaurant/",
  googleMapsUrl: "https://www.google.com/maps/place/Kali+Hotel/@26.7401841,85.9162553,15z/data=!4m6!3m5!1s0x39ec6bb2a060dc97:0x63322298577faf14!8m2!3d26.7401841!4d85.926555!16s%2Fg%2F11l3t4vcd2",
  mapEmbedUrl: "https://maps.google.com/maps?q=26.7401841,85.926555&hl=en&z=16&output=embed",
  rating: 4.0,
  reviewCount: 167,
  priceRange: "Rs 1–500",
  openingHours: "Monday – Sunday: 9:00 AM – 10:30 PM",
  description: "Kali Hotel and Restaurant is a restaurant in Janakpur Dham where we would provide customers a unique experience of attractive ambience, high notch service and mouth watering cuisine. Allow us to provide our service to you. Hope to see you soon!",

  features: [
    {
      icon: "glass",
      title: "Atmospheric Bar & Lounge",
      desc: "Vibrant neon-lit counter and lounge seating designed for evening unwinding, mocktails, cocktails, and family feasts."
    },
    {
      icon: "party",
      title: "Private Cabins & Celebrations",
      desc: "Exclusive private dining cabins with customized birthday, anniversary, and party balloon decorations upon request."
    },
    {
      icon: "chef",
      title: "Multi-Cuisine Delicacies",
      desc: "Authentic Nepali, Mithila specialties, Tandoori, Chinese, Thai, and North Indian favorites prepared by master chefs."
    },
    {
      icon: "heart",
      title: "Budget-Friendly Luxury",
      desc: "Premium quality dining with wallet-friendly pricing ranging from Rs 1 to Rs 500, making every visit memorable."
    }
  ],

  menuCategories: [
    { id: "all", name: "All Specialties" },
    { id: "biryani", name: "Biryani & Rice" },
    { id: "momos", name: "Momos & Jhol" },
    { id: "paneer", name: "Paneer & Tandoori" },
    { id: "chinese", name: "Chinese & Snacks" },
    { id: "curries", name: "Rich Curries" }
  ],

  dishes: [
    {
      id: "chi-biryani",
      name: "Kali Special Chicken Dum Biryani",
      category: "biryani",
      price: "Rs. 400",
      image: "chi_biryani-1.jpg",
      tags: ["Saturday Kali Special", "Signature Dish"],
      description: "Aromatic long-grain basmati layered with tender chicken cuts, saffron, ghee, and whole roasted spices. Served with cooling raita.",
      badge: "Best Seller · Rs. 400"
    },
    {
      id: "mutton-chilli-momo",
      name: "Chilli Momo",
      category: "momos",
      price: "Rs. 295",
      image: "mutton_chilli_momo.jpg",
      tags: ["Authentic Momo", "Spicy Delight"],
      description: "Juicy handcrafted mutton momos tossed in sizzling capsicum-chilli sauce (Rs. 295) or steamed (Rs. 250), served with signature sesame-tomato jhol soup.",
      badge: "Local Guide Top Pick"
    },
    {
      id: "paneer-crispy",
      name: "Gobhi Manchurian",
      category: "paneer",
      price: "Rs. 180",
      image: "Screen Shot 2026-10-22 at 1.38.14 PM.png",
      tags: ["Vegetarian Snack", "Chef Special"],
      description: "Crisp golden-fried fresh cottage cheese fingers tossed with herbs, oriental dipping chutney, and spring onions. As recommended by Aman Sah.",
      badge: "Aman Sah's Favorite"
    },
    {
      id: "special-gravy",
      name: "Kali Ko Thali (Chicken / Mutton)",
      category: "curries",
      price: "Rs. 350",
      image: "138313120_164875018757519_2484154134282757066_n.jpg",
      tags: ["Traditional", "Mithila Feast"],
      description: "Traditional Nepali meal platter with slow-simmered rich curry, aromatic rice, dal, seasonal tarkari, fresh salad, and homemade pickle. Chicken: Rs. 350 | Mutton: Rs. 450.",
      badge: "Traditional Feast"
    },
    {
      id: "paneer-gravy-naan",
      name: "Paneer Tikka with Naan",
      category: "paneer",
      price: "Rs. 450",
      image: "Screen Shot 2026-10-22 at 1.39.23 PM.png",
      tags: ["Clay Tandoor", "North Indian"],
      description: "Char-grilled fresh cottage cheese cubes cooked with aromatic spices and bell peppers, complemented with blistering hot butter naan from the clay oven.",
      badge: "Comfort Meal"
    },
    {
      id: "snacks-chowmein",
      name: "Veg & Chicken platter",
      category: "chinese",
      price: "Rs. 180",
      image: "Screen Shot 2026-10-22 at 1.39.40 PM.png",
      tags: ["Chinese & Fast Food", "Quick Bites"],
      description: "Classic stir-fried noodles with crisp garden vegetables, soy-garlic aromatics, and savoury seasoning. Veg: Rs. 180 | Chicken: Rs. 270 | Special: Rs. 350.",
      badge: "Maniki's Pick"
    },
    {
      id: "tandoori-chicken-sekuwa",
      name: "Butter Chicken with Naan",
      category: "chinese",
      price: "Rs. 320",
      image: "Screen Shot 2026-10-22 at 1.39.57 PM.png",
      tags: ["Bar Snacks", "Clay Tandoor"],
      description: "Traditional skewered charred chicken sekuwa (4 sticks: Rs. 320) or Tandoori Chicken Half (Rs. 550), seasoned with roasted Himalayan herbs and lemon.",
      badge: "Lounge Favorite"
    }
  ],

  celebrationHighlights: [
    {
      title: "Private Dining Cabins",
      desc: "Private cozy cabins suited for intimate family dinners, corporate meetings, and confidential gatherings."
    },
    {
      title: "Bespoke Balloon & Party Decor",
      desc: "Customized birthday and anniversary themes, personalized photo booths, lighting, and stage decorations."
    },
    {
      title: "Music & Lounge Mood",
      desc: "Ambient mood lighting, curated playlist, and lively atmosphere that makes every birthday toast unforgettable."
    },
    {
      title: "Customized Party Menus",
      desc: "Special group platter packages with multi-course appetizers, biryani, and dessert setups tailored to your budget."
    }
  ],

  testimonials: [
    {
      name: "Aman Sah",
      role: "Local Guide",
      reviewsCount: "417 reviews",
      rating: 5,
      date: "Recent Google Review",
      text: "Kali Hotel is the best place to dine with family and friends along with that you can conduct birthday and anniversary parties as they provide decoration and early booking of cabin facility as well as they serve very quality food, I recommend having chicken jhol momo, Paneer crispy which is worth it.",
      highlights: ["Chicken Jhol Momo", "Paneer Crispy", "Cabin Facility", "Party Decoration"],
      badge: "Local Guide · 417 Reviews"
    },
    {
      name: "Maniki Agrawal",
      role: "Local Guide",
      reviewsCount: "23 reviews",
      rating: 5,
      date: "Recent Google Review",
      text: "Variants types of Dishes with Tandoori ,Thai,Chinese ,south,Indian,this place offered all types of Dishes with one Roof so it's much more than this too Yummy yummy bites with sip of Coca-Cola with veg chowmin",
      highlights: ["All Cuisines Under One Roof", "Tandoori & Thai", "Veg Chowmein with Coca-Cola"],
      badge: "Local Guide · 23 Reviews"
    },
    {
      name: "Bikash Yadav",
      role: "Janakpur Resident",
      reviewsCount: "64 reviews",
      rating: 5,
      date: "Verified Diner · Janakpur Dham",
      text: "One of our go-to family dinner spots near Ring Road. In Janakpur it's hard to find good parking space in the congested bazaar, but Kali Hotel has very convenient access on Ring Road with safe parking. The chicken biryani is very aromatic and piping hot, and the mutton momos have rich flavor. Prices are very genuine (around 300 to 450 per person) for such clean AC cabins. Highly recommended for families.",
      highlights: ["Ring Road Parking", "Chicken Dum Biryani", "Mutton Momos", "Clean AC Cabins"],
      badge: "Ring Road Resident"
    },
    {
      name: "Pooja Jha",
      role: "Local Diner",
      reviewsCount: "18 reviews",
      rating: 5,
      date: "Verified Diner · Ramanand Chowk",
      text: "We booked one of their private cabins for my sister's birthday celebration last weekend. The staff did lovely balloon decoration without any fuss and the music vibe at the counter was great. Paneer butter masala with hot butter garlic naan was super soft and delicious. Very respectful staff and safe environment for girls and family get-togethers.",
      highlights: ["Birthday Cabin & Balloons", "Butter Garlic Naan", "Paneer Gravy", "Safe Family Ambience"],
      badge: "Celebration Guest"
    },
    {
      name: "Roshan Chaudhary",
      role: "Local Guide",
      reviewsCount: "92 reviews",
      rating: 5,
      date: "Local Guide · Janakpur",
      text: "Visited after Janaki Mandir darshan with friends. The LED bar counter looks stunning in the evening. We ordered crispy chicken chilli, fried rice, and cold drinks. Service was quick despite the weekend crowd. If you are looking for relaxed ambience away from city pollution, this is definitely the best spot on the Ring Road.",
      highlights: ["LED Counter Lounge", "Crispy Chicken Chilli", "Quick Service", "Ring Road Chillout"],
      badge: "Local Guide · 92 Reviews"
    },
    {
      name: "Sunita Mahato",
      role: "Janakpur Resident",
      reviewsCount: "12 reviews",
      rating: 5,
      date: "Verified Diner · Janakpur",
      text: "Best jhol momo in town! The spicy sesame and tomato jhol broth is unmatched, especially in the evening. Very clean restaurant with polite waiters. The private cabin gives total privacy for family dining. Portion sizes are big and totally value for money.",
      highlights: ["Signature Jhol Momo", "Spacious Private Cabins", "Value for Money", "Clean Ambience"],
      badge: "Local Foodie"
    }
  ]
};

module.exports = restaurantData;
