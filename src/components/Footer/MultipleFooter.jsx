import Footer from './Footer';

export const MultipleFooter = () => {
  return (
    <div>
      <Footer {...{ name: 'Trụ sở chính' }} />
      <Footer {...{ name: 'Cơ sở 1' }} />
      <Footer {...{ name: 'Cơ sở 2' }} />
      <Footer {...{ name: 'Cơ sở 3' }} />
      <Footer {...{ name: 'Cơ sở 4' }} />
    </div>
  );
};
