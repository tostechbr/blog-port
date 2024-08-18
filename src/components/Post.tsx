import { useState, ChangeEvent, FormEvent, InvalidEvent } from 'react';
import { Box, Avatar, Typography, TextField, Button, Link } from '@mui/material';
import { Comment } from './Comment';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(['Post muito bacana, hein?!']);
  const [newCommentText, setNewCommentText] = useState('');

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: React.FormEvent<HTMLDivElement>) {
    event.preventDefault();
    const textarea = event.target as HTMLTextAreaElement;
    textarea.setCustomValidity('Esse campo é obrigatório!');
  }
  

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete);
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <Box
      sx={{
        backgroundColor: 'var(--gray-800)',
        borderRadius: '8px',
        padding: '2.5rem',
        marginBottom: '2rem',
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Avatar src={post.author.avatarUrl} />
          <Box>
            <Typography variant="h6" color="var(--gray-100)">
              {post.author.name}
            </Typography>
            <Typography variant="body2" color="var(--gray-400)">
              {post.author.role}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginBottom: '1.5rem' }}>
        {post.content.map((line, index) => {
          if (line.type === 'paragraph') {
            return (
              <Typography key={index} sx={{ marginBottom: '1rem', color: 'var(--gray-300)' }}>
                {line.content}
              </Typography>
            );
          } else if (line.type === 'link') {
            return (
              <Typography key={index} sx={{ marginBottom: '1rem' }}>
                <Link href="#" sx={{ fontWeight: 'bold', color: 'var(--green-500)', textDecoration: 'none', '&:hover': { color: 'var(--green-300)' } }}>
                  {line.content}
                </Link>
              </Typography>
            );
          }
        })}
      </Box>

      <Box
        component="form"
        onSubmit={handleCreateNewComment}
        sx={{
          borderTop: '1px solid var(--gray-600)',
          paddingTop: '1.5rem',
        }}
      >
        <Typography variant="h6" color="var(--gray-100)" gutterBottom>
          Deixe seu feedback
        </Typography>

        <TextField
          name="comment"
          placeholder="Deixe um comentário"
          multiline
          rows={3}
          variant="outlined"
          fullWidth
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
          sx={{
            backgroundColor: 'var(--gray-300)',
            borderRadius: '0.25rem',
            color: 'var(--gray-100)',
            marginBottom: '1rem',
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={isNewCommentEmpty}
          sx={{
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            backgroundColor: 'var(--green-500)',
            color: 'var(--white)',
            '&:hover': { backgroundColor: 'var(--green-300)' },
            '&:disabled': { opacity: 0.7, cursor: 'not-allowed' },
          }}
        >
          Publicar
        </Button>
      </Box>

      <Box sx={{ marginTop: '2rem' }}>
        {comments.map((comment, index) => (
          <Comment key={index} content={comment} onDeleteComment={deleteComment} />
        ))}
      </Box>
    </Box>
  );
}
