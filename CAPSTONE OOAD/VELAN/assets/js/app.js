(function () {
  "use strict";

  const translations = {
    en: {
      home: "Home", register: "Farmer Registration", login: "Farmer Login", dashboard: "Farmer Dashboard",
      detection: "Disease Detection", history: "Report History", advisory: "Agricultural Advisory", expert: "Expert Dashboard",
      language: "Language", tagline: "Healthy Crops. Smarter Farming.", subtitle: "Smart Crop Disease Detection & Agricultural Advisory",
      getStarted: "Get started", signIn: "Sign in", exploreDashboard: "Explore dashboard", learnMore: "Learn more",
      homeEyebrow: "A thoughtful companion for every growing season", heroTitle: "Healthy crops.<br><span>Smarter farming.</span>",
      heroCopy: "A simpler way to prepare crop reports, explore practical growing guidance, and stay connected to the support your farm deserves.",
      trust1: "Designed with farmers in mind", trust2: "English · தமிழ் · हिन्दी", trust3: "A clear path to expert support",
      featureEyebrow: "A little help for a growing season", featureTitle: "The tools to help you grow with confidence",
      featureIntro: "Practical farm support, thoughtfully brought together in one friendly place.",
      featureDetect: "Prepare a crop report", featureDetectCopy: "Upload a crop photo and prepare the information needed for a future disease review. AI analysis is not enabled yet.",
      featureAdvice: "Grow with better guidance", featureAdviceCopy: "Explore simple, general crop-care reminders to help you make informed next steps.",
      featureHistory: "Keep things in view", featureHistoryCopy: "See how a report history can look. Example entries are clearly identified as sample data.",
      aboutEyebrow: "Made for the people who grow our food", aboutTitle: "Good decisions start with clear, helpful information.",
      aboutCopy: "VELAN AI brings farmer accounts and crop-health guidance together in one friendly place. Disease analysis and expert services are not enabled in this stage.",
      aboutBullet1: "A clean, easy-to-use experience on phone or computer", aboutBullet2: "Language choices for English, Tamil, and Hindi", aboutBullet3: "A foundation ready for future expert and AI integrations",
      aboutAction: "Take a look around", footerDescription: "Smart Crop Disease Detection & Agricultural Advisory.",
      quickLinks: "Explore", usefulLinks: "Useful links", footerNote: "Stage 1 website preview · No accounts or reports are stored.",
      pageRegister: "Farmer Registration", registerIntro: "Create your farmer account to access your personal dashboard.",
      formName: "Full name", formPhone: "Phone number", formEmail: "Email address", formLocation: "Village / town", formState: "State", formFarm: "Main crop", formPassword: "Password", formConfirm: "Confirm password",
      selectCrop: "Select a crop", cropRice: "Rice", cropWheat: "Wheat", cropCotton: "Cotton", cropTomato: "Tomato", cropOther: "Other",
      selectState: "Select a state", stateTamilNadu: "Tamil Nadu", stateAndhra: "Andhra Pradesh", stateKarnataka: "Karnataka", stateKerala: "Kerala", stateOther: "Other",
      createProfile: "Preview registration", registrationNotice: "Demo only: your details are checked in this browser and are not saved or sent anywhere.",
      alreadyAccount: "Already have a profile?", signInHere: "Sign in here", pageLogin: "Farmer Login", loginIntro: "Welcome back. Sign in to your farmer account.",
      password: "Password", remember: "Remember me", previewLogin: "Preview sign in", noAccount: "New to VELAN AI?", registerHere: "Create a profile",
      loginNotice: "Demo only: sign-in is not connected to an account service. No credentials are stored or sent.",
      welcomeFarmer: "Welcome, farmer", dashboardIntro: "A quick look at the tools and reports for your farm.",
      sampleLabel: "Illustrative sample data — not live farm information", reportsMade: "Reports prepared", cropsTracked: "Crops tracked", adviceTips: "General care tips", expertReplies: "Expert replies",
      sampleReportNote: "Example figures only", sampleCrops: "Example crop categories", sampleAdvice: "General information", sampleReplies: "Not connected",
      recentReports: "Recent report examples", viewHistory: "View history", cropRice: "Rice", cropTomato: "Tomato", cropCotton: "Cotton",
      sampleDate1: "Sample · 12 Oct", sampleDate2: "Sample · 08 Oct", sampleDate3: "Sample · 02 Oct", awaitingReview: "Awaiting review", draftOnly: "Example draft", demoEntry: "Illustrative entry",
      weatherTitle: "Seasonal reminder", weatherPlace: "General information · not a local forecast", weatherTemp: "Plan ahead", weatherDetail: "Check local forecasts before field work.",
      quickActions: "Quick actions", prepareReport: "Prepare a crop report", browseAdvice: "Browse general advice", openExpert: "Expert dashboard preview",
      pageDetection: "Crop Disease Reporting", detectionIntro: "Add a clear crop photo and a few details to prepare a report. Automated analysis is not available in Stage 1.",
      uploadTitle: "Add a crop photo", uploadHint: "Choose an image or drag it here", uploadFormats: "JPG, PNG or WEBP · up to 10 MB", chooseImage: "Choose image",
      cropType: "Crop type", cropCondition: "What have you noticed?", conditionHint: "For example: spots, wilting, or colour changes. This is not a diagnosis.",
      prepareSampleReport: "Preview report form", removeImage: "Remove image", reportPhotoHint: "Your preview stays in this browser tab and is not uploaded.",
      nextSteps: "What happens next?", stepOne: "Add a clear photo", stepOneCopy: "Photograph the affected part in good natural light.",
      stepTwo: "Share what you noticed", stepTwoCopy: "A few details can help a future reviewer understand the crop.",
      stepThree: "Get the right help", stepThreeCopy: "AI analysis and expert review are not connected in this preview.",
      honestNotice: "This Stage 1 page does not identify diseases or provide AI predictions. Do not rely on it for crop treatment decisions.",
      pageHistory: "Report History", historyIntro: "A preview of how crop reports could be organized when storage is added.",
      searchReports: "Search sample reports", historySampleNote: "All rows below are illustrative sample data—not actual farmer reports.",
      tableDate: "Date", tableCrop: "Crop", tableDetails: "Farmer note", tableStatus: "Status", tableAction: "Action",
      noteLeaves: "Leaf colour change", noteSpots: "Spots noticed", noteWilting: "Wilting in field", statusSample: "Sample only", viewSample: "Preview",
      noMatches: "No sample reports match that search.", pageAdvisory: "Agricultural Advisory", advisoryIntro: "Explore general crop-care reminders. These are educational examples, not location-specific or expert advice.",
      adviceCategory1: "Good practice", adviceTitle1: "Check leaves regularly", adviceCopy1: "A quick, consistent look at both sides of leaves can help you notice changes early. Note what you see and when it started.",
      adviceCategory2: "Water management", adviceTitle2: "Water with the crop in mind", adviceCopy2: "Water needs vary with crop, soil, growth stage, and weather. Check local guidance and avoid assuming one schedule suits every field.",
      adviceCategory3: "Field hygiene", adviceTitle3: "Keep simple field notes", adviceCopy3: "Record crop variety, planting date, and changes you observe. These notes can be useful when speaking with a local agricultural expert.",
      adviceCategory4: "Get local support", adviceTitle4: "Ask before treating", adviceCopy4: "If you are worried about crop health, contact your local agricultural extension service or a qualified expert before using any treatment.",
      advisoryDisclaimer: "General educational information only. Conditions differ by location and crop. Confirm recommendations with a qualified local agricultural professional before taking action.",
      pageExpert: "Expert Dashboard", expertIntro: "A preview of a future review workspace. No farmer reports or expert replies are connected.",
      expertSampleNote: "Illustrative requests only — no real submissions", pendingReports: "Example queue", reviewedReports: "Example reviewed", expertsOnline: "Expert accounts", sampleOnly: "All sample data",
      reviewQueue: "Example report queue", farmerSample: "Sample farmer", locationSample: "Example location", requestInfo: "Sample request", buttonDetails: "Preview details", buttonReply: "Reply preview",
      expertNotice: "Review and reply actions are demos. No messages are sent, and no farmer data is stored.",
      requiredField: "Please complete this field.", invalidPhone: "Enter a valid phone number.", invalidEmail: "Enter a valid email address.", passwordShort: "Use at least 8 characters.", passwordMismatch: "The passwords do not match.",
      previewSuccess: "Form preview complete. No details were stored or sent.", loginFeedback: "Sign-in preview only. No account was contacted.",
      noImage: "Please choose a crop photo first.", imageTooLarge: "Please choose an image smaller than 10 MB.", imageUnsupported: "Choose a JPG, PNG, or WEBP image.",
      imageReady: "Image preview ready. It has not been uploaded or analyzed.", imageRemoved: "Image preview removed.", detectionDisabled: "AI disease detection is not enabled yet. Your image was not uploaded or analyzed.",
      expertDemo: "Preview only: expert replies and report actions are not connected.", menuOpen: "Open navigation menu", menuClose: "Close navigation menu",
      actionPreview: "Preview"
    },
    ta: {
      home: "முகப்பு", register: "விவசாயி பதிவு", login: "விவசாயி உள்நுழைவு", dashboard: "விவசாயி முகப்புப்பலகை",
      detection: "நோய் கண்டறிதல்", history: "அறிக்கை வரலாறு", advisory: "வேளாண் ஆலோசனை", expert: "நிபுணர் முகப்புப்பலகை",
      language: "மொழி", tagline: "ஆரோக்கியமான பயிர்கள். புத்திசாலியான விவசாயம்.", subtitle: "பயிர் நோய் கண்டறிதல் மற்றும் வேளாண் ஆலோசனை",
      getStarted: "தொடங்குங்கள்", signIn: "உள்நுழைக", exploreDashboard: "முகப்புப்பலகையைப் பாருங்கள்", learnMore: "மேலும் அறிக",
      homeEyebrow: "ஒவ்வொரு பயிர் பருவத்திற்கும் உதவும் துணை", heroTitle: "ஆரோக்கியமான பயிர்கள்.<br><span>புத்திசாலியான விவசாயம்.</span>",
      heroCopy: "பயிர் அறிக்கைகளைத் தயாரிக்கவும், நடைமுறை வழிகாட்டுதல்களைப் பார்க்கவும், உங்கள் பண்ணைக்கான ஆதரவை அறியவும் எளிய வழி.",
      trust1: "விவசாயிகளுக்காக வடிவமைக்கப்பட்டது", trust2: "ஆங்கிலம் · தமிழ் · இந்தி", trust3: "நிபுணர் உதவிக்கான தெளிவான வழி",
      featureEyebrow: "வளரும் பருவத்திற்கான சிறிய உதவி", featureTitle: "நம்பிக்கையுடன் வளர உதவும் கருவிகள்",
      featureIntro: "பண்ணை ஆதரவுக்கான நடைமுறை அம்சங்கள் ஒரே இடத்தில்.",
      featureDetect: "பயிர் அறிக்கையைத் தயாரிக்கவும்", featureDetectCopy: "புகைப்படத்தைச் சேர்த்து, எதிர்கால நோய் மதிப்பாய்வுக்கான தகவல்களைத் தயாரிக்கவும். AI ஆய்வு இன்னும் செயல்படுத்தப்படவில்லை.",
      featureAdvice: "சிறந்த வழிகாட்டுதலுடன் வளருங்கள்", featureAdviceCopy: "அடுத்த நடவடிக்கைகளைத் தீர்மானிக்க உதவும் பொதுவான பயிர் பராமரிப்பு நினைவூட்டல்களைப் பாருங்கள்.",
      featureHistory: "தகவல்களை ஒரே இடத்தில் காண்க", featureHistoryCopy: "அறிக்கை வரலாறு எப்படி இருக்கும் என்பதைப் பாருங்கள். எடுத்துக்காட்டு தரவு தெளிவாகக் குறிப்பிடப்பட்டுள்ளது.",
      aboutEyebrow: "நம் உணவை விளைவிப்பவர்களுக்காக", aboutTitle: "தெளிவான, பயனுள்ள தகவல்களிலிருந்து நல்ல முடிவுகள் தொடங்குகின்றன.",
      aboutCopy: "விவசாயி கணக்குகளையும் பயிர் ஆரோக்கிய வழிகாட்டுதலையும் ஒரே இடத்தில் VELAN AI வழங்குகிறது. இந்தக் கட்டத்தில் நோய் ஆய்வும் நிபுணர் சேவைகளும் செயல்படுத்தப்படவில்லை.",
      aboutBullet1: "கைபேசி மற்றும் கணினியில் எளிதாகப் பயன்படுத்தலாம்", aboutBullet2: "ஆங்கிலம், தமிழ், இந்தி மொழித் தேர்வுகள்", aboutBullet3: "எதிர்கால நிபுணர் மற்றும் AI இணைப்புகளுக்கான அடித்தளம்",
      aboutAction: "சுற்றிப் பாருங்கள்", footerDescription: "பயிர் நோய் கண்டறிதல் மற்றும் வேளாண் ஆலோசனை.",
      quickLinks: "பார்க்க", usefulLinks: "பயனுள்ள இணைப்புகள்", footerNote: "முதல் கட்ட இணையதள முன்னோட்டம் · கணக்குகள் அல்லது அறிக்கைகள் சேமிக்கப்படுவதில்லை.",
      pageRegister: "விவசாயி பதிவு", registerIntro: "தனிப்பட்ட முகப்புப்பலகையைப் பயன்படுத்த விவசாயி கணக்கை உருவாக்கவும்.",
      formName: "முழுப் பெயர்", formPhone: "தொலைபேசி எண்", formEmail: "மின்னஞ்சல் முகவரி", formLocation: "கிராமம் / ஊர்", formState: "மாநிலம்", formFarm: "முக்கிய பயிர்", formPassword: "கடவுச்சொல்", formConfirm: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
      selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்", cropRice: "நெல்", cropWheat: "கோதுமை", cropCotton: "பருத்தி", cropTomato: "தக்காளி", cropOther: "மற்றவை",
      selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்", stateTamilNadu: "தமிழ்நாடு", stateAndhra: "ஆந்திரப் பிரதேசம்", stateKarnataka: "கர்நாடகா", stateKerala: "கேரளா", stateOther: "மற்றவை",
      createProfile: "பதிவு முன்னோட்டம்", registrationNotice: "செயல்விளக்கம் மட்டும்: விவரங்கள் இந்த உலாவியில் சரிபார்க்கப்படும்; சேமிக்கவோ அனுப்பவோ மாட்டாது.",
      alreadyAccount: "ஏற்கனவே கணக்கு உள்ளதா?", signInHere: "இங்கே உள்நுழைக", pageLogin: "விவசாயி உள்நுழைவு", loginIntro: "மீண்டும் வருக. உங்கள் விவசாயி கணக்கில் உள்நுழைக.",
      password: "கடவுச்சொல்", remember: "என்னை நினைவில் கொள்ளவும்", previewLogin: "உள்நுழைவு முன்னோட்டம்", noAccount: "VELAN AI-க்கு புதியவரா?", registerHere: "சுயவிவரத்தை உருவாக்கவும்",
      loginNotice: "செயல்விளக்கம் மட்டும்: உள்நுழைவு கணக்கு சேவையுடன் இணைக்கப்படவில்லை. விவரங்கள் சேமிக்கவோ அனுப்பவோ மாட்டாது.",
      welcomeFarmer: "விவசாயிக்கு வரவேற்பு", dashboardIntro: "உங்கள் பண்ணைக்கான கருவிகள் மற்றும் அறிக்கைகளின் சுருக்கம்.",
      sampleLabel: "மாதிரி எடுத்துக்காட்டு தரவு — நேரடி பண்ணைத் தகவல் அல்ல", reportsMade: "தயாரித்த அறிக்கைகள்", cropsTracked: "கண்காணித்த பயிர்கள்", adviceTips: "பராமரிப்பு குறிப்புகள்", expertReplies: "நிபுணர் பதில்கள்",
      sampleReportNote: "எடுத்துக்காட்டு எண்ணிக்கை மட்டும்", sampleCrops: "எடுத்துக்காட்டு பயிர் வகைகள்", sampleAdvice: "பொதுவான தகவல்", sampleReplies: "இணைக்கப்படவில்லை",
      recentReports: "சமீபத்திய அறிக்கை எடுத்துக்காட்டுகள்", viewHistory: "வரலாற்றைப் பார்க்க", cropRice: "நெல்", cropTomato: "தக்காளி", cropCotton: "பருத்தி",
      sampleDate1: "மாதிரி · அக். 12", sampleDate2: "மாதிரி · அக். 08", sampleDate3: "மாதிரி · அக். 02", awaitingReview: "மதிப்பாய்வு இல்லை", draftOnly: "எடுத்துக்காட்டு வரைவு", demoEntry: "விளக்க எடுத்துக்காட்டு",
      weatherTitle: "பருவகால நினைவூட்டல்", weatherPlace: "பொதுத் தகவல் · உள்ளூர் வானிலை முன்னறிவிப்பு அல்ல", weatherTemp: "முன்கூட்டியே திட்டமிடுங்கள்", weatherDetail: "வயல் பணிக்கு முன் உள்ளூர் முன்னறிவிப்பைப் பாருங்கள்.",
      quickActions: "விரைவு செயல்கள்", prepareReport: "பயிர் அறிக்கையைத் தயாரிக்கவும்", browseAdvice: "பொது ஆலோசனையைப் பார்க்க", openExpert: "நிபுணர் முகப்புப்பலகை முன்னோட்டம்",
      pageDetection: "பயிர் நோய் அறிக்கையிடல்", detectionIntro: "தெளிவான பயிர் புகைப்படத்தையும் சில விவரங்களையும் சேர்த்து அறிக்கையைத் தயாரிக்கவும். முதல் கட்டத்தில் தானியங்கி ஆய்வு கிடையாது.",
      uploadTitle: "பயிர் புகைப்படத்தைச் சேர்க்கவும்", uploadHint: "படத்தைத் தேர்ந்தெடுக்கவும் அல்லது இங்கே இழுத்துவிடவும்", uploadFormats: "JPG, PNG அல்லது WEBP · அதிகபட்சம் 10 MB", chooseImage: "படத்தைத் தேர்ந்தெடுக்கவும்",
      cropType: "பயிர் வகை", cropCondition: "நீங்கள் கவனித்தது என்ன?", conditionHint: "எடுத்துக்காட்டு: புள்ளிகள், வாடல் அல்லது நிறமாற்றம். இது நோய் கண்டறிதல் அல்ல.",
      prepareSampleReport: "படிவ முன்னோட்டம்", removeImage: "படத்தை அகற்று", reportPhotoHint: "முன்னோட்டம் இந்த உலாவித் தாவலில் மட்டுமே இருக்கும்; பதிவேற்றப்படாது.",
      nextSteps: "அடுத்து என்ன?", stepOne: "தெளிவான புகைப்படத்தைச் சேர்க்கவும்", stepOneCopy: "பாதிக்கப்பட்ட பகுதியை நல்ல இயற்கை வெளிச்சத்தில் படம் எடுக்கவும்.",
      stepTwo: "கவனித்ததைப் பகிரவும்", stepTwoCopy: "பயிரைப் புரிந்துகொள்ள எதிர்கால மதிப்பாய்வாளருக்கு சில விவரங்கள் உதவும்.",
      stepThree: "சரியான உதவியைப் பெறவும்", stepThreeCopy: "இந்த முன்னோட்டத்தில் AI ஆய்வும் நிபுணர் மதிப்பாய்வும் இணைக்கப்படவில்லை.",
      honestNotice: "இந்த முதல் கட்டப் பக்கம் நோயைக் கண்டறியவோ AI கணிப்புகளை வழங்கவோ செய்யாது. பயிர் சிகிச்சை முடிவுகளுக்கு இதை நம்ப வேண்டாம்.",
      pageHistory: "அறிக்கை வரலாறு", historyIntro: "சேமிப்பு வசதி சேர்க்கப்பட்டால் அறிக்கைகள் எப்படித் தொகுக்கப்படும் என்பதற்கான முன்னோட்டம்.",
      searchReports: "மாதிரி அறிக்கைகளைத் தேடுங்கள்", historySampleNote: "கீழே உள்ள அனைத்து வரிகளும் மாதிரி தரவு மட்டுமே; உண்மையான விவசாயி அறிக்கைகள் அல்ல.",
      tableDate: "தேதி", tableCrop: "பயிர்", tableDetails: "விவசாயி குறிப்பு", tableStatus: "நிலை", tableAction: "செயல்",
      noteLeaves: "இலை நிறமாற்றம்", noteSpots: "புள்ளிகள் தென்பட்டன", noteWilting: "வயலில் வாடல்", statusSample: "மாதிரி மட்டும்", viewSample: "முன்னோட்டம்",
      noMatches: "இந்தத் தேடலுக்கு மாதிரி அறிக்கைகள் இல்லை.", pageAdvisory: "வேளாண் ஆலோசனை", advisoryIntro: "பொதுவான பயிர் பராமரிப்பு நினைவூட்டல்களைப் பாருங்கள். இவை கல்வி எடுத்துக்காட்டுகள்; உள்ளூர் அல்லது நிபுணர் ஆலோசனை அல்ல.",
      adviceCategory1: "நல்ல நடைமுறை", adviceTitle1: "இலைகளைத் தவறாமல் பாருங்கள்", adviceCopy1: "இலைகளின் இருபுறத்தையும் தொடர்ந்து பார்ப்பது மாற்றங்களை முன்கூட்டியே கவனிக்க உதவும். என்ன, எப்போது தொடங்கியது என்பதைப் பதிவு செய்யுங்கள்.",
      adviceCategory2: "நீர் மேலாண்மை", adviceTitle2: "பயிரைப் பொறுத்து நீர்ப்பாசனம்", adviceCopy2: "நீர்த் தேவை பயிர், மண், வளர்ச்சி நிலை மற்றும் வானிலையைப் பொறுத்து மாறும். உள்ளூர் வழிகாட்டுதலைப் பின்பற்றுங்கள்.",
      adviceCategory3: "வயல் சுகாதாரம்", adviceTitle3: "எளிய வயல் குறிப்புகளைப் பதிவு செய்யுங்கள்", adviceCopy3: "பயிர் வகை, நடவு நாள் மற்றும் மாற்றங்களைக் குறித்துக் கொள்ளுங்கள். உள்ளூர் வேளாண் நிபுணரிடம் பேசும்போது இவை உதவும்.",
      adviceCategory4: "உள்ளூர் உதவியைப் பெறுங்கள்", adviceTitle4: "சிகிச்சைக்கு முன் ஆலோசனை கேளுங்கள்", adviceCopy4: "பயிர் ஆரோக்கியம் குறித்து கவலை இருந்தால், சிகிச்சை பயன்படுத்துவதற்கு முன் உள்ளூர் வேளாண் சேவை அல்லது தகுதியான நிபுணரைத் தொடர்புகொள்ளுங்கள்.",
      advisoryDisclaimer: "பொதுக் கல்வித் தகவல் மட்டுமே. இடம் மற்றும் பயிரைப் பொறுத்து நிலைமைகள் மாறும். நடவடிக்கை எடுப்பதற்கு முன் தகுதியான உள்ளூர் வேளாண் நிபுணரிடம் ஆலோசனை பெறுங்கள்.",
      pageExpert: "நிபுணர் முகப்புப்பலகை", expertIntro: "எதிர்கால மதிப்பாய்வு இடைமுகத்தின் முன்னோட்டம். விவசாயி அறிக்கைகளோ நிபுணர் பதில்களோ இணைக்கப்படவில்லை.",
      expertSampleNote: "எடுத்துக்காட்டு கோரிக்கைகள் மட்டும் — உண்மையான சமர்ப்பிப்புகள் அல்ல", pendingReports: "எடுத்துக்காட்டு வரிசை", reviewedReports: "மதிப்பாய்வு எடுத்துக்காட்டு", expertsOnline: "நிபுணர் கணக்குகள்", sampleOnly: "மாதிரி தரவு மட்டும்",
      reviewQueue: "அறிக்கை வரிசை எடுத்துக்காட்டு", farmerSample: "மாதிரி விவசாயி", locationSample: "எடுத்துக்காட்டு இடம்", requestInfo: "மாதிரி கோரிக்கை", buttonDetails: "விவர முன்னோட்டம்", buttonReply: "பதில் முன்னோட்டம்",
      expertNotice: "மதிப்பாய்வு மற்றும் பதில் செயல்கள் செயல்விளக்கங்கள் மட்டுமே. செய்திகள் அனுப்பப்படாது; விவசாயி விவரங்கள் சேமிக்கப்படாது.",
      requiredField: "இந்தப் புலத்தை நிரப்பவும்.", invalidPhone: "சரியான தொலைபேசி எண்ணை உள்ளிடவும்.", invalidEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.", passwordShort: "குறைந்தது 8 எழுத்துகள் பயன்படுத்தவும்.", passwordMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை.",
      previewSuccess: "படிவ முன்னோட்டம் முடிந்தது. விவரங்கள் சேமிக்கப்படவோ அனுப்பப்படவோ இல்லை.", loginFeedback: "உள்நுழைவு முன்னோட்டம் மட்டுமே. கணக்குடன் தொடர்பு கொள்ளப்படவில்லை.",
      noImage: "முதலில் பயிர் புகைப்படத்தைத் தேர்ந்தெடுக்கவும்.", imageTooLarge: "10 MB-க்கு குறைவான படத்தைத் தேர்ந்தெடுக்கவும்.", imageUnsupported: "JPG, PNG அல்லது WEBP படத்தைத் தேர்ந்தெடுக்கவும்.",
      imageReady: "பட முன்னோட்டம் தயார். பதிவேற்றவோ ஆய்வு செய்யவோ இல்லை.", imageRemoved: "பட முன்னோட்டம் அகற்றப்பட்டது.", detectionDisabled: "AI நோய் கண்டறிதல் இன்னும் செயல்படுத்தப்படவில்லை. படம் பதிவேற்றப்படவோ ஆய்வு செய்யப்படவோ இல்லை.",
      expertDemo: "முன்னோட்டம் மட்டுமே: நிபுணர் பதில்களும் அறிக்கை செயல்களும் இணைக்கப்படவில்லை.", menuOpen: "வழிசெலுத்தல் பட்டியைத் திறக்கவும்", menuClose: "வழிசெலுத்தல் பட்டியை மூடவும்",
      actionPreview: "முன்னோட்டம்"
    },
    hi: {
      home: "होम", register: "किसान पंजीकरण", login: "किसान लॉगिन", dashboard: "किसान डैशबोर्ड",
      detection: "रोग पहचान", history: "रिपोर्ट इतिहास", advisory: "कृषि सलाह", expert: "विशेषज्ञ डैशबोर्ड",
      language: "भाषा", tagline: "स्वस्थ फसलें। स्मार्ट खेती।", subtitle: "स्मार्ट फसल रोग पहचान और कृषि सलाह",
      getStarted: "शुरू करें", signIn: "लॉगिन", exploreDashboard: "डैशबोर्ड देखें", learnMore: "और जानें",
      homeEyebrow: "हर फसल के मौसम का एक उपयोगी साथी", heroTitle: "स्वस्थ फसलें।<br><span>स्मार्ट खेती।</span>",
      heroCopy: "फसल रिपोर्ट तैयार करने, उपयोगी खेती मार्गदर्शन देखने और अपने खेत के लिए सहायता पाने का सरल तरीका।",
      trust1: "किसानों को ध्यान में रखकर बनाया गया", trust2: "अंग्रेज़ी · तमिल · हिंदी", trust3: "विशेषज्ञ सहायता का स्पष्ट रास्ता",
      featureEyebrow: "खेती के मौसम में थोड़ी मदद", featureTitle: "आत्मविश्वास से खेती के लिए उपयोगी साधन",
      featureIntro: "खेत के लिए व्यावहारिक सहायता, एक सरल जगह पर।",
      featureDetect: "फसल रिपोर्ट तैयार करें", featureDetectCopy: "फोटो जोड़कर भविष्य की रोग समीक्षा के लिए जानकारी तैयार करें। AI विश्लेषण अभी उपलब्ध नहीं है।",
      featureAdvice: "बेहतर मार्गदर्शन के साथ आगे बढ़ें", featureAdviceCopy: "अगले कदम सोचने में मदद के लिए सामान्य फसल देखभाल सुझाव देखें।",
      featureHistory: "जानकारी पर नज़र रखें", featureHistoryCopy: "रिपोर्ट इतिहास का नमूना देखें। उदाहरण डेटा को साफ़ तौर पर चिह्नित किया गया है।",
      aboutEyebrow: "हमारा भोजन उगाने वाले लोगों के लिए", aboutTitle: "अच्छे फैसले स्पष्ट और उपयोगी जानकारी से शुरू होते हैं।",
      aboutCopy: "VELAN AI किसान खातों और फसल स्वास्थ्य मार्गदर्शन को एक सरल जगह पर लाता है। इस चरण में रोग विश्लेषण और विशेषज्ञ सेवाएँ उपलब्ध नहीं हैं।",
      aboutBullet1: "फोन और कंप्यूटर पर सरल अनुभव", aboutBullet2: "अंग्रेज़ी, तमिल और हिंदी भाषा विकल्प", aboutBullet3: "भविष्य में विशेषज्ञ और AI जोड़ने की तैयारी",
      aboutAction: "वेबसाइट देखें", footerDescription: "स्मार्ट फसल रोग पहचान और कृषि सलाह।",
      quickLinks: "देखें", usefulLinks: "उपयोगी लिंक", footerNote: "चरण 1 वेबसाइट नमूना · खाते या रिपोर्ट सेव नहीं होते।",
      pageRegister: "किसान पंजीकरण", registerIntro: "अपना व्यक्तिगत डैशबोर्ड देखने के लिए किसान खाता बनाएँ।",
      formName: "पूरा नाम", formPhone: "फोन नंबर", formEmail: "ईमेल पता", formLocation: "गाँव / शहर", formState: "राज्य", formFarm: "मुख्य फसल", formPassword: "पासवर्ड", formConfirm: "पासवर्ड की पुष्टि करें",
      selectCrop: "फसल चुनें", cropRice: "धान", cropWheat: "गेहूँ", cropCotton: "कपास", cropTomato: "टमाटर", cropOther: "अन्य",
      selectState: "राज्य चुनें", stateTamilNadu: "तमिलनाडु", stateAndhra: "आंध्र प्रदेश", stateKarnataka: "कर्नाटक", stateKerala: "केरल", stateOther: "अन्य",
      createProfile: "पंजीकरण का नमूना", registrationNotice: "केवल डेमो: विवरण इसी ब्राउज़र में जाँचे जाएँगे; सेव या कहीं भेजे नहीं जाएँगे।",
      alreadyAccount: "पहले से खाता है?", signInHere: "यहाँ लॉगिन करें", pageLogin: "किसान लॉगिन", loginIntro: "वापस स्वागत है। अपने किसान खाते में लॉगिन करें।",
      password: "पासवर्ड", remember: "मुझे याद रखें", previewLogin: "लॉगिन का नमूना", noAccount: "VELAN AI पर नए हैं?", registerHere: "प्रोफ़ाइल बनाएँ",
      loginNotice: "केवल डेमो: लॉगिन किसी खाते की सेवा से जुड़ा नहीं है। विवरण सेव या भेजे नहीं जाएँगे।",
      welcomeFarmer: "किसान का स्वागत है", dashboardIntro: "आपके खेत के साधनों और रिपोर्टों की एक झलक।",
      sampleLabel: "उदाहरण डेटा — खेत की लाइव जानकारी नहीं", reportsMade: "तैयार रिपोर्टें", cropsTracked: "फसल श्रेणियाँ", adviceTips: "देखभाल सुझाव", expertReplies: "विशेषज्ञ जवाब",
      sampleReportNote: "केवल उदाहरण के आँकड़े", sampleCrops: "उदाहरण फसल श्रेणियाँ", sampleAdvice: "सामान्य जानकारी", sampleReplies: "जुड़ा नहीं",
      recentReports: "हाल की रिपोर्टों के उदाहरण", viewHistory: "इतिहास देखें", cropRice: "धान", cropTomato: "टमाटर", cropCotton: "कपास",
      sampleDate1: "नमूना · 12 अक्टूबर", sampleDate2: "नमूना · 08 अक्टूबर", sampleDate3: "नमूना · 02 अक्टूबर", awaitingReview: "समीक्षा उपलब्ध नहीं", draftOnly: "मसौदे का उदाहरण", demoEntry: "केवल उदाहरण",
      weatherTitle: "मौसम की याद दिलाना", weatherPlace: "सामान्य जानकारी · स्थानीय पूर्वानुमान नहीं", weatherTemp: "आगे की योजना बनाएँ", weatherDetail: "खेत में काम से पहले स्थानीय पूर्वानुमान देखें।",
      quickActions: "त्वरित विकल्प", prepareReport: "फसल रिपोर्ट तैयार करें", browseAdvice: "सामान्य सलाह देखें", openExpert: "विशेषज्ञ डैशबोर्ड का नमूना",
      pageDetection: "फसल रोग रिपोर्ट", detectionIntro: "रिपोर्ट तैयार करने के लिए फसल की साफ़ फोटो और कुछ जानकारी जोड़ें। चरण 1 में स्वचालित विश्लेषण उपलब्ध नहीं है।",
      uploadTitle: "फसल की फोटो जोड़ें", uploadHint: "तस्वीर चुनें या यहाँ खींचें", uploadFormats: "JPG, PNG या WEBP · अधिकतम 10 MB", chooseImage: "तस्वीर चुनें",
      cropType: "फसल का प्रकार", cropCondition: "आपने क्या देखा?", conditionHint: "उदाहरण: धब्बे, मुरझाना या रंग बदलना। यह रोग की पहचान नहीं है।",
      prepareSampleReport: "फ़ॉर्म का नमूना", removeImage: "तस्वीर हटाएँ", reportPhotoHint: "तस्वीर का नमूना इसी ब्राउज़र टैब में रहेगा और अपलोड नहीं होगा।",
      nextSteps: "आगे क्या होगा?", stepOne: "साफ़ फोटो जोड़ें", stepOneCopy: "प्रभावित हिस्से की फोटो अच्छी प्राकृतिक रोशनी में लें।",
      stepTwo: "जो देखा वह बताएँ", stepTwoCopy: "कुछ जानकारी भविष्य के समीक्षक को फसल समझने में मदद कर सकती है।",
      stepThree: "सही सहायता पाएँ", stepThreeCopy: "इस नमूने में AI विश्लेषण और विशेषज्ञ समीक्षा नहीं जुड़ी है।",
      honestNotice: "चरण 1 का यह पेज रोग नहीं पहचानता और AI अनुमान नहीं देता। फसल के उपचार के फैसलों के लिए इस पर निर्भर न रहें।",
      pageHistory: "रिपोर्ट इतिहास", historyIntro: "स्टोरेज जुड़ने पर फसल रिपोर्ट कैसे व्यवस्थित हो सकती हैं, इसका नमूना।",
      searchReports: "नमूना रिपोर्ट खोजें", historySampleNote: "नीचे की सभी पंक्तियाँ उदाहरण डेटा हैं, असली किसान रिपोर्ट नहीं।",
      tableDate: "तारीख", tableCrop: "फसल", tableDetails: "किसान की टिप्पणी", tableStatus: "स्थिति", tableAction: "विकल्प",
      noteLeaves: "पत्तियों का रंग बदला", noteSpots: "धब्बे दिखाई दिए", noteWilting: "खेत में मुरझाना", statusSample: "केवल नमूना", viewSample: "देखें",
      noMatches: "इस खोज से कोई नमूना रिपोर्ट नहीं मिली।", pageAdvisory: "कृषि सलाह", advisoryIntro: "फसल की सामान्य देखभाल के सुझाव देखें। ये शैक्षिक उदाहरण हैं, स्थानीय या विशेषज्ञ सलाह नहीं।",
      adviceCategory1: "अच्छी आदत", adviceTitle1: "पत्तियों को नियमित देखें", adviceCopy1: "पत्तियों के दोनों ओर नियमित नज़र डालने से बदलाव जल्दी दिख सकते हैं। क्या बदला और कब शुरू हुआ, लिख लें।",
      adviceCategory2: "पानी का प्रबंधन", adviceTitle2: "फसल के अनुसार पानी दें", adviceCopy2: "पानी की ज़रूरत फसल, मिट्टी, बढ़ने के चरण और मौसम से बदलती है। स्थानीय सलाह लें और एक ही समय-सारणी सब पर लागू न करें।",
      adviceCategory3: "खेत की सफ़ाई", adviceTitle3: "खेत के सरल नोट रखें", adviceCopy3: "फसल की किस्म, बुवाई की तारीख और देखे गए बदलाव लिखें। स्थानीय कृषि विशेषज्ञ से बात करते समय ये नोट उपयोगी होंगे।",
      adviceCategory4: "स्थानीय सहायता लें", adviceTitle4: "इलाज से पहले पूछें", adviceCopy4: "फसल स्वास्थ्य को लेकर चिंता हो तो उपचार करने से पहले स्थानीय कृषि सेवा या योग्य विशेषज्ञ से संपर्क करें।",
      advisoryDisclaimer: "केवल सामान्य शैक्षिक जानकारी। जगह और फसल के अनुसार स्थिति बदलती है। कदम उठाने से पहले योग्य स्थानीय कृषि विशेषज्ञ से सलाह लें।",
      pageExpert: "विशेषज्ञ डैशबोर्ड", expertIntro: "भविष्य के समीक्षा कार्यक्षेत्र का नमूना। किसान रिपोर्ट या विशेषज्ञ जवाब जुड़े नहीं हैं।",
      expertSampleNote: "केवल उदाहरण अनुरोध — असली सबमिशन नहीं", pendingReports: "उदाहरण कतार", reviewedReports: "समीक्षा का उदाहरण", expertsOnline: "विशेषज्ञ खाते", sampleOnly: "केवल नमूना डेटा",
      reviewQueue: "रिपोर्ट कतार का उदाहरण", farmerSample: "नमूना किसान", locationSample: "उदाहरण स्थान", requestInfo: "नमूना अनुरोध", buttonDetails: "जानकारी का नमूना", buttonReply: "जवाब का नमूना",
      expertNotice: "समीक्षा और जवाब केवल डेमो हैं। कोई संदेश नहीं भेजा जाता और किसान की जानकारी सेव नहीं होती।",
      requiredField: "कृपया यह जानकारी भरें।", invalidPhone: "सही फोन नंबर दर्ज करें।", invalidEmail: "सही ईमेल पता दर्ज करें।", passwordShort: "कम से कम 8 अक्षर इस्तेमाल करें।", passwordMismatch: "पासवर्ड मेल नहीं खाते।",
      previewSuccess: "फ़ॉर्म का नमूना पूरा हुआ। कोई जानकारी सेव या भेजी नहीं गई।", loginFeedback: "केवल लॉगिन का नमूना। किसी खाते से संपर्क नहीं हुआ।",
      noImage: "पहले फसल की फोटो चुनें।", imageTooLarge: "10 MB से छोटी तस्वीर चुनें।", imageUnsupported: "JPG, PNG या WEBP तस्वीर चुनें।",
      imageReady: "तस्वीर का नमूना तैयार। इसे अपलोड या विश्लेषित नहीं किया गया।", imageRemoved: "तस्वीर का नमूना हटाया गया।", detectionDisabled: "AI रोग पहचान अभी उपलब्ध नहीं है। आपकी तस्वीर अपलोड या विश्लेषित नहीं की गई।",
      expertDemo: "केवल नमूना: विशेषज्ञ जवाब और रिपोर्ट विकल्प जुड़े नहीं हैं।", menuOpen: "नेविगेशन मेनू खोलें", menuClose: "नेविगेशन मेनू बंद करें",
      actionPreview: "नमूना"
    }
  };

  const stage2Translations = {
    en: {
      profile: "Farmer Profile", logout: "Log out", loginIdentity: "Email or mobile number", loginButton: "Log in",
      submitRegistration: "Create farmer account", registerIntro: "Create your farmer account to access your personal dashboard.",
      registrationNotice: "Your details are stored in this local application's SQLite database. Passwords are securely hashed.",
      loginNotice: "Sign in with the email address or mobile number you registered.",
      pageProfile: "Your farmer profile", profileIntro: "View and update the details saved to your farmer account.",
      updateProfile: "Save profile changes", profileDetails: "Account details", dashboardGreeting: "Welcome",
      dashboardIntro: "Your dashboard shows information from your farmer account.", realAccountNotice: "Account information from this device's database",
      reportCount: "Disease reports", memberSince: "Member since", noReports: "No disease reports yet. Disease reporting is reserved for a future stage.",
      sampleGuidance: "General crop-care information", sampleGuidanceNotice: "General educational content · not personalized advice",
      editProfile: "Edit profile", viewReports: "View report history", formVillage: "Village", formDistrict: "District", formState: "State",
      invalidName: "Enter a name between 2 and 120 characters.", invalidMobile: "Enter a valid mobile number with 8 to 15 digits.",
      invalidVillage: "Enter a village name (up to 120 characters).", invalidDistrict: "Enter a district name (up to 120 characters).",
      invalidState: "Enter a state name (up to 80 characters).", invalidPassword: "Password must be 8 to 256 characters.",
      duplicateAccount: "That email or mobile number is already registered.", registrationSuccess: "Registration successful. Please log in.",
      loginRequired: "Enter your registered email or mobile number and password.", loginFailed: "Those sign-in details were not recognized.",
      loginSuccess: "You are signed in.", logoutSuccess: "You have been logged out.", profileUpdated: "Your profile has been updated.",
      reportHistoryDemo: "Sample report-history preview only. Your actual report count is shown on your dashboard.",
      footerNote: "Stage 2 farmer accounts · Disease analysis and expert replies are not enabled.",
      invalidLogin: "Enter a valid email address or mobile number and password."
    },
    ta: {
      profile: "விவசாயி சுயவிவரம்", logout: "வெளியேறு", loginIdentity: "மின்னஞ்சல் அல்லது கைபேசி எண்", loginButton: "உள்நுழைக",
      submitRegistration: "விவசாயி கணக்கை உருவாக்கவும்", registerIntro: "தனிப்பட்ட முகப்புப்பலகையைப் பயன்படுத்த விவசாயி கணக்கை உருவாக்கவும்.",
      registrationNotice: "உங்கள் விவரங்கள் இந்த உள்ளூர் செயலியின் SQLite தரவுத்தளத்தில் சேமிக்கப்படும். கடவுச்சொற்கள் பாதுகாப்பாக குறியாக்கம் செய்யப்படும்.",
      loginNotice: "பதிவு செய்த மின்னஞ்சல் முகவரி அல்லது கைபேசி எண்ணைப் பயன்படுத்தி உள்நுழைக.",
      pageProfile: "உங்கள் விவசாயி சுயவிவரம்", profileIntro: "உங்கள் கணக்கில் சேமிக்கப்பட்ட விவரங்களைப் பார்த்து புதுப்பிக்கவும்.",
      updateProfile: "சுயவிவர மாற்றங்களைச் சேமிக்கவும்", profileDetails: "கணக்கு விவரங்கள்", dashboardGreeting: "வரவேற்கிறோம்",
      dashboardIntro: "உங்கள் விவசாயி கணக்கிலுள்ள தகவல்களை முகப்புப்பலகை காட்டுகிறது.", realAccountNotice: "இந்த சாதனத்தின் தரவுத்தளக் கணக்கு தகவல்",
      reportCount: "நோய் அறிக்கைகள்", memberSince: "உறுப்பினர் ஆன நாள்", noReports: "இதுவரை நோய் அறிக்கைகள் இல்லை. நோய் அறிக்கையிடல் எதிர்கால கட்டத்தில் சேர்க்கப்படும்.",
      sampleGuidance: "பொதுவான பயிர் பராமரிப்பு தகவல்", sampleGuidanceNotice: "பொதுக் கல்வித் தகவல் · தனிப்பட்ட ஆலோசனை அல்ல",
      editProfile: "சுயவிவரத்தைத் திருத்தவும்", viewReports: "அறிக்கை வரலாற்றைப் பார்க்க", formVillage: "கிராமம்", formDistrict: "மாவட்டம்", formState: "மாநிலம்",
      invalidName: "2 முதல் 120 எழுத்துகளுக்குள் பெயரை உள்ளிடவும்.", invalidMobile: "8 முதல் 15 இலக்கங்களுடன் சரியான கைபேசி எண்ணை உள்ளிடவும்.",
      invalidVillage: "கிராமத்தின் பெயரை உள்ளிடவும் (அதிகபட்சம் 120 எழுத்துகள்).", invalidDistrict: "மாவட்டத்தின் பெயரை உள்ளிடவும் (அதிகபட்சம் 120 எழுத்துகள்).",
      invalidState: "மாநிலத்தின் பெயரை உள்ளிடவும் (அதிகபட்சம் 80 எழுத்துகள்).", invalidPassword: "கடவுச்சொல் 8 முதல் 256 எழுத்துகளுக்குள் இருக்க வேண்டும்.",
      duplicateAccount: "இந்த மின்னஞ்சல் அல்லது கைபேசி எண் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது.", registrationSuccess: "பதிவு வெற்றிகரமாக முடிந்தது. உள்நுழையவும்.",
      loginRequired: "பதிவு செய்த மின்னஞ்சல் அல்லது கைபேசி எண்ணையும் கடவுச்சொல்லையும் உள்ளிடவும்.", loginFailed: "உள்நுழைவு விவரங்கள் சரிபார்க்கப்படவில்லை.",
      loginSuccess: "நீங்கள் உள்நுழைந்துள்ளீர்கள்.", logoutSuccess: "நீங்கள் வெளியேறிவிட்டீர்கள்.", profileUpdated: "உங்கள் சுயவிவரம் புதுப்பிக்கப்பட்டது.",
      reportHistoryDemo: "அறிக்கை வரலாறு எடுத்துக்காட்டு முன்னோட்டம் மட்டுமே. உண்மையான அறிக்கை எண்ணிக்கை முகப்புப்பலகையில் காட்டப்படும்.",
      footerNote: "இரண்டாம் கட்ட விவசாயி கணக்குகள் · நோய் ஆய்வும் நிபுணர் பதில்களும் செயல்படுத்தப்படவில்லை.",
      invalidLogin: "சரியான மின்னஞ்சல் அல்லது கைபேசி எண்ணையும் கடவுச்சொல்லையும் உள்ளிடவும்."
    },
    hi: {
      profile: "किसान प्रोफ़ाइल", logout: "लॉग आउट", loginIdentity: "ईमेल या मोबाइल नंबर", loginButton: "लॉग इन",
      submitRegistration: "किसान खाता बनाएँ", registerIntro: "अपना व्यक्तिगत डैशबोर्ड देखने के लिए किसान खाता बनाएँ।",
      registrationNotice: "आपकी जानकारी इस स्थानीय ऐप के SQLite डेटाबेस में सेव होगी। पासवर्ड सुरक्षित रूप से हैश किए जाएँगे।",
      loginNotice: "पंजीकरण के समय दिया गया ईमेल पता या मोबाइल नंबर इस्तेमाल करें।",
      pageProfile: "आपकी किसान प्रोफ़ाइल", profileIntro: "अपने किसान खाते में सेव जानकारी देखें और बदलें।",
      updateProfile: "प्रोफ़ाइल में बदलाव सेव करें", profileDetails: "खाते की जानकारी", dashboardGreeting: "स्वागत है",
      dashboardIntro: "आपका डैशबोर्ड किसान खाते की जानकारी दिखाता है।", realAccountNotice: "इस डिवाइस के डेटाबेस से खाते की जानकारी",
      reportCount: "रोग रिपोर्ट", memberSince: "सदस्य बने", noReports: "अभी कोई रोग रिपोर्ट नहीं है। रोग रिपोर्ट सुविधा भविष्य के चरण में जोड़ी जाएगी।",
      sampleGuidance: "फसल की सामान्य देखभाल की जानकारी", sampleGuidanceNotice: "सामान्य शैक्षिक जानकारी · व्यक्तिगत सलाह नहीं",
      editProfile: "प्रोफ़ाइल बदलें", viewReports: "रिपोर्ट इतिहास देखें", formVillage: "गाँव", formDistrict: "ज़िला", formState: "राज्य",
      invalidName: "2 से 120 अक्षरों के बीच नाम दर्ज करें।", invalidMobile: "8 से 15 अंकों वाला सही मोबाइल नंबर दर्ज करें।",
      invalidVillage: "गाँव का नाम दर्ज करें (अधिकतम 120 अक्षर)।", invalidDistrict: "ज़िले का नाम दर्ज करें (अधिकतम 120 अक्षर)।",
      invalidState: "राज्य का नाम दर्ज करें (अधिकतम 80 अक्षर)।", invalidPassword: "पासवर्ड 8 से 256 अक्षरों का होना चाहिए।",
      duplicateAccount: "यह ईमेल या मोबाइल नंबर पहले से पंजीकृत है।", registrationSuccess: "पंजीकरण सफल हुआ। कृपया लॉग इन करें।",
      loginRequired: "पंजीकृत ईमेल या मोबाइल नंबर और पासवर्ड दर्ज करें।", loginFailed: "लॉगिन जानकारी सही नहीं है।",
      loginSuccess: "आप लॉग इन हैं।", logoutSuccess: "आप लॉग आउट हो गए हैं।", profileUpdated: "आपकी प्रोफ़ाइल अपडेट हो गई है।",
      reportHistoryDemo: "यह रिपोर्ट इतिहास का नमूना है। असली रिपोर्ट की संख्या आपके डैशबोर्ड पर दिखाई जाती है।",
      footerNote: "चरण 2 किसान खाते · रोग विश्लेषण और विशेषज्ञ जवाब उपलब्ध नहीं हैं।",
      invalidLogin: "सही ईमेल या मोबाइल नंबर और पासवर्ड दर्ज करें।"
    }
  };
  Object.keys(stage2Translations).forEach(function (language) {
    Object.assign(translations[language], stage2Translations[language]);
  });

  const stage3Translations = {
    en: {
      detectionIntro: "Upload a crop photo to save a report and request an AI screening where a model is available.",
      cropSupportNote: "This model has 38 PlantVillage classes across 14 crops. Tea, rice, and cotton reports can be submitted for expert review without AI screening. It may still misclassify unrelated or field photos.",
      uploadFormats: "JPG, PNG or WEBP · up to 5 MB", submitReport: "Submit for expert review",
      imageTooSmallServer: "This image is too small to screen. Upload a clear photo at least 64 pixels wide and tall.",
      imageTooSmall: "Upload a clear photo at least 64 pixels wide and tall.",
      imageDomainWarning: "The model was trained on PlantVillage leaf images. It does not reliably reject unrelated photos or recognize every field condition; confirm the crop and treat results as unverified screening.",
      detectedCrop: "Model-detected crop", modelClassDetailsUnavailable: "Disease-specific information is not available here for this model class. Ask a local agricultural expert before treatment.",
      cropApple: "Apple", cropBlueberry: "Blueberry", cropCherry: "Cherry", cropCorn: "Corn (maize)", cropGrape: "Grape",
      cropOrange: "Orange", cropPeach: "Peach", cropBellPepper: "Bell pepper", cropRaspberry: "Raspberry",
      cropSoybean: "Soybean", cropSquash: "Squash", cropStrawberry: "Strawberry",
      submitForExpertReview: "Submit for expert review", downloadPdf: "Download PDF",
      reportPhotoHint: "Photos are stored privately with your report and shown only to you and authorized experts.",
      reportSubmitted: "Your crop report has been saved.", invalidCrop: "Choose one of the listed crops.",
      invalidDescription: "Keep your note under 1,000 characters.", imageRequired: "Choose a crop photo first.",
      imageTooLargeServer: "The image is too large. Choose a photo under 5 MB.",
      imageUnsupported: "Choose a valid JPG, PNG, or WEBP image.", imageInvalid: "The image could not be decoded. Try a different photo.",
      modelUnavailable: "Your report was saved, but the model is not installed. No prediction was generated.",
      cropNotSupported: "Your report was saved without an AI result because this crop is not covered by the installed model.",
      inferenceUnavailable: "Your report was saved, but AI analysis could not be completed.",
      cropTea: "Tea", cropPotato: "Potato", noReports: "No reports yet. Submit a crop photo to create one.",
      featureDetectCopy: "Submit a crop report and receive a model screening when a compatible model is installed.",
      featureHistoryCopy: "Review reports saved to your account, including screening status and expert responses.",
      stepThreeCopy: "The model screens its 14 supported crops. Tea, rice, and cotton reports can be submitted without an AI result.",
      aboutBullet3: "Authorized experts can review submitted reports; AI screening is limited to supported crops.",
      aboutCopy: "VELAN AI brings farmer accounts, crop-health reports, and expert advisory together. AI screening is limited to the crops supported by the installed model.",
      footerNote: "Stage 3 reports · AI screening is limited and is not an expert diagnosis.",
      detectionDisabled: "AI screening is available only for crops supported by an installed model.",
      imageTooLarge: "Please choose an image smaller than 5 MB.",
      pageHistory: "Report History", historyIntro: "Your saved crop reports and any expert responses.",
      historySampleNote: "These are your real reports from this account. No sample reports are shown.",
      recentReports: "Your reports", searchReports: "Search your reports", noReports: "No reports yet. Submit a crop photo to create one.",
      tableDate: "Date", tableCrop: "Crop", tableDetails: "AI result", tableStatus: "Status", tableAction: "Action",
      viewReport: "View report", reportSubmittedStatus: "Awaiting expert review", reportPendingReviewStatus: "Pending expert review", reportReviewedStatus: "Expert replied",
      aiStatus: "AI screening", aiPredicted: "Model prediction available", aiUnavailable: "No AI result",
      pageReport: "Crop Report", reportDisclaimer: "AI results are screening suggestions, not confirmed diagnoses. Model confidence is not an accuracy guarantee. Ask a qualified local agricultural professional before treatment.",
      modelPrediction: "Model prediction", confidence: "Model score", confidenceNote: "Softmax score from the model; not a calibrated probability or accuracy estimate.",
      affectedCrop: "Affected crop", symptoms: "Common signs", possibleCauses: "Possible cause", severity: "Severity",
      severityUnknown: "Not assessed by this model", modelNotAvailable: "No prediction was generated for this report.",
      unsupportedCropNotice: "This crop is not included in the installed model's label set. An expert can still review your report.",
      cropMismatchNotice: "The model result did not match the crop you selected, so no prediction was saved.",
      healthyCaution: "A healthy-class result does not rule out disease. Continue monitoring and seek local advice if symptoms persist.",
      organicTreatment: "Lower-risk field practices", chemicalGuidance: "Pesticide safety",
      organicTreatmentCopy: "Remove badly affected plant material where appropriate, avoid moving contaminated soil or tools between plots, improve airflow, and keep leaves dry where practical. Confirm practices with local extension advice.",
      chemicalGuidanceCopy: "No product or dose is prescribed here. Use only a product registered for this crop and target in your location, and follow its label, protective-equipment, re-entry, and pre-harvest instructions. Ask a qualified local advisor.",
      advisorySources: "General references: Tamil Nadu Agricultural University crop-protection guidance and UC Integrated Pest Management. Local diagnosis and current registrations take priority.",
      notConfirmed: "AI screening — not expert-confirmed", expertResponse: "Expert response", waitingExpert: "No expert response yet.",
      expertConfirmed: "Expert reviewed", pageExpert: "Expert Dashboard",
      expertIntro: "Review farmer-submitted reports, view their images, and provide practical advisory responses.",
      reportQueue: "Submitted reports", noExpertReports: "No farmer reports have been submitted.",
      farmerLabel: "Farmer", locationLabel: "Location", reviewReport: "Review report",
      pageExpertLogin: "Expert Login", expertLoginIntro: "Authorized agricultural experts only. Accounts are created by the local administrator.",
      expertLogin: "Sign in as expert", expertLoginNotice: "Do not use a farmer account here. Ask the administrator to create your expert account.",
      expertReplyLabel: "Your advisory response", expertReplyHint: "Provide clear, crop-specific guidance. Avoid unverified diagnoses and pesticide dosages.", farmerNote: "Farmer's observation",
      saveResponse: "Save advisory response", invalidExpertResponse: "Write an advisory response between 10 and 5,000 characters.",
      expertResponseSaved: "Your advisory response has been saved.", logoutExpert: "Expert log out",
      healthyTomato: "Tomato — healthy class", healthyPotato: "Potato — healthy class",
      tomatoBacterial: "Tomato — bacterial spot", tomatoEarly: "Tomato — early blight",
      tomatoLate: "Tomato — late blight", tomatoLeafMold: "Tomato — leaf mold",
      tomatoSeptoria: "Tomato — Septoria leaf spot", tomatoMites: "Tomato — spider mites",
      tomatoTarget: "Tomato — target spot", tomatoYellow: "Tomato — yellow leaf curl virus",
      tomatoMosaic: "Tomato — mosaic virus", potatoEarly: "Potato — early blight",
      potatoLate: "Potato — late blight",
      factsHealthy: "No disease symptoms are specified for a healthy-class label.", causeHealthy: "Not applicable to a healthy-class label.",
      factsBacterial: "Small water-soaked or dark leaf spots may develop and can merge in wet conditions.",
      causeBacterial: "Bacterial infection; splash and handling can spread it in favorable conditions.",
      factsEarly: "Older leaves may show brown spots with concentric rings; yellowing can follow.",
      causeEarly: "Often associated with Alternaria fungi and favored by leaf wetness and crop stress.",
      factsLate: "Water-soaked or dark lesions may spread rapidly in cool, humid conditions.",
      causeLate: "Associated with Phytophthora infestans; humid weather can favor spread.",
      factsLeafMold: "Yellow areas on upper leaves may accompany olive-green growth underneath in humid conditions.",
      causeLeafMold: "Associated with Passalora fulva, especially in humid, poorly ventilated crops.",
      factsSeptoria: "Small round leaf spots may have dark margins and pale centers; lower leaves are often affected first.",
      causeSeptoria: "Associated with the fungus Septoria lycopersici; rain splash can spread spores.",
      factsMites: "Fine pale stippling, bronzing, or webbing may appear on leaves.",
      causeMites: "Feeding by spider mites, often favored by hot, dry conditions.",
      factsTarget: "Brown leaf spots may develop concentric rings and expand in warm, humid conditions.",
      causeTarget: "Associated with Corynespora cassiicola; confirm locally because symptoms overlap.",
      factsYellow: "Leaf curling, yellowing, and stunted growth may occur.",
      causeYellow: "Associated with a begomovirus group transmitted by whiteflies; confirm locally.",
      factsMosaic: "Mottled light and dark leaf patterns or leaf distortion may appear.",
      causeMosaic: "Associated with plant viruses; handling and contaminated tools may spread some viruses.",
      sourceTnau: "TNAU crop protection", sourceUc: "UC IPM"
    },
    ta: {
      detectionIntro: "பயிர் புகைப்படத்தைப் பதிவேற்றி அறிக்கையைச் சேமிக்கவும்; மாதிரி உள்ள பயிர்களுக்கு AI திரையாய்வு கிடைக்கும்.",
      cropSupportNote: "இந்த மாதிரியில் 14 பயிர்களுக்கான PlantVillage வகைகள் உள்ளன. தேயிலை, நெல், பருத்தி அறிக்கைகளை AI ஆய்வின்றி நிபுணர் மதிப்பாய்வுக்கு அனுப்பலாம். வயல் அல்லது தொடர்பற்ற படங்களை இது தவறாக வகைப்படுத்தக்கூடும்.",
      uploadFormats: "JPG, PNG அல்லது WEBP · அதிகபட்சம் 5 MB", submitReport: "நிபுணர் மதிப்பாய்வுக்கு சமர்ப்பிக்கவும்",
      imageTooSmallServer: "இந்தப் படம் ஆய்வுக்கு மிகவும் சிறியது. குறைந்தது 64 × 64 பிக்சல் அளவுள்ள தெளிவான படத்தைப் பதிவேற்றவும்.",
      imageTooSmall: "குறைந்தது 64 × 64 பிக்சல் அளவுள்ள தெளிவான படத்தைப் பதிவேற்றவும்.",
      imageDomainWarning: "இந்த மாதிரி PlantVillage இலைப் படங்களில் பயிற்சி செய்யப்பட்டது. தொடர்பற்ற படங்களையும் எல்லா வயல் நிலைகளையும் நம்பகமாக மறுக்காது; பயிரை உறுதிப்படுத்தி முடிவை உறுதிப்படுத்தப்படாத திரையாய்வாகக் கருதவும்.",
      detectedCrop: "மாதிரி கண்டறிந்த பயிர்", modelClassDetailsUnavailable: "இந்த மாதிரி வகைக்கான நோய் விவரம் இங்கு இல்லை. சிகிச்சைக்கு முன் உள்ளூர் வேளாண் நிபுணரை அணுகவும்.",
      cropApple: "ஆப்பிள்", cropBlueberry: "புளுபெர்ரி", cropCherry: "செர்ரி", cropCorn: "மக்காச்சோளம்", cropGrape: "திராட்சை",
      cropOrange: "ஆரஞ்சு", cropPeach: "பீச்", cropBellPepper: "குடைமிளகாய்", cropRaspberry: "ராஸ்பெர்ரி",
      cropSoybean: "சோயாபீன்", cropSquash: "ஸ்குவாஷ்", cropStrawberry: "ஸ்ட்ராபெர்ரி",
      submitForExpertReview: "நிபுணர் மதிப்பாய்வுக்கு சமர்ப்பிக்கவும்", downloadPdf: "PDF பதிவிறக்கு",
      reportPhotoHint: "புகைப்படம் அறிக்கையுடன் தனிப்பட்ட முறையில் சேமிக்கப்படும்; உங்களுக்கும் அனுமதிக்கப்பட்ட நிபுணர்களுக்கும் மட்டுமே தெரியும்.",
      reportSubmitted: "உங்கள் பயிர் அறிக்கை சேமிக்கப்பட்டது.", invalidCrop: "பட்டியலில் உள்ள பயிரைத் தேர்ந்தெடுக்கவும்.",
      invalidDescription: "குறிப்பை 1,000 எழுத்துகளுக்குள் வைத்திருக்கவும்.", imageRequired: "முதலில் பயிர் புகைப்படத்தைத் தேர்ந்தெடுக்கவும்.",
      imageTooLargeServer: "படம் மிகப் பெரியது. 5 MB-க்கு குறைவான புகைப்படத்தைத் தேர்ந்தெடுக்கவும்.",
      imageUnsupported: "சரியான JPG, PNG அல்லது WEBP படத்தைத் தேர்ந்தெடுக்கவும்.", imageInvalid: "படத்தைத் திறக்க முடியவில்லை. வேறு புகைப்படத்தை முயற்சிக்கவும்.",
      modelUnavailable: "அறிக்கை சேமிக்கப்பட்டது; ஆனால் மாதிரி நிறுவப்படவில்லை. கணிப்பு உருவாக்கப்படவில்லை.",
      cropNotSupported: "இந்தப் பயிருக்கு நிறுவிய மாதிரி ஆதரவு இல்லை. AI முடிவின்றி அறிக்கை சேமிக்கப்பட்டது.",
      inferenceUnavailable: "அறிக்கை சேமிக்கப்பட்டது; AI ஆய்வை முடிக்க முடியவில்லை.",
      cropTea: "தேயிலை", cropPotato: "உருளைக்கிழங்கு", noReports: "அறிக்கைகள் இல்லை. புகைப்படத்தைச் சமர்ப்பித்து ஒன்றை உருவாக்கவும்.",
      featureDetectCopy: "பயிர் அறிக்கையைச் சமர்ப்பிக்கவும்; பொருத்தமான மாதிரி நிறுவப்பட்ட பயிர்களுக்கு திரையாய்வு கிடைக்கும்.",
      featureHistoryCopy: "உங்கள் கணக்கில் சேமிக்கப்பட்ட அறிக்கைகள், திரையாய்வு நிலை மற்றும் நிபுணர் பதில்களைப் பார்க்கவும்.",
      stepThreeCopy: "மாதிரி ஆதரிக்கும் 14 பயிர்களுக்கு திரையாய்வு செய்கிறது. தேயிலை, நெல், பருத்தி அறிக்கைகளை AI முடிவின்றி சமர்ப்பிக்கலாம்.",
      aboutBullet3: "அனுமதிக்கப்பட்ட நிபுணர்கள் அறிக்கைகளை மதிப்பாய்வு செய்யலாம்; AI திரையாய்வு மாதிரி ஆதரிக்கும் பயிர்களுக்கு மட்டுமே.",
      aboutCopy: "விவசாயி கணக்குகள், பயிர் அறிக்கைகள் மற்றும் நிபுணர் ஆலோசனையை VELAN AI இணைக்கிறது. AI திரையாய்வு நிறுவிய மாதிரி ஆதரிக்கும் பயிர்களுக்கு மட்டுமே.",
      footerNote: "மூன்றாம் கட்ட அறிக்கைகள் · AI திரையாய்வு வரம்புடையது; நிபுணர் நோயறிதல் அல்ல.",
      detectionDisabled: "நிறுவப்பட்ட மாதிரி ஆதரிக்கும் பயிர்களுக்கு மட்டுமே AI திரையாய்வு கிடைக்கும்.",
      imageTooLarge: "5 MB-க்கு குறைவான படத்தைத் தேர்ந்தெடுக்கவும்.",
      pageHistory: "அறிக்கை வரலாறு", historyIntro: "நீங்கள் சேமித்த அறிக்கைகளும் நிபுணர் பதில்களும்.",
      historySampleNote: "இவை உங்கள் கணக்கின் உண்மையான அறிக்கைகள். மாதிரி அறிக்கைகள் காட்டப்படவில்லை.",
      recentReports: "உங்கள் அறிக்கைகள்", searchReports: "அறிக்கைகளைத் தேடுக", noReports: "அறிக்கைகள் இல்லை. புகைப்படத்தைச் சமர்ப்பித்து ஒன்றை உருவாக்கவும்.",
      tableDate: "தேதி", tableCrop: "பயிர்", tableDetails: "AI முடிவு", tableStatus: "நிலை", tableAction: "செயல்",
      viewReport: "அறிக்கையைப் பார்க்க", reportSubmittedStatus: "நிபுணர் மதிப்பாய்வுக்காகக் காத்திருக்கிறது", reportPendingReviewStatus: "நிபுணர் மதிப்பாய்வு நிலுவையில்", reportReviewedStatus: "நிபுணர் பதிலளித்துள்ளார்",
      aiStatus: "AI திரையாய்வு", aiPredicted: "மாதிரி கணிப்பு கிடைக்கிறது", aiUnavailable: "AI முடிவு இல்லை",
      pageReport: "பயிர் அறிக்கை", reportDisclaimer: "AI முடிவு திரையாய்வு பரிந்துரை மட்டுமே; உறுதிப்படுத்தப்பட்ட நோய் கண்டறிதல் அல்ல. மாதிரி மதிப்பெண் துல்லியத்திற்கான உத்தரவாதமல்ல. சிகிச்சைக்கு முன் உள்ளூர் தகுதிவாய்ந்த வேளாண் நிபுணரை அணுகவும்.",
      modelPrediction: "மாதிரி கணிப்பு", confidence: "மாதிரி மதிப்பெண்", confidenceNote: "மாதிரியின் softmax மதிப்பெண்; அளவீடு செய்யப்பட்ட நிகழ்தகவோ துல்லிய மதிப்பீடோ அல்ல.",
      affectedCrop: "பாதிக்கப்பட்ட பயிர்", symptoms: "பொதுவான அறிகுறிகள்", possibleCauses: "சாத்தியமான காரணம்", severity: "தீவிரம்",
      severityUnknown: "இந்த மாதிரி மதிப்பிடவில்லை", modelNotAvailable: "இந்த அறிக்கைக்கு கணிப்பு உருவாக்கப்படவில்லை.",
      unsupportedCropNotice: "இந்தப் பயிர் மாதிரி வகைகளில் இல்லை. நிபுணர் உங்கள் அறிக்கையை மதிப்பாய்வு செய்யலாம்.",
      cropMismatchNotice: "மாதிரி முடிவு நீங்கள் தேர்ந்தெடுத்த பயிருடன் பொருந்தவில்லை; கணிப்பு சேமிக்கப்படவில்லை.",
      healthyCaution: "ஆரோக்கிய வகை முடிவு நோயை முற்றிலும் மறுப்பதில்லை. அறிகுறிகள் தொடர்ந்தால் உள்ளூர் ஆலோசனையைப் பெறவும்.",
      organicTreatment: "குறைந்த ஆபத்துள்ள வயல் நடைமுறைகள்", chemicalGuidance: "பூச்சிக்கொல்லி பாதுகாப்பு",
      organicTreatmentCopy: "கடுமையாகப் பாதிக்கப்பட்ட தாவரப் பகுதிகளைத் தேவைக்கேற்ப அகற்றவும்; மாசடைந்த மண் அல்லது கருவிகளைப் பகிர்வதைத் தவிர்க்கவும்; காற்றோட்டத்தை மேம்படுத்தி இலைகள் ஈரமாக இருப்பதைத் தவிர்க்கவும். உள்ளூர் வழிகாட்டுதலை உறுதிப்படுத்தவும்.",
      chemicalGuidanceCopy: "இங்கு எந்தப் பொருளும் அளவும் பரிந்துரைக்கப்படவில்லை. உங்கள் பகுதியில் இந்தப் பயிர்/பாதிப்புக்கு பதிவு செய்யப்பட்ட பொருளை மட்டுமே பயன்படுத்தி, லேபிள், பாதுகாப்பு உபகரணம், மீள் நுழைவு மற்றும் அறுவடைக்கு முந்தைய வழிமுறைகளைப் பின்பற்றவும்.",
      advisorySources: "பொது ஆதாரங்கள்: தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழக பயிர் பாதுகாப்பு வழிகாட்டுதல் மற்றும் UC ஒருங்கிணைந்த பூச்சி மேலாண்மை. உள்ளூர் கண்டறிதல் மற்றும் தற்போதைய பதிவுகளே முன்னுரிமை.",
      notConfirmed: "AI திரையாய்வு — நிபுணர் உறுதிப்படுத்தவில்லை", expertResponse: "நிபுணர் பதில்", waitingExpert: "இதுவரை நிபுணர் பதில் இல்லை.",
      expertConfirmed: "நிபுணர் மதிப்பாய்வு செய்தார்", pageExpert: "நிபுணர் முகப்புப்பலகை",
      expertIntro: "விவசாயிகள் சமர்ப்பித்த அறிக்கைகளை மதிப்பாய்வு செய்து, படங்களைப் பார்த்து, ஆலோசனை வழங்கவும்.",
      reportQueue: "சமர்ப்பித்த அறிக்கைகள்", noExpertReports: "விவசாயி அறிக்கைகள் எதுவும் இல்லை.",
      farmerLabel: "விவசாயி", locationLabel: "இடம்", reviewReport: "அறிக்கையை மதிப்பாய்வு",
      pageExpertLogin: "நிபுணர் உள்நுழைவு", expertLoginIntro: "அங்கீகரிக்கப்பட்ட வேளாண் நிபுணர்களுக்கு மட்டும். உள்ளூர் நிர்வாகி கணக்கை உருவாக்க வேண்டும்.",
      expertLogin: "நிபுணராக உள்நுழைக", expertLoginNotice: "விவசாயி கணக்கைப் பயன்படுத்த வேண்டாம். நிபுணர் கணக்கை நிர்வாகியிடம் கோரவும்.",
      expertReplyLabel: "உங்கள் ஆலோசனைப் பதில்", expertReplyHint: "தெளிவான பயிர் சார்ந்த வழிகாட்டுதலை வழங்கவும். உறுதிப்படுத்தாத நோயறிதல் மற்றும் பூச்சிக்கொல்லி அளவுகளைத் தவிர்க்கவும்.", farmerNote: "விவசாயியின் கவனிப்பு",
      saveResponse: "ஆலோசனையைச் சேமிக்கவும்", invalidExpertResponse: "10 முதல் 5,000 எழுத்துகளுக்குள் ஆலோசனை எழுதவும்.",
      expertResponseSaved: "உங்கள் ஆலோசனை சேமிக்கப்பட்டது.", logoutExpert: "நிபுணர் வெளியேறு",
      healthyTomato: "தக்காளி — ஆரோக்கிய வகை", healthyPotato: "உருளைக்கிழங்கு — ஆரோக்கிய வகை",
      tomatoBacterial: "தக்காளி — பாக்டீரியா புள்ளி நோய்", tomatoEarly: "தக்காளி — ஆரம்ப கருகல்",
      tomatoLate: "தக்காளி — தாமத கருகல்", tomatoLeafMold: "தக்காளி — இலை பூஞ்சை",
      tomatoSeptoria: "தக்காளி — செப்டோரியா இலைப் புள்ளி", tomatoMites: "தக்காளி — சிலந்திப் பூச்சி",
      tomatoTarget: "தக்காளி — இலக்கு புள்ளி நோய்", tomatoYellow: "தக்காளி — மஞ்சள் இலை சுருள் வைரஸ்",
      tomatoMosaic: "தக்காளி — மொசைக் வைரஸ்", potatoEarly: "உருளைக்கிழங்கு — ஆரம்ப கருகல்",
      potatoLate: "உருளைக்கிழங்கு — தாமத கருகல்",
      factsHealthy: "ஆரோக்கிய வகைக்கு நோய் அறிகுறிகள் குறிப்பிடப்படவில்லை.", causeHealthy: "ஆரோக்கிய வகைக்கு பொருந்தாது.",
      factsBacterial: "சிறிய நீர் நனைந்த அல்லது கரும்புள்ளிகள் உருவாகி ஈரத்தில் ஒன்றாகலாம்.", causeBacterial: "பாக்டீரியா தொற்று; தண்ணீர் தெறிப்பு மற்றும் கையாளுதல் பரவச் செய்யலாம்.",
      factsEarly: "பழைய இலைகளில் வளைய வடிவ பழுப்பு புள்ளிகள் தோன்றலாம்; பின்னர் மஞ்சளாகலாம்.", causeEarly: "Alternaria பூஞ்சையுடன் தொடர்புடையது; இலை ஈரம் மற்றும் பயிர் அழுத்தம் பரவலை ஊக்குவிக்கலாம்.",
      factsLate: "குளிர்ந்த ஈரமான சூழலில் நீர் நனைந்த அல்லது கரும்புள்ளிகள் வேகமாகப் பரவலாம்.", causeLate: "Phytophthora infestans உடன் தொடர்புடையது; ஈரமான வானிலை பரவலை ஊக்குவிக்கலாம்.",
      factsLeafMold: "ஈரமான சூழலில் மேல் இலைகள் மஞ்சளாகவும் கீழ்புறம் ஆலிவ் நிற வளர்ச்சியுடனும் இருக்கலாம்.", causeLeafMold: "Passalora fulva உடன் தொடர்புடையது; ஈரமும் காற்றோட்டமின்மையும் உதவலாம்.",
      factsSeptoria: "சிறிய வட்ட இலைப் புள்ளிகளுக்கு கருமையான விளிம்பும் வெளிர் மையமும் இருக்கலாம்.", causeSeptoria: "Septoria lycopersici பூஞ்சையுடன் தொடர்புடையது; மழைத் தெறிப்பு வித்துகளைப் பரப்பலாம்.",
      factsMites: "இலைகளில் நுண் வெளிறிய புள்ளிகள், வெண்கல நிறம் அல்லது வலை தோன்றலாம்.", causeMites: "சிலந்திப் பூச்சி உண்பதால்; வெப்பமான உலர் சூழல் சாதகமாக இருக்கலாம்.",
      factsTarget: "வெப்ப ஈரத்தில் வளரும் பழுப்பு புள்ளிகளில் செறிவான வளையங்கள் தோன்றலாம்.", causeTarget: "Corynespora cassiicola உடன் தொடர்புடையது; அறிகுறிகள் ஒத்திருப்பதால் உள்ளூரில் உறுதிப்படுத்தவும்.",
      factsYellow: "இலை சுருள், மஞ்சளாதல், வளர்ச்சி குன்றுதல் தோன்றலாம்.", causeYellow: "வெள்ளை ஈ பரப்பும் begomovirus குழுவுடன் தொடர்புடையது; உள்ளூரில் உறுதிப்படுத்தவும்.",
      factsMosaic: "இலைகளில் வெளிர்/கருமை கலவை வடிவம் அல்லது சிதைவு தோன்றலாம்.", causeMosaic: "தாவர வைரஸ்களுடன் தொடர்புடையது; சில வைரஸ்கள் கருவி/கையாளுதலால் பரவலாம்.",
      sourceTnau: "TNAU பயிர் பாதுகாப்பு", sourceUc: "UC IPM"
    },
    hi: {
      detectionIntro: "फसल की फोटो अपलोड करके रिपोर्ट सहेजें; उपलब्ध मॉडल वाली फसलों के लिए AI स्क्रीनिंग मांगी जा सकती है।",
      cropSupportNote: "इस मॉडल में 14 फसलों की PlantVillage श्रेणियाँ हैं। चाय, धान और कपास की रिपोर्ट AI जाँच के बिना विशेषज्ञ समीक्षा के लिए भेजी जा सकती है। खेत या असंबंधित तस्वीरों का वर्गीकरण गलत हो सकता है।",
      uploadFormats: "JPG, PNG या WEBP · अधिकतम 5 MB", submitReport: "विशेषज्ञ समीक्षा के लिए जमा करें",
      imageTooSmallServer: "यह तस्वीर जाँच के लिए बहुत छोटी है। कम से कम 64 × 64 पिक्सेल की साफ तस्वीर अपलोड करें।",
      imageTooSmall: "कम से कम 64 × 64 पिक्सेल की साफ तस्वीर अपलोड करें।",
      imageDomainWarning: "यह मॉडल PlantVillage की पत्ती वाली तस्वीरों पर प्रशिक्षित है। यह असंबंधित तस्वीरों या हर खेत की स्थिति को भरोसे से नहीं पहचानता; फसल की पुष्टि करें और परिणाम को अपुष्ट स्क्रीनिंग मानें।",
      detectedCrop: "मॉडल द्वारा पहचानी गई फसल", modelClassDetailsUnavailable: "इस मॉडल श्रेणी के लिए यहाँ रोग-विशिष्ट जानकारी उपलब्ध नहीं है। उपचार से पहले स्थानीय कृषि विशेषज्ञ से सलाह लें।",
      cropApple: "सेब", cropBlueberry: "ब्लूबेरी", cropCherry: "चेरी", cropCorn: "मक्का", cropGrape: "अंगूर",
      cropOrange: "संतरा", cropPeach: "आड़ू", cropBellPepper: "शिमला मिर्च", cropRaspberry: "रास्पबेरी",
      cropSoybean: "सोयाबीन", cropSquash: "स्क्वैश", cropStrawberry: "स्ट्रॉबेरी",
      submitForExpertReview: "विशेषज्ञ समीक्षा के लिए जमा करें", downloadPdf: "PDF डाउनलोड करें",
      reportPhotoHint: "फोटो रिपोर्ट के साथ निजी रूप से सहेजी जाती है और केवल आपको तथा अधिकृत विशेषज्ञों को दिखती है।",
      reportSubmitted: "आपकी फसल रिपोर्ट सहेज ली गई है।", invalidCrop: "सूची में से फसल चुनें।",
      invalidDescription: "टिप्पणी 1,000 अक्षरों से कम रखें।", imageRequired: "पहले फसल की फोटो चुनें।",
      imageTooLargeServer: "तस्वीर बहुत बड़ी है। 5 MB से छोटी फोटो चुनें।",
      imageUnsupported: "मान्य JPG, PNG या WEBP तस्वीर चुनें।", imageInvalid: "तस्वीर पढ़ी नहीं जा सकी। दूसरी फोटो आज़माएँ।",
      modelUnavailable: "रिपोर्ट सहेजी गई, पर मॉडल इंस्टॉल नहीं है। कोई अनुमान नहीं बनाया गया।",
      cropNotSupported: "यह फसल इंस्टॉल किए मॉडल में शामिल नहीं है। AI परिणाम के बिना रिपोर्ट सहेजी गई।",
      inferenceUnavailable: "रिपोर्ट सहेजी गई, लेकिन AI विश्लेषण पूरा नहीं हो सका।",
      cropTea: "चाय", cropPotato: "आलू", noReports: "अभी रिपोर्ट नहीं है। फोटो भेजकर रिपोर्ट बनाएँ।",
      featureDetectCopy: "फसल रिपोर्ट भेजें और संगत मॉडल इंस्टॉल होने पर स्क्रीनिंग परिणाम पाएँ।",
      featureHistoryCopy: "अपने खाते में सहेजी रिपोर्ट, स्क्रीनिंग स्थिति और विशेषज्ञ जवाब देखें।",
      stepThreeCopy: "मॉडल अपनी 14 समर्थित फसलों की स्क्रीनिंग करता है। चाय, धान और कपास की रिपोर्ट AI परिणाम के बिना जमा की जा सकती हैं।",
      aboutBullet3: "अधिकृत विशेषज्ञ रिपोर्ट देख सकते हैं; AI स्क्रीनिंग केवल समर्थित फसलों तक सीमित है।",
      aboutCopy: "VELAN AI किसान खाते, फसल रिपोर्ट और विशेषज्ञ सलाह जोड़ता है। AI स्क्रीनिंग इंस्टॉल किए मॉडल की फसलों तक सीमित है।",
      footerNote: "चरण 3 रिपोर्ट · AI स्क्रीनिंग सीमित है और विशेषज्ञ निदान नहीं है।",
      detectionDisabled: "AI स्क्रीनिंग केवल इंस्टॉल किए मॉडल द्वारा समर्थित फसलों के लिए है।",
      imageTooLarge: "5 MB से छोटी तस्वीर चुनें।",
      pageHistory: "रिपोर्ट इतिहास", historyIntro: "आपकी सहेजी गई फसल रिपोर्ट और विशेषज्ञ जवाब।",
      historySampleNote: "यह आपके खाते की वास्तविक रिपोर्ट हैं। नमूना रिपोर्ट नहीं दिखाई जातीं।",
      recentReports: "आपकी रिपोर्ट", searchReports: "रिपोर्ट खोजें", noReports: "अभी रिपोर्ट नहीं है। फोटो भेजकर रिपोर्ट बनाएँ।",
      tableDate: "तारीख", tableCrop: "फसल", tableDetails: "AI परिणाम", tableStatus: "स्थिति", tableAction: "कार्य",
      viewReport: "रिपोर्ट देखें", reportSubmittedStatus: "विशेषज्ञ समीक्षा की प्रतीक्षा", reportPendingReviewStatus: "समीक्षा लंबित", reportReviewedStatus: "विशेषज्ञ ने जवाब दिया",
      aiStatus: "AI स्क्रीनिंग", aiPredicted: "मॉडल अनुमान उपलब्ध", aiUnavailable: "AI परिणाम उपलब्ध नहीं",
      pageReport: "फसल रिपोर्ट", reportDisclaimer: "AI परिणाम केवल स्क्रीनिंग सुझाव है, पुष्टि किया गया निदान नहीं। मॉडल स्कोर सटीकता की गारंटी नहीं है। उपचार से पहले स्थानीय कृषि विशेषज्ञ से सलाह लें।",
      modelPrediction: "मॉडल अनुमान", confidence: "मॉडल स्कोर", confidenceNote: "मॉडल का softmax स्कोर; यह सत्यापित संभावना या सटीकता का अनुमान नहीं है।",
      affectedCrop: "प्रभावित फसल", symptoms: "सामान्य लक्षण", possibleCauses: "संभावित कारण", severity: "गंभीरता",
      severityUnknown: "इस मॉडल ने आकलन नहीं किया", modelNotAvailable: "इस रिपोर्ट के लिए कोई अनुमान नहीं बनाया गया।",
      unsupportedCropNotice: "यह फसल मॉडल के लेबल में शामिल नहीं है। विशेषज्ञ फिर भी रिपोर्ट देख सकता है।",
      cropMismatchNotice: "मॉडल परिणाम चुनी गई फसल से मेल नहीं खाया, इसलिए अनुमान सहेजा नहीं गया।",
      healthyCaution: "स्वस्थ वर्ग का परिणाम बीमारी को पूरी तरह नकारता नहीं है। लक्षण बने रहें तो स्थानीय सलाह लें।",
      organicTreatment: "कम जोखिम वाली खेत प्रथाएँ", chemicalGuidance: "कीटनाशक सुरक्षा",
      organicTreatmentCopy: "जहाँ उचित हो गंभीर रूप से प्रभावित पौध सामग्री हटाएँ; दूषित मिट्टी या औज़ार खेतों में न ले जाएँ; हवा का संचार बढ़ाएँ और संभव हो तो पत्तियाँ सूखी रखें। स्थानीय सलाह लें।",
      chemicalGuidanceCopy: "यहाँ कोई उत्पाद या खुराक नहीं बताई गई है। अपने क्षेत्र में इस फसल/समस्या के लिए पंजीकृत उत्पाद ही लें और लेबल, सुरक्षा उपकरण, पुनः प्रवेश तथा कटाई-पूर्व निर्देश मानें।",
      advisorySources: "सामान्य स्रोत: तमिलनाडु कृषि विश्वविद्यालय फसल-सुरक्षा मार्गदर्शन और UC एकीकृत कीट प्रबंधन। स्थानीय निदान और वर्तमान पंजीकरण को प्राथमिकता दें।",
      notConfirmed: "AI स्क्रीनिंग — विशेषज्ञ ने पुष्टि नहीं की", expertResponse: "विशेषज्ञ का जवाब", waitingExpert: "अभी विशेषज्ञ का जवाब नहीं है।",
      expertConfirmed: "विशेषज्ञ ने समीक्षा की", pageExpert: "विशेषज्ञ डैशबोर्ड",
      expertIntro: "किसानों की रिपोर्ट देखें, तस्वीरों की समीक्षा करें और कृषि सलाह दें।",
      reportQueue: "जमा की गई रिपोर्ट", noExpertReports: "किसान की कोई रिपोर्ट जमा नहीं हुई है।",
      farmerLabel: "किसान", locationLabel: "स्थान", reviewReport: "रिपोर्ट की समीक्षा",
      pageExpertLogin: "विशेषज्ञ लॉगिन", expertLoginIntro: "केवल अधिकृत कृषि विशेषज्ञ। स्थानीय प्रशासक खाते बनाता है।",
      expertLogin: "विशेषज्ञ के रूप में लॉगिन", expertLoginNotice: "किसान खाते का उपयोग न करें। प्रशासक से विशेषज्ञ खाता बनवाएँ।",
      expertReplyLabel: "आपकी कृषि सलाह", expertReplyHint: "स्पष्ट फसल-विशिष्ट सलाह दें। अपुष्ट निदान और कीटनाशक खुराक न लिखें।", farmerNote: "किसान का विवरण",
      saveResponse: "सलाह सहेजें", invalidExpertResponse: "10 से 5,000 अक्षरों के बीच सलाह लिखें।",
      expertResponseSaved: "आपकी सलाह सहेज ली गई है।", logoutExpert: "विशेषज्ञ लॉगआउट",
      healthyTomato: "टमाटर — स्वस्थ वर्ग", healthyPotato: "आलू — स्वस्थ वर्ग",
      tomatoBacterial: "टमाटर — जीवाणु धब्बा", tomatoEarly: "टमाटर — अगेती झुलसा",
      tomatoLate: "टमाटर — पछेती झुलसा", tomatoLeafMold: "टमाटर — पत्ती फफूंद",
      tomatoSeptoria: "टमाटर — सेप्टोरिया पत्ती धब्बा", tomatoMites: "टमाटर — मकड़ी घुन",
      tomatoTarget: "टमाटर — लक्ष्य धब्बा", tomatoYellow: "टमाटर — पीली पत्ती कर्ल वायरस",
      tomatoMosaic: "टमाटर — मोज़ेक वायरस", potatoEarly: "आलू — अगेती झुलसा",
      potatoLate: "आलू — पछेती झुलसा",
      factsHealthy: "स्वस्थ वर्ग लेबल में बीमारी के लक्षण निर्दिष्ट नहीं हैं।", causeHealthy: "स्वस्थ वर्ग पर लागू नहीं।",
      factsBacterial: "छोटे पानी-जैसे या गहरे पत्ती धब्बे बन सकते हैं और नमी में मिल सकते हैं।", causeBacterial: "जीवाणु संक्रमण; पानी के छींटे और संभालने से फैल सकता है।",
      factsEarly: "पुरानी पत्तियों पर गोल छल्लों वाले भूरे धब्बे और बाद में पीलापन हो सकता है।", causeEarly: "अक्सर Alternaria कवक से जुड़ा; पत्ती की नमी और फसल तनाव इसे बढ़ा सकते हैं।",
      factsLate: "ठंडी नम परिस्थितियों में पानी-जैसे या काले धब्बे तेज़ी से फैल सकते हैं।", causeLate: "Phytophthora infestans से जुड़ा; नम मौसम प्रसार बढ़ा सकता है।",
      factsLeafMold: "नमी में ऊपर पीले धब्बे और पत्तियों के नीचे जैतूनी वृद्धि दिख सकती है।", causeLeafMold: "Passalora fulva से जुड़ा; नमी और कम हवा अनुकूल हो सकते हैं।",
      factsSeptoria: "छोटे गोल पत्ती धब्बों के गहरे किनारे और हल्के केंद्र हो सकते हैं।", causeSeptoria: "Septoria lycopersici कवक से जुड़ा; बारिश के छींटे बीजाणु फैला सकते हैं।",
      factsMites: "पत्तियों पर बारीक हल्के बिंदु, कांस्य रंग या जाला दिख सकता है।", causeMites: "मकड़ी घुन का भोजन; गर्म और शुष्क मौसम अनुकूल हो सकता है।",
      factsTarget: "गर्म नमी में भूरे धब्बे बढ़कर संकेंद्रित छल्ले बना सकते हैं।", causeTarget: "Corynespora cassiicola से जुड़ा; मिलते लक्षणों के कारण स्थानीय पुष्टि लें।",
      factsYellow: "पत्ती मुड़ना, पीलापन और रुकी वृद्धि हो सकती है।", causeYellow: "सफेद मक्खी से फैलने वाले begomovirus समूह से जुड़ा; स्थानीय पुष्टि लें।",
      factsMosaic: "पत्तियों पर हल्के-गहरे चितकबरे पैटर्न या विकृति हो सकती है।", causeMosaic: "पौध वायरस से जुड़ा; कुछ वायरस औज़ार या संभाल से फैल सकते हैं।",
      sourceTnau: "TNAU फसल सुरक्षा", sourceUc: "UC IPM"
    }
  };
  Object.keys(stage3Translations).forEach(function (language) {
    Object.assign(translations[language], stage3Translations[language]);
  });

  const pageFiles = {
    home: "/",
    register: "/farmer/register",
    login: "/farmer/login",
    dashboard: "/farmer/dashboard",
    profile: "/farmer/profile",
    detection: "/disease-detection",
    history: "/farmer/reports",
    advisory: "/advisory",
    expert: "/expert-dashboard",
    expertLogin: "/expert/login"
  };
  const page = document.body.dataset.page || "home";
  const app = document.getElementById("app");
  const state = window.VELAN_STATE || {};
  const currentUser = state.user || null;
  const userRole = state.role || null;
  const formValues = state.form_values || {};
  let objectUrl = "";
  let hasImage = false;
  let selectedImageFile = null;
  let toastTimer;
  let currentLanguage = getLanguage();

  function getLanguage() {
    try {
      const saved = window.localStorage.getItem("velan-language");
      return saved && translations[saved] ? saved : "en";
    } catch (error) {
      return "en";
    }
  }

  function t(key) {
    return translations[currentLanguage][key] || translations.en[key] || key;
  }

  function href(name) {
    if (name === "report" && state.report) {
      return (state.expert_view ? "/expert/reports/" : "/farmer/reports/") + state.report.id;
    }
    return pageFiles[name];
  }

  function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function csrfField() {
    return '<input type="hidden" name="csrf_token" value="' + escapeHTML(state.csrf_token) + '">';
  }

  function formValue(name, fallback) {
    if (Object.prototype.hasOwnProperty.call(formValues, name)) return formValues[name];
    return fallback || "";
  }

  function brandMark() {
    return '<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.6 4.4c-6.8.1-11.1 2.2-12.8 6.4-1.1 2.7.1 5.3 2.5 6.2 4.3 1.6 9.1-4.1 10.3-12.6Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M4.3 20c1.8-4.6 5-7.9 9.5-9.9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span>';
  }

  function navLink(name) {
    return '<a href="' + href(name) + '"' + (page === name ? ' aria-current="page"' : "") + '>' + t(name) + '</a>';
  }

  function header() {
    const options = [
      ["en", "English"], ["ta", "தமிழ்"], ["hi", "हिन्दी"]
    ].map(function (item) {
      return '<option value="' + item[0] + '"' + (currentLanguage === item[0] ? " selected" : "") + '>' + item[1] + "</option>";
    }).join("");
    return '<header class="site-header"><div class="container header-inner">' +
      '<a class="brand" href="' + href("home") + '" aria-label="VELAN AI — ' + t("tagline") + '">' + brandMark() +
      '<span><span class="brand-name">VELAN AI</span><span class="brand-tagline">' + t("tagline") + "</span></span></a>" +
      '<button class="menu-toggle" type="button" aria-expanded="false" aria-label="' + t("menuOpen") + '">☰</button>' +
      '<nav class="primary-nav" aria-label="' + t("quickLinks") + '">' +
      (userRole === "expert"
        ? ["home", "expert", "advisory"]
        : ["home", "dashboard"].concat(userRole === "farmer" ? ["profile"] : []).concat(["detection", "history", "advisory"]).concat(userRole === "farmer" ? [] : ["expert"])
      ).map(navLink).join("") +
      (currentUser ? '<form class="nav-logout" method="post" action="' + (userRole === "expert" ? "/expert/logout" : "/farmer/logout") + '">' + csrfField() + '<button class="text-link" type="submit">' + (userRole === "expert" ? t("logoutExpert") : t("logout")) + "</button></form>" : "") + "</nav>" +
      '<div class="header-actions"><label class="sr-only" for="language">' + t("language") + '</label><select class="language-select" id="language" aria-label="' + t("language") + '">' + options + "</select>" +
      (userRole === "farmer"
        ? '<a class="button button-secondary button-small" href="' + href("profile") + '">' + t("profile") + "</a>"
        : userRole === "expert"
          ? ""
          : '<a class="button button-primary button-small" href="' + href("register") + '">' + t("getStarted") + "</a>") +
      "</div></div></header>";
  }

  function footer() {
    return '<footer class="site-footer"><div class="container footer-main">' +
      '<div class="footer-brand"><a class="brand" href="' + href("home") + '">' + brandMark() + '<span><span class="brand-name">VELAN AI</span><span class="brand-tagline">' + t("tagline") + '</span></span></a><p>' + t("footerDescription") + "</p></div>" +
      '<div class="footer-col"><h3>' + t("quickLinks") + '</h3><div class="footer-links">' + ["home", "dashboard", "profile", "detection", "history"].filter(function (name) { return name !== "profile" || currentUser; }).map(function (name) { return '<a href="' + href(name) + '">' + t(name) + "</a>"; }).join("") + "</div></div>" +
      '<div class="footer-col"><h3>' + t("usefulLinks") + '</h3><div class="footer-links">' + ["advisory", "expert", "register", "login"].map(function (name) { return '<a href="' + href(name) + '">' + t(name) + "</a>"; }).join("") + "</div></div>" +
      '</div><div class="container footer-bottom"><span>© ' + new Date().getFullYear() + ' VELAN AI</span><span>' + (currentUser ? t("footerNote") : t("footerNote")) + "</span></div></footer>" +
      '<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>';
  }

  function pageHero(title, intro, eyebrow) {
    return '<section class="page-hero"><div class="container"><span class="eyebrow"><span class="eyebrow-dot"></span>' + t(eyebrow || "subtitle") + "</span><h1>" + t(title) + "</h1><p>" + t(intro) + "</p></div></section>";
  }

  function homePage() {
    return '<main><section class="hero"><div class="container"><div class="hero-content"><span class="eyebrow"><span class="eyebrow-dot"></span>' + t("homeEyebrow") +
      "</span><h1>" + t("heroTitle") + '</h1><p class="hero-copy">' + t("heroCopy") +
      '</p><div class="hero-actions"><a class="button button-light" href="' + href("register") + '">' + t("getStarted") + " <span aria-hidden=\"true\">→</span></a>" +
      '<a class="button button-secondary" href="' + href("advisory") + '">' + t("learnMore") + "</a></div>" +
      '<div class="trust-row"><span class="trust-item"><span class="trust-check">✓</span>' + t("trust1") + '</span><span class="trust-item"><span class="trust-check">✓</span>' + t("trust2") + '</span><span class="trust-item"><span class="trust-check">✓</span>' + t("trust3") + "</span></div></div></div></section>" +
      '<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow"><span class="eyebrow-dot"></span>' + t("featureEyebrow") + "</span><h2>" + t("featureTitle") + "</h2><p>" + t("featureIntro") + "</p></div>" +
      '<div class="feature-grid"><a class="card feature-card" href="' + href("detection") + '"><span class="icon-tile" aria-hidden="true">⌁</span><h3>' + t("featureDetect") + "</h3><p>" + t("featureDetectCopy") + "</p></a>" +
      '<a class="card feature-card" href="' + href("advisory") + '"><span class="icon-tile" aria-hidden="true">✳</span><h3>' + t("featureAdvice") + "</h3><p>" + t("featureAdviceCopy") + "</p></a>" +
      '<a class="card feature-card" href="' + href("history") + '"><span class="icon-tile" aria-hidden="true">◷</span><h3>' + t("featureHistory") + "</h3><p>" + t("featureHistoryCopy") + "</p></a></div></div></section>" +
      '<section class="section" style="padding-top:0"><div class="container card split-panel"><div class="split-photo" role="img" aria-label="Sunlight over a green agricultural field"></div><div class="split-copy"><span class="eyebrow"><span class="eyebrow-dot"></span>' + t("aboutEyebrow") + "</span><h2>" + t("aboutTitle") + "</h2><p>" + t("aboutCopy") +
      '</p><ul class="bullet-list"><li>' + t("aboutBullet1") + "</li><li>" + t("aboutBullet2") + "</li><li>" + t("aboutBullet3") +
      '</li></ul><a class="button button-primary" href="' + href("dashboard") + '">' + t("aboutAction") + "</a></div></div></section></main>";
  }

  function formAside(title) {
    return '<aside class="form-aside"><a class="brand" href="' + href("home") + '">' + brandMark() + '<span><span class="brand-name" style="color:white">VELAN AI</span><span class="brand-tagline">' + t("tagline") + "</span></span></a><h2>" + t(title) + '</h2><p>' + t("subtitle") +
      '</p><ul class="bullet-list"><li>' + t("trust1") + "</li><li>" + t("trust2") + "</li></ul></aside>";
  }

  function registerPage() {
    return pageHero("pageRegister", "registerIntro") + '<main class="page-main"><div class="container"><div class="card form-layout">' + formAside("pageRegister") +
      '<form class="form-main" id="register-form" method="post" action="' + href("register") + '"><h2>' + t("getStarted") + '</h2><p>' + t("registerIntro") + '</p>' + csrfField() + '<div class="form-grid">' +
      field("formName", "full_name", "name", "text", true) + field("formPhone", "mobile", "tel", "tel", true) +
      field("formEmail", "email", "email", "email", true) + field("formVillage", "village", "address-level2", "text", true) +
      field("formDistrict", "district", "address-level1", "text", true) + field("formState", "state", "address-level1", "text", true) +
      field("formPassword", "password", "new-password", "password", true) + field("formConfirm", "confirm_password", "new-password", "password", true) + "</div>" +
      '<div class="form-note">' + t("registrationNotice") + '</div><button class="button button-primary" type="submit">' + t("submitRegistration") + '</button><p class="form-switch">' + t("alreadyAccount") + ' <a href="' + href("login") + '">' + t("signInHere") + "</a></p></form></div></div></main>";
  }

  function field(key, name, autocomplete, type, required, value) {
    const id = "field-" + key;
    const fieldValue = value !== undefined ? value : formValue(name);
    const maxlength = name === "password" || name === "confirm_password" ? 256 : (name === "email" ? 254 : 120);
    const minLength = name === "password" || name === "confirm_password" ? 8 : 1;
    return '<div class="field"><label for="' + id + '">' + t(key) + (required ? " *" : "") + '</label><input id="' + id + '" name="' + name + '" type="' + type + '" autocomplete="' + autocomplete + '" maxlength="' + maxlength + '" minlength="' + minLength + '" value="' + escapeHTML(fieldValue) + '"' + (required ? " required" : "") + "></div>";
  }

  function loginPage() {
    return pageHero("pageLogin", "loginIntro") + '<main class="page-main"><div class="container"><div class="card form-layout">' + formAside("pageLogin") +
      '<form class="form-main" id="login-form" method="post" action="' + href("login") + '"><h2>' + t("pageLogin") + '</h2><p>' + t("loginIntro") + '</p>' + csrfField() + '<div class="form-grid">' +
      field("loginIdentity", "identifier", "username", "text", true) + field("password", "password", "current-password", "password", true) +
      '</div><div class="form-note">' + t("loginNotice") + '</div><button class="button button-primary" type="submit">' + t("loginButton") + '</button><p class="form-switch">' + t("noAccount") + ' <a href="' + href("register") + '">' + t("registerHere") + "</a></p></form></div></div></main>";
  }

  function dashboardPage() {
    const name = currentUser ? escapeHTML(currentUser.name) : "";
    const reportCount = currentUser ? currentUser.report_count : 0;
    const memberSince = currentUser ? escapeHTML(currentUser.member_since) : "";
    return '<section class="page-hero"><div class="container"><span class="eyebrow"><span class="eyebrow-dot"></span>' + t("realAccountNotice") + '</span><h1>' + t("dashboardGreeting") + ", " + name + '</h1><p>' + t("dashboardIntro") + '</p></div></section>' +
      '<main class="page-main"><div class="container"><div class="dashboard-top"><div><h2>' + t("dashboard") + '</h2><p>' + t("realAccountNotice") + '</p></div><span class="sample-notice">✓ ' + t("realAccountNotice") + "</span></div>" +
      '<div class="metric-grid"><article class="card metric-card"><div class="metric-label">' + t("reportCount") + '</div><div class="metric-value">' + reportCount + '</div><div class="metric-detail">' + t(reportCount === 0 ? "noReports" : "viewReports") + '</div></article>' +
      '<article class="card metric-card"><div class="metric-label">' + t("memberSince") + '</div><div class="metric-value" style="font-size:20px">' + memberSince + '</div><div class="metric-detail">' + t("profile") + '</div></article></div>' +
      '<div class="dashboard-grid"><section class="card panel"><div class="panel-head"><h3>' + t("profileDetails") + '</h3><a class="text-link" href="' + href("profile") + '">' + t("editProfile") + " →</a></div>" +
      '<div class="profile-details"><div><strong>' + t("formName") + '</strong><span>' + name + '</span></div><div><strong>' + t("formPhone") + '</strong><span>' + escapeHTML(currentUser.mobile) + '</span></div><div><strong>' + t("formEmail") + '</strong><span>' + escapeHTML(currentUser.email) + '</span></div>' +
      '<div><strong>' + t("formVillage") + '</strong><span>' + escapeHTML(currentUser.village) + '</span></div><div><strong>' + t("formDistrict") + '</strong><span>' + escapeHTML(currentUser.district) + '</span></div><div><strong>' + t("formState") + '</strong><span>' + escapeHTML(currentUser.state) + "</span></div></div>" +
      '<p class="small muted" style="margin:17px 0 0">' + t("noReports") + '</p></section><aside><div class="card info-card"><h3>' + t("quickActions") + '</h3><div class="quick-links"><a class="quick-link" href="' + href("profile") + '">' + t("editProfile") + ' <span>→</span></a><a class="quick-link" href="' + href("history") + '">' + t("viewReports") + ' <span>→</span></a><a class="quick-link" href="' + href("detection") + '">' + t("prepareReport") + ' <span>→</span></a></div></div>' +
      '<div class="advisory-disclaimer">' + t("sampleGuidanceNotice") + '<br>' + t("sampleGuidance") + "</div></aside></div>" +
      '<section class="card panel" style="margin-top:18px"><div class="panel-head"><h3>' + t("recentReports") + '</h3><a class="text-link" href="' + href("history") + '">' + t("viewHistory") + "</a></div>" +
      '<div class="report-list">' + (currentUser.reports || []).map(reportRow).join("") + '</div>' +
      ((currentUser.reports || []).length ? "" : '<p class="muted small">' + t("noReports") + "</p>") + "</section></div></main>";
  }

  function profilePage() {
    const values = currentUser || {};
    return pageHero("pageProfile", "profileIntro") + '<main class="page-main"><div class="container"><div class="card form-layout">' + formAside("pageProfile") +
      '<form class="form-main" id="profile-form" method="post" action="' + href("profile") + '"><h2>' + t("profileDetails") + '</h2><p>' + t("profileIntro") + '</p>' + csrfField() + '<div class="form-grid">' +
      field("formName", "full_name", "name", "text", true, formValue("full_name", values.name)) +
      field("formPhone", "mobile", "tel", "tel", true, formValue("mobile", values.mobile)) +
      field("formEmail", "email", "email", "email", true, formValue("email", values.email)) +
      field("formVillage", "village", "address-level2", "text", true, formValue("village", values.village)) +
      field("formDistrict", "district", "address-level1", "text", true, formValue("district", values.district)) +
      field("formState", "state", "address-level1", "text", true, formValue("state", values.state)) +
      '</div><div class="form-note">' + t("registrationNotice") + '</div><button class="button button-primary" type="submit">' + t("updateProfile") + "</button></form></div></div></main>";
  }

  const diseaseDisplay = {
    "Healthy Tomato Plant": ["healthyTomato", "factsHealthy", "causeHealthy"],
    "Healthy Potato Plant": ["healthyPotato", "factsHealthy", "causeHealthy"],
    "Tomato with Bacterial Spot": ["tomatoBacterial", "factsBacterial", "causeBacterial"],
    "Tomato with Early Blight": ["tomatoEarly", "factsEarly", "causeEarly"],
    "Potato with Early Blight": ["potatoEarly", "factsEarly", "causeEarly"],
    "Tomato with Late Blight": ["tomatoLate", "factsLate", "causeLate"],
    "Potato with Late Blight": ["potatoLate", "factsLate", "causeLate"],
    "Tomato with Leaf Mold": ["tomatoLeafMold", "factsLeafMold", "causeLeafMold"],
    "Tomato with Septoria Leaf Spot": ["tomatoSeptoria", "factsSeptoria", "causeSeptoria"],
    "Tomato with Spider Mites or Two-spotted Spider Mite": ["tomatoMites", "factsMites", "causeMites"],
    "Tomato with Target Spot": ["tomatoTarget", "factsTarget", "causeTarget"],
    "Tomato Yellow Leaf Curl Virus": ["tomatoYellow", "factsYellow", "causeYellow"],
    "Tomato Mosaic Virus": ["tomatoMosaic", "factsMosaic", "causeMosaic"]
  };

  function diseaseText(label, index) {
    const values = diseaseDisplay[label];
    return values ? t(values[index]) : escapeHTML(label);
  }

  function reportRow(report) {
    const label = report.prediction ? diseaseText(report.prediction, 0) : t("aiUnavailable");
    const status = report.status === "reviewed"
      ? "reportReviewedStatus"
      : report.status === "pending_review"
        ? "reportPendingReviewStatus"
        : "reportSubmittedStatus";
    return '<div class="report-row" data-search="' + escapeHTML((report.crop_type + " " + (report.prediction || "")).toLowerCase()) + '"><span class="crop-avatar" aria-hidden="true">🌿</span><span><strong>' +
      escapeHTML(report.crop_type) + " · " + label + '</strong><small>' + escapeHTML(report.submitted_at) +
      '</small></span><span class="report-row-action"><span class="status">' + t(status) +
      '</span><a class="text-link" href="/farmer/reports/' + report.id + '">' + t("viewReport") + "</a></span></div>";
  }

  function detectionPage() {
    return pageHero("pageDetection", "detectionIntro") + '<main class="page-main"><div class="container">' +
      '<div class="upload-layout"><section class="card upload-card"><div class="panel-head"><h3>' + t("uploadTitle") + '</h3></div>' +
      '<form id="report-form" method="post" action="/farmer/reports" enctype="multipart/form-data">' + csrfField() +
      '<label class="upload-box" id="upload-box" for="crop-image"><input id="crop-image" name="crop_image" type="file" accept="image/jpeg,image/png,image/webp" required><span class="upload-placeholder"><span class="upload-icon" aria-hidden="true">↥</span><strong>' + t("uploadHint") + '</strong><span>' + t("uploadFormats") + '</span></span><img class="preview-image" id="image-preview" alt="' + t("uploadTitle") + '"></label>' +
      '<button class="icon-button" id="remove-image" type="button" hidden style="margin-top:11px">' + t("removeImage") + '</button><div class="upload-controls"><div class="field"><label for="detection-crop">' + t("cropType") + '</label><select id="detection-crop" name="crop_type" required>' +
      [["", "selectCrop"], ["Tea", "cropTea"], ["Tomato", "cropTomato"], ["Rice", "cropRice"], ["Potato", "cropPotato"], ["Cotton", "cropCotton"], ["Apple", "cropApple"], ["Blueberry", "cropBlueberry"], ["Cherry", "cropCherry"], ["Corn", "cropCorn"], ["Grape", "cropGrape"], ["Orange", "cropOrange"], ["Peach", "cropPeach"], ["Bell Pepper", "cropBellPepper"], ["Raspberry", "cropRaspberry"], ["Soybean", "cropSoybean"], ["Squash", "cropSquash"], ["Strawberry", "cropStrawberry"]].map(function (item) { return '<option value="' + item[0] + '"' + (formValue("crop_type") === item[0] ? " selected" : "") + '>' + t(item[1]) + "</option>"; }).join("") +
      "</select></div></div><div class=\"field\" style=\"margin-top:15px\"><label for=\"crop-condition\">" + t("cropCondition") + '</label><textarea id="crop-condition" name="description" maxlength="1000" placeholder="' + t("conditionHint") + '">' + escapeHTML(formValue("description")) + '</textarea><span class="field-hint">' + t("reportPhotoHint") + '</span></div><button class="button button-primary" id="prepare-report" type="submit" style="margin-top:16px">' + t("submitReport") + "</button></form></section>" +
      '<aside><section class="card info-card"><h3>' + t("nextSteps") + '</h3><div class="steps"><div class="step"><span class="step-num">1</span><div><strong>' + t("stepOne") + '</strong><p>' + t("stepOneCopy") + '</p></div></div><div class="step"><span class="step-num">2</span><div><strong>' + t("stepTwo") + '</strong><p>' + t("stepTwoCopy") + '</p></div></div><div class="step"><span class="step-num">3</span><div><strong>' + t("stepThree") + '</strong><p>' + t("stepThreeCopy") + "</p></div></div></div></section>" +
      '<section class="advisory-disclaimer" style="margin-top:14px">' + t("cropSupportNote") + "<br><br>" + t("imageDomainWarning") + "</section></aside></div></div></main>";
  }

  function historyPage() {
    const reports = currentUser && currentUser.reports ? currentUser.reports : [];
    return pageHero("pageHistory", "historyIntro") + '<main class="page-main"><div class="container"><div class="dashboard-top"><span class="sample-notice">ⓘ ' + t("historySampleNote") + '</span></div><section class="card panel"><div class="table-toolbar"><h3 style="margin:0">' + t("recentReports") + '</h3><input class="search-input" id="history-search" type="search" placeholder="' + t("searchReports") + '" aria-label="' + t("searchReports") + '"></div>' +
      '<div class="report-list" id="history-rows">' + reports.map(reportRow).join("") + '</div><div class="empty-state" id="history-empty"' + (reports.length ? " hidden" : "") + '>' + t("noReports") + "</div></section></div></main>";
  }

  function renderAdvisoryContent(data) {
    const container = document.getElementById("advisory-content");
    if (!container) return;
    const guidance = [
      { title: "Symptoms", body: data.symptoms },
      { title: "Possible causes", body: data.causes },
      { title: "Organic management", body: data.organic },
      { title: "Chemical safety", body: data.chemical },
      { title: "Prevention", body: data.prevention },
      { title: "Crop care", body: data.care }
    ];
    container.innerHTML = '<div class="advice-grid">' + guidance.map(function (item) {
      return '<article class="card advice-card"><div class="advice-body"><span class="advice-tag">General advisory</span><h3>' + escapeHTML(item.title) + '</h3><p>' + escapeHTML(item.body) + '</p></div></article>';
    }).join("") + '</div><div class="advisory-disclaimer">' + escapeHTML(data.disclaimer) + '</div>';
  }

  function advisoryPage() {
    const selectedCrop = state.advisory && state.advisory.crop ? state.advisory.crop : "Tomato";
    return pageHero("pageAdvisory", "advisoryIntro") + '<main class="page-main"><div class="container"><div class="card panel" style="margin-bottom:18px"><div class="panel-head"><h3>Select crop guidance</h3></div><div class="field" style="max-width:320px"><label for="advisory-crop">Crop</label><select id="advisory-crop" name="crop">' + ["Tea", "Tomato", "Rice", "Potato", "Cotton"].map(function (crop) { return '<option value="' + crop + '"' + (crop === selectedCrop ? ' selected' : '') + '>' + escapeHTML(crop) + '</option>'; }).join("") + '</select></div></div><div id="advisory-content"></div></div></main>';
  }

  function expertPage() {
    const reports = state.reports || [];
    return pageHero("pageExpert", "expertIntro") + '<main class="page-main"><div class="container"><section class="card panel"><div class="panel-head"><h3>' + t("reportQueue") + '</h3></div><div class="expert-list">' +
      reports.map(function (report) {
        return '<article class="expert-item"><div><strong>' + escapeHTML(report.crop_type) + ' · ' + t("farmerLabel") + ': ' + escapeHTML(report.farmer_name) + '</strong><p>' + t("locationLabel") + ': ' + escapeHTML(report.village + ", " + report.district) + ' · ' + escapeHTML(report.submitted_at) + ' · ' + (report.prediction ? diseaseText(report.prediction, 0) : t("aiUnavailable")) + '</p></div><div class="expert-actions"><a class="icon-button" href="/expert/reports/' + report.id + '">' + t("reviewReport") + "</a></div></article>";
      }).join("") +
      '</div>' + (!reports.length ? '<div class="empty-state">' + t("noExpertReports") + "</div>" : "") + "</section></div></main>";
  }

  function expertLoginPage() {
    return pageHero("pageExpertLogin", "expertLoginIntro") + '<main class="page-main"><div class="container"><div class="card form-layout">' + formAside("pageExpertLogin") +
      '<form class="form-main" method="post" action="/expert/login"><h2>' + t("expertLogin") + '</h2><p>' + t("expertLoginIntro") + '</p>' + csrfField() + '<div class="form-grid">' +
      field("loginIdentity", "identifier", "username", "email", true) + field("password", "password", "current-password", "password", true) +
      '</div><div class="form-note">' + t("expertLoginNotice") + '</div><button class="button button-primary" type="submit">' + t("expertLogin") + "</button></form></div></div></main>";
  }

  function reportPage() {
    const report = state.report;
    if (!report) return pageHero("pageReport", "modelNotAvailable") + '<main class="page-main"><div class="container"></div></main>';
    const prediction = report.prediction;
    const predictionDetails = prediction && diseaseDisplay[prediction] ? diseaseDisplay[prediction] : null;
    const statusKey = report.status === "reviewed"
      ? "reportReviewedStatus"
      : report.status === "pending_review"
        ? "reportPendingReviewStatus"
        : "reportSubmittedStatus";
    const aiNotice = report.ai_status === "unsupported_crop" ? t("unsupportedCropNotice") :
      report.ai_status === "predicted_mismatch" || report.ai_status === "crop_mismatch" ? t("cropMismatchNotice") :
      report.ai_status === "model_unavailable" || report.ai_status === "inference_error" ? t("modelNotAvailable") :
        t("notConfirmed");
    const response = report.expert_response
      ? '<section class="card panel"><h3>' + t("expertResponse") + '</h3><p class="preserve-lines">' + escapeHTML(report.expert_response) + '</p><p class="small muted">' + (report.expert_reviewed_at ? escapeHTML(report.expert_reviewed_at) : "") + "</p></section>"
      : '<section class="card panel"><h3>' + t("expertResponse") + '</h3><p class="muted">' + t("waitingExpert") + "</p></section>";
    const replyForm = state.expert_view
      ? '<section class="card panel"><h3>' + t("expertReplyLabel") + '</h3><form method="post" action="/expert/reports/' + report.id + '/response">' + csrfField() +
        '<div class="field"><label for="expert-response">' + t("expertReplyLabel") + '</label><textarea id="expert-response" name="expert_response" minlength="10" maxlength="5000" required>' + escapeHTML(report.expert_response || "") + '</textarea><span class="field-hint">' + t("expertReplyHint") + '</span></div><button class="button button-primary" type="submit" style="margin-top:14px">' + t("saveResponse") + "</button></form></section>"
      : response;
    const canDownloadPdf = currentUser && currentUser.user_id === report.owner_user_id;
    const pdfButton = canDownloadPdf ? '<a class="button button-secondary" href="/farmer/reports/' + report.id + '/pdf" target="_blank" rel="noopener">' + t("downloadPdf") + '</a>' : '';
    return pageHero("pageReport", "reportDisclaimer") + '<main class="page-main"><div class="container report-detail"><div class="report-image-wrap"><img class="report-image" src="' + escapeHTML(report.image_url) + '" alt="' + t("uploadTitle") + '"></div><section class="card panel report-facts"><span class="eyebrow">' + escapeHTML(report.crop_type) + " ? " + escapeHTML(report.submitted_at) + '</span><h2>' + t("modelPrediction") + '</h2><div class="sample-notice">' + t(statusKey) + ' ? ' + aiNotice + "</div>" +
      (report.description ? '<h3 style="margin-top:18px">' + t("farmerNote") + '</h3><p class="preserve-lines">' + escapeHTML(report.description) + '</p>' : "") +
      (prediction ? (
        predictionDetails ?
          '<h3 style="margin-top:18px">' + diseaseText(prediction, 0) + '</h3><p><strong>' + t("detectedCrop") + ':</strong> ' + escapeHTML(report.detected_crop || report.crop_type) + "</p><p><strong>" + t("confidence") + ":</strong> " + report.confidence_percent + '%</p><p class="small muted">' + t("confidenceNote") + '</p><h3>' + t("symptoms") + '</h3><p>' + t(predictionDetails[1]) + '</p><h3>' + t("possibleCauses") + '</h3><p>' + t(predictionDetails[2]) + '</p><h3>' + t("severity") + '</h3><p>' + t("severityUnknown") + '</p>' +
          (predictionDetails[1] === "factsHealthy" ? '<div class="advisory-disclaimer">' + t("healthyCaution") + "</div>" : "") +
          '<h3 style="margin-top:20px">' + t("organicTreatment") + '</h3><p>' + t("organicTreatmentCopy") + '</p><h3>' + t("chemicalGuidance") + '</h3><p>' + t("chemicalGuidanceCopy") + '</p><p class="small muted">' + t("advisorySources") + '</p><p class="small"><a target="_blank" rel="noopener noreferrer" href="https://agritech.tnau.ac.in/">' + t("sourceTnau") + '</a> · <a target="_blank" rel="noopener noreferrer" href="https://ipm.ucanr.edu/">' + t("sourceUc") + "</a></p>" :
          '<h3 style="margin-top:18px">' + escapeHTML(prediction) + '</h3><p><strong>' + t("detectedCrop") + ':</strong> ' + escapeHTML(report.detected_crop || report.crop_type) + '</p><p><strong>' + t("confidence") + ':</strong> ' + report.confidence_percent + '%</p><p class="small muted">' + t("confidenceNote") + '</p><div class="advisory-disclaimer">' + t("modelClassDetailsUnavailable") + '</div><p>' + t("organicTreatmentCopy") + '</p><p>' + t("chemicalGuidanceCopy") + '</p>'
      ) :
        "<p>" + t("modelNotAvailable") + "</p><p>" + t("organicTreatmentCopy") + "</p><p>" + t("chemicalGuidanceCopy") + "</p>") +
      '</section><div class="report-detail-full">' + pdfButton + ' ' + replyForm + "</div></div></main>";
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 4400);
  }

  function setLanguage(language) {
    if (!translations[language]) return;
    document.querySelectorAll("#register-form input, #login-form input, #profile-form input, #report-form input, #report-form select, #report-form textarea").forEach(function (input) {
      if (input.name && input.name !== "csrf_token" && input.type !== "password" && input.type !== "file") {
        formValues[input.name] = input.value;
      }
    });
    currentLanguage = language;
    try {
      window.localStorage.setItem("velan-language", language);
    } catch (error) {
      // The selected language still applies for this page when browser storage is unavailable.
    }
    render();
  }

  function setupInteractions() {
    const languageSelect = document.getElementById("language");
    languageSelect.addEventListener("change", function (event) { setLanguage(event.target.value); });

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".primary-nav");
    menuButton.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", t(isOpen ? "menuClose" : "menuOpen"));
      menuButton.textContent = isOpen ? "×" : "☰";
    });

    const fileInput = document.getElementById("crop-image");
    const uploadBox = document.getElementById("upload-box");
    if (fileInput) {
      fileInput.addEventListener("change", function () { previewFile(fileInput.files && fileInput.files[0]); });
      ["dragenter", "dragover"].forEach(function (name) {
        uploadBox.addEventListener(name, function (event) { event.preventDefault(); uploadBox.classList.add("is-dragging"); });
      });
      ["dragleave", "drop"].forEach(function (name) {
        uploadBox.addEventListener(name, function (event) { event.preventDefault(); uploadBox.classList.remove("is-dragging"); });
      });
      uploadBox.addEventListener("drop", function (event) {
        const file = event.dataTransfer && event.dataTransfer.files[0];
        if (file) {
          const transfer = new DataTransfer();
          transfer.items.add(file);
          fileInput.files = transfer.files;
          previewFile(file);
        }
      });
      document.getElementById("remove-image").addEventListener("click", function () {
        clearImagePreview();
        showToast(t("imageRemoved"));
      });
      if (selectedImageFile) {
        const transfer = new DataTransfer();
        transfer.items.add(selectedImageFile);
        fileInput.files = transfer.files;
        previewFile(selectedImageFile, true);
      }
    }

    const search = document.getElementById("history-search");
    if (search) search.addEventListener("input", function () {
      const query = search.value.trim().toLowerCase();
      const rows = Array.from(document.querySelectorAll("#history-rows .report-row"));
      let visible = 0;
      rows.forEach(function (row) {
        const match = row.dataset.search.includes(query);
        row.hidden = !match;
        if (match) visible++;
      });
      document.getElementById("history-empty").hidden = visible !== 0;
    });

    const advisorySelect = document.getElementById("advisory-crop");
    if (advisorySelect) {
      const loadAdvisory = function () {
        fetch("/api/advisory?crop=" + encodeURIComponent(advisorySelect.value)).then(function (response) {
          return response.ok ? response.json() : null;
        }).then(function (data) {
          if (data) renderAdvisoryContent(data);
        }).catch(function () {
          renderAdvisoryContent({
            crop: advisorySelect.value,
            disease: advisorySelect.value,
            disclaimer: "General educational information only. Conditions differ by location and crop.",
            symptoms: "Monitor leaves, fruit, and canopy for gradual changes and field stress.",
            causes: "Weather, hydration, nutrient imbalance, and pest pressure can change crop health.",
            organic: "Remove affected material, improve airflow, and keep field hygiene consistent.",
            chemical: "Use only registered products and follow local labels, protective equipment, and timing requirements.",
            prevention: "Regular scouting and crop monitoring support earlier action.",
            care: "Keep field records to compare changes over time and talk with local extension staff when needed."
          });
        });
      };
      advisorySelect.addEventListener("change", loadAdvisory);
      loadAdvisory();
    }

  }

  function previewFile(file, suppressToast) {
    const box = document.getElementById("upload-box");
    const preview = document.getElementById("image-preview");
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      clearImagePreview();
      return showToast(t("imageUnsupported"));
    }
    if (file.size > 5 * 1024 * 1024) {
      clearImagePreview();
      return showToast(t("imageTooLarge"));
    }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    hasImage = true;
    selectedImageFile = file;
    preview.src = objectUrl;
    box.classList.add("has-preview");
    document.getElementById("remove-image").hidden = false;
    if (!suppressToast) showToast(t("imageReady"));
  }

  function clearImagePreview() {
    const input = document.getElementById("crop-image");
    const box = document.getElementById("upload-box");
    const preview = document.getElementById("image-preview");
    const removeButton = document.getElementById("remove-image");
    input.value = "";
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = "";
    hasImage = false;
    selectedImageFile = null;
    preview.removeAttribute("src");
    box.classList.remove("has-preview");
    removeButton.hidden = true;
  }

  function render() {
    const pageRenderers = {
      home: homePage,
      register: registerPage,
      login: loginPage,
      dashboard: dashboardPage,
      profile: profilePage,
      detection: detectionPage,
      history: historyPage,
      advisory: advisoryPage,
      expert: expertPage,
      expert_login: expertLoginPage,
      report: reportPage
    };
    document.documentElement.lang = currentLanguage;
    document.title = "VELAN AI | " + t(page === "home" ? "tagline" : page);
    app.innerHTML = header() + pageRenderers[page]() + footer();
    setupInteractions();
    if (state.messages && state.messages.length && state.messages[0].key) {
      showToast(t(state.messages[0].key));
    }
  }

  render();
}());
