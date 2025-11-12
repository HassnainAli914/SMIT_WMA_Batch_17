import { useState } from "react";
import GlobalUser from "../GlobalUser";

export default function SignProvider({ children }: { children: React.ReactNode }) {
    const [sign, setSign] = useState<string>("Sign-In");

    return (
        <GlobalUser.Provider value={{ sign, setSign }}>
            {children}
        </GlobalUser.Provider>
    );
}
