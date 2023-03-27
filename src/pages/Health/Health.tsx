import { useState } from "react";
import { CURRENT_URL } from "../../services/api";
import { options } from "../../services/api";

const Health: React.FC = () => {
  const [healthMessage, setHealthMessage] = useState<string>("");

  const checkServerHealth = async () => {
    try {
      const apiResponse = await fetch(`${CURRENT_URL}?q=London`, options);
      if (apiResponse.status === 200) {
        setHealthMessage("🟢 Weather API is responding correctly. 🟢");
      } else {
        setHealthMessage(
          "🔴 There is a problem with Weather API at this time. 🔴"
        );
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  checkServerHealth();

  return (
    <div className="App">
      <h1>API Health Check</h1>
      <p className="healthMessage">{healthMessage}</p>
    </div>
  );
};

export default Health;
