export enum EApiErrorCode {
  FAILURE_LOAD,
  FAILURE_CREATE,
  FAILURE_UPDATE,
  FAILURE_DELETE,
}

export enum EApiMessage {
  FAILURE_CREATE = 'Error to create a new category',
  FAILURE_DELETE = 'Errot to delete category',
  FAILURE_LOAD = 'Error to load categories',
  FAILURE_UPDATE = 'Error to update a category',
  SUCCESS_CREATE = 'New category registered successfully',
  SUCCESS_DELETE = 'Delete category successfully',
  SUCCESS_LOAD = 'Categories loaded successfully',
  SUCCESS_UPDATE = 'Update category successfully',
}
