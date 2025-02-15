document.getElementById('submit').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const message = await window.electronAPI.generateChatCompletion(prompt);
    document.getElementById('output').innerText = message;
  });