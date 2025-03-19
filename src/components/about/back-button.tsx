export default function BackButton() {
  return (
    <div>
      <header className="page-header">
        <BackButton />
        <div className="title-container">
          <div className="title-underline" />
        </div>
      </header>
      <style jsx global>{`
        html {
          scroll-snap-type: y mandatory;
        }

        #projects-showcase {
          // background-color: #212121;
          min-height: 100vh;
          position: relative;
        }

        /* Page header styles */
        .page-header {
          position: fixed;
          top: 40px;
          left: 40px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .title-container {
          display: flex;
          flex-direction: column;
        }

        .page-title {
          font-size: 48px;
          font-weight: 700;
          color: var(--white);
          margin: 0;
          letter-spacing: -1px;
        }

        .title-underline {
          height: 4px;
          background: var(--hue-6);
          margin-top: 8px;
          border-radius: 2px;
          width: 100px;
        }

        .loading {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--white);
          font-size: 24px;
        }

        @media (max-width: 768px) {
          .page-header {
            top: 20px;
            left: 20px;
            gap: 15px;
          }

          .page-title {
            font-size: 36px;
          }
        }

        @media (max-width: 576px) {
          .page-header {
            top: 15px;
            left: 15px;
            gap: 10px;
          }

          .page-title {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
