import React from "react";

export default React.createContext<{ blur: (key: string) => void }>({ blur: () => null });
