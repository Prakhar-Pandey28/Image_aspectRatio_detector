// Initialize Fabric.js Canvas
const canvas = new fabric.Canvas('canvas');

// Function to handle image upload
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = new Image();
            imgElement.src = e.target.result;
            imgElement.onload = function()  {
                // Detect aspect ratio
                const aspectRatio = imgElement.width / imgElement.height;
                adjustTemplateBoundaries(aspectRatio);
                addImageToCanvas(imgElement);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Function to adjust template boundaries based on aspect ratio
function adjustTemplateBoundaries(aspectRatio) {
    const templateWidth = 400; // Base width
    const templateHeight = 300; // Base height

    if (aspectRatio > 1) {
        // Landscape image
        canvas.setWidth(templateWidth);
        canvas.setHeight(templateWidth / aspectRatio);
    } else {
        // Portrait image
        canvas.setHeight(templateHeight);
        canvas.setWidth(templateHeight * aspectRatio);
    }
}

// Function to add image to canvas
function addImageToCanvas(imgElement) {
    const imgInstance = new fabric.Image(imgElement, {
        left: 0,
        top: 0,
        scaleX: canvas.width / imgElement.width,
        scaleY: canvas.height / imgElement.height
    });
    canvas.add(imgInstance);
    canvas.renderAll();
}