import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Image, Badge, Form, Alert } from 'react-bootstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { userHasPermission, userHasRole } from '../helpers/permissionHelpers';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Category, Tag, ApiResponse } from './types/types';
import { loadCategories, loadTags } from './api/api';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [canEdit, setCanEdit] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const fetchData = async () => {
      const loadedCategories = await loadCategories();
      setCategories(loadedCategories);
      const loadedTags = await loadTags();
      setTags(loadedTags.map(tag => ({ value: tag.id, label: tag.name })));
      await fetchPost();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const isAuthor = post?.author_id === userId;
    const isAdmin = userHasRole('administrador');
    setCanEdit(isAuthor || (isAdmin && userHasPermission('update_posts')));
    if (post) {
      setSelectedCategory(post.category_id.toString());
      setSelectedTags(post.tags.map(tag => ({ value: tag.id, label: tag.name })));
      setPreviewUrl(post.imageUrl || '');
      const contentState = ContentState.createFromText(post.content);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [post]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/post/${id}`);
      if (response.ok) {
        const jsonResponse: ApiResponse<Post> = await response.json();
        const postData = jsonResponse.data;
        setPost(postData);
        const contentState = ContentState.createFromText(postData.content);
        setEditorState(EditorState.createWithContent(contentState));
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      setAlert({ type: 'success', message: 'Imagen cargada con éxito. Asegúrese de guardar los cambios.' });
    } else {
      setAlert({ type: 'danger', message: 'Por favor, seleccione una imagen.' });
    }
  };

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption.value);
  };

  const handleTagsChange = (selectedOptions: any) => {
    setSelectedTags(selectedOptions);
  };

  const savePost = async () => {
    setUploadingImage(true);
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    const sanitizedMarkup = DOMPurify.sanitize(markup);

    const formData = new FormData();
    formData.append('title', post?.title || '');
    formData.append('content', sanitizedMarkup);
    formData.append('category_id', selectedCategory);
    formData.append('tags', JSON.stringify(selectedTags.map(tag => tag.value)));
    if (image) {
      formData.append('image', image, image.name);
    }

    try {
      debugger
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: formData, // Aquí se envía la imagen junto con los otros datos del formulario
        // No se necesita especificar el Content-Type para FormData; se establece automáticamente
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost);
        setAlert({ type: 'success', message: 'Post actualizado con éxito.' });
      } else {
        setAlert({ type: 'danger', message: 'Hubo un problema al actualizar el post.' });
      }
    } catch (error) {
      console.error('Error al guardar el post:', error);
      setAlert({ type: 'danger', message: 'Error al guardar el post.' });
    }
    
    setUploadingImage(false);
  };

  if (!post) return <div>Cargando...</div>;

  return (
    <Container fluid="md">
      <div style={{ width: '800px', maxWidth: '100%', margin: 'auto', padding: '1rem', backgroundColor: 'white', borderRadius: '0.25rem', border: '1px solid #ddd' }}>
        <h1>{post.title}</h1>
        {/*<Image className='mb-2' width={'800px'} src={post.imageUrl || 'https://via.placeholder.com/800'} fluid />*/}
        <Image 
          className='mb-2'   
          src={previewUrl || post.imageUrl || 'https://via.placeholder.com/800x400'} 
          fluid 
          style={{ width: '800px', height: '400px' }} 
        />

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
        {canEdit && (
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Imagen del Post</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
           
          </Form.Group>
        )}
        {canEdit && <Button onClick={savePost} disabled={uploadingImage}>Guardar Cambios</Button>}
        {canEdit && <Button onClick={savePost} disabled={uploadingImage}>Publicar</Button>}
        {alert && <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>{alert.message}</Alert>}
      </div>
    </Container>
  );
};
export default PostDetail;