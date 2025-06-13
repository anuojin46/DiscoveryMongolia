const questions = [
  {
    question: "What kind of travel experience are you looking for?",
    options: [
      {
        text: "⛰️ Adventure in the wild",
        scores: { mood: { adventure: 3 }, region: { west: 2, south: 1 } }
      },
      {
        text: "🌅 Calm nature and peace",
        scores: { mood: { calming: 3 }, region: { north: 2, east: 1 } }
      },
      {
        text: "🕍 History and culture",
        scores: { mood: { cultural: 3 }, region: { central: 2 } }
      },
      {
        text: "❤️ Romantic escape",
        scores: { mood: { romantic: 3 }, region: { north: 2, central: 1 } }
      },
      {
        text: "🧘 Spiritual journey",
        scores: { mood: { spiritual: 3 }, region: { central: 2, north: 1 } }
      },
      {
        text: "🐾 Wildlife and nature",
        scores: { mood: { wildlife: 3 }, region: { central: 1, north: 2 } }
      },
      {
        text: "🏕️ Traditional nomadic life",
        scores: { mood: { nomadic: 3 }, region: { central: 2, west: 1 } }
      },
      {
        text: "👨‍👩‍👧‍👦 Fun with family",
        scores: { mood: { family: 3 }, region: { central: 2, south: 1 } }
      },
      {
        text: "🧭 Hidden, remote places",
        scores: { mood: { remote: 3 }, region: { west: 2, north: 1 } }
      },
      {
        text: "🎉 Festivals or seasonal events",
        scores: { mood: { festival: 3 }, region: { central: 1, west: 1, north: 1 } }
      }
    ]
  },

  {
    question: "How active do you want your trip to be?",
    options: [
      {
        text: "💪 Very active (hiking, trekking, horseback)",
        scores: { mood: { adventure: 2, remote: 1 } }
      },
      {
        text: "🚶 Balanced (some walks and rides)",
        scores: { mood: { family: 1, calming: 1 } }
      },
      {
        text: "🧘‍♂️ Mostly relaxed",
        scores: { mood: { calming: 2, romantic: 1 } }
      }
    ]
  },

  {
    question: "Which scenery are you most excited about?",
    options: [
      {
        text: "⛰️ Mountains and valleys",
        scores: { region: { west: 2, north: 1 } }
      },
      {
        text: "🌵 Desert and sand dunes",
        scores: { region: { south: 3 } }
      },
      {
        text: "🌲 Forest and rivers",
        scores: { region: { central: 2, north: 1 } }
      },
      {
        text: "🏞️ Lakes and volcanoes",
        scores: { region: { north: 2, central: 1 } }
      },
      {
        text: "🐎 Endless grassland",
        scores: { region: { east: 2, central: 1 } }
      }
    ]
  },

  {
    question: "How many days do you plan to travel?",
    options: [
      { text: "⏳ 3–4 days", scores: { duration: { short: 3 } } },
      { text: "⏳ 5–7 days", scores: { duration: { medium: 3 } } },
      { text: "⏳ 8–10+ days", scores: { duration: { long: 3 } } }
    ]
  },

  {
    question: "Which of these would you love to experience most?",
    options: [
      { text: "🏕️ Staying with a nomadic family in a ger", scores: { mood: { nomadic: 2 } } },
      { text: "🐫 Camel trekking or horse riding", scores: { mood: { adventure: 2 } } },
      { text: "🧖 Relaxing in hot springs or near a lake", scores: { mood: { calming: 2 } } },
      { text: "🧿 Visiting ancient monasteries", scores: { mood: { spiritual: 2, cultural: 1 } } },
      { text: "🎯 Watching a local festival or game", scores: { mood: { festival: 2 } } }
    ]
  },

  {
    question: "Do you want to explore one region deeply or travel across multiple regions?",
    options: [
      { text: "📍 Stay in one region (less travel)", scores: { region: { central: 1 } } },
      { text: "✈️ Combine 2+ regions (OK with flights or long drives)", scores: { duration: { long: 1 } } }
    ]
  },

  {
    question: "Are you open to off-grid or remote locations?",
    options: [
      { text: "✅ Yes, I love adventure", scores: { mood: { remote: 2, adventure: 1 } } },
      { text: "🤔 Maybe, if it’s safe and beautiful", scores: { mood: { calming: 1 } } },
      { text: "❌ Prefer developed areas", scores: { region: { central: 1 } } }
    ]
  },

  {
    question: "Are you traveling alone, as a couple, with friends, or with family?",
    options: [
      { text: "🧍 Solo", scores: { mood: { spiritual: 1, remote: 1 } } },
      { text: "👩‍❤️‍👨 Couple", scores: { mood: { romantic: 2 } } },
      { text: "👯 Friends", scores: { mood: { adventure: 1, festival: 1 } } },
      { text: "👨‍👩‍👧‍👦 Family with children", scores: { mood: { family: 2 } } }
    ]
  },

  {
    question: "What’s your preferred season for travel?",
    options: [
      { text: "❄️ Winter (Dec–Feb)", scores: { season: "winter" } },
      { text: "🌸 Spring (Mar–May)", scores: { season: "spring" } },
      { text: "☀️ Summer (Jun–Aug)", scores: { season: "summer" } },
      { text: "🍂 Autumn (Sep–Nov)", scores: { season: "autumn" } }
    ]
  },

  {
    question: "Which of these would you be most excited to see in Mongolia?",
    options: [
      { text: "🐎 Naadam festival with horse racing and wrestling", scores: { mood: { festival: 2 } } },
      { text: "🏔️ Glacier and mountain trekking with eagle hunters", scores: { mood: { adventure: 2 }, region: { west: 1 } } },
      { text: "🐫 Riding camels in the Gobi desert", scores: { mood: { adventure: 1 }, region: { south: 2 } } },
      { text: "🛕 Sacred temples and spiritual sites", scores: { mood: { spiritual: 2 } } },
      { text: "🦌 Reindeer herders and alpine lakes", scores: { mood: { wildlife: 2 }, region: { north: 2 } } },
      { text: "💦 Waterfalls, hot springs, and forest lakes", scores: { mood: { calming: 2 }, region: { central: 1 } } }
    ]
  }
];
