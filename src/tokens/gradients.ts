// src/tokens/gradients.ts

export const rawGradients = {
    teal: {
      50: "linear-gradient(135deg, #99F6E4 0%, #5EEAD4 100%)",
      100: "linear-gradient(135deg, #5EEAD4 0%, #2DD4BF 100%)",
      200: "linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)",
    },
  
    blue: {
      soft: "linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)",
      strong: "linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)",
    },
  } as const;
  
  // Semantic mappings
  export const gradients = {
    brand: {
      primary: rawGradients.blue.strong,
      secondary: rawGradients.teal[200],
    },
  
    background: {
      card: rawGradients.blue.soft,
      highlight: rawGradients.teal[100],
    },
  
    status: {
      success: rawGradients.teal[50],
    },
  } as const;
  