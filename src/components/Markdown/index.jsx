import React from 'react';
import PropTypes from 'prop-types';
import Mark from 'marked';

const style = {
  articleMarkdown: {
    padding: '20px',
  },
};

export default function Markdown(props) {
  /* eslint-disable */
  return (
    <div
      className="Markdown"
      style={style.articleMarkdown}
      dangerouslySetInnerHTML={{ __html: Mark(props.content) }}
    />
  );
  /* eslint-enable */
}

Markdown.propTypes = {
  content: PropTypes.string.isRequired,
};
