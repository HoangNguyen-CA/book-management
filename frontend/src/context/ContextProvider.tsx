import { AuthorsProvider } from './AuthorsContext';

interface Props {
  children: React.ReactNode;
}
const ContextProvider = ({ children }: Props) => {
  return <AuthorsProvider>{children}</AuthorsProvider>;
};

export default ContextProvider;
