import { useState } from "react";

const wasteData = [
  {
    keywords: ["plastic bottle", "water bottle", "pet bottle", "bottle"],
    bin: "Plastic Recycling Bin",
    advice:
      "Empty any liquid first, then place it in the Plastic Recycling Bin. If there is a cap, keep it on unless the event has separate cap collection.",
    fact:
      "Fun fact: Recycling plastic bottles helps reduce the need for new plastic production."
  },
  {
    keywords: ["plastic cup", "cup"],
    bin: "Plastic Recycling Bin or General Waste",
    advice:
      "If the cup is clean and empty, place it in the Plastic Recycling Bin. If it has food, liquid, or heavy contamination, use General Waste.",
    fact:
      "Fun fact: Dirty plastic can contaminate clean recycling, so emptying it first really matters."
  },
  {
    keywords: ["paper", "flyer", "leaflet", "cardboard", "box"],
    bin: "Paper Recycling Bin",
    advice:
      "If it is clean and dry, place it in the Paper Recycling Bin. If it is oily, wet, or food-stained, use General Waste.",
    fact:
      "Fun fact: Clean paper can often be recycled several times into new paper products."
  },
  {
    keywords: ["pizza box", "food stained paper", "greasy paper"],
    bin: "General Waste",
    advice:
      "If the box is greasy or has food stuck to it, place it in General Waste. If part of the box is clean, tear off the clean section and recycle that.",
    fact:
      "Fun fact: Food grease is one of the biggest reasons paper recycling gets rejected."
  },
  {
    keywords: ["banana leaf", "food waste", "leftovers", "rice", "fruit peel", "vegetable"],
    bin: "Food Waste Bin",
    advice:
      "Place food scraps in the Food Waste Bin if available. If there is no food waste bin at the event, use General Waste.",
    fact:
      "Fun fact: Food waste can be turned into compost when it is collected separately."
  },
  {
    keywords: ["can", "aluminium can", "soda can", "coke can", "tin"],
    bin: "Metal Recycling Bin",
    advice:
      "Empty the can first, then place it in the Metal Recycling Bin. If there is no metal bin, use the recycling bin marked for cans.",
    fact:
      "Fun fact: Aluminium is one of the most valuable recyclable materials."
  },
  {
    keywords: ["glass", "glass bottle", "jar"],
    bin: "Glass Recycling Bin",
    advice:
      "Place clean glass bottles or jars in the Glass Recycling Bin if available. Broken glass should be handled carefully and given to event staff.",
    fact:
      "Fun fact: Glass can be recycled repeatedly without losing much quality."
  },
  {
    keywords: ["tissue", "napkin", "used tissue"],
    bin: "General Waste",
    advice:
      "Used tissues and napkins should go into General Waste because they are usually contaminated.",
    fact:
      "Fun fact: Not all paper is recyclable — tissue is usually too weak or dirty to recycle."
  },
  {
    keywords: ["battery", "phone", "charger", "earphones", "electronic", "e waste", "e-waste"],
    bin: "E-Waste Collection Point",
    advice:
      "Do not place electronics or batteries in normal bins. Give them to an event staff member or use an E-Waste Collection Point if available.",
    fact:
      "Fun fact: E-waste can contain valuable metals, but it must be handled safely."
  },
  {
    keywords: ["straw", "plastic spoon", "plastic fork", "cutlery"],
    bin: "General Waste",
    advice:
      "Small plastic items like straws and plastic cutlery usually go into General Waste unless the event specifically accepts them for recycling.",
    fact:
      "Fun fact: Small plastics are often difficult to sort in recycling facilities."
  }
];

const quickItems = [
  "Plastic bottle",
  "Paper cup",
  "Pizza box",
  "Banana leaf",
  "Aluminium can",
  "Tissue",
  "Food leftovers",
  "Glass bottle",
  "Plastic spoon",
  "Battery"
];

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi, I’m EcoBot! Ask me what bin your trash goes into. Try typing: plastic bottle, pizza box, tissue, food waste, or aluminium can."
    }
  ]);

  const [input, setInput] = useState("");

  const findWasteAnswer = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    const match = wasteData.find((item) =>
      item.keywords.some((keyword) => lowerInput.includes(keyword))
    );

    if (match) {
      return `Classification: ${match.bin}\n\nWhat to do: ${match.advice}\n\n${match.fact}`;
    }

    return `I’m not fully sure about that item yet. If it is clean plastic, paper, metal, or glass, use the correct recycling bin. If it has food, liquid, or mixed materials, use General Waste.\n\nFun fact: The cleaner the waste is, the easier it is to recycle.`;
  };

  const handleSend = (customInput) => {
    const userText = customInput || input;

    if (!userText.trim()) return;

    const userMessage = {
      sender: "user",
      text: userText
    };

    const botMessage = {
      sender: "bot",
      text: findWasteAnswer(userText)
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="app">
      <div className="chatbot-card">
        <div className="header">
          <div>
            <h1>EcoBot</h1>
            <p>Your smart waste sorting assistant</p>
          </div>
          <span className="badge">Green Event Tool</span>
        </div>

        <div className="intro">
          <h2>What does my trash classify as?</h2>
          <p>
            Type an item below and EcoBot will tell you which bin to use, how to
            dispose of it, and a quick fun fact.
          </p>
        </div>

        <div className="quick-buttons">
          {quickItems.map((item) => (
            <button key={item} onClick={() => handleSend(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="chat-window">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "bot" ? "bot" : "user"
              }`}
            >
              {message.text.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Example: Where do I throw a plastic bottle?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button onClick={() => handleSend()}>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;