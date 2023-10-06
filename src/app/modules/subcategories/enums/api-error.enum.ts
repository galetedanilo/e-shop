export enum ApiCode {
  FAILURE_LOAD,
  FAILURE_CREATE,
  FAILURE_UPDATE,
  FAILURE_DELETE,
  FAILURE_LOAD_CATEGORIES,
}

export enum ApiMessage {
  FAILURE_LOAD = 'Error to load categories',
  FAILURE_CREATE = 'Error to create a new category',
  FAILURE_UPDATE = 'Error to update a category',
  FAILURE_DELETE = 'Errot to delete category',
  FAILURE_LOAD_CATEGORIES = 'Error to load categories',
}
