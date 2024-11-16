interface Window {
  electron: {
    // ... existing definitions ...
    windowControls: {
      minimize: () => Promise<void>;
      maximize: () => Promise<void>;
      close: () => Promise<void>;
    };
  };
}
