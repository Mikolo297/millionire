const questions = [
    {
      question: "Who is Nigeria’s current Chief of Justice?",
      options: ["Walter Onnoghen", "Tanko Muhammad", "Olukayode Ariwoola", "Ibrahim Tanko"],
      answer: "Olukayode Ariwoola"
    },
    {
      question: "In Nigeria, democracy day is now celebrated on:",
      options: ["May 29", "October 1", "June 12", "June 1"],
      answer: "June 12"
    },
    {
      question: "Which is the most populated country in the world?",
      options: ["India", "USA", "China", "Indonesia"],
      answer: "China"
    },
    {
      question: "Nigeria’s Inspector General of Police is?",
      options: ["Usman Alkali Baba", "Kayode Egbetokun", "Mohammed Adamu", "Ibrahim Idris"],
      answer: "Kayode Egbetokun"
    },
    {
      question: "Which is the second-largest continent in the world?",
      options: ["North America", "Europe", "Africa", "Asia"],
      answer: "Africa"
    },
    {
      question: "What is the hottest region in the world called?",
      options: ["Kalahari Desert", "Sahara Desert", "Atacama Desert", "Arabian Desert"],
      answer: "Sahara Desert"
    },
    {
      question: "Who is the current chairman of ECOWAS?",
      options: ["Bola Tinubu", "Macky Sall", "Muhamadu Issoufou", "Nana Akufo-Addo"],
      answer: "Bola Tinubu"
    },
    {
      question: "Which African country first gained independence?",
      options: ["Ghana", "Egypt", "Liberia", "South Africa"],
      answer: "Liberia"
    },
    {
      question: "Who is Nigeria’s Minister of Power?",
      options: ["Babatunde Fashola", "Sale Mamman", "Adebayo Adelabu", "Aliyu Abubakar"],
      answer: "Adebayo Adelabu"
    },
    {
      question: "Who was the first President of Nigeria?",
      options: ["Tafawa Balewa", "Nnamdi Azikiwe", "Yakubu Gowon", "Olusegun Obasanjo"],
      answer: "Nnamdi Azikiwe"
    },
    {
      question: "Who is the current Sultan of the Sokoto Caliphate?",
      options: ["Abubakar Shekau", "Sa’ad Abubakar", "Muhammadu Salad Abubakar", "Sani Abacha"],
      answer: "Sa’ad Abubakar"
    },
    {
      question: "Who is the current Governor of the Central Bank of Nigeria?",
      options: ["Godwin Emefiele", "Olayemi Cardoso", "Sanusi Lamido", "Okonjo Iweala"],
      answer: "Olayemi Cardoso"
    },
    {
      question: "What does the acronym ECOMOG mean?",
      options: [
        "ECOWAS Communication Group",
        "Economic Committee for Monitoring Oil & Gas",
        "Economic Community Monitoring Group",
        "Economic Coalition for Member States"
      ],
      answer: "Economic Community Monitoring Group"
    },
    {
      question: "Which is the highest mountain in Africa?",
      options: ["Mount Kenya", "Mount Cameroon", "Mount Kilimanjaro", "Mount Elgon"],
      answer: "Mount Kilimanjaro"
    },
    {
      question: "Who is the current Senate President of Nigeria?",
      options: ["Ahmed Lawan", "Bukola Saraki", "Godswill Akpabio", "Rochas Okorocha"],
      answer: "Godswill Akpabio"
    },
    {
      question: "Which continent is the smallest in the world?",
      options: ["Europe", "Australia", "Antarctica", "South America"],
      answer: "Australia"
    },
    {
      question: "Who formed the first political party in Nigeria?",
      options: ["Nnamdi Azikiwe", "Obafemi Awolowo", "Herbert Macaulay", "Tafawa Balewa"],
      answer: "Herbert Macaulay"
    },
    {
      question: "What was the first political party in Nigeria?",
      options: ["NCNC", "AG", "NNDP", "NPC"],
      answer: "NNDP"
    },
    {
      question: "How many Local Government Areas are in Nigeria?",
      options: ["768", "774", "780", "771"],
      answer: "774"
    },
    {
      question: "Which state in Nigeria has the largest number of Local Government Areas?",
      options: ["Lagos", "Kaduna", "Kano", "Rivers"],
      answer: "Kano"
    },
    {
      question: "What does the term MDGs stand for?",
      options: [
        "Millennium Democratic Goals",
        "Modern Development Goals",
        "Millennium Development Goals",
        "Multi-level Development Goals"
      ],
      answer: "Millennium Development Goals"
    },
    {
      question: "How many countries constitute ECOWAS?",
      options: ["15", "16", "13", "10"],
      answer: "15"
    },
    {
      question: "General Yakubu Gowon created how many states in Nigeria in May 1967?",
      options: ["10", "12", "8", "19"],
      answer: "12"
    },
    {
      question: "Who was the first Executive President of Nigeria?",
      options: ["Olusegun Obasanjo", "Goodluck Jonathan", "Shehu Shagari", "Nnamdi Azikiwe"],
      answer: "Shehu Shagari"
    },
    {
      question: "Who is the current Managing Director of NNPC?",
      options: ["Mele Kyari", "Andrew Yakubu", "Maikanti Baru", "Timipre Sylva"],
      answer: "Mele Kyari"
    },
    {
      question: "Who was the longest-serving Senate President of Nigeria?",
      options: ["David Mark", "Joseph Wayas", "Bukola Saraki", "Ken Nnamani"],
      answer: "David Mark"
    },
    {
      question: "Which state in Nigeria has the smallest number of LGAs?",
      options: ["Ekiti", "Bayelsa", "FCT", "Zamfara"],
      answer: "Bayelsa"
    },
    {
      question: "Who is the current INEC Chairman?",
      options: ["Attahiru Jega", "Mahmood Yakubu", "Festus Okoye", "Amina Zakari"],
      answer: "Mahmood Yakubu"
    },
    {
      question: "Which is the second most populated country in the world?",
      options: ["Nigeria", "China", "India", "USA"],
      answer: "India"
    },
    {
      question: "What is Nigeria's official language?",
      options: ["French", "Yoruba", "Hausa", "English"],
      answer: "English"
    },
    {
      question: "When was Nigeria declared and recognized as a nation?",
      options: ["Oct 1, 1959", "Oct 1, 1960", "May 29, 1999", "Jan 1, 1961"],
      answer: "Oct 1, 1960"
    },
    {
      question: "How many continents are there in the world?",
      options: ["6", "5", "7", "8"],
      answer: "7"
    },
    {
      question: "How many senators make up the National Assembly of Nigeria?",
      options: ["108", "109", "110", "111"],
      answer: "109"
    },
    {
      question: "How many members does the House of Representatives of Nigeria have?",
      options: ["350", "360", "370", "365"],
      answer: "360"
    },
    {
      question: "Who was the first female NAFDAC Chairman?",
      options: ["Ngozi Okonjo-Iweala", "Dora Akunyili", "Diezani Alison-Madueke", "Kema Chikwe"],
      answer: "Dora Akunyili"
    },
    {
      question: "Which is the highest court of law in Nigeria?",
      options: ["Court of Appeal", "High Court", "Supreme Court", "Federal Court"],
      answer: "Supreme Court"
    },
    {
      question: "Which is the oldest degree-awarding university in Nigeria?",
      options: ["UNILAG", "ABU Zaria", "UNN Nsukka", "University of Ibadan"],
      answer: "University of Ibadan"
    },
    {
      question: "What is the most common natural resource in Nigeria?",
      options: ["Coal", "Petroleum", "Gold", "Tin"],
      answer: "Petroleum"
    },
    {
      question: "How many countries are in Europe?",
      options: ["50", "48", "44", "47"],
      answer: "44"
    },
    {
      question: "Who was the first African Bishop?",
      options: ["Tunde Bakare", "Samuel Ajayi Crowther", "Benson Idahosa", "Matthew Kukah"],
      answer: "Samuel Ajayi Crowther"
    },
    {
      question: "Which country was the last to win independence from colonial rule?",
      options: ["Namibia", "Angola", "South Africa", "Zimbabwe"],
      answer: "Namibia"
    },
    {
      question: "Where was crude oil first discovered in Nigeria?",
      options: ["Warri", "Port Harcourt", "Oloibiri", "Bonny"],
      answer: "Oloibiri"
    },
    {
      question: "Who was the first Nigerian to become a Nobel Laureate?",
      options: ["Chinua Achebe", "Wole Soyinka", "Ben Okri", "Chimamanda Adichie"],
      answer: "Wole Soyinka"
    },
    {
      question: "Who is the Nigerian current speaker of the House of Representatives?",
      options: ["Femi Gbajabiamila", "Yakubu Dogara", "Tajudeen Abbas", "Aminu Tambuwal"],
      answer: "Tajudeen Abbas"
    },
    {
      question: "How long does it take Mars to complete one revolution?",
      options: ["365 days", "687 days", "225 days", "730 days"],
      answer: "687 days"
    },
    {
      question: "What did the black shield in the Nigerian coat of arms stand for?",
      options: ["The oil wealth", "Nigeria’s strength", "Nigeria’s fertile soil", "The military force"],
      answer: "Nigeria’s fertile soil"
    },
     {
          question: "The art and science of crop and livestock production is called",
          options: ["Agriculture", "Science", "Agronomy", "Forestry"],
          answer: "Agriculture"
        },
        {
          question: "The word agriculture is derived from the _______ word",
          options: ["Latin", "English", "French", "Greek"],
          answer: "Latin"
        },
        {
          question: "Which of the following crops is not a food crop?",
          options: ["Maize", "Rice", "Cassava", "Cotton"],
          answer: "Cotton"
        },
        {
          question: "Which of the following crops is not a grain crop?",
          options: ["Maize", "Wheat", "Rice", "Mango"],
          answer: "Mango"
        },
        {
          question: "The external morphology of a plant refers to its",
          options: ["Root", "Shoot", "Leaf", "Structure"],
          answer: "Structure"
        },
        {
          question: "The process of bringing in a new crop or animal into an area is called",
          options: ["Domestication", "Acclimatization", "Inoculation", "Introduction"],
          answer: "Introduction"
        },
        {
          question: "The process of selecting and breeding crops of desirable qualities is called",
          options: ["Mass selection", "Pure-line", "Hybridization", "Acclimatization"],
          answer: "Pure-line"
        },
        {
          question: "Deficiency of which element causes chlorosis in plants?",
          options: ["Potassium", "Phosphorus", "Calcium", "Manganese"],
          answer: "Manganese"
        },
        {
          question: "Which of the following is the first visible symptom of water stress in plants?",
          options: ["The plant wilts", "The leaves turn yellow", "The stem dies", "The plant dies"],
          answer: "The plant wilts"
        },
        {
          question: "One advantage of artificial propagation in plants is that",
          options: ["It takes a longer time to fruit", "It uses too much water", "Possible failure of fertilization is avoided", "It results in tall plants"],
          answer: "Possible failure of fertilization is avoided"
        },
      
        {
          question: "What is the main staple crop grown in Nigeria?",
          options: ["Maize", "Rice", "Cassava", "Yam"],
          answer: "Cassava"
        },
        {
          question: "Which region of Nigeria is best known for groundnut production?",
          options: ["North East", "South West", "North West", "South East"],
          answer: "North West"
        },
        {
          question: "Which agricultural product is Nigeria the largest producer of in Africa?",
          options: ["Cocoa", "Rice", "Palm oil", "Cassava"],
          answer: "Cassava"
        },
        {
          question: "Which type of farming is commonly practiced in the Niger Delta region?",
          options: ["Fish farming", "Cattle rearing", "Poultry farming", "Crop farming"],
          answer: "Fish farming"
        },
        {
          question: "What is the major problem affecting agriculture in northern Nigeria?",
          options: ["Soil erosion", "Excessive rainfall", "Desertification", "Flooding"],
          answer: "Desertification"
        },
        {
          question: "Which Nigerian state is known for large-scale rice production?",
          options: ["Lagos", "Kano", "Benue", "Kebbi"],
          answer: "Kebbi"
        },
        {
          question: "What is the primary purpose of irrigation in agriculture?",
          options: ["Prevent weeds", "Supply water to crops", "Increase soil fertility", "Control pests"],
          answer: "Supply water to crops"
        },
        {
          question: "What livestock is commonly reared in the Fulani culture?",
          options: ["Goats", "Cattle", "Chickens", "Pigs"],
          answer: "Cattle"
        },
        {
          question: "Which crop is a major export product of Nigeria?",
          options: ["Yam", "Maize", "Cocoa", "Sorghum"],
          answer: "Cocoa"
        },
        {
          question: "Which farming system involves rotating crops each season?",
          options: ["Monocropping", "Mixed farming", "Crop rotation", "Shifting cultivation"],
          answer: "Crop rotation"
        },
        {
          question: "Which of the following is a cereal crop?",
          options: ["Cassava", "Maize", "Yam", "Cocoa"],
          answer: "Maize"
        },
        {
          question: "Which organization supports agriculture development in Nigeria?",
          options: ["NTA", "CBN", "IFAD", "INEC"],
          answer: "IFAD"
        },
        {
          question: "Which state is the largest producer of oil palm in Nigeria?",
          options: ["Delta", "Ondo", "Enugu", "Cross River"],
          answer: "Cross River"
        },
        {
          question: "What is the most common type of soil in southern Nigeria?",
          options: ["Clay", "Sandy", "Loamy", "Laterite"],
          answer: "Loamy"
        },
        {
          question: "Which of the following is not a method of soil conservation?",
          options: ["Terracing", "Mulching", "Overgrazing", "Contour plowing"],
          answer: "Overgrazing"
        },
        {
          question: "Which pest affects maize crops in Nigeria?",
          options: ["Armyworm", "Weevil", "Aphid", "Bollworm"],
          answer: "Armyworm"
        },
        {
          question: "Which fertilizer is organic?",
          options: ["Urea", "NPK", "Compost", "Superphosphate"],
          answer: "Compost"
        },
        {
          question: "What is the full meaning of NAFDAC?",
          options: ["Nigerian Agricultural Food and Drug Control", "National Agency for Food and Drug Administration and Control", "Nigerian Food and Drug Approval Committee", "National Agricultural Fertilizer Distribution and Control"],
          answer: "National Agency for Food and Drug Administration and Control"
        },
        {
          question: "Which crop grows best in swampy areas?",
          options: ["Rice", "Yam", "Maize", "Millet"],
          answer: "Rice"
        },
        {
          question: "Which season is best for planting maize in Nigeria?",
          options: ["Harmattan", "Dry season", "Rainy season", "Cold season"],
          answer: "Rainy season"
        },
        {
          question: "Which animal provides both milk and meat?",
          options: ["Sheep", "Goat", "Cow", "Pig"],
          answer: "Cow"
        },
        {
          question: "Which farming tool is used for tilling the soil?",
          options: ["Hoe", "Cutlass", "Sickle", "Rake"],
          answer: "Hoe"
        },
        {
          question: "Which disease affects poultry birds?",
          options: ["Newcastle disease", "Foot rot", "Anthrax", "Swine fever"],
          answer: "Newcastle disease"
        },
        {
          question: "What is animal husbandry?",
          options: ["Growing crops", "Caring for animals", "Harvesting crops", "Fishing"],
          answer: "Caring for animals"
        },
        {
          question: "Which farming practice involves the use of chemicals to kill pests?",
          options: ["Irrigation", "Fertilization", "Weeding", "Pest control"],
          answer: "Pest control"
        },
        {
          question: "What is the main source of protein in Nigerian diets?",
          options: ["Yam", "Beans", "Maize", "Rice"],
          answer: "Beans"
        },
        {
          question: "Which region in Nigeria is known for cattle rearing?",
          options: ["North Central", "South West", "South South", "North East"],
          answer: "North East"
        },
        {
          question: "Which of these is a tuber crop?",
          options: ["Cocoa", "Rice", "Cassava", "Millet"],
          answer: "Cassava"
        },
        {
          question: "Which is an effect of overgrazing?",
          options: ["Improved soil fertility", "Desertification", "Increased rainfall", "Flooding"],
          answer: "Desertification"
        },
        {
          question: "What is the function of the Ministry of Agriculture?",
          options: ["Supervising schools", "Promoting farming", "Building roads", "Managing electricity"],
          answer: "Promoting farming"
        },
        {
          question: "Which crop is best suited for upland areas?",
          options: ["Rice", "Cocoa", "Sugarcane", "Pineapple"],
          answer: "Cocoa"
        },
        {
          question: "Which method is used to raise fish in artificial ponds?",
          options: ["Netting", "Trapping", "Aquaculture", "Fishing"],
          answer: "Aquaculture"
        },
        {
          question: "Which agricultural sector deals with crop production?",
          options: ["Horticulture", "Apiculture", "Sericulture", "Animal husbandry"],
          answer: "Horticulture"
        },
        {
          question: "What is the benefit of crop rotation?",
          options: ["Reduces crop yield", "Increases soil erosion", "Improves soil fertility", "Increases pests"],
          answer: "Improves soil fertility"
        },
        {
          question: "Which crop is processed into garri?",
          options: ["Maize", "Cassava", "Yam", "Rice"],
          answer: "Cassava"
        },
        {
          question: "What does a sickle do?",
          options: ["Plant seeds", "Clear land", "Harvest crops", "Till soil"],
          answer: "Harvest crops"
        },
        {
          question: "Which insect pollinates crops?",
          options: ["Termite", "Bee", "Mosquito", "Grasshopper"],
          answer: "Bee"
        }
       
      ];
      
    
  let score = 0;
  let currentQuestionIndex = 0;

  const questionTitle = document.getElementById("question-title");
  const questionText = document.getElementById("question-text");
  const answersContainer = document.querySelector(".answers");
  const loadQuestionButton = document.getElementById("load-question");
  const questionContainer = document.getElementById("question-container");
  const gameOverContainer = document.getElementById("game-over");
  const finalScore = document.getElementById("final-score");
  const restartButton = document.getElementById("restart-game");

  function loadQuestion() {
    const questionNumberInput = document.getElementById("question-number").value;
    const questionNumber = parseInt(questionNumberInput, 10);

    if (isNaN(questionNumber) || questionNumber < 1 || questionNumber > questions.length) {
      alert("Please enter a valid question number.");
      return;
    }

    currentQuestionIndex = questionNumber - 1;
    showQuestion();
  }

  function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
      endGame();
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.innerText = `Question ${currentQuestionIndex + 1}`;
    questionText.innerText = currentQuestion.question;

    answersContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option;
      button.addEventListener("click", () => handleAnswer(option, currentQuestion));
      answersContainer.appendChild(button);
    });

    questionContainer.classList.remove("hide");
  }

  function handleAnswer(selectedAnswer, currentQuestion) {
    const userAnswer = selectedAnswer.trim().toLowerCase();
    const correct = currentQuestion.answer.trim().toLowerCase();

    if (userAnswer === correct) {
      score += 1000;
      alert("Correct! You've earned $1000");
      currentQuestionIndex++;
      showQuestion();
    } else {
      alert(`Incorrect! The correct answer was: ${currentQuestion.answer}`);
      endGame();
    }
  }

  function endGame() {
    finalScore.innerText = score;
    gameOverContainer.classList.remove("hide");
    questionContainer.classList.add("hide");
  }

  function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    gameOverContainer.classList.add("hide");
    questionContainer.classList.add("hide");
    document.getElementById("question-number").value = '';
  }

  loadQuestionButton.addEventListener("click", loadQuestion);
  restartButton.addEventListener("click", restartGame);

