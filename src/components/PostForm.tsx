import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function PostForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    const newPost = {
      title,
      content,
      author: {
        name: 'User', 
        avatarUrl: '', 
      },
      publishedAt: new Date().toISOString(),
    };

    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    onClose();
    window.location.reload(); // Recarrega a página para exibir o novo post
  };

  return (
    <Box>
      <TextField
        label="Título"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Conteúdo"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Salvar
      </Button>
    </Box>
  );
}

export default PostForm;
