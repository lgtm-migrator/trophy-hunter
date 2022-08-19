import LottieContainer from './LottieContainer';
import Lottie from 'lottie-react';
import animationData from './confetti.json';

const Confetti = () => {
  return (
    <LottieContainer>
      <Lottie
        animationData={animationData}
        loop={2}
        autoplay
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
      />
    </LottieContainer>
  );
};

export default Confetti;
