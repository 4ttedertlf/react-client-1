export const PublicStaticContent = ( { contentName, htmlContent }) => {
    return (
      <div className={contentName}>
        {htmlContent}
      </div>
    );
  };