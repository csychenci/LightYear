import React from 'react';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { useCopy } from 'dumi/theme';
import 'prismjs/themes/prism.css';
import './SourceCode.less';

/**
 * define DSL which can be highlighted as similar language
 */
const SIMILAR_DSL = {
  acss: 'css',
  axml: 'xml',
};

export interface ICodeBlockProps {
  code: string;
  lang: Language;
  showCopy?: boolean;
}

export default ({ code, lang, showCopy = true }: ICodeBlockProps) => {
  const [copyCode, copyStatus] = useCopy();
  // console.log('SIMILAR_DSL[lang] || lang',SIMILAR_DSL[lang] || lang)
  return (
    <div className="__dumi-default-code-block">
      <Highlight
        {...defaultProps}
        code={code}
        language={SIMILAR_DSL[lang] || lang}
        theme={undefined}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            <span
              style={{
                display: 'block',
                background: 'url(../image/640.svg) 10px 10px / 40px no-repeat rgb(250, 250, 250)',
                height: '30px',
                width: '100%',
                marginBottom: '-7px',
                borderRadius: '5px',
              }}
            ></span>
            {showCopy && (
              <button
                className="__dumi-default-icon __dumi-default-code-block-copy-btn"
                data-status={copyStatus}
                onClick={() => copyCode(code)}
              />
            )}
            <div className="tokens-wrapper">
              {/* filter(item => !(item?.length === 1 && item[0].empty)) */}
              {tokens.map((line, i) => {
                return (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => {
                      return <span {...getTokenProps({ token, key })} />;
                    })}
                  </div>
                );
              })}
            </div>
          </pre>
        )}
      </Highlight>
    </div>
  );
};
