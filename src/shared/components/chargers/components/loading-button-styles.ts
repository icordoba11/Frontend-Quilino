export const loaderStyles = {
  position: "relative",
  width: "54px",
  height: "54px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const barStyles = (rotation: number, delay: string) => ({
  width: "8%",
  height: "24%",
  background: "rgb(128, 128, 128)",
  position: "absolute",
  left: "50%",
  top: "30%",
  opacity: 0,
  borderRadius: "50px",
  boxShadow: "0 0 3px rgba(0,0,0,0.2)",
  transform: `rotate(${rotation}deg) translate(0, -130%)`,
  animation: "fadeAnimation 1s linear infinite",
  animationDelay: delay,
});

export const keyframes = {
  "@keyframes fadeAnimation": {
    from: { opacity: 1 },
    to: { opacity: 0.25 },
  },
};
