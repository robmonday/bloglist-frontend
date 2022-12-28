const BlogForm = ({ onSubmit, handleChange, values }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <label for="title">title: </label>
        <input type="text" value={values.title} id="title" name="Title" onChange={({target}) => {handleChange({ ...values, title: target.value, })}} /><br/>
        <label for="author">author: </label>
        <input type="text" value={values.author} id="author" name="Author" onChange={({target}) => {handleChange({ ...values, author: target.value, })}} /><br/>
        <label for="url">url: </label>
        <input type="text" value={values.url} id="url" name="Url" onChange={({target}) => {handleChange({ ...values, url: target.value, })}} /><br/><br/>
        <input type="submit" value="create" />
      </form>
    </div>
  )
}

export default BlogForm