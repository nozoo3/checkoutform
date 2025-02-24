import { CheckoutForm } from '~/components/features/CheckoutForm';
import { setAppElement } from 'react-modal';

setAppElement('#root');
function App() {
  return <CheckoutForm />;
}

export default App;
