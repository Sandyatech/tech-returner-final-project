import { useState } from "react";
import { CURRENT_URL } from "../../services/aaaaaaaaaa";
import { options } from "../../services/aaaaaaaaaa";

const Health: React.FC = () => {
    const [healthMessage, setHealthMessage] = useState<string>("");

    const checkServerHealth = async () => {
        try {
            const apiResponse = await fetch(`${CURRENT_URL}?q=London`, options);
            if (apiResponse.status === 200) {
                setHealthMessage("🟢 Weather API is responding correctly. 🟢");
            } else {
                setHealthMessage("🔴 There is a problem with Weather API at this time. 🔴");
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    checkServerHealth();

    return <p>{healthMessage}</p>;
};

export default Health;
