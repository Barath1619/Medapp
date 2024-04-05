export  default{
onboardingScreens :[
    {
        text: 'Please select if you have any of the below symptoms.',
    },
    {
        text: 'Please select more if there are any',
    },
    {
        text: 'How long are you experiencing these symptoms?',
    },
    {  
        text: 'On a scale of 1 to 5, how much would you rate your pain ?',
    },
    {
        text: 'What is your age?',
    },
    {      
        text: 'Do you have any Medical Condition?',
    }],
    lowseverity:[
        "Fever","Cough", "Cold", "Fatigue", "Loss Of Smell",  "Loss Of Taste", "Sore Throat", "Runny Nose", "Sneezing",
        "Nausea", "Stomach Upset", "Diarrhea", "Swollen Glands"
    ],
    moderateseverity:[
        "Shortness Of Breath", "Pulpitation", "Seizures", "Chest Pain", "Uncontrolled Bleeding", "Abdominal Pain", "Severe Dehydration", 
        "Loss of Consciousness", "Confusion", "Persistent Vomiting or Diarrhea", "Severe Dehydration"
    ],
    rating:[
        1,2,3,4,5
    ],
    time:["1 Hour","2 Hours","3 Hours"],
    medicalCondition:[
        {
            value: 'Hypertension',
          }, {
            value: 'Diabetes',
          }, {
            value: 'Heart Disease',
          },
          {
            value: 'Arthritis',
          },
          {
            value: 'Allergies',
          },
          {
            value: 'Migraine',
          },
          {
            value: 'Depression',
          },
          {
            value: 'Thyroid Disorders',
          },
          {
            value: 'Chronic Obstructive Pulmonary Disease',
          },
          {
            value:"Gastroesophageal Reflux Disease"
          },
          {
            value: 'Chronic Kidney Disease',
          },
          {
            value: 'Cancer',
          },
          {
            value: 'Bipolar Disorder',
          },
    ]
}