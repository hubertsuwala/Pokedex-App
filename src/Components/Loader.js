import { Oval } from 'react-loader-spinner';

const Loader = () => (
  <div className="loader">
    <Oval
      ariaLabel="loading-indicator"
      height={100}
      width={100}
      strokeWidth={5}
      color="#4b4b4b"
      secondaryColor="white"
    />
  </div>
);

export default Loader;
