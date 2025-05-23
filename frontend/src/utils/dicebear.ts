export const generateRandomDiceBearThumbUrl = () => {
  const baseUrl = "https://api.dicebear.com/9.x/thumbs/svg";

  // Generate a random seed
  const seed = 'thumb-' + Math.floor(Math.random() * 1000000);

  // Construct the URL
  const url = `${baseUrl}?seed=${seed}`;

  return url;
}