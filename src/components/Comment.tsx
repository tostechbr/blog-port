import { useState } from 'react';
import { Avatar, Box, Button, Typography, IconButton } from '@mui/material';
import { ThumbsUp, Trash } from 'phosphor-react';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  // Função para deletar comentário
  function handleDeleteComment() {
    onDeleteComment(content);
  }

  // Função para incrementar o contador de likes
  function handleLikeComment() {
    setLikeCount((state) => state + 1);
  }

  return (
    <Box
      sx={{
        marginTop: '1.5rem',
        display: 'flex',
        gap: '1rem',
      }}
    >
      {/* Componente Avatar */}
      <Avatar
        src="https://github.com/diego3g.png"
        alt="Avatar"
        sx={{ width: '3rem', height: '3rem', borderRadius: '8px' }}
      />

      {/* Caixa de conteúdo do comentário */}
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            backgroundColor: 'var(--gray-700)',
            borderRadius: '8px',
            padding: '1rem',
          }}
        >
          <Box
            component="header"
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                component="strong"
                sx={{ display: 'block', fontSize: '0.875rem', lineHeight: '1.6' }}
              >
                Diego Fernandes
              </Typography>
              <Typography
                component="time"
                title="11 de Maio às 08:13h"
                dateTime="2022-05-11 08:13:00"
                sx={{ display: 'block', fontSize: '0.75rem', lineHeight: '1.6', color: 'var(--gray-400)' }}
              >
                Cerca de 1h atrás
              </Typography>
            </Box>

            {/* Botão para deletar comentário */}
            <IconButton onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} color="var(--gray-400)" />
            </IconButton>
          </Box>

          {/* Conteúdo do comentário */}
          <Typography sx={{ marginTop: '1rem', color: 'var(--gray-300)' }}>
            {content}
          </Typography>
        </Box>

        {/* Rodapé com botão de like */}
        <Box sx={{ marginTop: '1rem' }}>
          <Button
            onClick={handleLikeComment}
            startIcon={<ThumbsUp />}
            sx={{
              background: 'transparent',
              border: 0,
              color: 'var(--gray-400)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '2px',
              '&:hover': {
                color: 'var(--green-300)',
              },
            }}
          >
            Aplaudir <span style={{ marginLeft: '0.5rem' }}>{likeCount}</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
