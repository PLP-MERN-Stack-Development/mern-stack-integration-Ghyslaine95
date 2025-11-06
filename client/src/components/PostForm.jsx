import { useState } from 'react';

const PostForm = ({ initialData = { title: '', content: '' }, onSubmit, isSubmitting }) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' };
  const inputStyle = { padding: '10px', fontSize: '1rem' };
  const textareaStyle = { padding: '10px', fontSize: '1rem', minHeight: '200px' };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ ...textareaStyle, width: '100%', boxSizing: 'border-box' }}
        />
      </div>
      <button type="submit" disabled={isSubmitting} style={{ padding: '10px', background: 'blue', color: 'white' }}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default PostForm;