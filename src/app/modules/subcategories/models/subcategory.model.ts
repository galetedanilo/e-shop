export interface ISubcategory {
  readonly id: string | null;
  readonly name: string;
  readonly description: string;
  readonly isActive: boolean;
  readonly categoryId: string;
}
