// （ blog / backend / db / schema.rb ）を参照
// schema.rb に id は定義されていないが、デフォルトで定義されるため、型宣言する必要あり
export interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};