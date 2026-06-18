import { useState } from "react";

const wasteData = [
  {
    keywords: ["plastic bottle", "water bottle", "pet bottle", "bottle"],
    bin: "Plastic Recycling Bin",
    category: "Plastic",
    advice:
      "Empty any liquid first, then place it in the Plastic Recycling Bin. If the bottle has a cap, keep it on unless the event has separate cap collection.",
    fact:
      "Fun fact: Plastic bottles can often be recycled into new bottles, clothing fibre, or packaging."
  },
  {
    keywords: ["plastic cup", "plastic glass", "cup"],
    bin: "Plastic Recycling Bin or General Waste",
    category: "Plastic",
    advice:
      "If it is clean and empty, place it in the Plastic Recycling Bin. If it has food, liquid, or heavy staining, use General Waste.",
    fact:
      "Fun fact: Dirty plastic can contaminate clean recycling, so rinsing or emptying matters."
  },
  {
    keywords: ["paper cup", "coffee cup", "tea cup"],
    bin: "General Waste",
    category: "Mixed Material",
    advice:
      "Most paper cups have a plastic lining, so they usually go into General Waste unless the event specifically accepts them.",
    fact:
      "Fun fact: Something can look like paper but still be hard to recycle because of hidden plastic lining."
  },
  {
    keywords: ["paper", "flyer", "leaflet", "notebook", "newspaper", "magazine"],
    bin: "Paper Recycling Bin",
    category: "Paper",
    advice:
      "If it is clean and dry, place it in the Paper Recycling Bin. If it is wet, oily, or food-stained, use General Waste.",
    fact:
      "Fun fact: Clean paper can be recycled several times before the fibres become too weak."
  },
  {
    keywords: ["cardboard", "box", "carton"],
    bin: "Paper/Cardboard Recycling Bin",
    category: "Cardboard",
    advice:
      "Flatten the cardboard if possible and place it in the Paper/Cardboard Recycling Bin. If it is greasy or wet, use General Waste.",
    fact:
      "Fun fact: Flattening cardboard saves space and makes collection easier."
  },
  {
    keywords: ["pizza box", "greasy box", "food stained box"],
    bin: "General Waste",
    category: "Contaminated Paper",
    advice:
      "If the box is greasy or has food stuck to it, place it in General Waste. If part of it is clean, tear off the clean part and recycle that.",
    fact:
      "Fun fact: Food grease is one of the biggest reasons paper recycling gets rejected."
  },
  {
    keywords: ["food waste", "leftovers", "rice", "noodles", "curry", "bread", "fruit peel", "vegetable", "banana peel"],
    bin: "Food Waste Bin",
    category: "Organic Waste",
    advice:
      "Place food scraps in the Food Waste Bin if available. If there is no food waste bin, use General Waste.",
    fact:
      "Fun fact: Food waste can become compost when collected separately."
  },
  {
    keywords: ["banana leaf", "leaf", "plant waste"],
    bin: "Food Waste or Compost Bin",
    category: "Organic Waste",
    advice:
      "Banana leaves and plant-based waste should go into Food Waste or Compost if available. Otherwise, use General Waste.",
    fact:
      "Fun fact: Banana leaves are natural, but they still need the right composting stream."
  },
  {
    keywords: ["can", "aluminium can", "soda can", "coke can", "tin can"],
    bin: "Metal Recycling Bin",
    category: "Metal",
    advice:
      "Empty the can first, then place it in the Metal Recycling Bin. If there is no metal bin, use the bin marked for cans.",
    fact:
      "Fun fact: Aluminium is one of the most valuable recyclable materials."
  },
  {
    keywords: ["glass", "glass bottle", "jar"],
    bin: "Glass Recycling Bin",
    category: "Glass",
    advice:
      "Place clean glass bottles or jars in the Glass Recycling Bin if available. Broken glass should be given to event staff safely.",
    fact:
      "Fun fact: Glass can be recycled again and again without losing much quality."
  },
  {
    keywords: ["tissue", "napkin", "used tissue", "serviette"],
    bin: "General Waste",
    category: "Contaminated Paper",
    advice:
      "Used tissues and napkins should go into General Waste because they are usually contaminated.",
    fact:
      "Fun fact: Not all paper is recyclable. Tissue is usually too weak or dirty to recycle."
  },
  {
    keywords: ["plastic spoon", "plastic fork", "plastic knife", "cutlery", "straw"],
    bin: "General Waste",
    category: "Small Plastic",
    advice:
      "Small plastic items like straws and cutlery usually go into General Waste unless the event has a special recycling stream.",
    fact:
      "Fun fact: Small plastics are difficult for many recycling facilities to sort."
  },
  {
    keywords: ["wrapper", "chip packet", "biscuit packet", "snack packet", "chocolate wrapper"],
    bin: "General Waste",
    category: "Mixed Plastic",
    advice:
      "Most snack wrappers are made from mixed materials and should go into General Waste unless a special collection is available.",
    fact:
      "Fun fact: Mixed-material packaging is much harder to recycle than single-material items."
  },
  {
    keywords: ["milk carton", "juice carton", "tetra pak", "tetrapak"],
    bin: "General Waste or Special Carton Collection",
    category: "Mixed Material",
    advice:
      "Cartons often contain paper, plastic, and sometimes aluminium layers. Use a special carton collection if available; otherwise use General Waste.",
    fact:
      "Fun fact: Cartons are useful packaging, but their layers make recycling more complex."
  },
  {
    keywords: ["battery", "phone", "charger", "earphones", "electronic", "e waste", "e-waste"],
    bin: "E-Waste Collection Point",
    category: "E-Waste",
    advice:
      "Do not place electronics or batteries in normal bins. Give them to event staff or use an E-Waste Collection Point.",
    fact:
      "Fun fact: E-waste can contain valuable metals, but it must be handled safely."
  },
  {
    keywords: ["mask", "face mask", "gloves", "sanitary", "diaper"],
    bin: "General Waste",
    category: "Sanitary Waste",
    advice:
      "Sanitary or hygiene-related waste should go into General Waste. Do not place it in recycling bins.",
    fact:
      "Fun fact: Hygiene waste can contaminate recycling and create safety risks for waste workers."
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
  "Snack wrapper",
  "Battery",
  "Cardboard box",
  "Plastic spoon"
];

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi, I’m Trash Talk! Ask me what bin your trash goes into. Try typing plastic bottle, pizza box, snack wrapper, tissue, food waste, or aluminium can."
    }
  ]);

  const [input, setInput] = useState("");

  const findWasteAnswer = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    const match = wasteData.find((item) =>
      item.keywords.some((keyword) => lowerInput.includes(keyword))
    );

    if (match) {
      return `Classification: ${match.category}\n\nBin: ${match.bin}\n\nWhat to do: ${match.advice}\n\n${match.fact}`;
    }

    return `Classification: Unsure\n\nBin: General Waste if contaminated or mixed material\n\nWhat to do: I’m not fully sure about that item yet. If it is clean plastic, paper, metal, or glass, use the correct recycling bin. If it has food, liquid, or mixed materials, use General Waste.\n\nFun fact: Clean and dry items are much easier to recycle.`;
  };

  const handleSend = (customInput) => {
    const userText = customInput || input;

    if (!userText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
      { sender: "bot", text: findWasteAnswer(userText) }
    ]);

    setInput("");
  };

  return (
    <div className="app">
      <div className="chatbot-card">
        <div className="header">
          <img src="/mascot.jpeg" alt="Trash Talk mascot" className="mascot" />

          <div>
            <h1>Trash Talk</h1>
            <p>Your cute waste-sorting buddy</p>
          </div>
        </div>

        <div className="intro">
          <h2>What does my trash classify as?</h2>
          <p>
            Type your item below and I’ll tell you the category, the correct bin,
            what to do before throwing it away, and a fun trash fact.
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
            placeholder="Example: Where do I throw a snack wrapper?"
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