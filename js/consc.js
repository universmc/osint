function conscienResponse(text, maxLength, addEmoji) {
    if (!maxLength || maxLength <= 0) {
      maxLength = 25;
    }
  
    let response = text;
  
    if (response.length > maxLength) {
      response = response.slice(0, maxLength - 3) + "...";
    }
  
    if (addEmoji === true) {
      response = `🧐 ${response}`;
    }
  
    return response;
  }
  