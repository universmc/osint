const borderChars = {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
    intersectionLeft: '╠',
    intersectionRight: '╣',
    intersectionTop: '╦',
    intersectionBottom: '╩',
    intersectionCross: '╬',
  };
  
  function createFrame(width, height) {
    let frame = '';
  
    // top border
    frame += borderChars.topLeft + borderChars.horizontal.repeat(width - 2) + borderChars.topRight + '\n';
  
    // middle rows
    for (let i = 0; i < height - 2; i++) {
      frame += borderChars.vertical + ' '.repeat(width - 2) + borderChars.vertical + '\n';
    }
  
    // bottom border
    frame += borderChars.bottomLeft + borderChars.horizontal.repeat(width - 2) + borderChars.bottomRight + '\n';
  
    return frame;
  }
  
  // Example usage
  const myFrame = createFrame(64, 32);
  console.log(myFrame);
  