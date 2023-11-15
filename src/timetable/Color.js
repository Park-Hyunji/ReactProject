export const generateRandomColor = (minBrightness) => {
    const color = `#${(Math.floor(Math.random() * 75) + 180).toString(16)}${Math.floor(Math.random() * 16777215).toString(16).slice(2)}`;
    return getBrightness(color) < minBrightness ? lightenColor(color, minBrightness) : color;
};
  
export const getBrightness = (color) => {
    const match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    const rgb = match ? [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)] : null;
    return rgb ? (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) : null;
};
  
export const lightenColor = (color, minBrightness) => {
    const rgb = [parseInt(color.slice(1, 3), 16), parseInt(color.slice(3, 5), 16), parseInt(color.slice(5, 7), 16)];
    const currentBrightness = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
    const ratio = (minBrightness - currentBrightness) / currentBrightness;
    
    const newColor = rgb.map((channel) => {
      const adjusted = Math.min(255, Math.floor(channel * (1 + ratio)));
      return adjusted.toString(16).padStart(2, '0');
    });
  
    return `#${newColor.join('')}`;
};
  