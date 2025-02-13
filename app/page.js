

"use client"
import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    question: "Body Structure & Physique",
    options: [
      { text: "Lean, thin frame, underweight tendency", type: "Vata" },
      { text: "Medium build, athletic", type: "Pitta" },
      { text: "Large, stocky, strong", type: "Kapha" },
    ],
  },
  {
    question: "Skin Type",
    options: [
      { text: "Dry, rough, prone to cracking", type: "Vata" },
      { text: "Sensitive, reddish, prone to acne", type: "Pitta" },
      { text: "Soft, oily, thick, smooth", type: "Kapha" },
    ],
  },
  {
    question: "Hair Type",
    options: [
      { text: "Dry, frizzy, prone to dandruff", type: "Vata" },
      { text: "Fine, straight, early graying", type: "Pitta" },
      { text: "Thick, wavy, strong", type: "Kapha" },
    ],
  },{
    question: "Appetite & Digestion",
    options: [
      { text: "Irregular appetite, bloating, gas", type: "V" },
      { text: "Strong appetite, frequent hunger", type: "P" },
      { text: "Slow digestion, but steady appetite", type: "K" },
    ],
  },
  {
    question: "Energy Levels",
    options: [
      { text: "High bursts of energy but easily exhausted", type: "V" },
      { text: "Moderate but stable energy throughout the day", type: "P" },
      { text: "Sustained energy, can endure long work hours", type: "K" },
    ],
  },
  {
    question: "Sleep Patterns",
    options: [
      { text: "Light sleeper, wakes up easily", type: "V" },
      { text: "Moderate sleep, sometimes disturbed", type: "P" },
      { text: "Deep sleeper, enjoys long sleep", type: "K" },
    ],
  },
  {
    question: "Mind & Emotions",
    options: [
      { text: "Quick-witted, creative, anxious", type: "V" },
      { text: "Sharp, focused, sometimes aggressive", type: "P" },
      { text: "Calm, patient, slow but steady", type: "K" },
    ],
  },
  {
    question: "Climate Preference",
    options: [
      { text: "Loves warm weather, dislikes cold", type: "V" },
      { text: "Prefers cool environments, dislikes heat", type: "P" },
      { text: "Enjoys warmth, dislikes damp weather", type: "K" },
    ],
  },
  {
    question: "Cravings & Taste Preferences",
    options: [
      { text: "Loves warm, oily foods; dislikes cold, dry foods", type: "V" },
      { text: "Loves sweet, cold foods; dislikes spicy foods", type: "P" },
      { text: "Loves bitter, light foods; dislikes heavy, oily foods", type: "K" },
    ],
  },
  {
    question: "Common Health Issues",
    options: [
      { text: "Joint pain, anxiety, insomnia, constipation", type: "V" },
      { text: "Acid reflux, skin rashes, inflammation", type: "P" },
      { text: "Weight gain, sluggishness, sinus congestion", type: "K" },
    ],
  },
  // Add all other questions similarly...
];

const recommendations = {
  Vata: {
    type: "🌀 Vata Dominant (Air + Ether)",
    issues: "Joint pain, dry skin, constipation, anxiety, insomnia, irregular digestion",
    recommended: "Warm, moist, oily foods, cooked grains, herbal teas",
    avoid: "Raw, dry, cold foods, caffeine, carbonated drinks",
  },
  Pitta: {
    type: "🔥 Pitta Dominant (Fire + Water)",
    issues: "Acid reflux, skin rashes, inflammation, irritability, heat intolerance",
    recommended: "Cooling foods (coconut, cucumber), fresh fruits, dairy",
    avoid: "Spicy, fried, oily foods, excessive sour or salty foods",
  },
  Kapha: {
    type: "🌿 Kapha Dominant (Earth + Water)",
    issues: "Weight gain, slow digestion, water retention, sinus congestion",
    recommended: "Light, dry, and warm foods, leafy greens, herbal teas",
    avoid: "Heavy, oily, and creamy foods, excessive sweets and carbs",
  },
};

export default function PrakritiAnalyzer() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index, type) => {
    const newAnswers = [...answers];
    newAnswers[index] = type;
    setAnswers(newAnswers);
  };

  const calculateResults = () => {
    const scores = { Vata: 0, Pitta: 0, Kapha: 0 };
    answers.forEach((type) => {
      if (type) scores[type]++;
    });
    const maxScore = Math.max(scores.Vata, scores.Pitta, scores.Kapha);
    return Object.keys(scores).filter((key) => scores[key] === maxScore);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const dominantDoshas = calculateResults();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-gray-900 to-blue-900 text-white flex flex-col items-center p-6">
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-yellow-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Prakriti Analyzer
      </motion.h1>
      {!submitted ? (
        <>
          {questions.map((q, index) => (
            <div key={index} className="mb-8 w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-lg border border-yellow-400">
              <p className="text-lg font-semibold mb-4 text-yellow-300">{q.question}</p>
              <div className="flex flex-col gap-3">
                {q.options.map((option, i) => (
                  <motion.button
                    key={i}
                    className={`px-6 py-3 rounded-lg border transition-all duration-300 text-sm font-medium 
                      ${answers[index] === option.type ? "bg-yellow-500 text-gray-900" : "bg-gray-700 text-white"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(index, option.type)}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
          <motion.button
            className="mt-6 px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400"
            onClick={handleSubmit}
            whileHover={{ scale: 1.1 }}
          >
            Submit
          </motion.button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mt-6">Your Prakriti Analysis:</h2>
          {dominantDoshas.map((dosha, index) => (
            <motion.div
              key={index}
              className="mt-6 p-6 rounded-lg bg-gray-900 border border-yellow-500 w-full max-w-xl shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3 className="font-bold text-lg text-yellow-400">{recommendations[dosha].type}</h3>
              <p className="text-sm mt-2"><strong>Common Health Issues:</strong> {recommendations[dosha].issues}</p>
              <p className="text-sm mt-2"><strong>Recommended Foods:</strong> {recommendations[dosha].recommended}</p>
              <p className="text-sm mt-2"><strong>Foods to Avoid:</strong> 🚫 {recommendations[dosha].avoid}</p>
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}
