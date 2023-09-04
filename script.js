const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image using a URL
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();
    imgElement.src = image.url;

    imgElement.onload = () => {
      resolve(imgElement);
    };

    imgElement.onerror = () => {
      reject(new Error(`Failed to load image's URL: ${image.url}`));
    };
  });
}

// Function to download all images in parallel and display them
async function downloadAndDisplayImages() {
  try {
    const imagePromises = images.map(downloadImage);
    const downloadedImages = await Promise.all(imagePromises);

    // Clear the previous content of the output div
    output.innerHTML = '';

    // Append each downloaded image to the output div
    downloadedImages.forEach((img) => {
      output.appendChild(img);
    });
  } catch (error) {
    console.error(error);
  }
}

// Add a click event listener to the button
btn.addEventListener("click", downloadAndDisplayImages);
