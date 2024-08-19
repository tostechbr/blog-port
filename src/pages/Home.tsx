import { useEffect, useState } from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import { Sidebar } from '../components/Sidebar';
import { Avatar } from '../components/Avatar';

import styles from '../App.module.css';

interface Post {
  id: string;
  author: {
    avatarUrl: string;
    name: string;
    role: string;
    email: string; 
  };
  content: Array<{ type: string; content: string }>;
  publishedAt: string;
}

export function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        let data = await response.json();
  
        data = data.sort((a: Post, b: Post) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    setUserEmail(storedUser.email); // Obtenha o email do usuário logado
  
    fetchPosts();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: storedUser.name,
        avatarUrl: '', 
        role: storedUser.role || 'User',
        email: storedUser.email,
      },
      content: [{ type: 'paragraph', content }],
      publishedAt: new Date().toISOString(),
    };

    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setContent('');
    handleClose();
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await fetch(`http://localhost:5000/posts/${postId}`, {
        method: 'DELETE',
      });

      setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Erro ao deletar post:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <main>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Criar Post
          </Button>
        </Box>

        {posts.map((post) => (
          <Box key={post.id} sx={{ marginBottom: 4, backgroundColor: 'var(--gray-800)', padding: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={post.author.avatarUrl || ''}
                  alt={post.author.name}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    marginRight: 2,
                    backgroundColor: !post.author.avatarUrl ? 'var(--green-500)' : 'transparent',
                    color: !post.author.avatarUrl ? 'var(--white)' : 'inherit',
                    fontSize: '16px',
                  }}
                >
                  {!post.author.avatarUrl && post.author.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" color="var(--gray-100)" sx={{ marginBottom: 0 }}>
                    {post.author.name}
                  </Typography>
                </Box>
              </Box>
              {post.author.email === userEmail && ( // Exibe o texto de deletar apenas se o usuário for o autor
                <Typography
                  onClick={() => handleDeletePost(post.id)}
                  sx={{
                    color: 'red',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      color: 'darkred',
                    },
                  }}
                >
                  Delete
                </Typography>
              )}
            </Box>
            {Array.isArray(post.content) ? (
              post.content.map((item, index) => (
                <Typography key={index} variant="body1" color="var(--gray-300)" sx={{ marginTop: 1 }}>
                  {item.type === 'link' ? <a href={item.content}>{item.content}</a> : item.content}
                </Typography>
              ))
            ) : (
              <Typography variant="body1" color="var(--gray-300)" sx={{ marginTop: 1 }}>
                {post.content}
              </Typography>
            )}
          </Box>
        ))}

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: 'var(--gray-800)',
              border: '2px solid var(--gray-700)',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              color: 'var(--gray-100)',
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Criar Novo Post
            </Typography>
            <TextField
              fullWidth
              label="Conteúdo"
              variant="outlined"
              margin="normal"
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              InputLabelProps={{
                style: { color: 'var(--gray-400)' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'var(--gray-600)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--gray-500)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--gray-400)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'var(--gray-300)',
                },
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              Publicar
            </Button>
          </Box>
        </Modal>
      </main>
    </div>
  );
}
