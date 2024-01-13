const express = require('express');
const fs = require('fs');
const { parse } = require('svg-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/images/testsvg1.svg', (req, res) => {
  const textParam = req.query.text || 'Your Default Text';

  // Read the original SVG file
  const svgContent = fs.readFileSync('public/images/testsvg1.svg', 'utf8');

  // Parse the SVG content
  const parsedSvg = parse(svgContent);

  // Find the text element in the SVG content
  const svgText = findTextElement(parsedSvg, 'myText');

  // Update the text content
  if (svgText) {
    svgText.content = [{ type: 'text', value: textParam }];
  }

  // Send the modified SVG as the response
  res.type('svg').send(parsedSvg);
});

function findTextElement(parsedSvg, id) {
  // Recursive function to find an element by its id in the SVG tree
  if (parsedSvg && parsedSvg.children) {
    for (const child of parsedSvg.children) {
      if (child.properties && child.properties.id === id) {
        return child;
      }
      const found = findTextElement(child, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
