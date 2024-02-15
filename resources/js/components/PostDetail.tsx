import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Image, Badge, Form } from 'react-bootstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { userHasPermission, userHasRole } from '../helpers/permissionHelpers';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Category, Tag, ApiResponse } from './types/types';
import { loadCategories, loadTags } from './api/api';


interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  category_id: number;
  author_id: number;
  title: string;
  content: string;
  category: Category;
  user: User;
  tags: Tag[];
  imageUrl?: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [canEdit, setCanEdit] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const loadedCategories = await loadCategories();
      setCategories(loadedCategories);
      const loadedTags = await loadTags();
      setTags(loadedTags.map(tag => ({ value: tag.id, label: tag.name }))); // Asumiendo que la función loadTags devuelve el tipo correcto
      await fetchPost();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const isAuthor = post?.author_id === userId;
    const isAdmin = userHasRole('administrador');
    setCanEdit(isAuthor || isAdmin && userHasPermission('update_posts'));
    if (post) {
      setSelectedCategory(post.category_id.toString());
      setSelectedTags(post.tags.map(tag => ({ value: tag.id, label: tag.name })));
    }
  }, [post]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/post/${id}`);
      if (response.ok) {
        const jsonResponse = await response.json();
        const postData = jsonResponse.data;
        setPost(postData);
        const contentState = ContentState.createFromText(postData.content);
        setEditorState(EditorState.createWithContent(contentState));
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const savePost = async () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    // Lógica para guardar el post, incluyendo categoría seleccionada y tags
  };

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleTagsChange = (selectedOptions: any) => {
    setSelectedTags(selectedOptions);
  };

  const createMarkup = (htmlContent: string) => {
    return {
      __html: DOMPurify.sanitize(htmlContent),
    };
  };

  if (!post) return <div>Cargando...</div>;

  const animatedComponents = makeAnimated();

  return (
    <Container fluid="md">
      <div style={{ width: '800px', maxWidth: '100%', margin: 'auto', padding: '1rem', backgroundColor: 'white', borderRadius: '0.25rem', border: '1px solid #ddd' }}>
        <h1>{post.title}</h1>
        <Image className='mb-2' width={'800px'} src={post.imageUrl || 'https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg'} fluid />
        <div className='mb-1'>Autor: {post.user.name}</div>
        {canEdit ? (
          <Form.Select className='mb-2' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} aria-label="Selecciona una categoría">
            <option value="">Elige una categoría...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        ) : (
          <div className='mb-2'>Categoría: {post.category.name}</div>
        )}
        <Select
          components={animatedComponents}
          isMulti
          options={tags}
          value={selectedTags}
          onChange={handleTagsChange}
          classNamePrefix="select"
          placeholder="Selecciona tags..."
        />
        <div className="mb-3">
          {canEdit ? (
            <Editor
              onEditorStateChange={handleEditorChange}
              toolbarHidden={!canEdit}
              readOnly={!canEdit}
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              wrapperStyle={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.25rem', maxWidth: '800px', margin: 'auto' }}
              editorStyle={{ height: '200px', padding: '0.5rem', border: '1px solid #F1F1F1', borderRadius: '0.25rem' }}
            />
          ) : (
            <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '0.25rem', border: '1px solid #ddd' }} dangerouslySetInnerHTML={createMarkup(draftToHtml(convertToRaw(editorState.getCurrentContent())))} />
          )}
        </div>
        {canEdit && <Button onClick={savePost}>Guardar Cambios</Button>}
      </div>
    </Container>
  );
};

export default PostDetail;
