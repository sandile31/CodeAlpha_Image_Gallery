// JavaScript for Tab Navigation & Image Switching
const tabs = document.querySelectorAll('.tab-btn');
const galleries = document.querySelectorAll('.gallery-container');
let currentImageIndex = 0;
let activeGallery = document.querySelector('.gallery-container:not(.hidden)');

// Function to show an image from the current tab gallery
function showImage(imagesArray, index) {
  imagesArray.forEach(image => image.classList.remove('active'));
  if (index < 0) {
    currentImageIndex = imagesArray.length - 1;
  } else if (index >= imagesArray.length) {
    currentImageIndex = 0;
  }
  imagesArray[currentImageIndex].classList.add('active');
}

// Function to open the full image view
function viewFullImage() {
  const activeImage = activeGallery.querySelector('.gallery-image.active');
  if (activeImage) {
    activeImage.classList.add('zoomed'); // Add zoomed class to enlarge
    const closeButton = activeGallery.querySelector('.close-full');
    closeButton.classList.remove('hidden'); // Show 'X' button
  }
}

// Attach view full image functionality to + buttons
const fullViewButtons = document.querySelectorAll('.view-full');
fullViewButtons.forEach(btn => {
  btn.addEventListener('click', viewFullImage);
});

// Event listener for 'X' close button
const closeButtons = document.querySelectorAll('.close-full');
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const zoomedImage = activeGallery.querySelector('.gallery-image.zoomed');
    if (zoomedImage) {
      zoomedImage.classList.remove('zoomed'); // Exit zoom view
      btn.classList.add('hidden'); // Hide 'X' button
    }
  });
});

// Event listener for tab buttons
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    galleries.forEach(gallery => gallery.classList.add('hidden'));
    activeGallery = document.getElementById(`${tab.dataset.tab}-gallery`);
    activeGallery.classList.remove('hidden');

    currentImageIndex = 0;
    const selectedImages = activeGallery.querySelectorAll('.gallery-image');
    showImage(selectedImages, currentImageIndex);
  });
});

// Functionality for next and previous buttons
function handleNavigation(galleryId, nextBtnId, prevBtnId) {
  const gallery = document.getElementById(galleryId);
  const images = gallery.querySelectorAll('.gallery-image');

  const nextBtn = document.getElementById(nextBtnId);
  const prevBtn = document.getElementById(prevBtnId);

  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(images, currentImageIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(images, currentImageIndex);
  });
}

// Initialize the next and prev buttons for all galleries
handleNavigation('gym-gallery', 'nextBtn', 'prevBtn');
handleNavigation('music-gallery', 'musicNextBtn', 'musicPrevBtn');
handleNavigation('tech-gallery', 'techNextBtn', 'techPrevBtn');

// Initialize the first tab (Gym) on page load
document.addEventListener('DOMContentLoaded', () => {
  const selectedImages = activeGallery.querySelectorAll('.gallery-image');
  showImage(selectedImages, currentImageIndex);
});

// Dark mode feature
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
